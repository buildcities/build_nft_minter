import { render } from '@redwoodjs/testing/web'

import MinterForm from './MinterForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MinterForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MinterForm />)
    }).not.toThrow()
  })
})
