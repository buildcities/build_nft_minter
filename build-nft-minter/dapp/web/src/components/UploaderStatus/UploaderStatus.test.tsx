import { render } from '@redwoodjs/testing/web'

import UploaderStatus from './UploaderStatus'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UploaderStatus', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UploaderStatus />)
    }).not.toThrow()
  })
})
