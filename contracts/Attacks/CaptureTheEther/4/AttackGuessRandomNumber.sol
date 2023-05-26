pragma solidity ^0.4.21;

import "../../../Exercise/CaptureTheEther/4/GuessTheRandomNumberChallenge.sol";

contract AttackGuessRandomNumber {
    constructor(){
    }

    function guess(uint256 blockNumber, uint256 timestamp) external view returns (uint8){
        return uint8(keccak256(block.blockhash(blockNumber), timestamp));
    }


}
