import { Button, HStack, IconButton, VStack } from '@chakra-ui/react'
import { useFieldArray, useFormContext } from '@redwoodjs/forms'
import TextField from 'src/components/TextInputField/TextInputField'
import { DeleteIcon, AddIcon } from '@chakra-ui/icons'
import FormControl, { FormControlProps } from '../FormControl/FormControl'

type AttributeControlProps = {
  position: number
  trait_type: string
  value: string
  onRemove?: (payload: number) => void
}
const AttributeControl = ({
  position,
  trait_type,
  value,
  onRemove,
}: AttributeControlProps) => {
  const _onClick = () => {
    onRemove && onRemove(position)
  }
  return (
    <HStack w='full' justify={'space-between'}>
      <TextField
        placeholder="attribute name"
        validation={{ required: true }}
        name={trait_type}
      ></TextField>

      <TextField
        placeholder="attribute value"
        validation={{ required: true }}
        name={value}
      ></TextField>
      <IconButton
        onClick={_onClick}
        aria-label="delete attribute"
        colorScheme={'red'}
        isRound
        icon={<DeleteIcon />}
      />
    </HStack>
  )
}

const AttributesWidget = ({ name, ...props }: FormControlProps) => {
  const { control } = useFormContext()
  const { append, fields, remove } = useFieldArray({ control, name })
  const handleAddAttribute = () => {
    append({ trait_type: '', value: '' })
  }
  return (
    <FormControl w='full' name={name} {...props}>
      {({ name }) => (
        <VStack w='full' align='start'>
          {fields.map((item, index) => (
            <AttributeControl
              key={item.id}
              position={index}
              onRemove={remove}
              value={`${name}.${index}.value`}
              trait_type={`${name}.${index}.trait_type`}
            />
          ))}
          <Button
            onClick={handleAddAttribute}
            size={'sm'}
            colorScheme={'green'}
            bg={'green.400'}
            rounded={'full'}
            _hover={{
              bg: 'green.300',
            }}
            leftIcon={<AddIcon />}
          >
            Add Attribute
          </Button>
        </VStack>
      )}
    </FormControl>
  )
}

export default AttributesWidget
