import {
  Box,
  Button,
  HStack,
  VStack,
  useColorModeValue,
  Link,
  Divider,
} from '@chakra-ui/react'
import MediaViewer from 'src/components/MediaViewer/MediaViewer'
import { isVideo, marketPlaceByChain } from 'src/utils'
import { OpenSeaIcon } from 'src/utils/svgs/opensea-logo'
import { RaribleIcon } from 'src/utils/svgs/rarible-logo'
import { ImEmbed } from 'react-icons/im'
import { useStore } from 'src/utils/stores/ui'
import { Token } from 'types/graphql'
import TokenDetailInfo from '../TokenDetailInfo/TokenDetailInfo'
interface TokenDetailType extends Token {}

const TokenDetail = (props: TokenDetailType) => {
  console.log(props)
  const { chain, account } = useStore((s) => s)
  return (
    <Box
      bg={useColorModeValue('white', 'gray.700')}
      borderRadius="lg"
      w="full"
      p={10}
      color={useColorModeValue('gray.700', 'whiteAlpha.900')}
      shadow="base"
    >
      <VStack spacing={4}>
        <MediaViewer
          isVideo={isVideo(props.mediaLink)}
          height={320}
          width={300}
          src={props.mediaLink}
        />
        <Divider colorScheme={'gray'} />
        <HStack spacing={2}>
          <Button
            isExternal
            textDecoration={'none'}
            as={Link}
            rounded={'full'}
            colorScheme={'green'}
            href={marketPlaceByChain(
              chain,
              'rarible',
              props.contractAddress,
              props.tokenId
            )}
            leftIcon={<RaribleIcon />}
          >
            Rarible
          </Button>
          <Button
            isExternal
            ernal
            as={Link}
            href={marketPlaceByChain(
              chain,
              'opensea',
              props.contractAddress,
              props.tokenId
            )}
            rounded={'full'}
            colorScheme={'green'}
            leftIcon={<OpenSeaIcon w={6} h={6} />}
          >
            OpenSea
          </Button>
          <Button
            isDisabled
            as={Link}
            rounded={'full'}
            colorScheme={'green'}
            leftIcon={<ImEmbed />}
          >
            Embed
          </Button>
        </HStack>
        <TokenDetailInfo {...props} />
      </VStack>
    </Box>
  )
}

export default TokenDetail
