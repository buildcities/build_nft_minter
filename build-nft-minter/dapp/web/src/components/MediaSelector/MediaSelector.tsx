import FileSelector from 'src/components/FileSelector/FileSelector'
import MediaViewer from 'src/components/MediaViewer/MediaViewer'
import { getStorage } from 'firebase/storage'
import { useFirebaseFileUploader } from 'firebase-file-uploader-react'
import { useEffect, useRef, useState } from 'react'
import { Box, Button, Center, Progress, VStack } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { isVideo } from 'src/utils'

const STORAGE_BASEURL = 'https://firebasestorage.googleapis.com'
const TRANSFORM_BASEURL = 'https://ik.imagekit.io/upsd36tz3ybq/minty'
const storage = getStorage()
type MediaSelectorType = {
  path?: string
  value?: string
  name: string
  disabled?: boolean
  filename?: string | ((payload?: File) => string)
  mediaType?:string
  onChange?: (value: any) => void
  onTypeChange?: (value: string) => void
}

const prepareTransformURL = (url: string) => {
  return url.replace(STORAGE_BASEURL, TRANSFORM_BASEURL).split('&')[0]
}

const MediaSelector = ({
  path,
  value,
  onChange,
  filename,
  name,
  mediaType,
  disabled,
  onTypeChange,
}: MediaSelectorType) => {
  const [src, setSrc] = useState(value)
  const { FileUploaderUI, uploading, progress, error, fileURL, fileType } =
    useFirebaseFileUploader({
      storage,
      path,
      filename,
    })

  useEffect(() => {
    const _src = fileURL
    setSrc(_src || value)
    onChange && onChange(_src || value)
  }, [fileURL])

  useEffect(() => {
    if(fileType){
      onTypeChange && onTypeChange(fileType)
    }
  }, [fileType])

  const inputFile = useRef<HTMLElement>()

  const handleFileClick = () => {
    inputFile.current.click()
  }

  return src ? (
    <Center
      w="full"
      p="4"
      border={2}
      borderStyle="dotted"
      borderRadius={'lg'}
      color="gray.300"
    >
      <VStack>
        <MediaViewer
          isVideo={isVideo(fileType||mediaType)}
          height={320}
          width={300}
          src={src}
        />
        {progress && (
          <Progress
            w="full"
            size="xs"
            colorScheme={'green'}
            hasStripe
            value={progress}
          />
        )}
        <Button
          size={'sm'}
          isLoading={uploading}
          onClick={handleFileClick}
          colorScheme={'red'}
          bg={'red.400'}
          rounded={'full'}
          _hover={{
            bg: 'red.300',
          }}
          leftIcon={<EditIcon />}
        >
          Change
        </Button>
      </VStack>
      <FileUploaderUI
        hidden
        ref={inputFile}
        name={name}
        accept={['image/*', 'video/*']}
      />
    </Center>
  ) : (
    <Box w="full">
      <FileSelector
        disabled={disabled}
        isLoading={uploading}
        onClick={handleFileClick}
      >
        {progress && (
          <Progress
            w="full"
            size="xs"
            colorScheme={'green'}
            hasStripe
            value={progress}
          />
        )}
      </FileSelector>
      <FileUploaderUI
        hidden
        ref={inputFile}
        name={name}
        accept={['image/*', 'video/*']}
      />
    </Box>
  )
}

export default MediaSelector
