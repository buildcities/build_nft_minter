import { NavItem } from '../../types'
import {routes} from '@redwoodjs/router'
export const NAV_ITEMS:()=> Array<NavItem> = ()=>[
  {
    label: 'Minter',
    href: routes.minter()
  },
  {
    label: 'Media',
    href: routes.media()
  },
  {
    label: 'Assets',
    href: routes.assets()
  }
]
