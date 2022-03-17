import { Moralis } from 'moralis'
import { collectionFormInputs, formInputs } from 'src/types'
import { isEmpty } from 'lodash'
import { navigate, routes } from '@redwoodjs/router'
import { collectionAbi } from './abi/collection'
import { tokenAbi } from './abi/token'

//import * as contractAbi from './abi/BuildNFT.json'
// const prepareMedia = async (format: 'video' | 'image', type: string) => {
//   return (await (
//     await axios(
//       `${process.env.FUNCTIONS_PATH}prepareMediaLink?format=${format}&type=${type}`
//     )
//   ).data.url) as { url: string }
// }

export const isVideo = (src: string) => {
  return ['mov', 'mp4', 'avi', 'webm', 'mkv', 'wmv'].some((v) =>
    src.includes(v)
  )
}

const getContractAddressFromChain = (chain: string) => {
  switch (chain) {
    case '0x1':
      return process.env.MAINNET_TOKEN_CONTRACT
    default:
      return process.env.RINKEBY_TOKEN_CONTRACT
  }
}

// const normalizeChain = (network: string) => {
//   switch (network) {
//     case 'homestead':
//       return 'eth'
//     default:
//       return network
//   }
// }

// const IPFS_FILENAME = 'metadata.json'

// const prepareMetaData = async ({
//   name,
//   type,
//   description,
//   mediaFormat,
// }: formInputs) => {
//   const url = await prepareMedia(mediaFormat, type)
//   const media = mediaFormat == 'video' ? { animation_url: url } : { image: url }
//   const template = {
//     name: undefined,
//     description: undefined,
//     external_url: undefined,
//     image: undefined,
//     animation_url: undefined,
//     attributes: [],
//   }
//   return {
//     ...template,
//     description,
//     name,
//     external_url: url,
//     ...media,
//   }
// }

// const saveToIPFS = async (payload: formInputs) => {
//   const jsonFile = new Moralis.File(IPFS_FILENAME, {
//     base64: btoa(JSON.stringify(await prepareMetaData(payload))),
//   })
//   const result = await jsonFile.saveIPFS()
//   return result
// }

// const prepareMintArgs = async (data: formInputs) => {
//   const {
//     tokenType,
//     qty,
//     price,
//     royaltiesAmount,
//     isLazy: _isLazy,
//     collectionAddress,
//   } = data
//   const listTokenValue = price ? +Moralis.Units.ETH(price) : null
//   const list = price ? true : null
//   const listAssetClass = price ? 'ETH' : null
//   const listTokenAmount = price ? +qty : null
//   const web3 = getWeb3Client()
//   const chain = web3.network.name
//   const userAddress = await web3.getSigner().getAddress()
//   //const userAddress = owner
//   const metaData = await prepareMetaData(data)
//   const supply = qty * 1
//   // const fileItem = (await await saveToIPFS(data)) as unknown as {
//   //   _ipfs: string
//   // }
//   const fileItem = (await pinJSONToIPFS(metaData)) as { IpfsHash: string }

//   const isLazy = JSON.parse(_isLazy)

//   //console.log(metaData)
//   const options = {
//     chain,
//     userAddress,
//     tokenType,
//     tokenUri: `ipfs://${fileItem.IpfsHash}`,
//     metaData,
//     supply,
//     royaltiesAmount: royaltiesAmount ? royaltiesAmount * 100 : null,
//     list,
//     collectionAddress,
//     listTokenValue,
//     listTokenAmount,
//     listAssetClass,
//     isLazy,
//   }
//   //console.log(omitBy(options, isNull))
//   return omitBy(options, isNull)
// }

export const createCollection = async (data: collectionFormInputs) => {
  console.log(data)
  getWeb3Client()
  const transaction = (await Moralis.executeFunction({
    contractAddress: getContractAddressFromChain(Moralis.chainId),
    functionName: 'createToken',
    abi: collectionAbi,
    params: {
      ...data,
    },
  })) as unknown as { wait: () => Promise<unknown> }
  const reciept = await transaction.wait()
  return reciept
}

const mintCustom = async (data: formInputs) => {
  const {
    collection: contractAddress,
    asset: tokenURI,
    qty: mintAmount,
    royaltiesAmount,
    tokenType,
  } = data
  const royalties = []
  // royaltiesAmount
  //   ? [[{ value: royaltiesAmount * 100, account: Moralis.account }]]
  //   : []
  if (tokenType == 'ERC721') {
    const transaction = (await Moralis.executeFunction({
      contractAddress: contractAddress,
      functionName: 'mintBatch',
      abi: tokenAbi,
      params: {
        _data: { tokenURI, mintAmount, royalties },
      },
    })) as unknown as { wait: () => Promise<unknown> }
    const reciept = await transaction.wait()
    return reciept
  }
}

export const mintNFT = async (data: formInputs) => {
  console.log(data)
  getWeb3Client()
  if (!isEmpty(data.collection)) {
    return await mintCustom(data)
  }
  // getWeb3Client()
  // const metaData = await prepareMetaData(data)
  // const tokenURI = (await pinJSONToIPFS(metaData)) as { IpfsHash: string }
  // const transaction = await Moralis.executeFunction({
  //   contractAddress,
  //   functionName: 'mint',
  //   abi: tokenAbi,
  //   params: {
  //     minter: Moralis.account,
  //     tokenURI: `ipfs://${tokenURI.IpfsHash}`,
  //   },
  // })
  //const
  //const receipt = await transaction?.wait()
  //console.log(transaction.hash)
  // const result = await prepareMedia(data.mediaFormat, data.type)
  // return result
  //const options = await prepareMintArgs(data)
  //return options
  //return await Moralis.Plugins.rarible.lazyMint(options)
  //return await mint(options as any)
}

export const getWeb3Client = () => {
  const isWeb3Enabled = Moralis.isWeb3Enabled()
  //console.log(isWeb3Enabled)
  if (!isWeb3Enabled) {
    navigate(routes.reAuth())
  }
  return Moralis.web3
}

export const getActiveChain = (chainId: string) => {
  console.log(chainId)
  switch (chainId) {
    case '0x1':
      return 'homestead'
    case '0x4':
      return 'rinkeby'
    case '0x539':
      return 'hardhat'
    default:
      window.alert('Supported chains are rinkeby and mainnet!')
  }
}
