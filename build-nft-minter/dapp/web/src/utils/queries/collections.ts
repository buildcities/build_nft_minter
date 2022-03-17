export const GET_COLLECTIONS_QUERY = gql`
  query CollectionsQuery($owner: String, $chain: String) {
    collections(owner: $owner, chain: $chain) {
      id
      owner
      contractAddress
      symbol
      name
    }
  }
`
