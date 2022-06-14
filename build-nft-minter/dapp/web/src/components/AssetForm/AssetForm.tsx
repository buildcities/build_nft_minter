import {
  Box,
  Switch,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'

import { Form, useWatch, useForm, HiddenField } from '@redwoodjs/forms'
import FormControl from 'src/components/FormControl/FormControl'
import TextField from 'src/components/TextInputField/TextInputField'
import TextAreaField from 'src/components/TextAreaField/TextAreaField'
import SubmitFormButton from '../SubmitFormButton/SubmitFormButton'
import MediaSelector from '../MediaSelector/MediaSelector'
//import MediaSelector from '../IpfsMediaSelector/IpfsMediaSelector'
import CustomFormInput from '../CustomFormInput/CustomFormInput'
import { concat, flatten, isEmpty, kebabCase, omit, snakeCase } from 'lodash'
import AttributesWidget from '../AttributesWidget/AttributesWidget'
import { useStore as useAssetStore } from 'src/utils/stores/asset-form'
import { useContext, useEffect, useState } from 'react'
import { GET_ASSETS_QUERY } from 'src/utils/queries/assets'
import { CREATE_ASSET_MUTATION } from 'src/utils/mutations/assets'
import { useMutation } from '@redwoodjs/web'
import RadioCard from 'src/components/RadioCard/RadioCard'
import { ImImage, ImMagicWand } from 'react-icons/im'
import GenerativeArtLoader from '../GenerativeArtLoader/GenerativeArtLoader'
import { publish } from 'pubsub-js'
import ModalView from '../ModalView/ModalView'
import AssetsUploadTracker from '../AssetsUploadTracker/AssetsUploadTracker'
import {
  GENERATIVE_STATUS_STEPS,
  RADIO_OPTIONS,
  STORAGE_OPTIONS,
  TOPIC,
} from './presets'
import { useSteps } from 'chakra-ui-steps'
import { useStore } from 'src/utils/stores/ui'
import { WarningTwoIcon } from '@chakra-ui/icons'
import { useUploadFile } from 'react-firebase-hooks/storage'
import { ref } from 'firebase/storage'
import { IGenerativeInputType } from 'src/types'
import { CloudStorage } from 'src/utils/firebase/provider'

const ASSET_FOLDER = 'assets'

type AssetFormType = {
  onClose: () => void
}

export default function AssetForm({ onClose }: AssetFormType) {
  const { selectedAsset, setAsset } = useAssetStore((s) => s)
  const storage = useContext(CloudStorage)
  const { traitUploads, clearTraits, account } = useStore((s) => s)
  const [uploadFile, uploading, snapshot, error] = useUploadFile()
  const formMethods = useForm({ defaultValues: JSON.parse(selectedAsset) })
  const disclosure = useDisclosure()
  const [state, setState] = useState<'loading' | 'error' | null>(null)
  const [steps, setSteps] = useState(GENERATIVE_STATUS_STEPS)
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

  const stepsProps = useSteps({ initialStep: 0 })

  const onSubmit = async (input: IGenerativeInputType) => {
    // normalize size to number
    input.size = +input.size

    const folderPath = `${account}/${snakeCase(input.name)}/`
    try {
      setState('loading')
      disclosure.onOpen()
      switch (input.assetType) {
        case 'generative':
          setSteps(GENERATIVE_STATUS_STEPS)
          const allTraits = flatten(input.layers.map((layer) => layer.traits))

          if (process.env.NODE_ENV !== 'development') {
            const result = await Promise.all(
              allTraits.map(async (item: { file: File; trait: string }) => {
                const storageRef = ref(
                  storage,
                  `${folderPath}${item.trait}.png`
                )
                return await uploadFile(storageRef, item.file, {
                  contentType: 'image/png',
                })
              })
            )
            console.log(result)
          }

          stepsProps.nextStep()
          const traits = allTraits.map((trait, index) => {
            return {
              ...omit(trait, ['file']),
              ...{ name: trait.file.name, group: trait.id.split('-')[0] },
            }
          })

          const configJSON = { ...omit(input, ['layers']), ...{ traits } }
          const storageRef = ref(storage, `${folderPath}config.json`)
          const content = new Blob([JSON.stringify(configJSON)], {
            type: 'application/json',
          })

          const result2 = await uploadFile(storageRef, content, {
            contentType: 'application/json',
          })

          console.log(result2)
          stepsProps.nextStep()
          break
      }
      //set loading state
      //setState("loading")
      //open tracking dialog
      //disclosure.onOpen()
      //step 1: upload image files to cloud store
      //publish(TOPIC, 'upload')
      //const result = traitUploads
      // Promise.allSettled(traitUploads).then(r=>{
      //   console.log(r)
      // })
      //steps.nextStep()
      //step 2:upload configuration file to cloud store
      //step 3: send message to cloud pipeline to generate images and upload to web3 storage
      //step 4: clean up files from cloud storage and store relevant info in postgress for reading
    } catch (e) {
      console.log(e)
    }
    //console.log(input)
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
      //snapshot.task.cancel()
      clearTraits()
      setAsset(JSON.stringify(omit(formMethods.getValues(), ['layers'])))
    }
  }, [])

  return (
    <>
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
                label="Collection size"
                name="size"
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
      <ModalView closeOnOverlayClick={false} {...disclosure}>
        <AssetsUploadTracker state={state} steps={steps} {...stepsProps} />
      </ModalView>
    </>
  )
}
