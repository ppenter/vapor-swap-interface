/**
 *
 * https://github.com/diffusion-fi/v2-periphery/blob/main/scripts/config/config.ts
 *
 * When changing this also update: cypress/integration/contracts.ts
 *
 */

export const TESTNET = {
  factory: '0x57b450A6a2B11cd2D9E667e6cc5f77837Db82d54',
  weth9: '0x7f5285FA3442a666c83f15c48a2de15d40a956D1',
  router: '0xc160A766b89c73bB2Dc3fB3F01EB48914Afd3E48',
  multicall2: '0x599C48a3C1A240B4fd95146C9573cA08ac3219C8',
  rewardToken: '0x729B74611F5D85135eeE30da804A823d46e4fd54',
  secondaryRewardToken: '0x729B74611F5D85135eeE30da804A823d46e4fd54',
  miniChef: '0x3DEC5020Df69b8b1D852A722a856Af7c6873898f',
  complexRewarderTime: '0x0F696e8640371c0a183bc477D3F90F753b35986a',
  initcode: '0x7a085cdaeb3a583c2c8fbfa6a2f737d075971d93f3558513518fa39da7e43a3f',
  rewardsPerSecond: '0.11574074',
  secondRewardPerSecond: '0',
  devAddress: '0xd78958ef33F82Cfad358F2A855a06C059542598F',
}

export const MAINNET = {
  factory: '0x5E57e0897056848Ca5433f825977534F7181aB97',
  weth9: '0xd102ce6a4db07d247fcc28f366a623df0938ca9e',
  router: '0x7A8Ba0570A6c836a481b6F3D77D9Bde448814e49',
  multicall2: '0x77Cc76a1CB359cf1324B445ef84C98578F0EdD31',
  rewardToken: '0xAe447745bd1d4259af3cF5507Aa4a4359000519d',
  secondaryRewardToken: '0xAe447745bd1d4259af3cF5507Aa4a4359000519d',
  miniChef: '0x1B7e7ad8714793a304a0dc91499227920d05FBdb',
  complexRewarderTime: '0x4095F3bB4FC610b67D684Cd6CDd1A876e3111d4b',
  initcode: '0x7a085cdaeb3a583c2c8fbfa6a2f737d075971d93f3558513518fa39da7e43a3f',
  rewardsPerSecond: '0.11574074',
  secondRewardPerSecond: '0',
  devAddress: '0xc9A4b06884488A5976A29297452CDa58d7Ca061E',
}
