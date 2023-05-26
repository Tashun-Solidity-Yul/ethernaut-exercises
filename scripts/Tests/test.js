// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const {ethers, utils} = require("hardhat");
import { Signer, VoidSigner } from "@ethersproject/abstract-signer";

async function main() {
    let deployer, attacker;

    const TOKENS_IN_POOL = hre.ethers.utils.parseEther('1000000');
    const provider1 = hre.network.provider;

    [deployer, attacker] = await hre.ethers.getSigners();

    const OverFlowTest = await hre.ethers.getContractFactory('OverflowTests', deployer);
    this.contract = await OverFlowTest.deploy()
    await this.contract.deployed();

    // console.log(
    //     await testOverflowContract.overflowTest()
    // await testOverflowContract.findLowEthValueToOverFlow()
    // );
    new VoidSigner(deployer.address, provider1)
    await createVoucher(1, "test",0,deployer)

}

async function createVoucher(tokenId, uri, minPrice = 0, deployer) {
    const voucher = { tokenId, uri, minPrice }
    const domain = await _signingDomain()
    const types = {
        NFTVoucher: [
            {name: "tokenId", type: "uint256"},
            {name: "minPrice", type: "uint256"},
            {name: "uri", type: "string"},
        ]
    }
    const signature = await deployer._signTypedData(domain, types, voucher)
    return {
        ...voucher,
        signature,
    }
}

async function _signingDomain() {
    if (this._domain != null) {
        return this._domain
    }
    const chainId = await this.contract.chainId
    this._domain = {
        verifyingContract: this.contract.address,
        chainId,
    }
    return this._domain
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
