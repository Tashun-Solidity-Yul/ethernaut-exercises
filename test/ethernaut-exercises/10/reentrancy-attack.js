const {ethers} = require("hardhat");
const hre = require("hardhat");
const {expect} = require("chai");


describe('[Challenge] Reentrancy Contract', function () {

    let deployer, attacker;
    let baseContract, attackContract;
    let contractEther, attackerEther;


    before(async function () {
        /** SETUP SCENARIO */
        [deployer, attacker] = await ethers.getSigners();
        this.poolEth = "10.0";
        this.attackerEth = "1.0";
        contractEther = ethers.utils.parseEther(this.poolEth.toString());
        attackerEther = ethers.utils.parseEther(this.attackerEth.toString());
        const baseContractFactory = await ethers.getContractFactory('Reentrance', deployer);
        const attackContractFactory = await ethers.getContractFactory('ReEntrancyAttack', attacker);
        baseContract = await baseContractFactory.deploy();
        attackContract = await attackContractFactory.deploy(baseContract.address);

        await baseContract.connect(deployer).donate(deployer.address, {value: contractEther});
        expect(
            parseInt(ethers.utils.formatEther(await baseContract.balanceOf(attacker.address)), 10)
        ).to.equal(0);

        expect(
            parseInt(ethers.utils.formatEther(await ethers.provider.getBalance(baseContract.address)), 10)
        ).to.equal(10);
    });

    it('Exploit Reentrancy Attack', async function () {
        /** CODE YOUR EXPLOIT HERE */
        const tnx = await attackContract.connect(attacker).attack({value: attackerEther});
        await tnx.wait();
    });

    after(async function () {
        /** SUCCESS CONDITIONS */
        expect(
            ethers.utils.formatEther(await ethers.provider.getBalance(attackContract.address))
        ).to.be.equal((parseInt(this.poolEth,10) + parseInt(this.attackerEth,10)).toFixed(1));
        expect(
            ethers.utils.formatEther(await ethers.provider.getBalance(baseContract.address))
        ).to.be.equal("0.0");

    });
});