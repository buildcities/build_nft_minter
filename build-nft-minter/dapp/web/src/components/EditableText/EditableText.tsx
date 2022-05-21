import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  EditableProps,
  Flex,
  HStack,
  IconButton,
  Input,
  useEditableControls,
} from '@chakra-ui/react'
import CustomFormInput from '../CustomFormInput/CustomFormInput'

interface EditableTextProps extends EditableProps {
  name: string
}
const EditableControls = function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls()

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton
        rounded={'full'}
        aria-label="accept button"
        icon={<CheckIcon />}
        size="sm"
        {...getSubmitButtonProps()}
      />
      <IconButton
        rounded={'full'}
        aria-label="close button"
        size="sm"
        icon={<CloseIcon />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton
        rounded={'full'}
        aria-label="edit button"
        size="sm"
        icon={<EditIcon />}
        {...getEditButtonProps()}
      />
    </Flex>
  )
}

const EditableText = (props: EditableTextProps) => {
  return (
    // Click the text to edit
    <CustomFormInput {...props}>
      {(field) => (
        <Editable  {...props} {...field}>
          <HStack>
            <EditablePreview />

            <Input as={EditableInput} />
            <EditableControls />
          </HStack>
        </Editable>
      )}
    </CustomFormInput>
  )
}

export default EditableText
