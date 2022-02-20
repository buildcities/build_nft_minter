import { render } from '@redwoodjs/testing/web'

import ReAuthPage from './ReAuthPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ReAuthPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ReAuthPage />)
    }).not.toThrow()
  })
})
