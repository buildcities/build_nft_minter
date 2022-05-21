import { render } from '@redwoodjs/testing/web'

import ImagePreviewer from './ImagePreviewer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ImagePreviewer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ImagePreviewer />)
    }).not.toThrow()
  })
})
