import { render } from '@redwoodjs/testing/web'

import SubmitFormButton from './SubmitFormButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SubmitFormButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SubmitFormButton />)
    }).not.toThrow()
  })
})
