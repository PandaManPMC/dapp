// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract UUPSProduct is Initializable,OwnableUpgradeable,UUPSUpgradeable {

    constructor() {
        _disableInitializers();
    }

	function initialize()public initializer{
        __Ownable_init();
        __UUPSUpgradeable_init();
	}
    
    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}

    mapping(string => uint256) private productPriceTable;

    event AddProductEvent(string indexed _key,uint256 _value);

    function addProduct(string memory _key,uint256 _value) external onlyOwner{
        productPriceTable[_key] = _value;
        emit AddProductEvent(_key,_value);
    }

    function getProductPrice(string memory _key)public view returns(uint256){
        return productPriceTable[_key];
    }
}