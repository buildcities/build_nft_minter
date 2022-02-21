import { Moralis } from 'moralis'
import { formInputs } from 'src/types'
import { omitBy, isNull } from 'lodash'
import axios from 'axios'
import { navigate, routes } from '@redwoodjs/router'

const prepareMedia = async (format: 'video' | 'image', type: string) => {
  return (await (
    await axios(
      `${process.env.FUNCTIONS_PATH}prepareMediaLink?format=${format}&type=${type}`
    )
  ).data.url) as { url: string }
}

const normalizeChain = (network: string) => {
  switch (network) {
    case 'homestead':
      return 'eth'
    default:
      return network
  }
}

const IPFS_FILENAME = 'metadata.json'

const prepareMetaData = async ({
  name,
  type,
  description,
  mediaFormat,
}: formInputs) => {
  const url = await prepareMedia(mediaFormat, type)
  const media = mediaFormat == 'video' ? { animation_url: url } : { image: url }
  return {
    description,
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
  const web3 = getWeb3Client()
  const chain = normalizeChain(web3.network.name)
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
  // const result = await prepareMedia(data.mediaFormat, data.type)
  // return result
  const options = await prepareMintArgs(data)
  //return options
  return await Moralis.Plugins.rarible.lazyMint(options)
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
  switch (chainId) {
    case '0x1':
      return 'homestead'
    case '0x4':
      return 'rinkeby'
    default:
      window.alert('Supported chains are rinkeby and mainnet!')
  }
}
