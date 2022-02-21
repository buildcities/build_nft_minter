import { Loading, Empty, Failure, Success } from './TokensCell'
import { standard } from './TokensCell.mock'

export const loading = () => {
  return Loading ? <Loading /> : null
}

export const empty = () => {
  return Empty ? (
    <Empty
      onOpen={function (): void {
        throw new Error('Function not implemented.')
      }}
    />
  ) : null
}

export const failure = () => {
  return Failure ? <Failure error={new Error('Oh no')} /> : null
}

export const success = () => {
  return Success ? <Success {...standard()} /> : null
}

export default { title: 'Cells/TokensCell' }
