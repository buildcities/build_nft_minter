declare module 'Moralis' {
  export type ExecuteFunctionResult = {
    wait: () => Promise<unknown>
  }
}
