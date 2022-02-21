import { navigate, routes } from '@redwoodjs/router'
import Moralis from 'moralis'
import { useEffect, useState } from 'react'
import { Web3ProviderContextType } from 'src/types'
import { getWeb3Client } from 'src/utils'

const getActiveChain = (chainId: string) => {
  switch (chainId) {
    case '0x1':
      return 'homestead'
    case '0x4':
      return 'rinkeby'
    default:
      window.alert('Supported chains are rinkeby and mainnet!')
  }
}

export const Web3ProviderContext = React.createContext<Web3ProviderContextType>(
  { chain: Moralis.chainId, account: Moralis.account }
)
const Web3Provider: React.FC = ({ children }) => {
  const [chain, setChain] = useState(Moralis?.chainId)
  const [account, setAccount] = useState(Moralis?.account)


  useEffect(() => {
    const logOutUnsubscribe = Moralis.onWeb3Deactivated(() => {
      navigate(routes.reAuth())
    })
    return () => {
      logOutUnsubscribe()
    }
  }, [])

  useEffect(() => {
    console.log('hello')
    const deactivateUnsubscribe = Moralis.onChainChanged((result) => {
      setChain(getActiveChain(result))
    })

    return () => {
      deactivateUnsubscribe()
    }
  }, [])

  useEffect(() => {
    console.log('welcome')
    const activateUnsubscribe = Moralis.onAccountChanged((result) => {
      setAccount(result)
    })

    return () => {
      activateUnsubscribe()
    }
  }, [])

  useEffect(() => {
    console.log('and goodbye!')
    const loginUnsubscribe = Moralis.onWeb3Enabled(() => {
      console.log('enabled')
      setChain(getActiveChain(Moralis.chainId))
      setAccount(Moralis.account)
    })
    return () => {
      loginUnsubscribe()
    }
  }, [])

  return (
    <Web3ProviderContext.Provider value={{ account, chain }}>
      {children}
    </Web3ProviderContext.Provider>
  )
}

export default Web3Provider
