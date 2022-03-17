import type { AssetsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { GET_ASSETS_QUERY } from 'src/utils/queries/assets'
import SelectField from 'src/components/SelectInputField/SelectInputField'
import { Button, VStack } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { navigate, routes } from '@redwoodjs/router'
import { pick } from 'lodash'

export const QUERY = GET_ASSETS_QUERY

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <Button
    onClick={() => {
      navigate(routes.assets())
    }}
    rounded={'full'}
    size="xs"
    leftIcon={<AddIcon />}
    colorScheme={'green'}
  >
    Create new asset
  </Button>
)

export const Failure = ({ error, refetch }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  assets,
  ...props
}: CellSuccessProps<AssetsQuery>) => {
  const onClick = () => {
    navigate(routes.assets())
  }
  return (
    <VStack align={'start'} w="full">
      <SelectField
        validation={{ required: true }}
        {...pick(props, ['name', 'onChange', 'value'])}
      >
        {assets.map((item) => {
          return (
            <option key={item.id} value={item.metadataLink}>
              {item.name}
            </option>
          )
        })}
      </SelectField>
      <Button
        onClick={onClick}
        rounded={'full'}
        size="xs"
        leftIcon={<AddIcon />}
        colorScheme={'green'}
      >
        Create new asset
      </Button>
    </VStack>
  )
}
