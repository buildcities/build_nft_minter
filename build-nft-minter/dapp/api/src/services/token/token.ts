import { fetchOwnedTokens } from 'src/lib/utils'

const BUCKET_NAME = 'nft'
const EMPTY = '.emptyFolderPlaceholder'

export const tokens = async ({ owner, chain }) => {
  return await fetchOwnedTokens(owner, chain)
}

// export const mintToken = async ({ data, owner, chain }) => {
//   await initMoralis()
//   try {
//     const result = await mintNFT(data, owner, chain)
//     return {result:'Success'}
//   } catch (e) {
//     throw new Error(e)
//   }
// }
