import { render } from '@redwoodjs/testing/web'

import TraitLayerItem from './TraitLayerItem'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TraitLayerItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TraitLayerItem />)
    }).not.toThrow()
  })
})
