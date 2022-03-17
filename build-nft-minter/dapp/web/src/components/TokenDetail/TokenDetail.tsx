import {
  Box,
  Button,
  HStack,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import MediaViewer from 'src/components/MediaViewer/MediaViewer'
import { isVideo } from 'src/utils'
import { OpenSeaIcon } from 'src/utils/svgs/opensea-logo'
import { RaribleIcon } from 'src/utils/svgs/rarible-logo'
import { ImEmbed } from 'react-icons/im'
type TokenDetailType = {
  src: string
}

const TokenDetail = ({ src }: TokenDetailType) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.700')}
      borderRadius="lg"
      w="full"
      p={10}
      color={useColorModeValue('gray.700', 'whiteAlpha.900')}
      shadow="base"
    >
      <VStack>
        <MediaViewer
          isVideo={isVideo(src)}
          height={320}
          width={300}
          src={src}
        />
        <HStack>
          <Button
            rounded={'full'}
            colorScheme={'green'}
            leftIcon={<RaribleIcon width={7} height={7} />}
          >
            Rarible
          </Button>
          <Button
            rounded={'full'}
            colorScheme={'green'}
            leftIcon={<OpenSeaIcon width={7} height={7} />}
          >
            OpenSea
          </Button>
          <Button
            rounded={'full'}
            colorScheme={'green'}
            leftIcon={<ImEmbed width={7} height={7} />}
          >
            Embed
          </Button>
        </HStack>
      </VStack>
    </Box>
  )
}

export default TokenDetail
