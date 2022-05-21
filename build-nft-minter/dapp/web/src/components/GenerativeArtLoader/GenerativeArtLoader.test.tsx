import { render } from '@redwoodjs/testing/web'

import GenerativeArtLoader from './GenerativeArtLoader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GenerativeArtLoader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GenerativeArtLoader />)
    }).not.toThrow()
  })
})
