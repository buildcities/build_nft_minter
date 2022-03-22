import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  LinkOverlay,
  LinkBox,
} from '@chakra-ui/react'
import { isEmpty } from 'lodash'
import { ReactPlayerProps } from 'react-player'
import MediaViewer from '../MediaViewer/MediaViewer'

export type CardItemProps = {
  title?: string
  subTitle?: string
  src?: string
  isVideo?: boolean
  children?: React.ReactNode
  externalUrl?: string
  videoProps?: ReactPlayerProps
  onClick?: (payload: any) => void
}

export default function CardItem({
  title,
  subTitle,
  children,
  isVideo,
  videoProps,
  src,
  externalUrl,
  onClick,
}: CardItemProps) {
  return (
    <LinkBox>
      <Center maxW='full' py={0}>
        <Box
          role={'group'}
          p={6}
          w={'330px'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'2xl'}
          rounded={'lg'}
        >
          {src && (
            <LinkOverlay
              onClickCapture={onClick}
              isExternal={!isEmpty(externalUrl)}
              href={externalUrl || '#'}
            >
              <MediaViewer
                isVideo={isVideo}
                src={src}
                width={282}
                height={230}
                videoProps={videoProps}
              />
            </LinkOverlay>
          )}

          <Stack pt={5} justify="center" w="full" align={'center'}>
            {children}
            <Text
              color={useColorModeValue('gray.500', 'white')}
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
