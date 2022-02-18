import { render } from '@redwoodjs/testing/web'

import MinterPage from './MinterPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MinterPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MinterPage />)
    }).not.toThrow()
  })
})
