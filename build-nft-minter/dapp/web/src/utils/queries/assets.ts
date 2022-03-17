export const GET_ASSETS_QUERY = gql`
  query AssetsQuery($walletAddress: String) {
    assets(walletAddress: $walletAddress) {
      id
      assetLink
      name
      isDynamic
      mediaType
      metadataLink
    }
  }
`
