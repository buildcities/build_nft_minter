import { render } from '@redwoodjs/testing/web'

import CardItemButton from './CardItemButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CardItemButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CardItemButton />)
    }).not.toThrow()
  })
})
