import axios from 'axios'

export const pinJSONToIPFS = async (JSONBody: any) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  const pinataContent = JSONBody
  const pinataMetadata = { name: 'Build NFT Token' }

  const result= await axios.post(
    url,
    { pinataMetadata, pinataContent },
    {
      headers: {
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_API_SECRET,
      },
    }
  )
  return result.data
}
