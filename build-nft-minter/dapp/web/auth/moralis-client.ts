import { Moralis } from 'moralis'
//import { AuthenticateOptions } from 'moralis'

const login = async (options?: any) => {
  return await Moralis.authenticate(options)
}

const logout = async () => {
  return await Moralis.User.logOut()
}

const getToken =  async () => {
  return Moralis.User.current().getSessionToken()
}

const getUserMetadata = async () => {
  return Moralis.User.current()
}

export const init = (serverUrl: string, appId: string) => {
  Moralis.start({ serverUrl, appId })
  return { login, logout, getToken, getUserMetadata }
}

