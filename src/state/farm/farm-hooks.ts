import { VAPOR } from 'constants/tokens'
import { BigNumber } from 'ethers'
import { useToken } from 'hooks/Tokens'
import { useComplexRewarderTime, useMiniChef, usePairContract } from 'hooks/useContract'
import useUSDCPrice, { useUSDCValue } from 'hooks/useUSDCPrice'
import { useV2Pair } from 'hooks/useV2Pairs'
import { useActiveWeb3React } from 'hooks/web3'
import JSBI from 'jsbi'
import { useMemo } from 'react'
import { BigintIsh } from 'sdk-core/constants'
import { CurrencyAmount, Token } from 'sdk-core/entities'
import { useSingleCallResult, useSingleContractMultipleData } from 'state/multicall/hooks'
import { useTokenBalance } from 'state/wallet/hooks'
import { isTruthy } from 'utils/isTruthy'

export function usePairTokens(pairAddress?: string) {
  const { account } = useActiveWeb3React()

  const minichef = useMiniChef()
  const pairContract = usePairContract(pairAddress)
  const token0CallAddress = useSingleCallResult(pairContract, 'token0')
  const token1CallAddress = useSingleCallResult(pairContract, 'token1')
  const token0 = useToken(token0CallAddress.result?.[0])
  const token1 = useToken(token1CallAddress.result?.[0])
  const lpToken = useToken(pairAddress)
  const availableLPAmount = useTokenBalance(account ?? undefined, lpToken ?? undefined)
  const totalPoolStaked = useTokenBalance(minichef?.address, lpToken ?? undefined)
  const [, pair] = useV2Pair(token0 ?? undefined, token1 ?? undefined)

  return {
    token0,
    token1,
    lpToken,
    pair,
    availableLPAmount,
    totalPoolStaked,
  }
}

export function usePools() {
  const { account, chainId } = useActiveWeb3React()
  const minichefContract = useMiniChef()

  const poolLength = useSingleCallResult(minichefContract, 'poolLength')
  console.log('pool length: ', poolLength)

  const poolLengthAmount = (poolLength?.result?.pools as BigNumber) || BigNumber.from(0)
  const poolIndizes = new Array(poolLengthAmount.toNumber()).fill('').map((_, id) => id)

  const poolInfos = useSingleContractMultipleData(
    minichefContract,
    'poolInfo',
    poolIndizes.map((id) => [id])
  )
  const lpTokens = useSingleContractMultipleData(
    minichefContract,
    'lpToken',
    poolIndizes.map((id) => [id])
  )

  const rewarders = useSingleContractMultipleData(
    minichefContract,
    'rewarder',
    poolIndizes.map((id) => [id])
  )

  const userInfos = useSingleContractMultipleData(
    minichefContract,
    'userInfo',
    poolIndizes.map((id) => [id, account ?? undefined])
  )

  const vaporPerSecondResponse = useSingleCallResult(minichefContract, 'vaporPerSecond')
  const vaporPerSecond = vaporPerSecondResponse.result?.[0]
    ? JSBI.BigInt(vaporPerSecondResponse.result[0].toString())
    : JSBI.BigInt(0)

  const totalAllocationResponse = useSingleCallResult(minichefContract, 'totalAllocPoint')
  const totalAllocation = totalAllocationResponse.result?.[0] as BigNumber | undefined

  const pendingArguments = account ? poolIndizes.map((pid) => [pid, account]) : []
  const pendingVapors = useSingleContractMultipleData(minichefContract, 'pendingVapor', pendingArguments)

  const pools: MinichefRawPoolInfo[] = useMemo(() => {
    return poolIndizes
      .map((poolId, idx) => {
        const lpTokenAddress = lpTokens[idx]?.result?.[0] as string | undefined
        const rewarderAddress = rewarders[idx]?.result?.[0] as string | undefined
        const poolInfo = poolInfos[idx]?.result as unknown as PoolInfo
        const userInfo = userInfos[idx]?.result as unknown as { amount: BigNumber; rewardDebt: BigNumber } | undefined
        console.log('ta: ', totalAllocation, JSBI.BigInt(0))
        const poolEmissionPerSecond =
          poolInfo?.allocPoint && totalAllocation?.gt(0) && vaporPerSecond !== JSBI.BigInt(0)
            ? JSBI.divide(
                JSBI.multiply(vaporPerSecond, JSBI.BigInt(poolInfo.allocPoint.toString())),
                JSBI.BigInt(totalAllocation.toString())
              )
            : undefined

        const poolEmissionAmount = chainId
          ? CurrencyAmount.fromRawAmount(VAPOR[chainId], poolEmissionPerSecond || 0)
          : undefined

        const pendingResult = account ? (pendingVapors[idx]?.result as unknown as { pending: BigNumber }) : undefined
        if (!lpTokenAddress || !poolInfo) {
          return null
        }

        const rawInfo: MinichefRawPoolInfo = {
          lpTokenAddress,
          rewarderAddress,
          poolInfo: {
            accVaporPerShare: poolInfo?.accVaporPerShare,
            allocPoint: poolInfo?.allocPoint,
            lastRewardTime: poolInfo?.lastRewardTime,
          },
          pendingAmount: chainId
            ? CurrencyAmount.fromRawAmount(VAPOR[chainId], JSBI.BigInt(pendingResult?.pending?.toString() || 0))
            : undefined,
          stakedRawAmount: JSBI.BigInt(userInfo?.amount.toString() || 0),
          poolEmissionAmount,
          poolId,
        }
        return rawInfo
      })
      .filter(isTruthy)
  }, [
    account,
    chainId,
    vaporPerSecond,
    lpTokens,
    pendingVapors,
    poolInfos,
    rewarders,
    totalAllocation,
    userInfos,
    poolIndizes,
  ])
  return pools.filter((pool) => pool.lpTokenAddress)
}

