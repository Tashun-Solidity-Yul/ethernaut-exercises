const {ethers} = require("hardhat");
const hre = require("hardhat");
const {expect} = require("chai");


describe('[Challenge] Token Smart Contract', function () {

    let deployer, attacker;
    let baseContract, attackContract;


    before(async function () {
        /** SETUP SCENARIO */
        [deployer, attacker] = await ethers.getSigners();
        this.tokenCount = 20;
        const baseContractFactory = await ethers.getContractFactory('Token', deployer);
        const attackContractFactory = await ethers.getContractFactory('AttackToken', attacker);
        baseContract = await baseContractFactory.deploy("10000");
        attackContract = await attackContractFactory.deploy(baseContract.address);

        expect(
            parseInt(ethers.utils.formatEther(await baseContract.balanceOf(attacker.address)), 10)
        ).to.equal(0);
    });

    it('Exploit Token Attack', async function () {
        /** CODE YOUR EXPLOIT HERE */
        const tnx = await attackContract.connect(attacker).attack(attacker.address, this.tokenCount);
        await tnx.wait();
    });

    after(async function () {
        /** SUCCESS CONDITIONS */
        expect(
            parseInt(ethers.utils.formatEther(await baseContract.balanceOf(attacker.address)), 10)
        ).to.equal(this.tokenCount);

    });
});