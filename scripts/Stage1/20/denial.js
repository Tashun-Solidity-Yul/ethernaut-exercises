const {ethers} = require("hardhat");
const hre = require("hardhat");

async function main() {
    const accounts = await ethers.getSigners();
    const baseContractFactory = await hre.ethers.getContractFactory('Denial');

    const denialContract = await baseContractFactory.connect(accounts[0]).deploy();
    await denialContract.deployed();


    console.log(denialContract.address);

    const payment = hre.ethers.utils.parseEther('99');
    const paymentInWei = hre.ethers.utils.parseUnits('123123123123123123', "wei");

    const transactionHash1 = await accounts[1].sendTransaction({
        to: denialContract.address,
        value: payment, // Sends exactly 1.0 ether
    });

    const transactionHash = await accounts[1].sendTransaction({
        to: denialContract.address,
        value: paymentInWei, // Sends exactly 1.0 ether
    });
    const attackContractFactory = await hre.ethers.getContractFactory('AttackDenial');
    const attackDenialContract = await attackContractFactory.connect(accounts[2]).deploy(denialContract.address.toString());
    //
    //
    await attackDenialContract.deployed();
    await denialContract.setWithdrawPartner(attackDenialContract.address);
    //
    // console.log(parseInt((await tokenContract.balanceOf(accounts[2].address)).toString(), 10));
    // console.log(attackDenialContract.address);
    // await naughtCoinContract.approve(attackTokenContract.address, "1000000000000000000000000");
    // console.log(accounts[1].address);
    // const tnx1 = await attackDenialContract.connect(accounts[1]).withdraw({value: payment, gasLimit: 2100000});

    // await tnx1.wait();

    // console.log(await denialContract.connect(accounts[1]).contractBalance());
    // while (true) {

        // try {
        //     await mineNBlocks(1);
            const tnx = await attackDenialContract.connect(accounts[1]).attack();
            await tnx.wait();
            // await mineNBlocks(2);
            // const tnx2 = await attackDenialContract.connect(accounts[1]).sendFunds();
            // await tnx2.wait();
        // } catch (e) {
        //
        // }
        await denialContract.connect(accounts[1]).withdraw();
        // console.log(parseInt((await denialContract.contractBalance()).toString(), 10));
    // }
    // const tnx = await naughtCoinContract.connect(accounts[1]).transfer(accounts[2].address,100);
    // console.log(parseInt((await naughtCoinContract.balanceOf(accounts[1].address)), 10));
    // console.log(parseInt((await naughtCoinContract.balanceOf(accounts[2].address)), 10));


}

async function mineNBlocks(n) {
    for (let index = 0; index < n; index++) {
        await hre.ethers.provider.send('evm_mine');
    }
}

main();