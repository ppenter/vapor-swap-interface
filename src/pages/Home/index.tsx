import { Wrapper } from 'pages/Pool/styleds'
import { Info } from 'react-feather'
import ReactGA from 'react-ga'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled, { ThemeContext } from 'styled-components'
import SwapHeader from '../../components/swap/SwapHeader'
import AppBody from '../AppBody'
import { Currency, CurrencyAmount, Token } from 'sdk-core/entities'
import useDebounce from 'hooks/useDebounce'
import { Evmos } from 'constants/native-token'
import { useActiveWeb3React } from 'hooks/web3'
import { ChainId } from 'constants/chains'
import { filterTokens, useSortedTokensByQuery } from 'components/SearchModal/filtering'
import { useTranslation } from 'react-i18next'
import { useAllTokens, useIsUserAddedToken, useToken } from 'hooks/Tokens'
import { isAddress } from 'utils'
import { useTokenComparator } from 'components/SearchModal/sorting'
import { FixedSizeList } from 'react-window'
import useTheme from 'hooks/useTheme'
import { Text } from 'rebass'
import CurrencyLogo from 'components/CurrencyLogo'
import { indexOf } from 'lodash'
import { useUSDCValue } from 'hooks/useUSDCPrice'
import { Field } from 'state/swap/actions'
import useWrapCallback from 'hooks/useWrapCallback'
import useUSDCPrice from '../../hooks/useUSDCPrice'

const StyledInfo = styled(Info)`
  opacity: 0.4;
  color: ${({ theme }) => theme.text1};
  height: 16px;
  width: 16px;
  :hover {
    opacity: 0.8;
  }
`

const Tux = styled.img`
  position: absolute;
  height: 250px;
  margin-top: -140px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none
  `};
`

export default function Home({ history }: RouteComponentProps) {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const theme = useTheme()

  // refs for fixed size lists
  const fixedList = useRef<FixedSizeList>()

  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedQuery = useDebounce(searchQuery, 200)

  const [invertSearchOrder] = useState<boolean>(false)

  const allTokens = useAllTokens()

  // if they input an address, use it
  const isAddressSearch = isAddress(debouncedQuery)

  const searchToken = useToken(debouncedQuery)

  const searchTokenIsAdded = useIsUserAddedToken(searchToken)

  useEffect(() => {
    if (isAddressSearch) {
      ReactGA.event({
        category: 'Currency Select',
        action: 'Search by address',
        label: isAddressSearch,
      })
    }
  }, [isAddressSearch])

  const tokenComparator = useTokenComparator(invertSearchOrder)

  const filteredTokens: Token[] = useMemo(() => {
    return filterTokens(Object.values(allTokens), debouncedQuery)
  }, [allTokens, debouncedQuery])

  const sortedTokens: Token[] = useMemo(() => {
    return filteredTokens.sort(tokenComparator)
  }, [filteredTokens, tokenComparator])

  const filteredSortedTokens = useSortedTokensByQuery(sortedTokens, debouncedQuery)

  const filteredSortedTokensWithETH: Currency[] = useMemo(() => {
    const s = debouncedQuery.toLowerCase().trim()
    if (['', 'p', 'ph', 'pho', 'phot', 'photo', 'photon', 't', 'te', 'tel', 'telo', 'telos'].includes(s)) {
      return [Evmos.onChain(chainId || ChainId.MAINNET), ...filteredSortedTokens]
    }
    return filteredSortedTokens
  }, [chainId, debouncedQuery, filteredSortedTokens])

  return (
    <>
      <AppBody maxWidth="1000px">
        <>
          {Object.keys(allTokens).map((address, index) => {
            const token = allTokens[address]
          })}
        </>
      </AppBody>
    </>
  )
}
