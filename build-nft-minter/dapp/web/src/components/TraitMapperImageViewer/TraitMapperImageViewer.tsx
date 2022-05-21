import { useEffect, useRef, useState } from 'react'
import { Image, ImageProps } from '@chakra-ui/react'

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
    <Image
      id={id}
      boxSize={props.boxSize}
      objectFit={props.objectFit}
      src={imageSrc}
    />
  )
}

TraitMapperImageViewer.defaultProps = {
  boxSize: '80px',
  objectFit: 'cover',
}

export default TraitMapperImageViewer
