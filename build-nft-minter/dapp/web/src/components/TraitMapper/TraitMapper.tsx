import { DeleteIcon } from '@chakra-ui/icons'
import { HStack, IconButton, VStack, Image, Divider } from '@chakra-ui/react'
import NumberSlider from 'src/components/NumberSlider/NumberSlider'
import { useFormContext, useFieldArray } from '@redwoodjs/forms'
import FormControl from 'src/components/FormControl/FormControl'
import EditableText from '../EditableText/EditableText'
import TraitMapperImageViewer from '../TraitMapperImageViewer/TraitMapperImageViewer'

type TraitItemProps = {
  name: string
  onRemove?: (payload: number) => void
  index?: number
}

const TraitItem = ({ name, onRemove, index }: TraitItemProps) => {
  const { getValues } = useFormContext()
  const _onRemove = () => {
    onRemove && onRemove(index)
  }

  return (
    <VStack
      p={4}
      borderWidth={'thin'}
      borderRadius="lg"
      borderColor="gray.200"
      justify={'start'}
      w="full"
    >
      <HStack w="full" spacing={2} align={'center'} justify={'center'}>
        <TraitMapperImageViewer
          id={getValues(`${name}.${index}.id`)}
          file={getValues(`${name}.${index}.file`)}
        />

        <NumberSlider
          size={'lg'}
          min={0}
          max={5}
          name={`${name}.${index}.rarity`}
        />
      </HStack>
      <HStack spacing={4} justify={'center'} align={'center'}>
        <EditableText
          w="full"
          placeholder="trait"
          isPreviewFocusable={false}
          name={`${name}.${index}.trait`}
          pb={2}
        />
        <Divider orientation="vertical" />
        <IconButton
          onClick={_onRemove}
          size="sm"
          aria-label="delete attribute"
          colorScheme={'red'}
          isRound
          icon={<DeleteIcon />}
        />
      </HStack>
    </VStack>
  )
}

type TraitMapperProps = {
  name: string
}

const TraitMapper = ({ name, ...props }: TraitMapperProps) => {
  const { control } = useFormContext()
  const { fields, remove } = useFieldArray({ control, name })
  return (
    <FormControl w="full" name={name} {...props}>
      {({ name }) => (
        <VStack w="full" align="start">
          {fields.map((item, index) => (
            <TraitItem
              key={item.id}
              index={index}
              onRemove={remove}
              name={name}
            />
          ))}
        </VStack>
      )}
    </FormControl>
  )
}

export default TraitMapper
