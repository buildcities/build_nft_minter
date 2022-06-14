import { render } from '@redwoodjs/testing/web'

import ModalView from './ModalView'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ModalView', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ModalView />)
    }).not.toThrow()
  })
})
