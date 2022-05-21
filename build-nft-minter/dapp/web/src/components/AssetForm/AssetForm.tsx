import { Box, Switch, useColorModeValue, VStack } from '@chakra-ui/react'

import {
  Form,
  useWatch,
  useForm,
  HiddenField,
  NumberField,
} from '@redwoodjs/forms'
import FormControl from 'src/components/FormControl/FormControl'
import TextField from 'src/components/TextInputField/TextInputField'
import TextAreaField from 'src/components/TextAreaField/TextAreaField'
import SubmitFormButton from '../SubmitFormButton/SubmitFormButton'
import MediaSelector from '../MediaSelector/MediaSelector'
//import MediaSelector from '../IpfsMediaSelector/IpfsMediaSelector'
import CustomFormInput from '../CustomFormInput/CustomFormInput'
import { isEmpty, kebabCase, omit } from 'lodash'
import AttributesWidget from '../AttributesWidget/AttributesWidget'
import { useStore } from 'src/utils/stores/asset-form'
import { useEffect } from 'react'
import Moralis from 'moralis'
import { getWeb3Client } from 'src/utils'
import { GET_ASSETS_QUERY } from 'src/utils/queries/assets'
import { CREATE_ASSET_MUTATION } from 'src/utils/mutations/assets'
import { useMutation } from '@redwoodjs/web'
import RadioCard from 'src/components/RadioCard/RadioCard'
import { ImImage, ImImages, ImMagicWand } from 'react-icons/im'
import GenerativeArtLoader from '../GenerativeArtLoader/GenerativeArtLoader'

const RADIO_OPTIONS = [
  { icon: ImMagicWand, label: 'Generative art', value: 'generative' },
  { icon: ImImage, label: 'Single art', value: 'single' },
]
const STORAGE_OPTIONS = [
  {
    label: 'IPFS',
    value: 'ipfs',
    description: 'learn more',
    url: 'https://ipfs.io/',
  },
  {
    label: 'Arweave',
    value: 'arweave',
    description: 'learn more',
    url: 'https://www.arweave.org/',
  },
  {
    label: 'Filecoin',
    value: 'filecoin',
    description: 'learn more',
    url: 'https://filecoin.io/',
    hasComingSoon: true,
    disabled: true,
  },
]

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

  const assetType = useWatch({
    name: 'assetType',
    control: formMethods.control,
  })

  const _mediaType = useWatch({
    name: 'mediaType',
    control: formMethods.control,
  })

  const onDragEnd = () => {}

  const [create, { loading, reset }] = useMutation(CREATE_ASSET_MUTATION, {
    refetchQueries: [GET_ASSETS_QUERY],
  })
  const onSubmit = (input) => {
    //getWeb3Client()
    console.log(input)
    // create({
    //   variables: { input: { ...input, walletAddress: Moralis.account } },
    // }).then(() => {
    //   reset()
    //   formMethods.reset()
    //   onClose && onClose()
    //   setAsset(null)
    // })
  }

  const onMediaTypeChange = (payload: string) => {
    if (payload) {
      formMethods.setValue('mediaType', payload)
    }
  }

  useEffect(() => {
    formMethods.setValue('assetType', 'generative')
    formMethods.setValue('storageType', 'ipfs')
    return () => {
      //console.log(JSON.stringify(formMethods.getValues()))

      setAsset(JSON.stringify(omit(formMethods.getValues(), ['layers'])))
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
            description="Select asset type"
            label="Asset type"
            name="assetType"
          >
            {({ onChange, value, name }) => (
              <RadioCard
                options={RADIO_OPTIONS}
                value={value}
                onChange={onChange}
                name={name}
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
          {assetType == 'single' ? (
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
                  filename={() => kebabCase(assetName)}
                  onChange={onChange}
                  onTypeChange={onMediaTypeChange}
                  value={value}
                />
              )}
            </CustomFormInput>
          ) : (
            <FormControl
              w="full"
              name="layers"
              label="Asset"
              description="Please choose your asset folder"
            >
              {({ name }) => (
                <Box w="full">
                  <GenerativeArtLoader name={name} />
                </Box>
              )}
            </FormControl>
          )}
          <FormControl label="Asset description" name="description">
            {(props) => (
              <TextAreaField
                validation={{ required: true }}
                placeholder="Enter your awesome description"
                {...props}
              />
            )}
          </FormControl>
          {assetType == 'generative' && (
            <FormControl
              description="Total number of generated assets"
              label="Qauntity"
              name="qauntity"
            >
              {(props) => (
                <TextField
                  validation={{ required: true }}
                  placeholder="100"
                  {...props}
                />
              )}
            </FormControl>
          )}

          {assetType == 'generative' && (
            <CustomFormInput
              description="Generated assets will  be unique and distinct from one another"
              label="Unique assets?"
              name="isUnique"
            >
              {({ onChange, value }) => (
                <Switch
                  _focus={{ boxShadow: 'none' }}
                  colorScheme={'green'}
                  isChecked={value}
                  onChange={onChange}
                  value={value}
                  size="lg"
                />
              )}
            </CustomFormInput>
          )}

          {assetType == 'single' && <HiddenField name="mediaType" />}
          {assetType == 'single' && (
            <AttributesWidget w="full" name="attributes" label="Attributes" />
          )}

          <CustomFormInput
            description="Select web3 storage provider"
            label="Storage provider"
            name="storageType"
          >
            {({ onChange, value, name }) => (
              <RadioCard
                defaultValue="ipfs"
                options={STORAGE_OPTIONS}
                value={value}
                onChange={onChange}
                name={name}
              />
            )}
          </CustomFormInput>
          <SubmitFormButton isBusy={loading}>Create</SubmitFormButton>
        </VStack>
      </Form>
    </Box>
  )
}
