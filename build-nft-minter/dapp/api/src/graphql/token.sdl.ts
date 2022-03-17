export const schema = gql`
  type Token {
    id: String!
    name: String
    description: String
    assetLink: String
    mediaLink: String
    mediaType: String
    tokenId: String
    contractAddress: String
    owner: String
    attributes: JSON
    blockNumber: String
    contractType: String
    symbol: String
    tokenName: String
  }

  type Query {
    tokens(owner: String!, chain: String, tokenContract: String): [Token!]
      @skipAuth
    collectionTokens(collectionId: String!, chain: String!): [Token!] @skipAuth
  }

  # input TokenInput{
  #   qty: Int!
  #   name: String!
  #   type: CATEGORY!
  #   tokenType: TOKENTYPE!
  #   showPrice: Boolean
  #   price: Float
  #   royaltiesAmount: Int
  #   mediaFormat: MEDIATYPE!
  # }

  # enum TOKENTYPE{
  #   ERC1155
  #   ERC721
  # }

  # type mintTokenResult{
  #   result: String!
  # }

  # enum MEDIATYPE{
  #   video
  #   image
  # }

  # type Mutation {
  #   mintToken(data:TokenInput!,owner:String!,chain:String!):mintTokenResult! @skipAuth
  # }
`
