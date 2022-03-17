import type { Prisma } from '@prisma/client'
import { omit, pick } from 'lodash'
import Moralis from 'moralis/node'
import { db } from 'src/lib/db'
import { initMoralis } from 'src/lib/utils'

type AssetCreateInputType = {
  name: string
  description?: string
  asset: string
  attributes?: { value?: string; trait_type?: string; key?: string }[]
  walletAddress: string
  isDynamic: boolean
  mediaType: string
}

type AssetUpdateInput = {
  mediaType: string
}

const isVideo = (src: string) => {
  return ['.mov', '.mp4', '.avi', '.webm', '.mkv', 'wmv'].some((v) =>
    src.includes(v)
  )
}

const prepareMetaData = (payload: AssetCreateInputType) => {
  const animation_url = isVideo(payload.asset) ? payload.asset : undefined
  const image = !isVideo(payload.asset) ? payload.asset : undefined
  payload.attributes = [
    ...payload.attributes,
    ...[
      {
        trait_type: 'Adaptability',
        key: 'is Dynamic',
        value: `${payload.isDynamic}`,
      },
    ],
  ]
  return omit({ ...payload, animation_url, image }, [
    'asset',
    'walletAddress',
    'isDynamic',
  ])
}

export const assets = ({ walletAddress }) => {
  const where = walletAddress ? { walletAddress } : {}
  return db.asset.findMany({ where })
}

interface CreateAssetArgs {
  input: AssetCreateInputType
}

export const createAsset = async ({ input }: CreateAssetArgs) => {
  await initMoralis()
  const body = prepareMetaData(input)
  //throw Error ('something went wrong!')
  const link = await Moralis.Plugins.pinata.pinJson({ body })
  const metadataLink = `ipfs://${link.IpfsHash}`
  const assetLink = input.asset
  const data = {
    ...pick(input, ['name', 'walletAddress', 'isDynamic', 'mediaType']),
    metadataLink,
    assetLink,
  }
  return db.asset.create({
    data,
  })
}

interface UpdateAssetArgs extends Prisma.AssetWhereUniqueInput {
  input: AssetUpdateInput
}

export const updateAsset = ({ id, input }: UpdateAssetArgs) => {
  return db.asset.update({
    data: input,
    where: { id },
  })
}