export function usePool(poolId: number) {
  const { account, chainId } = useActiveWeb3React()
  const minichefContract = useMiniChef()
  const poolInfos = useSingleCallResult(minichefContract, 'poolInfo', [poolId])
  const lpTokens = useSingleCallResult(minichefContract, 'lpToken', [poolId])

  const rewarders = useSingleCallResult(minichefContract, 'rewarder', [poolId])

  const userInfos = useSingleCallResult(minichefContract, 'userInfo', [poolId, account ?? undefined])

  const vaporPerSecondResponse = useSingleCallResult(minichefContract, 'vaporPerSecond')
  const vaporPerSecond = vaporPerSecondResponse.result?.[0]
    ? JSBI.BigInt(vaporPerSecondResponse.result[0].toString())
    : JSBI.BigInt(0)

  const totalAllocationResponse = useSingleCallResult(minichefContract, 'totalAllocPoint')
  const totalAllocation = totalAllocationResponse.result?.[0] as BigNumber | undefined
  const pendingVapors = useSingleCallResult(minichefContract, 'pendingVapor', [poolId, account ?? undefined])

  const lpTokenAddress = lpTokens?.result?.[0] as string | undefined
  const rewarderAddress = rewarders?.result?.[0] as string | undefined
  const poolInfo = poolInfos?.result as unknown as PoolInfo
  const userInfo = userInfos?.result as unknown as { amount: BigNumber; rewardDebt: BigNumber } | undefined

  const poolEmissionPerSecond =
    poolInfo?.allocPoint && totalAllocation && totalAllocation.gt(0)
      ? JSBI.divide(
          JSBI.multiply(vaporPerSecond, JSBI.BigInt(poolInfo.allocPoint.toString())),
          JSBI.BigInt(totalAllocation.toString())
        )
      : undefined

  const poolEmissionAmount = chainId
    ? CurrencyAmount.fromRawAmount(VAPOR[chainId], poolEmissionPerSecond || 0)
    : undefined

  const pendingResult = account ? (pendingVapors?.result as unknown as { pending: BigNumber }) : undefined
  if (!lpTokenAddress || !poolInfo) {
    return null
  }

  const rawInfo: MinichefRawPoolInfo = {
    lpTokenAddress,
    rewarderAddress,
    poolInfo: {
      accVaporPerShare: poolInfo?.accVaporPerShare,
      allocPoint: poolInfo?.allocPoint,
      lastRewardTime: poolInfo?.lastRewardTime,
    },
    pendingAmount: chainId
      ? CurrencyAmount.fromRawAmount(VAPOR[chainId], JSBI.BigInt(pendingResult?.pending?.toString() || 0))
      : undefined,
    stakedRawAmount: JSBI.BigInt(userInfo?.amount.toString() || 0),
    poolEmissionAmount,
    poolId,
  }
  return rawInfo
}

