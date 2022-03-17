import gql from 'graphql-tag'

export const CREATE_ASSET_MUTATION = gql`
  mutation CreateAssetMutation($input: CreateAssetInput!) {
    createAsset(input: $input) {
      id
      name
    }
  }
`

export const UPDATE_ASSET_MUTATION = gql`
  mutation UpdateAssetMutation($id: Int!, $input: UpdateAssetInput!) {
    updateAsset(id: $id, input: $input) {
      id
      name
    }
  }
`
