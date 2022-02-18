import type { AssetsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import CardItem from '../CardItem/CardItem'
import { Flex } from '@chakra-ui/react'

export const QUERY = gql`
  query AssetsQuery($type: TYPE!) {
    assets(type: $type) {
      id
      type
      category
      source
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ assets }: CellSuccessProps<AssetsQuery>) => {
  return (
    <Flex  align="center"
    justify="center" gap={8}>
      {assets.map((item) => {
        return (
          <CardItem
            subTitle={item.type}
            title={item.category}
            key={item.id}
            src={item.source}
            isVideo={item.type=='video'}
            videoProps={item.type=='video'?{controls:true}:null}
          />
        )
      })}
    </Flex>
  )
}
