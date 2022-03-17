import { render } from '@redwoodjs/testing/web'

import IpfsMediaSelector from './IpfsMediaSelector'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('IpfsMediaSelector', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<IpfsMediaSelector />)
    }).not.toThrow()
  })
})
