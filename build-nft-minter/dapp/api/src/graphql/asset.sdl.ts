export const schema = gql`
  type Asset {
    id: String!
    type: TYPE!
    source: String!
    category: CATEGORY!
  }

  enum TYPE{
    image
    video
  }

  enum CATEGORY{
    founders
    regular
    genesis
  }

  type Query {
    assets(type:TYPE!): [Asset!] @skipAuth
  }

  type mutation {
    createAsset(type:TYPE!,category:CATEGORY!):Asset! @skipAuth
  }

  
`
