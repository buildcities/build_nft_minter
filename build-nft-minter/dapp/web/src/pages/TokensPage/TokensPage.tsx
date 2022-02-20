import { useDisclosure } from '@chakra-ui/react'
import { MetaTags } from '@redwoodjs/web'
import MinterForm from 'src/components/MinterForm/MinterForm'
import CardItemButton from 'src/components/CardItemButton/CardItemButton'
import SideDrawer from 'src/components/SideDrawer/SideDrawer'
import TokenList from 'src/components/TokensCell'
import { formInputs } from 'src/types'
import { mintNFT } from 'src/utils'
import { useContext, useEffect, useState } from 'react'
import { Web3ProviderContext } from 'src/components/Web3Provider/Web3Provider'

const HEADER = 'Mint a token'

const TokensPage = () => {
  const { onOpen, ...props } = useDisclosure()
  const [busy, setBusy] = useState(false)
  const { chain, account } = useContext(Web3ProviderContext)

  useEffect(() => {
    console.log(chain)
    console.log(account)

    return () => {

    }
  }, [chain, account])


  const onSubmit = async (payload: formInputs) => {
    setBusy(true)
    const result = await mintNFT(payload)
    console.log(result)
    setBusy(false)
  }
  return (
    <>
      <MetaTags title="Tokens" description="Tokens page" />
      <TokenList owner={account} chain='rinkeby' >
        <CardItemButton onClick={onOpen} subTitle='Mint' title='New Token' />
      </TokenList>
      <SideDrawer header={HEADER}  {...props}>
        <MinterForm isBusy={busy} onSubmit={onSubmit} />
      </SideDrawer>
    </>
  )
}

export default TokensPage

