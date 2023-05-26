const hre = require("hardhat");

async function main() {
    const Lock = await hre.ethers.getContractFactory("testValues");
    const lock = await Lock.deploy();

    await lock.deployed();

    await lock.testVal();
}

main();