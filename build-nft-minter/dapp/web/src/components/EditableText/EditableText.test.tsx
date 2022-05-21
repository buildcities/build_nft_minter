import { render } from '@redwoodjs/testing/web'

import EditableText from './EditableText'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EditableText', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditableText />)
    }).not.toThrow()
  })
})
