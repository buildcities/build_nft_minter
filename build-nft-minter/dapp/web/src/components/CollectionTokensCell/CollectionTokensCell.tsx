import type { CollectTokensQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { Box, Center, Flex, Spinner, Text } from '@chakra-ui/react'
import CardItem from '../CardItem/CardItem'
import { isEmpty } from 'lodash'
import CardItemButton from '../CardItemButton/CardItemButton'
import { GET_COLLECTIONS_TOKEN_QUERY } from 'src/utils/queries/tokens'

export const QUERY = GET_COLLECTIONS_TOKEN_QUERY

export const Loading = () => (
  <Box>
    <Center>
      <Spinner size={'xl'} />
    </Center>
  </Box>
)

export const Empty: React.FC<{ onOpen?: () => void }> = ({ onOpen }) => {
  return (
    <Box>
      <Center>
        <CardItemButton onClick={onOpen} subTitle="Add" title="New Token" />
      </Center>
    </Box>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <Box>
    <Center>
      <Text color={'red.400'}>Error: {error.message}</Text>
    </Center>
  </Box>
)
interface SuccessProps extends CellSuccessProps<CollectTokensQuery> {
  onOpen?: () => void
}

export const Success: React.FC<SuccessProps> = ({
  collectionTokens,
  children,
}) => {
  return (
    <Flex align={'center'} mx={10} flexWrap="wrap" gap={8}>
      {children}
      {collectionTokens
        .filter((x) => !isEmpty(x?.mediaLink))
        .map((item, index) => {
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
