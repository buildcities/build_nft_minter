import { Box, Image, StyleProps } from '@chakra-ui/react'

interface ImageViewerProps extends StyleProps {
  src: string
  height: string | number
  width: string | number
}

const ImageViewer = ({ src, height, width }: ImageViewerProps) => {
  return (
    <Box w="full">
      <Image
        rounded={'lg'}
        height={height}
        width={width}
        objectFit={'cover'}
        src={src}
      />
    </Box>
  )
}

ImageViewer.defaultProps = {
  height: '230px',
  width: '282px',
}

export default ImageViewer
