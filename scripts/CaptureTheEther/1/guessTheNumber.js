const {ethers} = require("hardhat");
const hre = require("hardhat");

async function main() {
    const accounts = await ethers.getSigners();
    const baseContractFactory = await hre.ethers.getContractFactory('GuessTheNumberChallenge');
    const payment = hre.ethers.utils.parseEther('1');
    const provider = hre.ethers.provider;
    const guessGameContract = await baseContractFactory.connect(accounts[1]).deploy({value: payment});
    // const telephoneContract = await hre.ethers.getContractAt('Telephone', "0xC6bA8C3233eCF65B761049ef63466945c362EdD2");
    //
    await guessGameContract.deployed();
    console.log(guessGameContract.address)
    const balance = await provider.getBalance(accounts[2].address);
    console.log(balance);
    const tnx = await guessGameContract.guess(42, {value: payment});
    await tnx.wait();
    const balance1 = await provider.getBalance(accounts[2].address);
    console.log(balance1);
}

main();