import { render } from '@redwoodjs/testing/web'

import CardItem from './CardItem'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CardItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CardItem />)
    }).not.toThrow()
  })
})
