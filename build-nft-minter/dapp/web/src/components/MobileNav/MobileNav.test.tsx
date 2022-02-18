import { render } from '@redwoodjs/testing/web'

import MobileNav from './MobileNav'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MobileNav', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MobileNav />)
    }).not.toThrow()
  })
})
