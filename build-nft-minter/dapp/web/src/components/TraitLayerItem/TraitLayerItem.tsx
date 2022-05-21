import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  VStack,
  Text,
  IconButton,
  Box,
} from '@chakra-ui/react'
import { useFormContext } from '@redwoodjs/forms'
import { capitalize } from 'lodash'
import { Draggable } from 'react-beautiful-dnd'
import TraitMapper from '../TraitMapper/TraitMapper'
import { MdDragIndicator } from 'react-icons/md'

const TraitLayerItem: React.FC<{ name: string; index: number }> = ({
  name,
  index,
}) => {
  const { getValues } = useFormContext()
  const id = getValues(`${name}.id`)
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <AccordionItem {...provided.draggableProps} ref={provided.innerRef}>
          <h2>
            <AccordionButton>
              <Box {...provided.dragHandleProps}>
                <MdDragIndicator size={18}/>
              </Box>
              <Text ml={4} flex="1" textAlign="left">
                {capitalize(id)}
              </Text>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <VStack>
              <TraitMapper name={`${name}.traits`} />
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      )}
    </Draggable>
  )
}

export default TraitLayerItem
