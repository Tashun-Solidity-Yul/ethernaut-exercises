// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import '../../helpers/Ownable-05.sol';

contract AlienCodex is Ownable {

    bool public contact;
    bytes32[] public codex;

    modifier contacted() {
        assert(contact);
        _;
    }

    function make_contact() public {
        contact = true;
    }

    function record(bytes32 _content) contacted public {
        codex.push(_content);
    }

    function retract() contacted public {
        codex.length--;
    }

    function revise(uint i, bytes32 _content) contacted public {
        codex[i] = _content;
    }

    function getSlot(uint256 i) external view returns(bytes32) {
        assembly {
            mstore(0x0,sload(i))
            return(0x0,0x20)
        }
    }
    function slotStart() external view returns(bytes32) {
        assembly {
            mstore(0x0,1)
            let val := keccak256(0x0,0x20)
            mstore(0x0,val)
            return(0x0,0x20)
        }
    }
}