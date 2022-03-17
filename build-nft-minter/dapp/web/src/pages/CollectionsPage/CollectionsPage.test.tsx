import { render } from '@redwoodjs/testing/web'

import CollectionsPage from './CollectionsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CollectionsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CollectionsPage />)
    }).not.toThrow()
  })
})
