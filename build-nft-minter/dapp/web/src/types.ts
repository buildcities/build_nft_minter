export interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}

export interface NavProps {
  navItems?: NavItem[]
}

export type collectionFormInputs = {
  _name?: string
  _symbol?: string
  _maxSupply?: number
}

export type formInputs = {
  qty?: number
  asset?: string
  collection?: string
  isLazy?: boolean
  tokenType?: string
  price?: number
  royaltiesAmount?: number
}

export type assetFormInputs = {
  type?: string
  videoLength?: number
  mediaFormat?: 'video' | 'image'
}

export type Web3ProviderContextType = {
  chain?: string
  account?: string
}

type AssetFormInput = {
  assetType?: 'generative' | 'single' | 'multiple'
  description?: string
  name: string
  storageType: 'ipfs' | 'arweave'
}

export interface IGenerativeInputType extends AssetFormInput {
  isUnique: boolean
  size: number
  layers: {
    id: string
    traits: { file: File; id: string; rarity: number; trait: string }[]
  }[]
}
