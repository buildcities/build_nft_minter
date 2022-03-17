import { render } from '@redwoodjs/testing/web'

import TokensPage from './TokensPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TokensPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TokensPage contractAddress={'dummy-contract-address'} />)
    }).not.toThrow()
  })
})
