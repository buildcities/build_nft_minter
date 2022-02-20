import Moralis from 'moralis'
//import { Cloudinary } from "@cloudinary/url-gen";
import { formInputs } from 'src/types'
import { omitBy, isNull } from 'lodash'
import axios from 'axios'
import { navigate, routes } from '@redwoodjs/router'
// const cld = new Cloudinary({
//   cloud: {
//     cloudName: 'demo'
//   }
// });

// const prepareMedia = (format: 'video' | 'image', type: string) => {
//   const baseURL =
//     process.env.ASSET_STORE_BASE_URL + process.env.ASSET_STORE_BASE_PATH
//   return `${baseURL}${format}/${type}.${format == 'video' ? 'mp4' : 'png'}`
// }

// const IPFS_FILENAME = 'metadata.json'

// const prepareMetaData = ({ name, type, mediaFormat }: formInputs) => {
//   const media =
//     mediaFormat == 'video'
//       ? { animation_url: prepareMedia(mediaFormat, type) }
//       : { image: prepareMedia(mediaFormat, type) }
//   return {
//     description: `${type} NFT token`,
//     name,
//     external_url: prepareMedia(mediaFormat, type),
//     ...media,
//   }
// }

// const saveToIPFS = async (payload: formInputs) => {
//   const jsonFile = new Moralis.File(IPFS_FILENAME, {
//     base64: btoa(JSON.stringify(prepareMetaData(payload))),
//   })
//   const result = await jsonFile.saveIPFS()
//   return result
// }

const prepareMedia = async (format: 'video' | 'image', type: string) => {
  return (await (
    await axios(
      `${process.env.FUNCTIONS_PATH}prepareMediaLink/${format}/${type}`
    )
  ).data.url) as { url: string }
  // return format == 'video'
  //   ? cloudinary.v2.video(`${type}.mp4`, {
  //       fetch_format: 'auto',
  //       quality: 'auto',
  //     })
  //   : cloudinary.v2.image(`${type}.jpg`, {
  //       quality: 'auto',
  //       fetch_format: 'auto',
  //     })

  // const baseURL =
  //   process.env.ASSET_STORE_BASE_URL + process.env.ASSET_STORE_BASE_PATH
  // return `${baseURL}${format}/${type}.${format == 'video' ? 'mp4' : 'png'}`
}

const IPFS_FILENAME = 'metadata.json'

const prepareMetaData = async ({ name, type, mediaFormat }: formInputs) => {
  const url = await prepareMedia(mediaFormat, type)
  const media = mediaFormat == 'video' ? { animation_url: url } : { image: url }
  return {
    description: `${type} NFT token`,
    name,
    external_url: url,
    ...media,
  }
}

const saveToIPFS = async (payload: formInputs) => {
  const jsonFile = new Moralis.File(IPFS_FILENAME, {
    base64: btoa(JSON.stringify(await prepareMetaData(payload))),
  })
  const result = await jsonFile.saveIPFS()
  return result
}

const prepareMintArgs = async (data: formInputs) => {
  const { tokenType, qty, price, royaltiesAmount } = data
  const listTokenValue = price ? +Moralis.Units.ETH(price) : null
  const list = price ? true : null
  const listAssetClass = price ? 'ETH' : null
  const listTokenAmount = price ? +qty : null
  const web3 = await getWeb3Client()
  const chain = web3.network.name
  const userAddress = await web3.getSigner().getAddress()
  //const userAddress = owner
  const supply = qty * 1
  const fileItem = (await await saveToIPFS(data)) as unknown as {
    _ipfs: string
  }
  const options = {
    chain,
    userAddress,
    tokenType,
    tokenUri: fileItem._ipfs,
    supply,
    royaltiesAmount: royaltiesAmount ? royaltiesAmount * 100 : null,
    list,
    listTokenValue,
    listTokenAmount,
    listAssetClass,
  }
  return omitBy(options, isNull)
}

export const mintNFT = async (data: formInputs) => {
  const options = await prepareMintArgs(data)
  return options
  //return await Moralis.Plugins.rarible.lazyMint(options)
}

export const getWeb3Client = async () => {
  const isWeb3Enabled = await Moralis.isWeb3Enabled()
  if (!isWeb3Enabled) {
    //redirect to reauth Page
    navigate(routes.reAuth())
    //await Moralis.enableWeb3()
  }
  return Moralis.web3
}
