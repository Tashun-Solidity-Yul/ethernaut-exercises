const {ethers} = require("hardhat");
const hre = require("hardhat");

async function main() {
    const accounts = await ethers.getSigners();
    const baseContractFactory = await hre.ethers.getContractFactory('Token');

    const tokenContract = await baseContractFactory.connect(accounts[1]).deploy("10000");
    await tokenContract.deployed();


    console.log(tokenContract.address)
    const attackContractFactory = await hre.ethers.getContractFactory('AttackToken');
    const attackTokenContract = await attackContractFactory.connect(accounts[2]).deploy(tokenContract.address.toString());


    await attackTokenContract.deployed();

    console.log(parseInt((await tokenContract.balanceOf(accounts[2].address)).toString(), 10));
    const tnx = await tokenContract.connect(accounts[2]).transfer(accounts[2].address,20);
    await tnx.wait();
    console.log(parseInt((await tokenContract.balanceOf(accounts[2].address)).toString(), 10));
}

main();