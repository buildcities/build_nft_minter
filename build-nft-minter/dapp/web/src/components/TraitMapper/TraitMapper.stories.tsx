import { Form } from '@redwoodjs/forms'
import TraitMapper from './TraitMapper'

export const generated = () => {
  return (
    <Form>
      <TraitMapper name="traitMapper" />
    </Form>
  )
}

export default { title: 'Components/TraitMapper' }
