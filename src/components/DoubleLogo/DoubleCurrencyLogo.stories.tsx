import { Story } from '@storybook/react/types-6-0'
import React from 'react'
import { USDC, WTLOS } from '../../constants/tokens'
import Component, { DoubleCurrencyLogoProps } from './index'

export default {
  title: 'DoubleCurrencyLogo',
  decorators: [],
}

const Template: Story<DoubleCurrencyLogoProps> = (args) => <Component {...args} />

export const DoubleCurrencyLogo = Template.bind({})
DoubleCurrencyLogo.args = {
  currency0: WTLOS[40],
  currency1: USDC[40],
  size: 220,
}
