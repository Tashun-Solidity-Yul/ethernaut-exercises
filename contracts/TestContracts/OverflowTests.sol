// SPDX-License-Identifier: MIT
pragma solidity ^0.4.21;

import "hardhat/console.sol";

contract OverflowTests {
    constructor(){}

    function overflowTest() public {
        console.log(uint256(1));
        console.log(uint256((2 ** 256 - 1)));
        console.log(uint256(1 ether));
        console.log(uint256(2**256 - 1)/1 ether);
        console.log((uint256(2**256 -1) -2)/1 ether);
    }

    function findLowEthValueToOverFlow(uint256 tokenId, uint256 minPrice, string uri) public {
        bool failure = true;
        uint256 checkingNum = 1;
//        while (failure) {
////            console.log(checkingNum);
//            uint256 num = (uint256(2**256 -1) -checkingNum)/1 ether ;
//            console.log(num);
//            failure = num >= 1 ether;
//            checkingNum++;
//        }
    }

}
