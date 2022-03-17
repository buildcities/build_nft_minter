import { Box, useColorModeValue, VStack } from '@chakra-ui/react'
import React from 'react'
import FormControl from 'src/components/FormControl/FormControl'
import TextField from 'src/components/TextInputField/TextInputField'
import { Form } from '@redwoodjs/forms'
import SubmitFormButton from '../SubmitFormButton/SubmitFormButton'

const CollectionForm: React.FC<{
  onSubmit?: (payload: Record<string, unknown>) => void
  isBusy?: boolean
}> = ({ onSubmit, isBusy }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.700')}
      borderRadius="lg"
      w="full"
      p={10}
      color={useColorModeValue('gray.700', 'whiteAlpha.900')}
      shadow="base"
    >
      <Form onSubmit={onSubmit}>
        <VStack spacing={5}>
          <FormControl label="Collection name" name="_name">
            {(props) => (
              <TextField
                validation={{ required: true }}
                placeholder="e.g Genesis passport collection"
                {...props}
              />
            )}
          </FormControl>
          <FormControl label="Collection symbol" name="_symbol">
            {(props) => (
              <TextField
                validation={{ required: true }}
                placeholder="e.g BLDT"
                {...props}
              />
            )}
          </FormControl>
          <FormControl label="Token total supply" name="_maxSupply">
            {(props) => (
              <TextField
                validation={{ required: true }}
                placeholder="e.g 100, leave it as zero to remove a cap"
                {...props}
              />
            )}
          </FormControl>
          <SubmitFormButton isBusy={isBusy}>Create</SubmitFormButton>
        </VStack>
      </Form>
    </Box>
  )
}
export default CollectionForm
