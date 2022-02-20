import { render } from '@redwoodjs/testing/web'

import SideDrawer from './SideDrawer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SideDrawer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SideDrawer />)
    }).not.toThrow()
  })
})
