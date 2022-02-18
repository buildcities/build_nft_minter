import {
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  Stack,
  Switch,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import FormControl from 'src/components/FormControl/FormControl'
import TextField from 'src/components/TextInputField/TextInputField'
import SelectField from 'src/components/SelectInputField/SelectInputField'
import { Form } from '@redwoodjs/forms'

const MinterForm: React.FC<{
  onSubmit?: (payload: Record<string, unknown>) => void
}> = ({ onSubmit }) => {
  const [showPrice, setShowPrice] = useState(false)
  const onChange = (payload) => {
    setShowPrice((state) => !state)
  }
  return (
    <Flex
      bg={useColorModeValue('white', 'gray.900')}
      align="center"
      justify="center"
      id="minter-form"
    >
      <Box
        borderRadius="lg"
        m={{ base: 2, md: 4, lg: 8 }}
        p={{ base: 2, lg: 4 }}
      >
        <Box>
          <Heading
            mb={3}
            fontSize={{
              base: 'lg',
              md: 'xl',
            }}
          >
            NFT minter
          </Heading>

          <Stack
            spacing={{ base: 4, md: 8, lg: 20 }}
            direction={{ base: 'column', md: 'row' }}
          >
            <Box
              bg={useColorModeValue('white', 'gray.700')}
              borderRadius="lg"
              w="container.md"
              p={10}
              color={useColorModeValue('gray.700', 'whiteAlpha.900')}
              shadow="base"
            >
              <Form onSubmit={onSubmit}>
                <VStack spacing={5}>
                  <FormControl label="NFT name" name="name">
                    {(props) => (
                      <TextField
                        validation={{ required: true }}
                        placeholder="e.g build_ founders passport batch -1"
                        {...props}
                      />
                    )}
                  </FormControl>
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

                  <FormControl label="Token Type" name="tokenType">
                    {(props) => (
                      <SelectField validation={{ required: true }} {...props}>
                        <option>ERC1155</option>
                        <option>ERC721</option>
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
                  <FormControl label="Qauntiy" name="qty">
                    {(props) => (
                      <TextField
                        validation={{ required: true }}
                        placeholder="e.g 1"
                        {...props}
                      />
                    )}
                  </FormControl>
                  <FormControl
                    width={'full'}
                    label="Royalty"
                    name="royaltiesAmount"
                  >
                    {(props) => (
                      <TextField
                        validation={{ required: false }}
                        placeholder="Royalty amount in percent e.g 5 for 5% "
                        {...props}
                      />
                    )}
                  </FormControl>
                  <FormControl label="List for sale" name="forSale">
                    {(props) => (
                      <Switch
                        isChecked={showPrice}
                        onChange={onChange}
                        size="lg"
                      />
                    )}
                  </FormControl>
                  <Box width={'full'}>
                    <Collapse in={showPrice} animateOpacity>
                      <FormControl width={'full'} label="Price" name="price">
                        {(props) => (
                          <TextField
                            validation={{ required: false }}
                            placeholder="NFT price in eth"
                            {...props}
                          />
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
                    Mint
                  </Button>
                </VStack>
              </Form>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Flex>
  )
}
export default MinterForm