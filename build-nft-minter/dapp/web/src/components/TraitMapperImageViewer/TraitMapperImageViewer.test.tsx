import { render } from '@redwoodjs/testing/web'

import TraitMapperImageViewer from './TraitMapperImageViewer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TraitMapperImageViewer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TraitMapperImageViewer />)
    }).not.toThrow()
  })
})
