import { ChainId } from './chains'
import { Token } from '../sdk-core/entities/token'
import { NativeCurrency } from '../sdk-core/entities/nativeCurrency'
import invariant from 'tiny-invariant'
import { WETH9_ADDRESS } from './addresses'

export const WTLOS = {
  // Mainly for unit tests
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, WETH9_ADDRESS[ChainId.MAINNET], 18, 'WTLOS', 'Wrapped TELOS'),
  [ChainId.TESTNET]: new Token(
    ChainId.TESTNET,
    WETH9_ADDRESS[ChainId.TESTNET],
    18,
    'WTLOS',
    'Wrapped TELOS',
    'https://s2.coinmarketcap.com/static/img/coins/200x200/4660.png'
  ),
}
export const WETH9 = WTLOS

export class Evmos extends NativeCurrency {
  protected constructor(chainId: number) {
    super(chainId, 18, 'TLOS', 'TELOS', 'https://s2.coinmarketcap.com/static/img/coins/200x200/4660.png')
  }

  public get wrapped(): Token {
    const weth9 = WTLOS[this.chainId as ChainId]
    invariant(!!weth9, 'WRAPPED')
    return weth9
  }

  private static _etherCache: { [chainId: number]: Evmos } = {}

  public static onChain(chainId: number): Evmos {
    return this._etherCache[chainId] ?? (this._etherCache[chainId] = new Evmos(chainId))
  }

  public equals(other: NativeCurrency | Token): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
