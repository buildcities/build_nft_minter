import { render } from '@redwoodjs/testing/web'

import NumberSlider from './NumberSlider'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NumberSlider', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NumberSlider />)
    }).not.toThrow()
  })
})
