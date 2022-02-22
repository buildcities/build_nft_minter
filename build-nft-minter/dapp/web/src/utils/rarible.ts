import { createRaribleSdk } from '@rarible/sdk'
import { toContractAddress, toUnionAddress } from '@rarible/types'
import { EthereumWallet } from '@rarible/sdk-wallet'
import { Blockchain, EthEthereumAssetType } from '@rarible/api-client'
import { Web3Ethereum } from '@rarible/web3-ethereum'
import Moralis from 'moralis'
import { RaribleSdkEnvironment } from '@rarible/sdk/build/config/domain'
import { PrepareMintRequest } from '@rarible/sdk/build/types/nft/mint/prepare-mint-request.type'
import Web3 from 'web3'
import { MintRequest } from '@rarible/sdk/build/types/nft/mint/mint-request.type'
import {
  MintAndSellRequest,
  MintAndSellResponse,
  PrepareMintAndSellResponse,
} from '@rarible/sdk/build/types/nft/mint-and-sell/domain'
import { MintResponse } from '@rarible/sdk/build/types/nft/mint/domain'

// const getProvider = () => {
//   // 1. Getting ethereum object out of global JS object
//   if ((window as any).ethereum) {
//     const { ethereum } = window as any

//     return ethereum
//   }
//   // 2. If ethereum property does not exist it means that user needs to install Metamask
//   else {
//     alert('Please install Metamask')
//   }
// }

const getRaribleSdk = (env: RaribleSdkEnvironment) => {
  if (Moralis.isWeb3Enabled()) {
    //const provider = getProvider()
    const web3 = new Web3(Moralis.provider as any)
    const web3Ethereum = new Web3Ethereum({ web3 })
    const ethWallet = new EthereumWallet(web3Ethereum)
    return createRaribleSdk(ethWallet, env)
  }
  return null
}

const getRaribleSdkEnv = (env: 'rinkeby' | 'homestead') => {
  switch (env) {
    case 'homestead':
      return 'prod'
    default:
      return 'staging'
  }
}

const getRaribleCollectionAddress = (
  env: 'rinkeby' | 'homestead',
  tokenType: 'ERC721' | 'ERC1155'
) => {
  switch (env) {
    case 'homestead':
      return tokenType === 'ERC721'
        ? '0xF6793dA657495ffeFF9Ee6350824910Abc21356C'
        : '0xB66a603f4cFe17e3D27B87a8BfCaD319856518B8'
    default:
      return tokenType === 'ERC721'
        ? '0x6ede7f3c26975aad32a475e1021d8f6f39c89d82'
        : '0x1AF7A7555263F275433c6Bb0b8FdCD231F89B1D7'
  }
}

const getIPFSFromUrl = (url: string) => {
  const address = url.split('/').pop()
  return `ipfs://${address}`
}

/* todo: implement choosing other tokens for listing */
export const mint = async ({
  tokenUri,
  userAddress,
  chain,
  supply = 1,
  isLazy = false,
  list = false,
  listTokenAmount = 0,
  collectionAddress,
  tokenType,
  listAssetClass = 'ETH',
  royaltiesAmount,
}: {
  tokenUri: string
  userAddress: string
  chain: 'rinkeby' | 'homestead'
  isLazy?: boolean
  supply?: number
  list?: boolean
  listTokenAmount?: number
  royaltiesAmount?: number
  listAssetClass?: string
  collectionAddress?: string
  tokenType?: 'ERC1155' | 'ERC721'
}) => {
  const address =
    collectionAddress || getRaribleCollectionAddress(chain, tokenType)
  const mintRequest: PrepareMintRequest = {
    collectionId: toContractAddress(`ETHEREUM:${address}`),
  }
  const sdk = getRaribleSdk(getRaribleSdkEnv(chain))
  //const sdk =  null
  let lazyMint: boolean = false
  let mintResponse
  let mintAndSellResponse
  if (sdk) {
    if (list && listTokenAmount) {
      mintAndSellResponse = await sdk.nft.mintAndSell(mintRequest)
    } else {
      mintResponse = await sdk.nft.mint(mintRequest)
    }

    if (mintResponse.supportsLazyMint && isLazy) {
      lazyMint = true
    }
    const price = listTokenAmount
    const creators = [
      {
        account: toUnionAddress(`ETHEREUM:${userAddress}`),
        value: 10000,
      },
    ]
    const royalties = []
    const uri = getIPFSFromUrl(tokenUri)
    const currency: EthEthereumAssetType = {
      '@type': 'ETH',
      blockchain: Blockchain.ETHEREUM,
    }

    if (list && listTokenAmount) {
      return await mintAndSellResponse.submit({
        uri,
        lazyMint,
        supply,
        creators,
        price,
        currency,
        royalties,
      })
    }
    return await mintResponse.submit({
      uri,
      lazyMint,
      supply,
      creators,
      royalties,
    })
  }
  return null
}
