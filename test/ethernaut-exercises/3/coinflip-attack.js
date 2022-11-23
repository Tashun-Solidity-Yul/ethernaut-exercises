const {ethers} = require("hardhat");
const hre = require("hardhat");
const {expect} = require("chai");


describe('[Challenge] Coin Flip Attack', function () {

    let deployer, attacker;
    let baseContract, attackContract;


    before(async function () {
        /** SETUP SCENARIO */
        [deployer, attacker] = await ethers.getSigners();

        const baseContractFactory = await ethers.getContractFactory('CoinFlip', deployer);
        const attackContractFactory = await ethers.getContractFactory('AttackConFlip', attacker);
        baseContract = await baseContractFactory.deploy();
        attackContract = await attackContractFactory.deploy(baseContract.address);

        expect(
            await parseInt(await baseContract.consecutiveWins(), 10)
        ).to.equal(0);
    });

    it('Exploit Attack', async function () {
        /** CODE YOUR EXPLOIT HERE */
        let loopCondition = 0
        while (loopCondition < 10) {
            try {
                await attackContract.attack();
                loopCondition = parseInt((await baseContract.consecutiveWins()).toString(), 10);
            } catch (e) {
                console.log(e);
            }
        }
    });

    after(async function () {
        /** SUCCESS CONDITIONS */

        expect(
            await parseInt((await baseContract.consecutiveWins()).toString(), 10)
        ).to.be.greaterThan(9);

    });
});