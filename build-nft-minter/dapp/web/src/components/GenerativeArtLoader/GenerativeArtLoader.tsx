import { VStack, HStack, Box } from '@chakra-ui/react'
import { useFormContext, useFieldArray } from '@redwoodjs/forms'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import FileSelector from '../FileSelector/FileSelector'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { Accordion } from '@chakra-ui/react'
import TraitLayerItem from '../TraitLayerItem/TraitLayerItem'
import { prepareTraitsFromFile } from 'src/utils'
import { random } from 'lodash'
import AppButton from '../AppButton/AppButton'
import ImagePreviewer from '../ImagePreviewer/ImagePreviewer'
//import { useDropzone } from 'react-dropzone'

const DROPPABLE_ID = 'droppable-id'
const CHANGE_FOLDER_CTA = 'Change folder'
const PREVIEW_IMG_CTA = 'Preview random Image'

type GenerativeArtLoaderProps = {
  name: string
}

const GenerativeArtLoader = ({ name }: GenerativeArtLoaderProps) => {
  const { control, getValues } = useFormContext()

  const [previewImageIds, setPreviewImages] = useState([])

  const { replace, fields, remove, swap } = useFieldArray({ control, name })

  const inputFile = useRef<any>()

  const handleFileClick = () => {
    inputFile.current.click()
  }

  const onDragEnd = (result: DropResult) => {
    //console.log(result)
    const { destination, source, draggableId } = result
    if (!destination) {
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }
    swap(source.index, destination.index)
    //generatePreview()
  }

  useEffect(() => {
    if (inputFile && inputFile?.current) {
      inputFile.current.onchange = function (e) {
        replace(prepareTraitsFromFile(e))
      }
    }

    return () => {
      //second
      fields.forEach((item, index) => {
        remove(index)
      })
      // console.log(fields.length)
    }
  }, [])

  return fields.length ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <VStack
        borderRadius="lg"
        p={2}
        color={'gray.400'}
        h="full"
        border={2}
        spacing={4}
        borderStyle="dotted"
      >
        <ImagePreviewer width={60} height={60} name={name} />
        <input type="file" hidden webkitdirectory="true" ref={inputFile} />
        <Droppable droppableId={DROPPABLE_ID}>
          {(provided) => (
            <Accordion
              color={'blackAlpha.800'}
              w="full"
              allowToggle
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {fields.map((field, index) => (
                <TraitLayerItem
                  index={index}
                  key={field.id}
                  name={`${name}.${index}`}
                />
              ))}
              {provided.placeholder}
            </Accordion>
          )}
        </Droppable>
      </VStack>
    </DragDropContext>
  ) : (

    <FileSelector
      buttonText="Upload folder"
      description="Upload folder containing traits"
      onClick={handleFileClick}
    >
      <input type="file" hidden webkitdirectory="true" ref={inputFile} />
    </FileSelector>

  )
}

export default GenerativeArtLoader
