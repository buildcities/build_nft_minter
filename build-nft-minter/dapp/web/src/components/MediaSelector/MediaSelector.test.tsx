import { render } from '@redwoodjs/testing/web'

import MediaSelector from './MediaSelector'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MediaSelector', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MediaSelector name="nice-name" />)
    }).not.toThrow()
  })
})
