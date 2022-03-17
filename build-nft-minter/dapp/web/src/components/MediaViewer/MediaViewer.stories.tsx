import MediaViewer from './MediaViewer'

export const generated = () => {
  return (
    <MediaViewer
      src="https://cdn.pixabay.com/photo/2018/06/14/22/50/nature-3475815_1280.jpg"
      width={250}
      height={300}
    />
  )
}

export default { title: 'Components/MediaViewer' }
