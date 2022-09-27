pragma solidity ^0.6.0;

import "../../../Exercise/Stage1/3/CoinFlip.sol";

contract AttackConFlip {
    CoinFlip private coinFlip;
    uint256 public count;
    constructor(CoinFlip coinFlipAddress) public{
        coinFlip = coinFlipAddress;
    }

    function attack() external {
        bool success =coinFlip.flip(false);
        require(success, "Attempt Failed");
        count++;
    }


}
