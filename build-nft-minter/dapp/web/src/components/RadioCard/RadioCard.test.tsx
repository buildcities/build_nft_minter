import { render } from '@redwoodjs/testing/web'

import RadioCard from './RadioCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RadioCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RadioCard name="test name" />)
    }).not.toThrow()
  })
})
