import produce from 'immer'
import create from 'zustand'

type IStore = {
  selectedToken?: string
  setToken?: (src: string) => void
}
export const useStore = create<IStore>((set) => ({
  selectedToken: null,
  setToken: (src) =>
    set(
      produce((draft) => {
        draft.selectedToken = src
      })
    ),
}))
