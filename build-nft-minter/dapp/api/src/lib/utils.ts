import Moralis from 'moralis/node'
import axios from 'axios'

export const initMoralis = async () => {
  return await Moralis.start({
    serverUrl: process.env.MORALIS_SERVER_URL,
    appId: process.env.MORALIS_API_ID,
    masterKey: process.env.MORALIS_MASTER_KEY,
  })
}

const prepareRaribleUrl = async (apiPath: string, chain: string) => {
  // const web3 = await getWeb3Client()
  // const chain = web3.network.name
  switch (chain) {
    case 'homestead':
      return `${process.env.RAR_PRODUCTION}${apiPath}`
    default:
      return `${process.env.RAR_STAGING}${apiPath}`
  }
}

const prepareAssetLink = async (id: string, chain: string) => {
  // const web3 = await getWeb3Client()
  // const chain = web3.network.name
  switch (chain) {
    case 'homestead':
      return `https://rarible.com/token/${id}`
    default:
      return `https://rinkeby.rarible.com/token/${id}`
  }
}

export const fetchOwnedTokens = async (
  owner: string,
  chain?: string,
  opts: { size?: number; continuation?: string } = {}
) => {
  const { continuation, size = 100 } = opts
  const url = await prepareRaribleUrl('byOwner', chain)
  try {
    const result = await axios.get(url, {
      params: { owner: `${owner}`, continuation },
    })
    const { data } = result

    // Paginate results
    let hist = []
    if (data.continuation && data.items.length === size) {
      hist = await fetchOwnedTokens(owner, chain, {
        ...opts,
        continuation: data.continuation,
      })
    }
    // Return full history
    return await Promise.all(
      [...data.items, ...hist].map(async (data) => {
        const metaData = await fetchTokenMetadata(data.id, chain)
        const assetLink = await prepareAssetLink(data.id, chain)
        const mediaLink =
          metaData?.animation?.url?.ORIGINAL || metaData?.image?.url?.ORIGINAL
        return { id: data.tokenId, ...metaData, assetLink, mediaLink }
      })
    )
  } catch (err) {
    console.error(err)
    return []
  }
}

const fetchTokenMetadata = async (id: string, chain: string) => {
  const url = await prepareRaribleUrl(`${id}/meta`, chain)
  const { data } = await axios.get(url)
  if (!data?.name) {
    throw new Error('Invalid NFT data')
  }
  return data
}

