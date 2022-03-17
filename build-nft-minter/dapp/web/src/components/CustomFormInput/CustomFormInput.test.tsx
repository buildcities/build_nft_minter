import { render } from '@redwoodjs/testing/web'

import CustomFormInput from './CustomFormInput'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomFormInput', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CustomFormInput />)
    }).not.toThrow()
  })
})
