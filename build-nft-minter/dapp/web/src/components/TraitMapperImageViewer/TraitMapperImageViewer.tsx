import { useEffect, useRef, useState } from 'react'
import { Box, Image, ImageProps } from '@chakra-ui/react'

interface TraitMapperImageViewerProps extends ImageProps {
  file: File
  id?: string
}

const TraitMapperImageViewer: React.FC<TraitMapperImageViewerProps> = ({
  file,
  id,
  ...props
}) => {
  const imageRef = useRef()
  const [imageSrc, setSource] = useState(null)
  useEffect(() => {
    const reader = new FileReader()
    reader.onload = function (event) {
      setSource(reader.result)
    }
    //console.log(file)
    reader.readAsDataURL(file)

    return () => {
      //console.log('dewy')
      reader.abort()
    }
  }, [file])
  return (
    <Box padding={1} borderWidth={1} rounded="lg">
      <Image
        id={id}
        boxSize={props.boxSize}
        objectFit={props.objectFit}
        src={imageSrc}
      />
    </Box>
  )
}

TraitMapperImageViewer.defaultProps = {
  boxSize: '80px',
  objectFit: 'cover',
}

export default TraitMapperImageViewer
