import { Moralis } from 'moralis'
import { useEffect } from 'react'
import { useStore } from 'src/utils/stores/ui'
import { useAuth } from '@redwoodjs/auth'

const Web3Provider: React.FC = ({ children }) => {
  const { setAccount, setChain } = useStore((s) => s)
  const { userMetadata, isAuthenticated } = useAuth()
  const handleChainChanged = async (chainId) => {
    console.log(chainId)
    setChain(chainId)
  }

  const handleAccountsChanged = async (accounts: string[]) => {
    console.log(accounts[0])
    setAccount(accounts[0])
  }
  useEffect(() => {
    if (isAuthenticated) {
      const provider = (window as any).ethereum || Moralis.provider
      if (provider) {
        setChain(provider.chainId)
        setAccount(userMetadata.get('ethAddress'))
        provider.on('chainChanged', handleChainChanged)
        provider.on('accountsChanged', handleAccountsChanged)
      }
      return () => {
        provider.removeListener('chainChanged', handleChainChanged)
        provider.removeListener('accountsChanged', handleAccountsChanged)
      }
    }
  }, [isAuthenticated])

  return <div>{children}</div>
}

export default Web3Provider
