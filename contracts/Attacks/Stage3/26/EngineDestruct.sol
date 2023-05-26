pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract EngineDestruct {
    function destroy(address a) external{
        selfdestruct(payable(a));
    }
}
