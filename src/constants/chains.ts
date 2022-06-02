export enum ChainId {
  MAINNET = 40,
  TESTNET = 41,
}

export const NATIVE_TOKEN: Record<ChainId, string> = {
  [ChainId.MAINNET]: 'TELOS',
  [ChainId.TESTNET]: 'tTELOS',
}

export const NETWORK_URLS: {
  [chainId in ChainId]: string
} = {
  [ChainId.MAINNET]: `https://mainnet.telos.net/evm`,
  [ChainId.TESTNET]: `https://testnet.telos.net/evm`,
}
