import { Token } from '@uniswap/sdk-core'

import { WTLOS, WETH9, Evmos } from './native-token'

import { ChainId } from 'constants/chains'
import { MAINNET, TESTNET } from './periphery'

export { WETH9, WTLOS, Evmos }

export const EVMOS = Evmos.onChain(ChainId.MAINNET)

export const USDC = {
  //@TODO: FIX MAINNET
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b', 18, 'USDC', 'USDC'),
  [ChainId.TESTNET]: new Token(ChainId.TESTNET, TESTNET.rewardToken, 18, 'MUSDC', 'Mock USDC'),
}
export const VAPOR = makeToken(
  'Vapor Token',
  'VAPOR',
  18,
  {
    //@TODO: FIX MAINNET & RINKEBY
    [ChainId.MAINNET]: MAINNET.rewardToken,
    [ChainId.TESTNET]: TESTNET.rewardToken,
  },
  'https://ipfs.io/ipfs/QmcypttattxbW2QusdbnbowUZ4CgF8AdL47YywjdMt4dNk'
)

function makeToken(
  name: string,
  symbol: string,
  decimals: number,
  addresses: Record<ChainId, string>,
  logoURI?: string
) {
  return {
    [ChainId.MAINNET]: new Token(ChainId.MAINNET, addresses[ChainId.MAINNET], decimals, symbol, name, logoURI),
    [ChainId.TESTNET]: new Token(ChainId.TESTNET, addresses[ChainId.TESTNET], decimals, symbol, name, logoURI),
  }
}
