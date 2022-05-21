import { useEffect, useRef, useState } from 'react'
import {
  BoxProps,
  IconButton,
  VStack,
  HStack,
  Flex,
  Text,
  Box,
} from '@chakra-ui/react'
import { AttachmentIcon, MoonIcon, RepeatIcon, SunIcon } from '@chakra-ui/icons'
import { useFieldArray, useFormContext, useWatch } from '@redwoodjs/forms'
import { random } from 'lodash'
import { Id } from 'react-beautiful-dnd'
import { drawImages } from 'src/utils'

const WHITE_BGRD = '#fff'
const DARK_BGRD = '#000'

interface ImagePreviewerProps extends BoxProps {
  name: string
  x?: number
  y?: number
}

const ImagePreviewer: React.FC<ImagePreviewerProps> = ({
  name,
  x,
  y,
  ...props
}) => {
  const imageRef = useRef()
  const containerRef = useRef()

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const { control } = useFormContext()

  const [bgrdColor, setBgrd] = useState(WHITE_BGRD)
  const [canvasContext, setContext] = useState(null)

  const traits = useWatch({ name, control })

  const onRefresh = () => {
    drawImages(traits, canvasContext, x, y, width, height, bgrdColor)
  }

  const onToggleBgrd = () => {
    setBgrd((b) => {
      return b === WHITE_BGRD ? DARK_BGRD : WHITE_BGRD
    })
  }

  const onFolderChange = () => {}

  useEffect(() => {
    if (canvasContext && traits) {
      drawImages(traits, canvasContext, x, y, width, height, bgrdColor)
    }
  }, [traits])

  useEffect(() => {
    if (bgrdColor && canvasContext) {
      canvasContext.fillStyle = bgrdColor
      drawImages(traits, canvasContext, x, y, width, height, bgrdColor)
    }
  }, [bgrdColor])

  useEffect(() => {
    const w = containerRef?.current?.offsetWidth || 160
    const h = containerRef?.current?.offsetHeight || 160
    setWidth(w)
    setHeight(h)
    if (width && height) {
      const c = imageRef.current as HTMLCanvasElement
      const ctx = c.getContext('2d')
      setContext(ctx)
      drawImages(traits, ctx, width, height)
    }

    return () => {
      //console.log('done')
    }
  }, [width, height])

  return (
    <VStack spacing={1} mb={20} ref={containerRef} {...props}>
      {width && height ? (
        <>
          <Box p={1} rounded="lg" borderColor="gray.200" borderWidth={1}>
            <canvas width={width} height={height} ref={imageRef} />
          </Box>
          <Text fontSize={'sm'}>Preview</Text>
        </>
      ) : (
        <></>
      )}

      <HStack w="full" justify={'center'}>
        <IconButton
          onClick={onFolderChange}
          aria-label={''}
          isRound
          icon={<AttachmentIcon />}
        />
        <IconButton
          onClick={onRefresh}
          aria-label={''}
          isRound
          icon={<RepeatIcon />}
        />
        <IconButton
          onClick={onToggleBgrd}
          aria-label={''}
          isRound
          icon={bgrdColor === WHITE_BGRD ? <MoonIcon /> : <SunIcon />}
        />
      </HStack>
    </VStack>
  )
}

ImagePreviewer.defaultProps = {
  x: 0,
  y: 0,
}

export default ImagePreviewer
