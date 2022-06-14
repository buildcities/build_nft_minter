import { createContext } from 'react'
import { storage } from './api'
export const CloudStorage = createContext(undefined)

export const CloudStorageProvider = (props) => {
  return (
    <CloudStorage.Provider value={storage}>
      {props.children}
    </CloudStorage.Provider>
  )
}
