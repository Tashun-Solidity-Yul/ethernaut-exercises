const {ethers} = require("hardhat");
const hre = require("hardhat");
const {expect} = require("chai");


describe('[Challenge] Predict Guess The Number Contract', function () {

    let deployer, player, attacker;
    let baseContract;
    let payment;


    before(async function () {
        /** SETUP SCENARIO */
        [deployer, player, attacker] = await ethers.getSigners();
        const baseContractFactory = await ethers.getContractFactory('GuessTheNumberChallenge', deployer);

        payment = hre.ethers.utils.parseEther('1');

        baseContract = await baseContractFactory.deploy({value: payment});

        await baseContract.deployed();

        expect(
            await baseContract.isComplete()
        ).to.be.equal(false);

    });

    it('Exploit Number Attack', async function () {
        /** CODE YOUR EXPLOIT HERE */
        await baseContract.guess(42, {value: payment})

    });

    after(async function () {
        /** SUCCESS CONDITIONS */
        expect(
            await baseContract.isComplete()
        ).to.be.equal(true);


    });
});

