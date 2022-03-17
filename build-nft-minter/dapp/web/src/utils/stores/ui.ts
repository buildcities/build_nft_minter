import produce from 'immer'
import create from 'zustand'

type IStore = {
  chain?: string
  account?: string
  setAccount?: (acct: string) => void
  setChain?: (chain: string) => void
}

export const useStore = create<IStore>((set) => ({
  chain: null,
  account: null,
  setAccount: (acct) =>
    set(
      produce((draft) => {
        draft.account = acct
      })
    ),
  setChain: (chain) =>
    set(
      produce((draft) => {
        draft.chain = chain
      })
    ),
}))
