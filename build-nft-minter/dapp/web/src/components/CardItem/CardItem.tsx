import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  LinkOverlay,
  LinkBox,
} from '@chakra-ui/react'
import { ReactPlayerProps } from 'react-player'
import Video from '../Video/Video'

export type CardItemProps = {
  title?: string
  subTitle?: string
  src?: string
  isVideo?: boolean
  children?: React.ReactNode
  videoProps?: ReactPlayerProps
  externalUrl?: string
}

const ImageViewer = ({ src }: { src: string }) => {
  return (
    // <Box
    //   rounded={'lg'}
    //   mt={-12}
    //   pos={'relative'}
    //   height={'230px'}
    //   _after={{
    //     transition: 'all .3s ease',
    //     content: '""',
    //     w: 'full',
    //     h: 'full',
    //     pos: 'absolute',
    //     top: 5,
    //     left: 0,
    //     backgroundImage: `url(${src})`,
    //     filter: 'blur(15px)',
    //     zIndex: -1,
    //   }}
    //   _groupHover={{
    //     _after: {
    //       filter: 'blur(20px)',
    //     },
    //   }}
    // >
    <Box w="full">
      <Image
        rounded={'lg'}
        height={'230px'}
        width={'282px'}
        objectFit={'cover'}
        src={src}
      />
    </Box>

    // </Box>
  )
}

export default function CardItem({
  title,
  subTitle,
  children,
  isVideo,
  videoProps,
  src,
  externalUrl,
}: CardItemProps) {
  return (
    <LinkBox>
      <Center py={0}>
        <Box
          role={'group'}
          p={6}
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          // pos={'relative'}
          // zIndex={1}
        >
          <LinkOverlay isExternal href={externalUrl}>
            {isVideo ? (
              <Video
                url={src}
                height={230}
                width={282}
                src={src}
                {...videoProps}
              />
            ) : (
              src && <ImageViewer src={src} />
            )}
          </LinkOverlay>
          {children}
          <Stack pt={10} justify="center" w="full" align={'center'}>
            <Text
              color={'gray.500'}
              maxW={200}
              isTruncated
              textAlign="center"
              fontSize={'sm'}
              textTransform={'uppercase'}
            >
              {subTitle}
            </Text>
            <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={500}>
              {title}
            </Heading>
          </Stack>
        </Box>
      </Center>
    </LinkBox>
  )
}
