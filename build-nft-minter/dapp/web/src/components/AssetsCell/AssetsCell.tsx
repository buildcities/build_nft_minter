import type { AssetsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import CardItem from '../CardItem/CardItem'
import {
  Box,
  Button,
  Center,
  Flex,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import CardItemButton from '../CardItemButton/CardItemButton'
import { isVideo } from 'src/utils'
import { GET_ASSETS_QUERY } from 'src/utils/queries/assets'
import { EditIcon } from '@chakra-ui/icons'
import SideDrawer from '../SideDrawer/SideDrawer'
import { useStore } from 'src/utils/stores/asset-form'
import AssetDetail from '../AssetDetail/AssetDetail'

const HEADER = 'Asset Detail'

export const QUERY = GET_ASSETS_QUERY

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
  const { setAsset } = useStore((s) => s)
  const { onOpen, onClose, ...props } = useDisclosure()
  const _onOpen = (payload: any) => () => {
    console.log(payload)
    setAsset(JSON.stringify(payload))
    onOpen && onOpen()
  }
  return (
    <Flex flexWrap={'wrap'} px="10" justify="start" gap={8}>
      {children}
      {assets.map((item) => {
        return (
          <CardItem
            title={item.name}
            key={item.id}
            src={item.assetLink}
            isVideo={isVideo(item?.mediaType)}
            videoProps={isVideo(item?.mediaType) ? { controls: true } : null}
            externalUrl={item.assetLink}
          >
            <Button
              size={'xs'}
              onClick={_onOpen(item)}
              colorScheme={item.isDynamic ? 'green' : 'red'}
              bg={item.isDynamic ? 'green.400' : 'red.400'}
              rounded={'full'}
              _hover={{
                bg: item.isDynamic ? 'green.300' : 'red.300',
              }}
              leftIcon={<EditIcon />}
            >
              {item.isDynamic ? 'Dynamic' : 'Fixed'}
            </Button>
          </CardItem>
        )
      })}
      <SideDrawer header={HEADER} onClose={onClose} {...props}>
        <AssetDetail onClose={onClose} />
      </SideDrawer>
    </Flex>
  )
}
