import type { CollectionsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import {
  Avatar,
  Box,
  Center,
  Flex,
  LinkOverlay,
  Spinner,
  Text,
} from '@chakra-ui/react'
import CardItemButton from '../CardItemButton/CardItemButton'
import CardItem from '../CardItem/CardItem'
import { GET_COLLECTIONS_QUERY } from 'src/utils/queries/collections'
import { navigate, routes } from '@redwoodjs/router'

export const QUERY = GET_COLLECTIONS_QUERY

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
        <CardItemButton
          onClick={onOpen}
          subTitle="Add"
          title="New collection"
        />
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
interface SuccessProps extends CellSuccessProps<CollectionsQuery> {
  onOpen?: () => void
}

export const Success: React.FC<CellSuccessProps<CollectionsQuery>> = ({
  collections,
  children,
}) => {
  const onClick = (contractAddress: string) => () => {
    navigate(routes.tokens({ contractAddress }))
  }
  return (
    <Flex align={'center'} mx={10} flexWrap="wrap" gap={8}>
      {children}
      {collections.map((item, index) => {
        return (
          <CardItem
            subTitle={item?.symbol || 'UnNamed Token'}
            title={item.name || 'Untitled'}
            key={`${item.id}`}
          >
            <Center>
              <LinkOverlay href="#" onClickCapture={onClick(item.id)}>
                <Avatar name={item.name} size="xl" />
              </LinkOverlay>
            </Center>
          </CardItem>
        )
      })}
    </Flex>
  )
}
