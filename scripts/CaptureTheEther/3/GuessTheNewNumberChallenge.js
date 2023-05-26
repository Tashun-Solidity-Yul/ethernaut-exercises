const {ethers} = require("hardhat");
const hre = require("hardhat");

async function main() {
    const accounts = await ethers.getSigners();
    const baseContractFactory = await hre.ethers.getContractFactory('GuessTheNewNumberChallenge');
    const payment = hre.ethers.utils.parseEther('1');
    const provider = hre.ethers.provider;
    const guessGameContract = await baseContractFactory.connect(accounts[1]).deploy({value: payment});
    // const telephoneContract = await hre.ethers.getContractAt('Telephone', "0xC6bA8C3233eCF65B761049ef63466945c362EdD2");
    //
    await guessGameContract.deployed();
    console.log(guessGameContract.address)

    const attackContractFactory = await hre.ethers.getContractFactory('AttackGuessNewNumber');
    const attackGameContract = await attackContractFactory.connect(accounts[2]).deploy(guessGameContract.address.toString());
    await attackGameContract.deployed();
    console.log(attackGameContract.address)
    while (!await guessGameContract.isComplete()) {
        try {
            const tnx = await attackGameContract.attack({value: payment});
            await tnx.wait();
        } catch (e) {
           console.log("retry");
        }
    }
}

main();