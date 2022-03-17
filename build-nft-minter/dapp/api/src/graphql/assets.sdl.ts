export const schema = gql`
  type Asset {
    id: Int!
    name: String!
    assetLink: String
    metadataLink: String
    walletAddress: String
    isDynamic: Boolean
    mediaType: String
  }

  type Query {
    assets(walletAddress:String):[Asset!]! @skipAuth
  }

  input CreateAssetInput {
    name: String!
    description: String
    asset: String!
    attributes: JSON
    walletAddress: String!
    isDynamic: Boolean
    mediaType: String
  }

  input UpdateAssetInput {
    mediaType: String
  }

  type Mutation {
    createAsset(input: CreateAssetInput!): Asset! @skipAuth
    updateAsset(id: Int!, input: UpdateAssetInput!): Asset! @skipAuth
  }
`
