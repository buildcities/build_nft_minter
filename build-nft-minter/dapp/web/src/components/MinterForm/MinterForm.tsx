import {
  Box,
  Collapse,
  Switch,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { useForm, useWatch } from '@redwoodjs/forms'
import React, { useEffect, useState } from 'react'
import FormControl from 'src/components/FormControl/FormControl'
import TextField from 'src/components/TextInputField/TextInputField'
import SelectField from 'src/components/SelectInputField/SelectInputField'
import { Form } from '@redwoodjs/forms'
import SubmitFormButton from '../SubmitFormButton/SubmitFormButton'
import SelectAssetsCell from 'src/components/SelectAssetsCell'
import SelectCollectionCell from 'src/components/SelectCollectionCell'
import { useStore } from 'src/utils/stores/ui'
import { isEmpty } from 'lodash'
import CustomFormInput from '../CustomFormInput/CustomFormInput'

const MinterForm: React.FC<{
  onSubmit?: (payload: Record<string, unknown>) => void
  isBusy?: boolean
}> = ({ onSubmit, isBusy }) => {
  const [showPrice, setShowPrice] = useState(false)

  const { chain, account } = useStore((s) => s)

  const formMethods = useForm()

  const _selectedCollection = useWatch({
    name: 'collection',
    control: formMethods.control,
  })

  const onChangePrice = () => {
    setShowPrice((state) => !state)
  }

  useEffect(() => {
    if (!_selectedCollection) {
      formMethods.setValue('price', undefined)
    }
  }, [_selectedCollection])

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
          <FormControl
            description="Select an asset for your NFT"
            label="Assets"
            name="asset"
          >
            {(props) => <SelectAssetsCell {...props} />}
          </FormControl>
          <FormControl
            description="Group your assets in a unique collection"
            label="Collections"
            name="collection"
          >
            {(props) => (
              <SelectCollectionCell chain={chain} owner={account} {...props} />
            )}
          </FormControl>

          <FormControl label="Token Type" name="tokenType">
            {(props) => (
              <SelectField validation={{ required: true }} {...props}>
                <option>ERC721</option>
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
          <FormControl width={'full'} label="Royalty" name="royaltiesAmount">
            {(props) => (
              <TextField
                validation={{ required: false }}
                placeholder="Royalty amount in percent e.g 5 for 5% "
                {...props}
              />
            )}
          </FormControl>
          <Box width={'full'}>
            <Collapse in={isEmpty(_selectedCollection)} animateOpacity>
              <CustomFormInput
                description="Mint at zero cost, pass the minting cost to buyer"
                label="Lazy mint"
                name="isLazy"
              >
                {({ onChange, value }) => (
                  <Switch
                    colorScheme={'green'}
                    isChecked={value}
                    onChange={onChange}
                    value={value}
                    size="lg"
                  />
                )}
              </CustomFormInput>

              <FormControl label="List for sale" name="forSale">
                {() => (
                  <Switch
                    isChecked={showPrice}
                    onChange={onChangePrice}
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
            </Collapse>
          </Box>

          <SubmitFormButton isBusy={isBusy}>Mint</SubmitFormButton>
        </VStack>
      </Form>
    </Box>
  )
}
export default MinterForm
