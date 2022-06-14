import { render } from '@redwoodjs/testing/web'

import AssetsUploadTracker from './AssetsUploadTracker'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AssetsUploadTracker', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AssetsUploadTracker />)
    }).not.toThrow()
  })
})
