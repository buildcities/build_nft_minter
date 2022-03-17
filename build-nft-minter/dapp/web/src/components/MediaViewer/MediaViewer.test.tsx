import { render } from '@redwoodjs/testing/web'

import MediaViewer from './MediaViewer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MediaViewer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MediaViewer width={250} height={300} src='https://cdn.pixabay.com/photo/2018/06/14/22/50/nature-3475815_1280.jpg' />)
    }).not.toThrow()
  })
})