export function useRewardInfos(pid: number, rewardContractAddress?: string) {
  const { account } = useActiveWeb3React()
  const rewarderContract = useComplexRewarderTime(rewardContractAddress)
  const pendingTokens = useSingleCallResult(rewarderContract, 'pendingTokens', [pid, account ?? undefined, 0])
  const rewardToken = useToken(pendingTokens?.result?.rewardTokens[0])
  const rewardPerSecondResponse = useSingleCallResult(rewarderContract, 'rewardPerSecond')

  const poolInfos = useSingleCallResult(rewarderContract, 'poolInfo', [pid])
  const poolInfo = poolInfos?.result as unknown as PoolInfo

  const totalAllocationResponse = useSingleCallResult(rewarderContract, 'totalAllocPoint')
  const totalAllocation = totalAllocationResponse.result?.[0] as BigNumber | undefined

  const rewardPerSecondAmount = useMemo(() => {
    if (!rewardToken) {
      return undefined
    }
    const totalRewardPerSecond: JSBI = JSBI.BigInt(rewardPerSecondResponse.result?.[0].toString() || 0)
    const poolEmissionPerSecond =
      poolInfo?.allocPoint && totalAllocation && totalAllocation.gt(0) && totalRewardPerSecond
        ? JSBI.divide(
            JSBI.multiply(totalRewardPerSecond, JSBI.BigInt(poolInfo.allocPoint.toString())),
            JSBI.BigInt(totalAllocation.toString())
          )
        : JSBI.BigInt(0)

    return CurrencyAmount.fromRawAmount(rewardToken, poolEmissionPerSecond)
  }, [poolInfo?.allocPoint, rewardPerSecondResponse.result, rewardToken, totalAllocation])

  const pendingAmount = useMemo(() => {
    if (!rewardToken) {
      return undefined
    }
    return CurrencyAmount.fromRawAmount(
      rewardToken,
      JSBI.BigInt(pendingTokens?.result?.rewardAmounts?.[0].toString() || 0)
    )
  }, [pendingTokens?.result?.rewardAmounts, rewardToken])

  return {
    pendingAmount,
    rewardPerSecondAmount,
    poolInfo: {
      accEmissionPerShare: poolInfo?.accVaporPerShare,
      allocPoint: poolInfo?.allocPoint,
      lastRewardTime: poolInfo?.lastRewardTime,
    },
  }
}

export function useOwnWeeklyEmission(
  poolEmission?: CurrencyAmount<Token>,
  stakedLPAmount?: CurrencyAmount<Token>,
  totalPoolStaked?: CurrencyAmount<Token>
) {
  return useMemo(() => {
    const hypotheticalEmissionPerWeek =
      totalPoolStaked && stakedLPAmount && totalPoolStaked.greaterThan(0) && poolEmission
        ? poolEmission
            .multiply(JSBI.BigInt(60 * 60 * 24 * 7))
            .multiply(stakedLPAmount)
            .divide(totalPoolStaked)
        : poolEmission?.currency
        ? CurrencyAmount.fromRawAmount(poolEmission?.currency, JSBI.BigInt(0))
        : undefined

    return hypotheticalEmissionPerWeek
  }, [poolEmission, stakedLPAmount, totalPoolStaked])
}

export function useCalculateAPR(poolEmission?: CurrencyAmount<Token>, totalPoolStaked?: CurrencyAmount<Token>) {
  const fractionOfPool = 10000
  const onePercentOfPool = totalPoolStaked?.divide(fractionOfPool)

  const hypotheticalEmissionPerYear = poolEmission?.multiply(JSBI.BigInt(60 * 60 * 24 * 365)).divide(fractionOfPool)

  const emissionTokenPrice = useUSDCPrice(poolEmission?.currency)
  const usdValueOfStakedLP = useUSDCValue(
    poolEmission?.currency && onePercentOfPool
      ? CurrencyAmount.fromRawAmount(poolEmission?.currency, onePercentOfPool.multiply(2).quotient)
      : undefined
  )

  const apr =
    usdValueOfStakedLP &&
    hypotheticalEmissionPerYear &&
    emissionTokenPrice &&
    usdValueOfStakedLP.greaterThan(JSBI.BigInt(0))
      ? JSBI.divide(emissionTokenPrice?.quote(hypotheticalEmissionPerYear).quotient, usdValueOfStakedLP.quotient)
      : JSBI.BigInt(0)

  return apr
}

export interface MinichefRawPoolInfo {
  lpTokenAddress: string
  rewarderAddress?: string
  poolInfo: PoolInfo
  stakedRawAmount: BigintIsh
  pendingAmount?: CurrencyAmount<Token>
  poolEmissionAmount?: CurrencyAmount<Token>
  poolId: number
}

type PoolInfo = {
  accVaporPerShare: BigNumber
  allocPoint: BigNumber
  lastRewardTime: BigNumber
}
