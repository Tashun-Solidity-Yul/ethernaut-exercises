const {ethers} = require("hardhat");
const hre = require("hardhat");
const {expect} = require("chai");


describe('[Challenge] MagicNum Attack', function () {

    let deployer, attacker;
    let baseContract, attackContract;
    let provider;
    let payment;

    before(async function () {
        /** SETUP SCENARIO */
        [deployer, attacker] = await ethers.getSigners();

        const baseContractFactory = await ethers.getContractFactory('MagicNum');
        baseContract = await baseContractFactory.connect(deployer).deploy();
        provider = hre.ethers.provider;
        // payment = hre.ethers.utils.parseEther('0.0001');

        await baseContract.deployed();


    });

    it('Exploit MagicNum Attack', async function () {
        // address , paddedSlot
        const ABI = [
            "function whatIsTheMeaningOfLife() external pure returns(uint256)"
        ];
        // const baseContractFactory = await ethers.getContractFactory(ABI,"0x600a600d600039600a6000f3fe602b60005260206000f3", attacker);
        // const baseContractFactory = await ethers.getContractFactory(ABI,"0x600a600d600039600a6000f3", attacker);
        const baseContractFactory = await ethers.getContractFactory(ABI,"0x7f602b60005260206000f300000000000000000000000000000000000000000000602656602b5B60005260206000f3", attacker);
        // const baseContractFactory = await ethers.getContractFactory(ABI,"0x69604260005260206000f3600052600a6016f3", attacker);
        // const baseContractFactory = await ethers.getContractFactory(ABI,"0x7F602b60005260206000f30000000000000000000000000000000000000000000060005260206000f3602b60005260206000f3", attacker);
        attackContract = await baseContractFactory.deploy();
        await attackContract.deployed();

        await baseContract.setSolver(attackContract.address);
    });

    after(async function () {
        /** SUCCESS CONDITIONS */

        expect(
            (parseInt(await attackContract.whatIsTheMeaningOfLife(),10))
        ).to.be.equal(43);

    });
});