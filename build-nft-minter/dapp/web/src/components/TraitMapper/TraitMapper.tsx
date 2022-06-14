import { DeleteIcon } from '@chakra-ui/icons'
import { HStack, IconButton, VStack, Image, Divider } from '@chakra-ui/react'
import NumberSlider from 'src/components/NumberSlider/NumberSlider'
import { useFormContext, useFieldArray } from '@redwoodjs/forms'
import FormControl from 'src/components/FormControl/FormControl'
import EditableText from '../EditableText/EditableText'
import TraitMapperImageViewer from '../TraitMapperImageViewer/TraitMapperImageViewer'
import { useUploadFile } from 'react-firebase-hooks/storage'
import { getStorage, ref } from 'firebase/storage'
import config from 'src/utils/firebase/api'
import { useEffect, useState } from 'react'
import { subscribe, unsubscribe } from 'pubsub-js'
import UploaderStatus from '../UploaderStatus/UploaderStatus'
import { useStore } from 'src/utils/stores/ui'


const TOPIC = 'UPLOAD-FILES'

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
  // const storageRef = ref(
  //   storage,
  //   `${STORAGE_PATH}${getValues(`${name}.${index}.trait`)}.png`
  // )

  //const { setTraits } = useStore((s) => s)

  // const [status, setStatus] = useState(null)
  // const [progress, setProgress] = useState(0)

  // useEffect(() => {
  //   //const subscription = subscribe(TOPIC, manageUpload)

  //   return () => {
  //     //unsubscribe(subscription)
  //   }
  // }, [])

  // useEffect(() => {
  //   if (snapshot) {
  //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //     setProgress(progress)
  //     setStatus(snapshot.state)
  //   }
  // }, [snapshot?.bytesTransferred, snapshot?.state])

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
          w="full"
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
