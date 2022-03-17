export const schema = gql`
  type Collection {
    id: String!
    name: String
    symbol: String
    owner: String
    contractAddress: String
  }

  type Query {
    collections(owner: String, chain: String): [Collection!] @skipAuth
  }
`
