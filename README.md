# Vaporswap Interface

![Screen Shot 2565-06-03 at 14 44 05](https://user-images.githubusercontent.com/55227490/171810947-9823dd97-8ffa-41ab-af22-f85b96774862.png)

![Screen Shot 2565-06-03 at 14 43 45](https://user-images.githubusercontent.com/55227490/171810953-15de4634-275a-4823-9bed-a169df7e0182.png)

## Development

### Install Dependencies

```bash
yarn install
```

### Run

```bash
yarn start
```

## Contributions

**Please open all pull requests against the `main` branch.**
CI checks will run against all PRs.


## For developer

```bash

npx hardhat deploy-factory --network telostestnet

npx hardhat deploy-router --network telostestnet
npx hardhat deploy-multicall2 --network telostestnet

// Then deploy custom reward token

// Add liquidity

npx hardhat deploy-minichef --network telostestnet
npx hardhat deploy-rewarder --network telostestnet
npx hardhat set-emission --network telostestnet

npx hardhat add-pool --allocpoint 100 --lptoken **lp token address** --network telostestnet
npx hardhat add-rewarder --allocpoint 100 --pid 0 --network evmostestnet

```
