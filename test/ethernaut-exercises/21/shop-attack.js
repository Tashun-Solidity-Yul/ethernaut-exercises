const {ethers} = require("hardhat");
const hre = require("hardhat");
const {expect} = require("chai");


describe('[Challenge] Shop Smart Contract', function () {

    let deployer, player;
    let baseContract, attackContract;


    before(async function () {
        /** SETUP SCENARIO */
        [deployer, player, attacker] = await ethers.getSigners();
        this.amount = 1000000;
        const baseContractFactory = await ethers.getContractFactory('Shop', deployer);
        const attackContractFactory = await ethers.getContractFactory('AttackBuyer', player);
        baseContract = await baseContractFactory.deploy();
        attackContract = await attackContractFactory.deploy(baseContract.address);
        attackContract.setContract(baseContract.address);
        expect(
            await baseContract.isSold()
        ).to.equal(false);
    });

    it('Exploit Shop Attack', async function () {
        /** CODE YOUR EXPLOIT HERE */

        const tnx = await attackContract.connect(attacker).attack();
        await tnx.wait();
    });

    after(async function () {
        /** SUCCESS CONDITIONS */
        expect(
           await baseContract.isSold()
        ).to.be.equal(true);

    });
});