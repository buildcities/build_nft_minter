import { render } from '@redwoodjs/testing/web'

import AssetForm from './AssetForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AssetForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AssetForm />)
    }).not.toThrow()
  })
})
