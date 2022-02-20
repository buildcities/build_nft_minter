import type { TokensQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { Button, Center, Flex, LinkOverlay } from '@chakra-ui/react'
import CardItem from '../CardItem/CardItem'
import { isEmpty } from 'lodash'


export const QUERY = gql`
  query TokensQuery($owner:String!,$chain:String) {
    tokens (owner:$owner,chain:$chain){
      id
      name
      description
      assetLink
      mediaLink
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success: React.FC<CellSuccessProps<TokensQuery>> = ({ tokens, children }) => {
  return (
    <Flex
      align={'center'}
      mx={10}
      flexWrap='wrap'
      gap={8}>
      {children}
      {tokens.filter(x => !isEmpty(x.mediaLink)).map((item,index) => {
        const isVideo = item?.mediaLink?.includes('.mp4')
        return (
          <CardItem
            subTitle={item?.description || 'UnNamed Token'}
            title={item.name || 'Untitled'}
            key={`${item.id}${index}`}
            src={item.mediaLink || ''}
            externalUrl={item.assetLink}
            isVideo={isVideo}
            videoProps={isVideo ? { controls: true } : null}
          />

        )
      })}
    </Flex>

  )
}
