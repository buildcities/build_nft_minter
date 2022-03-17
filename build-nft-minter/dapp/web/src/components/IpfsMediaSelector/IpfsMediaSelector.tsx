import FileSelector from 'src/components/FileSelector/FileSelector'
import MediaViewer from 'src/components/MediaViewer/MediaViewer'
import { getStorage } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { Box, Button, Center, Progress, VStack } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { useFilePicker } from 'use-file-picker'
import useAxiosUploader from 'src/utils/hooks/use-axios-uploader'
import Moralis from 'moralis'
import { isVideo } from 'src/utils'

const STORAGE_BASEURL = 'https://firebasestorage.googleapis.com'
const TRANSFORM_BASEURL = 'https://ik.imagekit.io/upsd36tz3ybq/minty'
type IpfsMediaSelectorType = {
  path?: string
  value?: string
  name: string
  disabled?: boolean
  filename?: string | ((payload?: File) => string)
  mediaType?: string
  onChange?: (value: any) => void
  onTypeChange?: (value: string) => void
}


const uploadImageToIpfs = async (file: File) => {
  const _file = new Moralis.File(file.name, file)
  return await _file.saveIPFS()
}

const IpfsMediaSelector = ({
  value,
  onChange,
  disabled,
}: IpfsMediaSelectorType) => {
  const [src, setSrc] = useState(value)
  const [loading, setLoading] = useState(false)

  const [openFileSelector, { loading: uploading, plainFiles }] = useFilePicker({
    accept: ['image/*', 'video/*'],
  })

  useEffect(() => {
    if (uploading) {
      setLoading(true)
    }

    if (plainFiles.length) {
      uploadImageToIpfs(plainFiles[0]).then((result) => {
        const _src = result._url
        setSrc(_src || value)
        onChange && onChange(_src || value)
        setLoading(false)
      })
    }
  }, [plainFiles, uploading])

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
        <MediaViewer isVideo={isVideo(src)} height={320} width={300} src={src} />
        {/* {progress && (
          <Progress
            w="full"
            size="xs"
            colorScheme={'green'}
            hasStripe
            value={progress}
          />
        )} */}
        <Button
          size={'sm'}
          isLoading={loading}
          onClick={openFileSelector}
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
    </Center>
  ) : (
    <Box w="full">
      <FileSelector
        disabled={disabled}
        isLoading={loading}
        onClick={openFileSelector}
      >
        {/* {progress && (
          <Progress
            w="full"
            size="xs"
            colorScheme={'green'}
            hasStripe
            value={progress}
          />
        )} */}
      </FileSelector>
    </Box>
  )
}

export default IpfsMediaSelector
