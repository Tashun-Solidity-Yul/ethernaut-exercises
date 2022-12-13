// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "../../../Exercise/Stage1/17/Recovery.sol";

contract AttackRecovery {
    Recovery private recoveryContract;
    constructor(Recovery importedToken) public {
        recoveryContract = importedToken;
    }

    function attack(address sender) external view returns (address) {
//        console.log(address(uint160(uint256(keccak256(abi.encodePacked(byte(0xd6), byte(0x94), sender, byte(0x80)))))));
        return address(uint160(uint256(keccak256(abi.encodePacked(bytes1(0xd6), bytes1(0x94), sender, bytes1(0x80))))));

    }
}
