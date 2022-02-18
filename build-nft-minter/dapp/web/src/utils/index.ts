import { omitBy, isEmpty, isNull } from 'lodash'
import Moralis from 'moralis'
import { formInputs } from 'src/types'

const prepareMedia = (format: 'video' | 'image', type: string) => {
  const baseURL =
    process.env.ASSET_STORE_BASE_URL + process.env.ASSET_STORE_BASE_PATH
  return `${baseURL}${format}/${type}.${format == 'video' ? 'mp4' : 'gif'}`
}

const IPFS_FILENAME = 'metadata.json'

const prepareMetaData = ({ name, type, mediaFormat }: formInputs) => {
  const media =
    mediaFormat == 'video'
      ? { animation_url: prepareMedia(mediaFormat, type) }
      : { image: prepareMedia(mediaFormat, type) }
  return {
    description: `${type} NFT token`,
    name,
    ...media,
  }
}

const saveToIPFS = async (payload: formInputs) => {
  const jsonFile = new Moralis.File(IPFS_FILENAME, {
    base64: btoa(JSON.stringify(prepareMetaData(payload))),
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
  const supply = qty * 1
  const tokenUri = await (await saveToIPFS(data))._url
  const options = {
    chain,
    userAddress,
    tokenType,
    tokenUri,
    supply,
    royaltiesAmount: royaltiesAmount ? royaltiesAmount * 100 : null,
    list,
    listTokenValue,
    listTokenAmount,
    listAssetClass,
  }
  return omitBy(options, isNull)
}

export const getWeb3Client = async () => {
  const isWeb3Enabled = await Moralis.isWeb3Enabled()
  if (!isWeb3Enabled) {
    await Moralis.enableWeb3()
  }
  return Moralis.web3
}

export const mintNFT = async (data: formInputs) => {
  const options = await prepareMintArgs(data)
  //return options
  return await Moralis.Plugins.rarible.lazyMint(options)
}

/* const mintOnRarible = async (nftUrl: string, data: formInputs) => {
  const web3 = await Moralis.web3
  return await Moralis.Plugins.rarible.lazyMint({
    chain: 'rinkeby',
    userAddress: '0x7f64041298CC2C045FE5eb0e897ab7b5D4BdB4F3',
    tokenType: 'ERC1155',
    tokenUri: '/ipfs/QmWLsBu6nS4ovaHbGAXprD1qEssJu4r5taQfB74sCG51tp',
    supply: 100,
    royaltiesAmount: 5, // 0.05% royalty. Optional
    list: true, // Only if lazy listing
    listTokenAmount: 3, // Only if lazy listing
    listTokenValue: 10 ** 18, // Only if lazy listing
    listAssetClass: 'ETH', // only if lazy listing  || optional
  })
} */
