import { ImImage, ImMagicWand } from 'react-icons/im'
import { FiUploadCloud, FiSettings, FiDatabase, FiTrash } from 'react-icons/fi'

export const GENERATIVE_STATUS_STEPS = [
  { label: 'Uploading Assets', icon: FiUploadCloud },
  { label: 'Setting up configuration',icon: FiSettings },
  { label: 'Generating and storing images',icon: FiDatabase },
  { label: 'cleaning up', icon:FiTrash },
]

export const TOPIC = 'UPLOAD-FILES'

export const RADIO_OPTIONS = [
  { icon: ImMagicWand, label: 'Generative art', value: 'generative' },
  { icon: ImImage, label: 'Single art', value: 'single' },
]
export const STORAGE_OPTIONS = [
  {
    label: 'IPFS',
    value: 'ipfs',
    description: 'learn more',
    url: 'https://ipfs.io/',
  },
  {
    label: 'Arweave',
    value: 'arweave',
    description: 'learn more',
    url: 'https://www.arweave.org/',
  },
  {
    label: 'Filecoin',
    value: 'filecoin',
    description: 'learn more',
    url: 'https://filecoin.io/',
    hasComingSoon: true,
    disabled: true,
  },
]
