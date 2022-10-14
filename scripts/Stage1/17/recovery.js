const {ethers} = require("hardhat");
const hre = require("hardhat");

async function main() {
    const accounts = await ethers.getSigners();
    const baseContractFactory = await hre.ethers.getContractFactory('Recovery');

    const recoveryContract = await baseContractFactory.connect(accounts[0]).deploy();
    await recoveryContract.deployed();
    await recoveryContract.generateToken("Recovery", 1000);


    console.log(recoveryContract.address);

    const payment = hre.ethers.utils.parseEther('0.001');



    const transactionHash = await accounts[1].sendTransaction({
        to: recoveryContract.address,
        value: payment,
    });
    const attackContractFactory = await hre.ethers.getContractFactory('AttackDenial');
    const attackDenialContract = await attackContractFactory.connect(accounts[2]).deploy(recoveryContract.address.toString());
    //
    //
    await attackDenialContract.deployed();
    //
    // console.log(parseInt((await tokenContract.balanceOf(accounts[2].address)).toString(), 10));
    // console.log(attackDenialContract.address);
    // await naughtCoinContract.approve(attackTokenContract.address, "1000000000000000000000000");
    // console.log(accounts[1].address);
    // const tnx1 = await attackDenialContract.connect(accounts[1]).withdraw({value: payment, gasLimit: 2100000});

    // await tnx1.wait();

    console.log(await recoveryContract.connect(accounts[1]).contractBalance());
    const tnx = await attackDenialContract.connect(accounts[1]).attack();
    // const tnx = await naughtCoinContract.connect(accounts[1]).transfer(accounts[2].address,100);
    await tnx.wait();
    // console.log(parseInt((await tokenContract.balanceOf(accounts[2].address)).toString(), 10));
    // console.log(parseInt((await naughtCoinContract.balanceOf(accounts[1].address)), 10));
    // console.log(parseInt((await naughtCoinContract.balanceOf(accounts[2].address)), 10));




}

main();