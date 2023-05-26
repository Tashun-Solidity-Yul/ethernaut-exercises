pragma solidity ^0.8.0;

contract test {
    fallback(bytes calldata) external returns (bytes memory) {
      
    assembly {
        mstore(0x0, 42)
        return(0x0,0x20)
   }
        
    }
}