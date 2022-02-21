import { Box, Heading, useDisclosure } from '@chakra-ui/react'
import { MetaTags } from '@redwoodjs/web'
import MinterForm from 'src/components/MinterForm/MinterForm'
import CardItemButton from 'src/components/CardItemButton/CardItemButton'
import SideDrawer from 'src/components/SideDrawer/SideDrawer'
import TokenList from 'src/components/TokensCell'
import { formInputs } from 'src/types'
import { getWeb3Client, mintNFT } from 'src/utils'
import { useContext, useEffect, useState } from 'react'
import { Web3ProviderContext } from 'src/components/Web3Provider/Web3Provider'
import { useApolloClient } from '@apollo/client'
import Moralis from 'moralis/types'

const HEADER = 'Mint a token'

const TokensPage = () => {
  const { onOpen, onClose, ...props } = useDisclosure()
  const [busy, setBusy] = useState(false)
  const { chain, account } = useContext(Web3ProviderContext)
  const client = useApolloClient()
  const [walletActive, setwalletActive] = useState(false)

  useEffect(() => {
    const web3 = getWeb3Client()
    if (web3) {
      setwalletActive(true)
    }
  })

  const onSubmit = async (payload: formInputs) => {
    setBusy(true)
    await mintNFT(payload)
    client
      .refetchQueries({
        include: 'active',
      })
      .then(() => {
        setBusy(false)
        onClose()
      })
  }
  return (
    <Box py={[2, 5]}>
      <MetaTags title="Tokens" description="Tokens page" />
      <Heading pl={10} pb={5}>
        Tokens
      </Heading>
      {walletActive && (
        <TokenList onOpen={onOpen} owner={account} chain={chain}>
          <CardItemButton onClick={onOpen} subTitle="Mint" title="New Token" />
        </TokenList>
      )}
      <SideDrawer header={HEADER} onClose={onClose} {...props}>
        <MinterForm isBusy={busy} onSubmit={onSubmit} />
      </SideDrawer>
    </Box>
  )
}

export default TokensPage
