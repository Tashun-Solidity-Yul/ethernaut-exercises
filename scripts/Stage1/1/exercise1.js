// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const {ethers} = require("hardhat");
// const ethernaut = require('https://d33wubrfki0l68.cloudfront.net/bundles/99cec4f544214837e320c672a7efec0554f8245b.js');
const contractAddress = 0xD991431D8b033ddCb84dAD257f4821E9d5b38C33;
const contractAddress1 = 0x3A28dBe1c59A356d87927e409959ff56fdBbc90e;
// const contractAddress1 = 0x3A28dBe1c59A356d87927e409959ff56fdBbc90e;
// 0x5FbDB2315678afecb367f032d93F642f64180aa3



async function main() {
    // const fallbackContract = await hre.ethers.getContractAt('Fallback', "0x5FbDB2315678afecb367f032d93F642f64180aa3");
    // const fallbackContract = await hre.ethers.getContractAt('Fallback', "0x1275D096B9DBf2347bD2a131Fb6BDaB0B4882487");
    const accounts = await ethers.getSigners();
    const baseContractFactory = await hre.ethers.getContractFactory('Fallback');
    const payment1 = hre.ethers.utils.parseEther('1');
    const provider = hre.ethers.provider;
    const fallbackContract = await baseContractFactory.connect(accounts[1]).deploy();
    //
    await fallbackContract.deployed();
    console.log(fallbackContract.address)

    const payment = hre.ethers.utils.parseEther('0.0001');
    // console.log(fallbackContract)
    const tnx1 = await fallbackContract.connect(accounts[2]).contribute({value: payment, gasLimit: 2100000});
    await tnx1.wait();
    // console.log(fallbackContract)

    try {
        const tnx2 = await fallbackContract.connect(accounts[2]).contribute1( );
        tnx2.wait();
    } catch (e) {
        // await tnx2.wait();
    }
    // await tnx2.wait();
    // console.log(fallbackContract)
    // await fallbackContract.connect(accounts[0]).withdraw();
    const balance =await provider.getBalance(accounts[2].address);
    const balanceInEth = ethers.utils.formatEther(balance)
    let owner = await fallbackContract.owner();
    console.log(accounts[2].address)
    console.log(owner.toString())
    console.log(balanceInEth)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
