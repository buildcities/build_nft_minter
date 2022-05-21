import { Form } from '@redwoodjs/forms'
import NumberSlider from './NumberSlider'

export const generated = () => {
  return (
    <Form>
      <NumberSlider name='numberSlider' />
    </Form>
  )
}

export default { title: 'Components/NumberSlider' }
