import type { AssetsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import CardItem from '../CardItem/CardItem'
import { Box, Center, Flex, Spinner, Text } from '@chakra-ui/react'
import CardItemButton from '../CardItemButton/CardItemButton'

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

export const Loading = () => (
  <Box>
    <Center>
      <Spinner size={'xl'} />
    </Center>
  </Box>
)

export const Empty: React.FC<{ onOpen: () => void }> = ({ onOpen }) => (
  <Box>
    <Center>
      <CardItemButton onClick={onOpen} subTitle="Add" title="New Asset" />
    </Center>
  </Box>
)

export const Failure = ({ error }: CellFailureProps) => (
  <Box>
    <Center>
      <Text color={'red.400'}>Error: {error.message}</Text>
    </Center>
  </Box>
)

export const Success: React.FC<CellSuccessProps<AssetsQuery>> = ({
  assets,
  children,
}) => {
  return (
    <Flex align="center" justify="center" gap={8}>
      {children}
      {assets.map((item) => {
        return (
          <CardItem
            subTitle={item.type}
            title={item.category}
            key={item.id}
            src={item.source}
            isVideo={item.type == 'video'}
            videoProps={item.type == 'video' ? { controls: true } : null}
            externalUrl={item.source}
          />
        )
      })}
    </Flex>
  )
}
