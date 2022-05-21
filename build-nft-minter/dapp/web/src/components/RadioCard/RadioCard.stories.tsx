import RadioCard, { RadioCardOptionProps } from './RadioCard'
import { ImImages, ImMagicWand } from 'react-icons/im'
const options: RadioCardOptionProps[] = [
  { icon: ImMagicWand, label: 'Generative art', value: 'generative' },
  { icon: ImImages, label: 'Single art', value: 'single' },
]

export const generated = () => {
  return <RadioCard options={options} name="test radio card" />
}

export default { title: 'Components/RadioCard' }
