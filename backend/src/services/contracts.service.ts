import { ADMIN_ADDRESS, ADMIN_PRIVATE_KEY, REWARD_AMOUNT } from '@/config';
import { HttpException } from '@/exceptions/HttpException';
import { Submission } from '@/interfaces/submission.interface';
import { thor } from '@/utils/thor';
import { Service } from 'typedi';
import { B3TRBiteABI } from '@/utils/const';
import { ethers } from 'ethers';
import { config } from '@repo/config-contract';
import { TransactionHandler, clauseBuilder, coder } from '@vechain/sdk-core';
@Service()
export class ContractsService {
  public async registerSubmission(submission: Submission, donationValue: number, foodDescription: string): Promise<void> {
    const clause = clauseBuilder.functionInteraction(config.CONTRACT_ADDRESS, coder.createInterface(B3TRBiteABI).getFunction('registerDonation'), [
      '0xf55575ba1F805fD0f4492c2EEB3635f5625540Be',
      `${donationValue}`,
      foodDescription,
    ]);

    //commenting as the gas estimation is throwing error defaulting to 300000
    //const gasResult = await thor.gas.estimateGas([clause], ADMIN_ADDRESS);
    //if (gasResult.reverted === true) throw new HttpException(500, `EcoEarn: Internal server error: ${gasResult.revertReasons}`);

    const txBody = await thor.transactions.buildTransactionBody([clause], 300000);

    const signedTx = TransactionHandler.sign(txBody, Buffer.from(ADMIN_PRIVATE_KEY));

    const tx = await thor.transactions.sendTransaction(signedTx);
    console.log('receipt', tx);

    const reward = clauseBuilder.functionInteraction(config.CONTRACT_ADDRESS, coder.createInterface(B3TRBiteABI).getFunction('rewardDonor'), [
      '0xf55575ba1F805fD0f4492c2EEB3635f5625540Be',
      `${Math.floor(donationValue * 0.2)}`,
    ]);

    const rewardTxBody = await thor.transactions.buildTransactionBody([reward], 300000);

    const rewardSignedTx = TransactionHandler.sign(rewardTxBody, Buffer.from(ADMIN_PRIVATE_KEY));

    const rewardTx = await thor.transactions.sendTransaction(rewardSignedTx);

    console.log('rewardTx', rewardTx);
  }
}
