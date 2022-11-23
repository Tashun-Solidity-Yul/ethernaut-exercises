const {ethers} = require("hardhat");
const hre = require("hardhat");
const {expect} = require("chai");


describe('[Challenge] Recover Lost Smart Contract Funds', function () {

    let deployer, attacker;
    let baseContract, lostContract;
    let provider,nonce;
    let anticipatedAddress;

    before(async function () {
        /** SETUP SCENARIO */
        [deployer,attacker] = await ethers.getSigners();
        provider = hre.ethers.provider;
        const baseContractFactory = await ethers.getContractFactory('Recovery', deployer);
        baseContract = await baseContractFactory.connect(deployer).deploy();
        await baseContract.deployed();

        nonce = await ethers.provider.getTransactionCount(baseContract.address);
        await baseContract.connect(deployer).generateToken("TEST", 1000);

    });
    it('Exploit Recover Lost Contract Attack', async function () {
        /** CODE YOUR EXPLOIT HERE */

        anticipatedAddress = ethers.utils.getContractAddress({
            from: baseContract.address,
            nonce,
        });
        lostContract = await hre.ethers.getContractAt('SimpleToken', anticipatedAddress);
        await lostContract.deployed();


        expect(
            parseInt(await lostContract.connect(deployer).balances(deployer.address),10)
        ).to.be.equal(1000);


        await lostContract.connect(deployer).transfer(attacker.address,1000);

    });


    after(async function () {
        /** SUCCESS CONDITIONS */
        expect(
            parseInt(await lostContract.connect(deployer).balances(deployer.address),10)
        ).to.be.equal(0);
        expect(
            parseInt(await lostContract.connect(attacker).balances(attacker.address),10)
        ).to.be.equal(1000);


    });
});