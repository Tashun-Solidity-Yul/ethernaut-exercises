const {ethers} = require("hardhat");
const hre = require("hardhat");
const {expect} = require("chai");


describe('[Challenge] Predict New Number Contract', function () {

    let deployer, player, attacker;
    let baseContract, attackContract;
    let payment;
    let provider;
    let capturedBlockNumber, capturedTimeStamp;


    before(async function () {
        /** SETUP SCENARIO */
        [deployer, player, attacker] = await ethers.getSigners();
        provider = hre.ethers.provider;
        const baseContractFactory = await ethers.getContractFactory('GuessTheNewNumberChallenge', deployer);
        const attackContractFactory = await ethers.getContractFactory('AttackGuessNewNumber', deployer);

        payment = hre.ethers.utils.parseEther('1');

        baseContract = await baseContractFactory.deploy({value: payment});

        attackContract = await attackContractFactory.deploy(baseContract.address);

        await baseContract.deployed();
        await attackContract.deployed();

        expect(
            await baseContract.isComplete()
        ).to.be.equal(false);

    });

    it('Exploit Guess New Number Attack', async function () {
        /** CODE YOUR EXPLOIT HERE */

            // console.log(capturedTimeStamp);
            // console.log(await attackContract.attack());
        const tnx = await attackContract.connect(attacker).attack({value: payment});
        await tnx.wait()
    });

    after(async function () {
        /** SUCCESS CONDITIONS */
        expect(
            await baseContract.isComplete()
        ).to.be.equal(true);


    });
});

