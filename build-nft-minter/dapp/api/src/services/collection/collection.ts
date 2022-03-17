import { fetchOwnedCollections, fetchCollections } from 'src/lib/utils'


export const collections = async ({ owner, chain }) => {
  if (owner) return await fetchOwnedCollections(owner, chain)
  return await fetchCollections(chain)
}

