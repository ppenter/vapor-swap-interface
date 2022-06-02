import styled from 'styled-components/macro'
import { Box } from 'rebass/styled-components'

const Card = styled(Box)<{ width?: string; padding?: string; border?: string; borderRadius?: string }>`
  width: ${({ width }) => width ?? '100%'};
  border-radius: 8px;
  padding: 1rem;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  border: 1px solid ${({ theme }) => theme.dark1};
  margin-bottom: 10px;
`
export default Card

export const LightCard = styled(Card)`
  background-color: ${({ theme }) => theme.darkTransparent};
`

export const LightGreyCard = styled(Card)`
  border: 1px solid rgba(12, 92, 146, 0);
  box-shadow: 0 0 5px rgba(39, 210, 234, 0), 0 0 7px rgba(39, 210, 234, 0);
  background-color: ${({ theme }) => theme.darkTransparent};
`

export const GreyCard = styled(Card)`
  background-color: ${({ theme }) => theme.bg1};
  z-index: 3;
`

export const DarkGreyCard = styled(Card)`
  background-color: ${({ theme }) => theme.darkTransparent};
`

export const DarkCard = styled(Card)`
  background-color: ${({ theme }) => theme.bg0};
`

export const OutlineCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.bg3};
`

export const YellowCard = styled(Card)`
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.darkTransparent2} 0%, ${theme.dark5} 35%, ${theme.darkTransparent2} 100%);`};
  color: ${({ theme }) => theme.primaryText1};
  font-weight: 500;
`

export const PinkCard = styled(Card)`
  background-color: rgba(255, 0, 122, 0.03);
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;
`

export const BlueCard = styled(Card)`
  color: ${({ theme }) => theme.red1};
  border-radius: 12px;
`
