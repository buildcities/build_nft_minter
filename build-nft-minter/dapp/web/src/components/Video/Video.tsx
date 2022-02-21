import ReactPlayer, { ReactPlayerProps } from 'react-player/lazy'
const Video = (props: ReactPlayerProps) => {
  return <ReactPlayer {...props} />
}

export default Video
