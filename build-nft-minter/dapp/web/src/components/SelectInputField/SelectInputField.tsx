import { chakra } from '@chakra-ui/react'
import { SelectField as _SelectField } from '@redwoodjs/forms'
const SelectField = chakra(_SelectField)

//interface SelectInputFieldProps extends InputFieldProps {
//}

const SelectInputField = (props) => {
  return (
    <SelectField
      w="full"
      py={2}
      px={5}
      borderRadius={'lg'}
      border='2px'
      borderColor={'gray.300'}
      {...props}
    />
  )
}

export default SelectInputField
