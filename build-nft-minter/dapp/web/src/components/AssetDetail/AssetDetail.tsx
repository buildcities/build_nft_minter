import { VStack } from '@chakra-ui/react'
import { Form, HiddenField, useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { kebabCase } from 'lodash'
import { useEffect } from 'react'
import { UPDATE_ASSET_MUTATION } from 'src/utils/mutations/assets'
import { GET_ASSETS_QUERY } from 'src/utils/queries/assets'
import { useStore } from 'src/utils/stores/asset-form'
import MediaSelector from '../MediaSelector/MediaSelector'
import SubmitFormButton from '../SubmitFormButton/SubmitFormButton'

type AssetDetailType = {
  id: number
  assetLink: string
  isDynamic: boolean
  name: string
  mediaType: string
}

const AssetDetail = ({ onClose }) => {
  const formMethods = useForm()
  const [update, { loading }] = useMutation(UPDATE_ASSET_MUTATION)
  const { selectedAsset, setAsset } = useStore((s) => s)
  const { assetLink, name, mediaType, id } = JSON.parse(
    selectedAsset
  ) as AssetDetailType

  useEffect(() => {
    return () => {
      setAsset(null)
    }
  }, [])

  const onSubmit = async (input) => {
    await update({
      variables: { id, input },
      refetchQueries: [GET_ASSETS_QUERY],
    })
    onClose && onClose()
  }

  const onMediaTypeChange = (payload: string) => {
    payload && formMethods.setValue('mediaType', payload)
  }

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit}>
      <VStack gap={5}>
        <MediaSelector
          name="media-selector"
          value={assetLink}
          path="minty"
          filename={kebabCase(name)}
          mediaType={mediaType}
          onTypeChange={onMediaTypeChange}
        />
        <HiddenField defaultValue={mediaType} name="mediaType" />
        <SubmitFormButton isBusy={loading}>Commit changes</SubmitFormButton>
      </VStack>
    </Form>
  )
}

export default AssetDetail
