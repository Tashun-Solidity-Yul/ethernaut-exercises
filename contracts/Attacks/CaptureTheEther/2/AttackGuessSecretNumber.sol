pragma solidity ^0.4.21;

import "../../../Exercise/CaptureTheEther/2/GuessTheSecretNumberChallenge.sol";
import "hardhat/console.sol";

contract AttackGuessSecretNumber {
    GuessTheSecretNumberChallenge baseContract;
    bytes32 answerHash = 0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365;


    function AttackGuessSecretNumber(GuessTheSecretNumberChallenge guessTheSecretNumberChallenge){
        baseContract = guessTheSecretNumberChallenge;
    }

    function() payable {}

    function attack(uint8 n) payable external {
        if (keccak256(n) != answerHash) {
            revert("");
        }
        baseContract.guess.value(msg.value)(n);
        selfdestruct(msg.sender);
    }
}
