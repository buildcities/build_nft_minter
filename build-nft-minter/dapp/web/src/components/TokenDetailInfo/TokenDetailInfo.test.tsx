import { render } from '@redwoodjs/testing/web'

import TokenDetailInfo from './TokenDetailInfo'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TokenDetailInfo', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TokenDetailInfo />)
    }).not.toThrow()
  })
})
