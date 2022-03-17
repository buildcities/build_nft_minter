import { Text, Center, Button, VStack, ButtonProps } from '@chakra-ui/react'
import { AttachmentIcon } from '@chakra-ui/icons'
const FileSelector: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Center
      color={'gray.400'}
      p="4"
      minH={40}
      borderRadius="lg"
      border={2}
      borderStyle="dotted"
    >
      <VStack>
        {children}
        <Text>PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</Text>
        <Button
          size={'sm'}
          colorScheme={'green'}
          bg={'green.400'}
          rounded={'full'}
          _hover={{
            bg: 'green.500',
          }}
          leftIcon={<AttachmentIcon />}
          {...props}
        >
          Upload file
        </Button>
      </VStack>
    </Center>
  )
}

export default FileSelector
