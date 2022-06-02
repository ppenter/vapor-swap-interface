import React, { Fragment } from 'react'
import { ButtonLight } from '../../components/Button'
import Card from '../../components/Card'
import { useActiveWeb3React } from '../../hooks/web3'
import { useWalletModalToggle } from '../../state/application/hooks'
import AppBody from '../AppBody'
export function ErrorPage() {
  const toggleWalletModal = useWalletModalToggle()
  const { account } = useActiveWeb3React()
  if (account) {
    return null
  }
  return (
    <AppBody>
      <div style={{ padding: 20 }}>Please connect to the blokcchain to view liquidity pool section.</div>

      <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
    </AppBody>
  )
}
