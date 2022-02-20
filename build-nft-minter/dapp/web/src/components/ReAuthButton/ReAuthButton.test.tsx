import { render } from '@redwoodjs/testing/web'

import ReAuthButton from './ReAuthButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ReAuthButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ReAuthButton />)
    }).not.toThrow()
  })
})
