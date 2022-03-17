import { ReactPlayerProps } from 'react-player'
import ImageViewer from '../ImageViewer/ImageViewer'
import Video from '../Video/Video'

type MediaViewerProps = {
  height: number
  width: number
  src: string
  isVideo?: boolean
  videoProps?: ReactPlayerProps
}

const toPixelSize = (size: number) => {
  return `${size}px`
}

const MediaViewer = ({
  src,
  isVideo,
  height,
  width,
  videoProps,
}: MediaViewerProps) => {
  return isVideo ? (
    <Video controls url={src} height={height} width={width} src={src} {...videoProps} />
  ) : (
    src && (
      <ImageViewer
        width={toPixelSize(width)}
        height={toPixelSize(height)}
        src={src}
      />
    )
  )
}

export default MediaViewer
