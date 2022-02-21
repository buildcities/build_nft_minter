import { chakra } from '@chakra-ui/react'
import { TextAreaField as _TextAreaField } from '@redwoodjs/forms'
const TextAreaField = chakra(_TextAreaField)

const TextAreaInputField = (props) => {
  return (
    <TextAreaField
      py={2}
      px={5}
      borderRadius={'xl'}
      border="2px"
      borderColor={'gray.300'}
      w="full"
      noOfLines={10}
      {...props}
    />
  )
}

export default TextAreaInputField
