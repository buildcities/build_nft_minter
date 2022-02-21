import { navigate, routes } from '@redwoodjs/router'
import Moralis from 'moralis'
import { useEffect } from 'react'
import { getActiveChain } from 'src/utils'
import { useStore } from 'src/utils/stores/ui'

const logOutUnsubscribe = Moralis.onWeb3Deactivated(() => {
  navigate(routes.reAuth())
})
const deactivateUnsubscribe = Moralis.onChainChanged((result) => {
  console.log(Moralis.web3.network.name)
  useStore.getState().setChain(getActiveChain(result))
})
const activateUnsubscribe = Moralis.onAccountChanged((result) => {
  useStore.getState().setAccount(result)
})
const loginUnsubscribe = Moralis.onWeb3Enabled(() => {
  useStore.getState().setChain(getActiveChain(Moralis.chainId))
  useStore.getState().setAccount(Moralis.account)
})

const Web3Provider: React.FC = ({ children }) => {
  useEffect(() => {
    return () => {
      logOutUnsubscribe()
      deactivateUnsubscribe()
      activateUnsubscribe()
      loginUnsubscribe()
    }
  }, [])

  return <div>{children}</div>
}

export default Web3Provider
