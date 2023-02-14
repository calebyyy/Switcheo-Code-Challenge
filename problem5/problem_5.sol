pragma solidity ^0.8.0;

contract TokenBalanceChecker {
    function getBalances(address _address, address[] memory _tokenAddresses) public view returns (tuple[] memory) {
        uint[] memory balances = new uint[](_tokenAddresses.length);
        for (uint i = 0; i < _tokenAddresses.length; i++) {
            balances[i] = ERC20(_tokenAddresses[i]).balanceOf(_address);
        }
        
        tuple[] memory result = new tuple[](_tokenAddresses.length);
        for (uint i = 0; i < _tokenAddresses.length; i++) {
            result[i] = (_tokenAddresses[i], balances[i]);
        }
        return result;
    }

    interface ERC20 {
        function balanceOf(address _owner) public view returns (uint);
    }
}