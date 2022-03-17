import { render } from '@redwoodjs/testing/web'

import AttributesWidget from './AttributesWidget'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AttributesWidget', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AttributesWidget />)
    }).not.toThrow()
  })
})
