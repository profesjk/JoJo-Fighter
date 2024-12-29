import { updateConfig, config } from '@repo/config-contract';
import { ethers } from 'hardhat';

async function deployToken() {
    const [owner] = await ethers.getSigners();

    const b3trToken = await ethers.getContractFactory('B3TR');
    const tokenInstance = await b3trToken.deploy(owner);

    const tokenAddress = await tokenInstance.getAddress();

    console.log(`Token deployed to: ${tokenAddress}`);

    updateConfig({
        ...config,
        TOKEN_ADDRESS: tokenAddress,
    });
}

deployToken()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
