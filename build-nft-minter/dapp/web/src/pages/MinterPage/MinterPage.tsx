import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import Moralis from 'moralis'
import { useEffect } from 'react'
import MinterForm from 'src/components/MinterForm/MinterForm'
import { formInputs } from 'src/types'
import { mintNFT, getWeb3Client } from 'src/utils'
import { useAuth } from '@redwoodjs/auth'

const MinterPage = () => {
  const { getCurrentUser } = useAuth()
  useEffect(() => {
    //console.log(getCurrentUser().then(c=>console.log(c)))
    Moralis.Web3API.account
      .getTokenTransfers({
        chain: 'rinkeby',
        address: '0xacd97e33b4e4c82166a9d9f9d3f956224f81e762',
      })
      .then((item) => {
        console.log(item)
      })
    //console.log(nfts)

    return () => {}
  }, [])

  const onSubmit = async (payload: formInputs) => {
    const result = await mintNFT(payload)
    console.log(result)
  }
  return <MinterForm onSubmit={onSubmit} />
}

export default MinterPage
