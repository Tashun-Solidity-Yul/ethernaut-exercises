const {ethers} = require("hardhat");
const hre = require("hardhat");

async function main() {
    const accounts = await ethers.getSigners();
    // const baseContractFactory = await hre.ethers.getContractFactory('GuessTheSecretNumberChallenge');
    // const payment = hre.ethers.utils.parseEther('1');
    // const provider = hre.ethers.provider;
    // const guessGameContract = await baseContractFactory.connect(accounts[1]).deploy({value: payment});
    // // const telephoneContract = await hre.ethers.getContractAt('Telephone', "0xC6bA8C3233eCF65B761049ef63466945c362EdD2");
    // //
    // await guessGameContract.deployed();
    // console.log(guessGameContract.address)
    // const balance = await provider.getBalance(accounts[2].address);
    // console.log(balance);
    // const tnx = await guessGameContract.callStatic.guess(42, {value: payment});
    // // await tnx.wait();
    // console.log(tnx);
    // const balance1 = await provider.getBalance(accounts[2].address);
    // console.log(balance1);

    const baseContractFactory = await hre.ethers.getContractFactory('FindSecretNumber');
    const guessGameContract = await baseContractFactory.connect(accounts[1]).deploy();
    await guessGameContract.deployed();

    for (let i = 0; i < 1000000000000; i++) {
        const success = await guessGameContract.callStatic.guess(i);
        if (success) {
            console.log(i);
        }
    }


}

main();