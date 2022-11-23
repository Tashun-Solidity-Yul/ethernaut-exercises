const {ethers} = require("hardhat");
const hre = require("hardhat");
const {expect} = require("chai");


describe('[Challenge] Denial Smart Contract', function () {

    let deployer, player;
    let baseContract, attackContract;
    let payment;

    before(async function () {
        /** SETUP SCENARIO */
        [deployer, player] = await ethers.getSigners();
        this.amount = 1000000;
        const baseContractFactory = await ethers.getContractFactory('Denial', deployer);
        const attackContractFactory = await ethers.getContractFactory('AttackDenial', player);
        payment = ethers.utils.parseEther("1.0");

        baseContract = await baseContractFactory.deploy();
        attackContract = await attackContractFactory.deploy(baseContract.address);

        await baseContract.deployed();
        await attackContract.deployed();

        await baseContract.setWithdrawPartner(attackContract.address);

        await deployer.sendTransaction({
                to: baseContract.address,
                value: payment
            }
        );
    });

    it('Exploit Denial Attack', async function () {
        /** CODE YOUR EXPLOIT HERE */
    });

    after(async function () {
        /** SUCCESS CONDITIONS */

        await expect(baseContract.connect(player).withdraw({gasLimit:30_000_000})).to.be.throw;
    });
});