const {ethers} = require("hardhat");
const hre = require("hardhat");

async function main() {
    const accounts = await ethers.getSigners();
    const baseContractFactory = await hre.ethers.getContractFactory('CoinFlip');
    const payment1 = hre.ethers.utils.parseEther('1');
    const provider = hre.ethers.provider;
    const coinFlipContract = await baseContractFactory.connect(accounts[1]).deploy();
    // const coinFlipContract = await hre.ethers.getContractAt('CoinFlip', "0xC6bA8C3233eCF65B761049ef63466945c362EdD2");
    //
    await coinFlipContract.deployed();
    console.log(coinFlipContract.address)

    const payment = hre.ethers.utils.parseEther('0.0001');
    // console.log(fallbackContract)
    let count = 0
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