const {ethers} = require("hardhat");
const hre = require("hardhat");
const {expect} = require("chai");


describe('[Challenge] Predict Random Number Contract', function () {

    let deployer, player,attacker;
    let baseContract, attackContract;
    let payment;
    let provider;
    let capturedBlockNumber, capturedTimeStamp;


    before(async function () {
        /** SETUP SCENARIO */
        [deployer, player, attacker] = await ethers.getSigners();
        provider = hre.ethers.provider;
        const baseContractFactory = await ethers.getContractFactory('GuessTheRandomNumberChallenge', deployer);
        const attackContractFactory = await ethers.getContractFactory('AttackGuessRandomNumber', deployer);

        payment = hre.ethers.utils.parseEther('1');

        capturedBlockNumber = await ethers.provider.getBlockNumber();

        baseContract = await baseContractFactory.deploy({value: payment});

        capturedTimeStamp = (await ethers.provider.getBlock(await ethers.provider.getBlockNumber())).timestamp;

        attackContract = await attackContractFactory.deploy();

        await baseContract.deployed();
        await attackContract.deployed();

        expect(
            await baseContract.isComplete()
        ).to.be.equal(false);

    });

    it('Exploit Guess Random Number Attack', async function () {
        /** CODE YOUR EXPLOIT HERE */
        await baseContract.guess((await attackContract.guess(capturedBlockNumber,capturedTimeStamp)),{value: payment});

    });

    after(async function () {
        /** SUCCESS CONDITIONS */
        expect(
            await baseContract.isComplete()
        ).to.be.equal(true);


    });
});

