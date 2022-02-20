import {
  Button,
  Box,
  Collapse,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'

import { Form, useWatch, useForm } from '@redwoodjs/forms'
import FormControl from 'src/components/FormControl/FormControl'
import SelectField from 'src/components/SelectInputField/SelectInputField'

type AssetFormType = {
  onSubmit?: (payload: AssetFormType) => void
}

export default function AssetForm({ onSubmit }: AssetFormType) {
  const formMethods = useForm()
  const formatType = useWatch({ name: 'mediaFormat', control: formMethods.control, defaultValue: 'video' })


  return (


    <Box
      bg={useColorModeValue('white', 'gray.700')}
      borderRadius="lg"
      w="full"
      p={10}
      color={useColorModeValue('gray.700', 'whiteAlpha.900')}
      shadow="base"
    >
      <Form formMethods={formMethods} onSubmit={onSubmit}>
        <VStack spacing={5}>

          <FormControl label="Type" name="type">
            {(props) => (
              <SelectField
                validation={{ required: true }}
                placeholder="e.g 1"
                {...props}
              >
                <option value="genesis">Genesis</option>
                <option value="founders">Founders</option>
                <option value="regular">Regular</option>
              </SelectField>
            )}
          </FormControl>
          <FormControl label="Media format" name="mediaFormat">
            {(props) => (
              <SelectField validation={{ required: true }} {...props}>
                <option value="video">Video</option>
                <option value="image">Image</option>
              </SelectField>
            )}
          </FormControl>
          <Box width={'full'}>
            <Collapse in={formatType == 'video'} animateOpacity>
              <FormControl width={'full'} label="Video length" name="videoLength">
                {(props) => (
                  <SelectField validation={{ required: true }} {...props}>
                    <option value="5">5 minute video</option>
                    <option value="4">4 minute video</option>
                    <option value="3">3 minute video</option>
                    <option value="2">2 minute video</option>
                    <option value="2">1 minute video</option>
                  </SelectField>
                )}
              </FormControl>
            </Collapse>
          </Box>
          <Button
            colorScheme="blue"
            bg="blue.400"
            color="white"
            _hover={{
              bg: 'blue.500',
            }}
            isFullWidth
            type="submit"
          >
            Generate
          </Button>
        </VStack>
      </Form>
    </Box>

  )
}
