import type { CollectTokensQuery, Token } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import {
  Box,
  Center,
  Flex,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import CardItem from '../CardItem/CardItem'
import { isEmpty } from 'lodash'
import CardItemButton from '../CardItemButton/CardItemButton'
import { GET_COLLECTIONS_TOKEN_QUERY } from 'src/utils/queries/tokens'
import SideDrawer from '../SideDrawer/SideDrawer'
import TokenDetail from '../TokenDetail/TokenDetail'
import { useStore } from 'src/utils/stores/token'

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
  const { setToken, selectedToken } = useStore((s) => s)
  const { onOpen, onClose, ...props } = useDisclosure()
  const _onOpen = (payload: any) => () => {
    //console.log(payload)
    setToken(JSON.stringify(payload))
    //console.log(selectedToken)
    onOpen && onOpen()
  }
  const getTokenMeta = (selectedToken: string) => {
    const data = JSON.parse(selectedToken) as Token
    return data
  }

  return (
    <Flex align={'center'} mx={10} flexWrap="wrap" gap={8}>
      {children}
      {collectionTokens
        .filter((x) => !isEmpty(x?.mediaLink))
        .map((item, index) => {
          const isVideo = item?.mediaLink?.includes('.mp4')
          const description =`${item?.description} (${item.amount})`
          return (
            <CardItem
              subTitle={description}
              title={item.name || 'Untitled'}
              key={`${item.id}${index}`}
              src={item.mediaLink || ''}
              onClick={_onOpen(item)}
              isVideo={isVideo}
              videoProps={isVideo ? { controls: true } : null}
            />
          )
        })}
      <SideDrawer
        header={getTokenMeta(selectedToken)?.name}
        onClose={onClose}
        {...props}
      >
        <TokenDetail {...getTokenMeta(selectedToken)} />
      </SideDrawer>
    </Flex>
  )
}
