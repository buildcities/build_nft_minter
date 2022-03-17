export const GET_TOKENS_QUERY = gql`
  query TokensQuery($owner: String!, $chain: String) {
    tokens(owner: $owner, chain: $chain) {
      name
      assetLink
      description
      id
      mediaLink
      mediaType
      blockNumber
      attributes
      owner
      tokenId
      contractAddress
      contractType
      symbol
      tokenName
    }
  }
`
export const GET_COLLECTIONS_TOKEN_QUERY = gql`
  query CollectTokensQuery($collectionId: String!, $chain: String!) {
    collectionTokens(collectionId: $collectionId, chain: $chain) {
      id
      name
      description
      assetLink
      mediaLink
    }
  }
`
