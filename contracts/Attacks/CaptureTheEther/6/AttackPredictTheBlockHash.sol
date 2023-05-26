pragma solidity ^0.4.21;


import "../../../Exercise/CaptureTheEther/6/PredictTheBlockHashChallenge.sol";
import "hardhat/console.sol";

contract AttackPredictTheBlockHash {
    PredictTheBlockHashChallenge public predictTheBlockHashChallenge;

    function AttackPredictTheBlockHash(PredictTheBlockHashChallenge importingContract){
        predictTheBlockHashChallenge = importingContract;
    }

    function returnGuess() public view returns(bytes32) {
        bytes32 guess = block.blockhash(block.number + 1);
        return guess;
    }
    function returnVerification() public view returns(bytes32) {
        bytes32 guess = block.blockhash(block.number);
        return guess;
    }



}
