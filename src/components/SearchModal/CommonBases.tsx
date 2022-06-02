import React from 'react'
import { Text } from 'rebass'
import { Currency, currencyEquals, Token } from '@uniswap/sdk-core'
import styled from 'styled-components/macro'

import { ChainId } from 'constants/chains'
import { SUGGESTED_BASES } from '../../constants/routing'
import { AutoColumn } from '../Column'
import QuestionHelper from '../QuestionHelper'
import { AutoRow } from '../Row'
import CurrencyLogo from '../CurrencyLogo'
import { Evmos, EVMOS, WETH9 } from '../../constants/tokens'

const BaseWrapper = styled.div<{ disable?: boolean }>`
  border: 1px solid ${({ theme, disable }) => (disable ? 'transparent' : 'transparent')};
  border-radius: 8px;
  display: flex;
  padding: 6px;
  color: ${({ theme, disable }) => (disable ? theme.text3 : theme.text1)};
  align-items: center;
  :hover {
    cursor: ${({ disable }) => !disable && 'pointer'};
    background-color: ${({ theme, disable }) => !disable && theme.primaryTransparent};
  }

  background-color: ${({ theme, disable }) => disable && theme.bg3};
  opacity: ${({ disable }) => disable && '0.4'};
`

export default function CommonBases({
  chainId,
  onSelect,
  selectedCurrency,
}: {
  chainId?: ChainId
  selectedCurrency?: Currency | null
  onSelect: (currency: Currency) => void
}) {
  return (
    <AutoColumn gap="md">
      <AutoRow>
        <Text fontWeight={500} fontSize={14}>
          Common bases
        </Text>
        <QuestionHelper text="These tokens are commonly paired with other tokens." />
      </AutoRow>
      <AutoRow gap="4px">
        <BaseWrapper
          onClick={() => {
            if (chainId) {
              const photon = Evmos.onChain(chainId || ChainId.MAINNET)
              if (!selectedCurrency || !currencyEquals(selectedCurrency, photon)) {
                onSelect(photon)
              }
            }
          }}
          disable={selectedCurrency?.isNative}
        >
          <CurrencyLogo currency={EVMOS} style={{ marginRight: 8 }} />
          <Text fontWeight={500} fontSize={16}>
            {EVMOS.symbol}
          </Text>
        </BaseWrapper>
        {(typeof chainId === 'number' ? SUGGESTED_BASES[chainId] ?? [] : []).map((token: Token) => {
          const selected = selectedCurrency?.isToken && selectedCurrency.address === token.address
          if (token == WETH9[chainId ? chainId : 41]) {
            return null
          }
          return (
            <BaseWrapper onClick={() => !selected && onSelect(token)} disable={selected} key={token.address}>
              <CurrencyLogo currency={token} style={{ marginRight: 8 }} />
              <Text fontWeight={500} fontSize={16}>
                {token.symbol}
              </Text>
            </BaseWrapper>
          )
        })}
      </AutoRow>
    </AutoColumn>
  )
}
