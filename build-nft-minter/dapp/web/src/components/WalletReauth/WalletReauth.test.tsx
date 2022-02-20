import { render } from '@redwoodjs/testing/web'

import WalletReauth from './WalletReauth'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('WalletReauth', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WalletReauth />)
    }).not.toThrow()
  })
})
