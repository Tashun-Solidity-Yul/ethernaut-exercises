const {ethers} = require("hardhat");
const hre = require("hardhat");
const {expect} = require("chai");


describe('[Challenge] Token Bank Contract', function () {

    let deployer, player,attacker;
    let baseContract, attackContract;


    before(async function () {
        /** SETUP SCENARIO */
        [deployer, player, attacker] = await ethers.getSigners();
        const baseContractFactory = await ethers.getContractFactory('TokenBankChallenge', deployer);
        const attackContractFactory = await ethers.getContractFactory('AttackAttackTokenBank', attacker);
        const payment = hre.ethers.utils.parseEther('1');
        attackContract = await attackContractFactory.deploy();
        baseContract = await baseContractFactory.deploy(attackContract.address);
        await baseContract.deployed();
        await attackContract.deployed();
        await attackContract.setBank(baseContract.address);
        expect(
            await baseContract.isComplete()
        ).to.equal(false);
    });

    it('Exploit Token Bank Attack', async function () {
        /** CODE YOUR EXPLOIT HERE */
        const tnx = await attackContract.attack();
        await tnx.wait();

    });

    after(async function () {
        /** SUCCESS CONDITIONS */
        expect(
            await baseContract.isComplete()
        ).to.be.equal(true);


    });
});