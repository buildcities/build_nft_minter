import { render } from '@redwoodjs/testing/web'

import DesktopNav from './DesktopNav'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DesktopNav', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DesktopNav />)
    }).not.toThrow()
  })
})
