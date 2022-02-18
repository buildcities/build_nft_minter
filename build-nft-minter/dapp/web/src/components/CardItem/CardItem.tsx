import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react'
import { ReactPlayerProps } from 'react-player'
import Video from '../Video/Video'

type CardItemProps = {
  title?: string
  subTitle?: string
  src?: string
  isVideo?: boolean
  children?: React.ReactNode
  videoProps?:ReactPlayerProps
}

const ImageViewer = ({ src }: { src: string }) => {
  return (
    <Box
      rounded={'lg'}
      mt={-12}
      pos={'relative'}
      height={'230px'}
      _after={{
        transition: 'all .3s ease',
        content: '""',
        w: 'full',
        h: 'full',
        pos: 'absolute',
        top: 5,
        left: 0,
        backgroundImage: `url(${src})`,
        filter: 'blur(15px)',
        zIndex: -1,
      }}
      _groupHover={{
        _after: {
          filter: 'blur(20px)',
        },
      }}
    >
      <Image
        rounded={'lg'}
        height={230}
        width={282}
        objectFit={'cover'}
        src={src}
      />
    </Box>
  )
}

export default function CardItem({
  title,
  subTitle,
  children,
  isVideo,
  videoProps,
  src,
}: CardItemProps) {
  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        {isVideo ? (
          <Video
            url={src}
            height={230}
            width={282}
            src={src}
            {...videoProps}
          />
        ) : (
          <ImageViewer src={src} />
        )}
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            {subTitle}
          </Text>
          <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={500}>
            {title}
          </Heading>
          {children}
        </Stack>
      </Box>
    </Center>
  )
}
