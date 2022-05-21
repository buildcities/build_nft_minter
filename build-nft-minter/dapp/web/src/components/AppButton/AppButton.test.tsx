import { render } from '@redwoodjs/testing/web'

import AppButton from './AppButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AppButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AppButton />)
    }).not.toThrow()
  })
})
