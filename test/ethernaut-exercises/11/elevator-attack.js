const {ethers} = require("hardhat");
const hre = require("hardhat");
const {expect} = require("chai");


describe('[Challenge] Elevator Smart Contract', function () {

    let deployer, attacker;
    let baseContract, attackContract;


    before(async function () {
        /** SETUP SCENARIO */
        [deployer, attacker] = await ethers.getSigners();
        this.topFloor = 20;
        const baseContractFactory = await ethers.getContractFactory('Elevator', deployer);
        const attackContractFactory = await ethers.getContractFactory('AttackBuilding', attacker);
        baseContract = await baseContractFactory.deploy();
        attackContract = await attackContractFactory.deploy(baseContract.address);
        await attackContract.setContract(baseContract.address);
        expect(
            await baseContract.top()
        ).to.equal(false);
    });

    it('Exploit Elevator Attack', async function () {
        /** CODE YOUR EXPLOIT HERE */
        const tnx = await attackContract.connect(attacker).attack(this.topFloor);
        await tnx.wait();
    });

    after(async function () {
        /** SUCCESS CONDITIONS */
        expect(
            await baseContract.top()
        ).to.be.equal(true);

    });
});