export interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}

export interface NavProps {
  navItems?: NavItem[]
}

export type formInputs = {
  qty?: number
  name?: string
  description?: string
  type?: string
  tokenType?: string
  showPrice?: boolean
  price?: number
  royaltiesAmount?: number
  mediaFormat?: 'video' | 'image'
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
