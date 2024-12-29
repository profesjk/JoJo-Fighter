import { updateConfig, config } from '@repo/config-contract';
import { ethers } from 'hardhat';
async function deployMugshot() {
    const [owner] = await ethers.getSigners();

    const brtrBytes = await ethers.getContractFactory('B3TRBite');

    const brtrBytesInstance = await brtrBytes.deploy(
        config.TOKEN_ADDRESS,
    );

    const brtrBytesAddress = await brtrBytesInstance.getAddress();

    console.log(`B3TRBite deployed to: ${brtrBytesAddress}`);

    updateConfig({
        ...config,
        CONTRACT_ADDRESS: brtrBytesAddress,
    });
}

deployMugshot()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
