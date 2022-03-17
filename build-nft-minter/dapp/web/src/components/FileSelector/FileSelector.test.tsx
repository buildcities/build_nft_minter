import { render } from '@redwoodjs/testing/web'

import FileSelector from './FileSelector'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FileSelector', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FileSelector />)
    }).not.toThrow()
  })
})
