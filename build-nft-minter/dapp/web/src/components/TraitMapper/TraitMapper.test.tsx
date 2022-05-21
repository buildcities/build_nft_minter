import { render } from '@redwoodjs/testing/web'

import TraitMapper from './TraitMapper'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TraitMapper', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TraitMapper />)
    }).not.toThrow()
  })
})
