import { render } from '@redwoodjs/testing/web'

import Web3Provider from './Web3Provider'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Web3Provider', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Web3Provider />)
    }).not.toThrow()
  })
})
