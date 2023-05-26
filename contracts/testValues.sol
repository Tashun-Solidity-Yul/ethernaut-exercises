// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "hardhat/console.sol";
import '@openzeppelin/contracts/math/SafeMath.sol';

contract testValues {
    using SafeMath for uint256;
    uint256 val = 1 * 10** 18;
     constructor() public{

    }

    function testVal() public view{
//        val = 1 * 10 ** 18 + 1;
        console.log(val);
        console.log(val.div(3));
    }
}
