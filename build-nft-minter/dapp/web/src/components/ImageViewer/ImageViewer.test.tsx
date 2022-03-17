import { render } from '@redwoodjs/testing/web'

import ImageViewer from './ImageViewer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ImageViewer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ImageViewer src='https://cdn.pixabay.com/photo/2018/06/14/22/50/nature-3475815_1280.jpg' />)
    }).not.toThrow()
  })
})
