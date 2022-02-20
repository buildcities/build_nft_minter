

import Moralis from 'moralis'
import { useEffect, useState } from 'react'
import { Web3ProviderContextType } from 'src/types'

export const Web3ProviderContext = React.createContext<Web3ProviderContextType>(null)
const Web3Provider: React.FC = ({ children }) => {

  const [chain, setChain] = useState(null)
  const [account, setAccount] = useState(null)
  useEffect(() => {
    const deactivateUnsubscribe = Moralis.onChainChanged((result) => {
      setChain(result)
    });

    const activateUnsubscribe = Moralis.onAccountChanged((result) => {
      setAccount(result)
    });


    return () => {
      deactivateUnsubscribe()
      activateUnsubscribe()
    }
  }, [])

  return (
    <Web3ProviderContext.Provider value={{ account, chain }} >
      {children}
    </Web3ProviderContext.Provider>
  )
}


export default Web3Provider
