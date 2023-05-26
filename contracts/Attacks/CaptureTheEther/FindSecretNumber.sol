// SPDX-License-Identifier: MIT
pragma solidity ^0.4.21;

contract FindSecretNumber {
    bytes32 answerHash = 0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365;

    function FindSecretNumber()  {
    }


    function guess(uint8 n) public view returns (bool) {
        if (keccak256(n) == answerHash) {
            return true;
        }
        return false;
    }
}