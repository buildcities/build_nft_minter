import Moralis from 'moralis'
import { useEffect, useState } from 'react'
import { Web3ProviderContextType } from 'src/types'

export const Web3ProviderContext =
  React.createContext<Web3ProviderContextType>(null)
const Web3Provider: React.FC = ({ children }) => {
  const [chain, setChain] = useState(Moralis?.chainId)
  const [account, setAccount] = useState(Moralis?.account)

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

  useEffect(() => {
    const loginUnsubscribe = Moralis.onWeb3Enabled(() => {
      setChain(getActiveChain(Moralis.chainId))
      setAccount(Moralis.account)
    })

    const logOutUnsubscribe = Moralis.onWeb3Deactivated(() => {
      setChain(null)
      setAccount(null)
      //navigate(routes.reAuth())
    })

    const deactivateUnsubscribe = Moralis.onChainChanged((result) => {
      setChain(getActiveChain(result))
    })

    const activateUnsubscribe = Moralis.onAccountChanged((result) => {
      setAccount(result)
    })

    Moralis.isWeb3Enabled()

    return () => {
      deactivateUnsubscribe()
      activateUnsubscribe()
      loginUnsubscribe()
      logOutUnsubscribe()
    }
  }, [])

  return (
    <Web3ProviderContext.Provider value={{ account, chain }}>
      {children}
    </Web3ProviderContext.Provider>
  )
}

export default Web3Provider
