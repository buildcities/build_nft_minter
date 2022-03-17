import produce from 'immer'
import create from 'zustand'

type IStore = {
  selectedAsset?: string
  setAsset?: (src: string) => void
}
export const useStore = create<IStore>((set) => ({
  selectedAsset: null,
  setAsset: (src) =>
    set(
      produce((draft) => {
        draft.selectedAsset = src
      })
    ),
}))
