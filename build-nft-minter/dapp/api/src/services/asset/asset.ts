import { createClient } from '@supabase/supabase-js'
const storage = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
).storage

const BUCKET_NAME = 'nft'
const EMPTY = '.emptyFolderPlaceholder'

const prepareCategoryName = (path: string, toBeRemoved: string) =>
  path.replace(toBeRemoved, '')

const getExtFromType = (type: string) => {
  switch (type) {
    case 'video':
      return '.mp4'
    default:
      return '.png'
  }
}

export const assets = async ({ type }) => {
  const folderPath = `${type}`
  const files = await storage.from(BUCKET_NAME).list(folderPath)
  return await Promise.all(
    files.data
      .filter((x) => x.name != EMPTY)
      .map(async (item) => {
        const category = prepareCategoryName(item.name, getExtFromType(type))
        const source = storage
          .from(BUCKET_NAME)
          .getPublicUrl(`${folderPath}/${item.name}`).publicURL
        return { id: item.id, type, category, source }
      })
  )
}
