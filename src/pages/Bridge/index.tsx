import { Wrapper } from 'pages/Pool/styleds'
import { Info } from 'react-feather'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled, { ThemeContext } from 'styled-components'
import SwapHeader from '../../components/swap/SwapHeader'
import AppBody from '../AppBody'
import getTokenList from 'utils/getTokenList'

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

export default function Bridge({ history }: RouteComponentProps) {
  return (
    <>
      <iframe
        id="rubic-widget-iframe"
        title="Rubic Widget"
        height="500"
        width="350"
        //border: 'none',border-radius: 19px; box-shadow: rgba(0, 0, 0, 0.1) 3px 3px 10px 4px; display: block;
        style={{
          border: 'none',
          borderRadius: 19,
          boxShadow: 'rgba(0,0,0,0.1) 3px 3px 10px 4px',
          paddingRight: '0%',
          marginTop: '5vh',
        }}
        src="https://widgets.rubic.exchange/?iframe=vertical&amp;amount=1&amp;background=%23181a19&amp;device=desktop&amp;eth_tokens=%5B%220xa4eed63db85311e22df4473f87ccfc3dadcfa3e3%22%5D&amp;fee=0.075&amp;feeTarget=0xc9A4b06884488A5976A29297452CDa58d7Ca061E&amp;from=BNB&amp;fromChain=BSC&amp;hideSelectionFrom=false&amp;hideSelectionTo=true&amp;language=en&amp;promoCode=XXUj5Zuu&amp;slippageCcr=5&amp;slippageIt=2&amp;theme=dark&amp;to=TLOS&amp;toChain=TELOS"
      ></iframe>
    </>
  )
}
