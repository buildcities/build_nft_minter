import { render } from '@redwoodjs/testing/web'

import AssetDetail from './AssetDetail'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AssetDetail', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AssetDetail onClose={undefined} />)
    }).not.toThrow()
  })
})
