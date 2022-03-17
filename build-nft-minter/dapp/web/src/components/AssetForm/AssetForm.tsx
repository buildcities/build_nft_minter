import { Box, Switch, useColorModeValue, VStack } from '@chakra-ui/react'

import { Form, useWatch, useForm, HiddenField } from '@redwoodjs/forms'
import FormControl from 'src/components/FormControl/FormControl'
import TextField from 'src/components/TextInputField/TextInputField'
import TextAreaField from 'src/components/TextAreaField/TextAreaField'
import SubmitFormButton from '../SubmitFormButton/SubmitFormButton'
import MediaSelector from '../MediaSelector/MediaSelector'
//import MediaSelector from '../IpfsMediaSelector/IpfsMediaSelector'
import CustomFormInput from '../CustomFormInput/CustomFormInput'
import { isEmpty, kebabCase } from 'lodash'
import AttributesWidget from '../AttributesWidget/AttributesWidget'
import { useStore } from 'src/utils/stores/asset-form'
import { useEffect } from 'react'
import Moralis from 'moralis'
import { getWeb3Client } from 'src/utils'
import { GET_ASSETS_QUERY } from 'src/utils/queries/assets'
import { CREATE_ASSET_MUTATION } from 'src/utils/mutations/assets'
import { useMutation } from '@redwoodjs/web'

type AssetFormType = {
  onClose: () => void
}

export default function AssetForm({ onClose }: AssetFormType) {
  const { selectedAsset, setAsset } = useStore((s) => s)
  const formMethods = useForm({ defaultValues: JSON.parse(selectedAsset) })
  const assetName = useWatch({
    name: 'name',
    control: formMethods.control,
  })

  const _mediaType = useWatch({
    name: 'mediaType',
    control: formMethods.control,
  })

  const [create, { loading, error, reset }] = useMutation(
    CREATE_ASSET_MUTATION,
    {
      refetchQueries: [GET_ASSETS_QUERY],
    }
  )
  const onSubmit = (input) => {
    getWeb3Client()
    console.log(input)
    create({
      variables: { input: { ...input, walletAddress: Moralis.account } },
    }).then(() => {
      reset()
      formMethods.reset()
      onClose && onClose()
      setAsset(null)
    })
  }

  const onMediaTypeChange = (payload: string) => {
    if (payload) {
      formMethods.setValue('mediaType', payload)
    }
  }

  useEffect(() => {
    return () => {
      console.log(JSON.stringify(formMethods.getValues()))
      setAsset(JSON.stringify(formMethods.getValues()))
    }
  }, [])

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
          <CustomFormInput
            description="Make NFT asset changeable"
            label="Is Dynamic"
            name="isDynamic"
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

          <FormControl label="Asset name" name="name">
            {(props) => (
              <TextField
                validation={{ required: true }}
                placeholder="e.g An awesome asset title"
                {...props}
              />
            )}
          </FormControl>
          <CustomFormInput
            width={'full'}
            label="Asset"
            name="asset"
            description="Please enter asset name above to activate upload"
          >
            {({ name, onChange, value }) => (
              <MediaSelector
                path="minty"
                name={name}
                mediaType={_mediaType}
                disabled={isEmpty(assetName)}
                filename={(payload) => kebabCase(assetName)}
                onChange={onChange}
                onTypeChange={onMediaTypeChange}
                value={value}
              />
            )}
          </CustomFormInput>
          <FormControl label="Asset description" name="description">
            {(props) => (
              <TextAreaField
                validation={{ required: true }}
                placeholder="Enter your awesome description"
                {...props}
              />
            )}
          </FormControl>
          <HiddenField name="mediaType" />
          <AttributesWidget w="full" name="attributes" label="Attributes" />
          <SubmitFormButton isBusy={loading}>Generate</SubmitFormButton>
        </VStack>
      </Form>
    </Box>
  )
}
