import Moralis from 'moralis/node'
import { collectionAbi } from './abi/collection'
import { db } from '../lib/db'
import { capitalize, groupBy, keys, omit } from 'lodash'
//this is to allow me merge with main branch
type extendedNativeRunContractType = {
  runContractFunction: (options: {
    chain: string
    address: string
    function_name: string
    abi: any
    params?: any
  }) => Promise<any>
}
type metadataType = {
  name?: string
  description?: string
  attributes?: [{ trait_type: string; value: string }]
  mediaType?: string
  animation_url: string
  external_url: string
  image: string
}

type tokenResultType = {
  id?: string
  name?: string
  description?: string
  mediaType?: string
  mediaLink?: string
  assetLink?: string
  contractAddress?: string
  tokenId?: string
  owner?: string
  blockNumber?: string
  attributes?: { trait_type: string; value: string }[]
  contractType?: string
  symbol?: string
  tokenName?: string
  amount?: string
}

export const initMoralis = async () => {
  return await Moralis.start({
    serverUrl: process.env.MORALIS_SERVER_URL,
    appId: process.env.MORALIS_API_ID,
    masterKey: process.env.MORALIS_MASTER_KEY,
  })
}

const getContractAddressFromChain = (chain: string) => {
  switch (chain) {
    case '0x1':
      return process.env.MAINNET_TOKEN_CONTRACT
    default:
      return process.env.RINKEBY_TOKEN_CONTRACT
  }
}

const prepareURI = (uri: string) => 'ipfs://' + uri.split('/').pop()

const prepareMediaLink = (type: string, asset: string) =>
  asset + '.' + type.split('/').pop()

const prepareTokenResult = async (
  result: {
    name: string
    token_uri?: string
    symbol: string
    contract_type?: string
    token_address?: string
    token_id?: string
    amount?: string
    owner_of?: string
    metadata?: string
    mediaType?: string
    block_number?: string
  }[]
): Promise<tokenResultType[]> => {
  const cleanData = result.filter((item) => item?.metadata && item?.token_uri)

  const groups = groupBy(cleanData, (item) => prepareURI(item.token_uri))

  //console.log(groups)

  const mediaTypes = await db.asset.findMany({
    where: { metadataLink: { in: Object.keys(groups) } },
    select: { metadataLink: true, mediaType: true },
  })

  //console.log(mediaTypes)

  const mappedMediaTypes = groupBy(mediaTypes, (item) => item.metadataLink)
  //console.log(mappedMediaTypes)
  return cleanData.map(
    ({
      metadata,
      token_address,
      token_id,
      token_uri,
      owner_of,
      contract_type,
      block_number,
      symbol,
      name: tokenName,
      amount,
    }) => {
      const _meta = JSON.parse(metadata) as metadataType

      const mediaType = mappedMediaTypes[prepareURI(token_uri)]
        ? mappedMediaTypes[prepareURI(token_uri)][0]?.mediaType
        : ''
      const {
        description,
        animation_url,
        image,
        external_url,
        name,
        attributes,
      } = _meta
      return {
        id: token_address + token_id,
        name,
        description,
        mediaType,
        mediaLink: prepareMediaLink(mediaType, animation_url || image),
        assetLink: prepareMediaLink(
          mediaType,
          external_url || animation_url || image
        ),
        contractAddress: token_address,
        tokenId: token_id,
        owner: owner_of,
        blockNumber: block_number,
        attributes,
        contractType: contract_type,
        symbol,
        tokenName,
        amount,
      }
    }
  )
}

const groupByUniqueTokens = (payload: tokenResultType[], amount?: number) => {
  const grouped = groupBy(payload, (item) => item.name)
  return Object.values(grouped).map((item) => ({
    ...item[0],
    ...{ amount: item.length || 0 },
  }))
}

export const fetchOwnedTokens = async (
  owner: string,
  chain?: string,
  tokenContract?: string
) => {
  await initMoralis()
  const data = tokenContract
    ? await Moralis.Web3API.account.getNFTsForContract({
        chain: chain as unknown as any,
        address: owner,
        token_address: getContractAddressFromChain(chain),
      })
    : await Moralis.Web3API.account.getNFTs({
        chain: chain as unknown as any,
        address: owner,
      })
  //console.log(data.result)
  //console.log(data.result)
  return groupByUniqueTokens(await prepareTokenResult(data?.result))
}

const prepareCollectionResult = (
  result: [name: string, tokenSymbol: string, contractAddress: string][]
) => {
  return result.map(([name, tokenSymbol, contractAddress]) => ({
    id: contractAddress,
    name,
    symbol: tokenSymbol,
    contractAddress,
  }))
}

export const fetchCollectionTokens = async (
  collectionId: string,
  chain: string
) => {
  await initMoralis()
  const data = await Moralis.Web3API.token.getAllTokenIds({
    chain: chain as unknown as any,
    address: collectionId,
  })
  //console.log(data)
  const _data = await db.asset.findMany({
    where: {
      metadataLink: {
        in: data.result.map((x) => 'ipfs://' + x.token_uri.split('/').pop()),
      },
    },
    select: { mediaType: true },
  })
  console.log(data)
  return groupByUniqueTokens(await prepareTokenResult(data.result))
}

export const fetchOwnedCollections = async (owner: string, chain?: string) => {
  await initMoralis()
  const native = Moralis.Web3API.native as extendedNativeRunContractType
  const result = await native.runContractFunction({
    chain: chain,
    address: getContractAddressFromChain(chain),
    function_name: 'ownerCollections',
    abi: collectionAbi,
    params: {
      owner,
    },
  })
  //console.log(result)
  return prepareCollectionResult(result as unknown as [])
}

export const fetchCollections = async (chain?: string) => {
  await initMoralis()
  const native = Moralis.Web3API.native as extendedNativeRunContractType
  const result = await native.runContractFunction({
    chain: chain as unknown as any,
    address: getContractAddressFromChain(chain),
    function_name: 'allCollections',
    abi: collectionAbi,
  })
  //console.log(result)
  return prepareCollectionResult(result as unknown as [])
}

