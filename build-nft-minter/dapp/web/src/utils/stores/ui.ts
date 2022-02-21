import produce from 'immer'
import create from 'zustand'
import ls from 'localstorage-slim'
type IStore = {
  chain?: string
  account?: string
  setAccount?: (acct: string) => void
  setChain?: (chain: string) => void
}
const CHAIN_STORE_KEY = 'minty_session_chain'
const ACCT_STORE_KEY = 'minty_user_address'

export const useStore = create<IStore>((set) => ({
  chain: ls.get(CHAIN_STORE_KEY),
  account: ls.get(ACCT_STORE_KEY),
  setAccount: (acct) =>
    set(
      produce((draft) => {
        draft.account = acct
        ls.set(ACCT_STORE_KEY, acct)
      })
    ),
  setChain: (chain) =>
    set(
      produce((draft) => {
        draft.chain = chain
        ls.set(CHAIN_STORE_KEY, chain)
      })
    ),
}))
