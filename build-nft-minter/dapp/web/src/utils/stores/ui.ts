import { UploadResult } from 'firebase/storage'
import produce from 'immer'
import create from 'zustand'

type IStore = {
  chain?: string
  account?: string
  setAccount?: (acct: string) => void
  setChain?: (chain: string) => void
  setTraits?: (traits: Promise<UploadResult>) => void
  clearTraits?:()=>void,
  traitUploads?: Promise<UploadResult>[]
}

export const useStore = create<IStore>((set) => ({
  chain: null,
  account: null,
  traitUploads: [],
  setTraits:(trait:Promise<UploadResult>)=>set(produce((draft)=>{
    draft.traitUploads.push(trait)
  })),
  clearTraits:()=>set(produce((draft)=>{
    draft.traitUploads=[]
  })),
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
