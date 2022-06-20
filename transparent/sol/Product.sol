// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Product is Initializable,OwnableUpgradeable {

	function initialize()public initializer{
		__Context_init_unchained();
		__Ownable_init_unchained();
	}

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