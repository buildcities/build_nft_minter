import { initializeApp } from 'firebase/app'
import { connectStorageEmulator, getStorage } from 'firebase/storage'
import { createContext } from 'react'

const config = {
  apiKey: 'AIzaSyDVj0pd5-qLffSbkz7PRBvAVqgaHmKJLG4',
  //authDomain: 'minty-app-347315.firebaseapp.com',
  authDomain: 'minty-app-347315.firebaseapp.com',
  projectId: 'minty-app-347315',
  storageBucket: 'minty-app-347315.appspot.com',
  messagingSenderId: '411428175325',
  appId: '1:411428175325:web:5d9a84b06c91f44dbb8a34',
  measurementId: 'G-WQ94ZZ8WF3',
}

const app = initializeApp(config)

export const storage = getStorage(app)
//const functions = getFunctions(config)
if (process.env.NODE_ENV === 'development') {
  connectStorageEmulator(storage, 'localhost', 9199)
  //connectFunctionsEmulator(functions, 'localhost', 5001)
}

