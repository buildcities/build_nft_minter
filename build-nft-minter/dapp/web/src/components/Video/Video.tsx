import ReactPlayer, { ReactPlayerProps } from 'react-player/lazy'
import { chakra } from '@chakra-ui/react'
const VideoPlayer = chakra(ReactPlayer)
interface VideoProps extends ReactPlayerProps {
  url: string
  width?: any
  height?: any
}
const Video = (props: ReactPlayerProps) => {
  return <ReactPlayer  {...props} />
}

export default Video
