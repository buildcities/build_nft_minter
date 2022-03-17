import type { CollectionsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { GET_COLLECTIONS_QUERY } from 'src/utils/queries/collections'
import SelectField from 'src/components/SelectInputField/SelectInputField'
import { Button, VStack } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { navigate, routes } from '@redwoodjs/router'
import { pick } from 'lodash'

export const QUERY = GET_COLLECTIONS_QUERY

export const Loading = () => <div>Loading...</div>

export const Empty = (props) => {
  const onClick = () => {
    navigate(routes.collections())
  }
  return (
    <VStack align={'start'} w="full">
      <SelectField validation={{ required: true }} {...pick(props, ['name', 'onChange', 'value'])}>
        <option value="">Rarible collection</option>
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

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  collections,
  ...props
}: CellSuccessProps<CollectionsQuery>) => {
  const onClick = () => {
    navigate(routes.collections())
  }
  return (
    <VStack align={'start'} w="full">
      <SelectField {...pick(props, ['name', 'onChange', 'value'])}>
        <option value="">Rarible collection</option>
        {collections.map((item) => {
          return (
            <option key={item.id} value={item.contractAddress}>
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
        Create new collection
      </Button>
    </VStack>
  )
}
