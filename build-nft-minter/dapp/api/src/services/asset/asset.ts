import { createClient } from '@supabase/supabase-js'
import cloudinary from 'cloudinary'
//import {promisify} from 'util'
//onst ResourcesByTag = promisify(cloudinary.v2.api.resources_by_tag)

const storage = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
).storage

const BUCKET_NAME = 'nft'
const EMPTY = '.emptyFolderPlaceholder'

const prepareCategoryName = (path: string, toBeRemoved: string) =>
  path.replace(toBeRemoved, '')



export const assets = async ({ type }) => {
  const folderPath = `${type}`
  return await new Promise((resolve, reject) => {
    cloudinary.v2.api.resources_by_tag(
      'build_',
      { resource_type: 'video' },
      function (err, res) {
        console.log(res)
        if (res?.resources) {
          const result = res?.resources.map((item) => ({
            id: item.asset_id,
            type,
            category: prepareCategoryName(item.public_id,'nft/'),
            source: item.secure_url,
          }))
          resolve(result)
        }
        reject(err || new Error('Failed to get assets'))
      }
    )
  })

  // const files = await storage.from(BUCKET_NAME).list(folderPath)
  // return await Promise.all(
  //   files.data
  //     .filter((x) => x.name != EMPTY)
  //     .map(async (item) => {
  //       const category = prepareCategoryName(item.name, getExtFromType(type))
  //       const source = storage
  //         .from(BUCKET_NAME)
  //         .getPublicUrl(`${folderPath}/${item.name}`).publicURL
  //       return { id: item.id, type, category, source }
  //     })
  // )
}
