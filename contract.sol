// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;


contract KoovanKyc {
    address admin;
    
    constructor(){
        admin= msg.sender;
         _checkAccess[admin]=true;
    }
    
    mapping (string=> string) private _signature;
    mapping (address=>bool) private _checkAccess;
        
    function whitelistAddress(address User) external {
     require(msg.sender== admin,"Only admin is allowed to use this function");
        _checkAccess[User]=true;
    }

    function store(string memory uniqueKey,string memory signature) external  {
        require(msg.sender== admin,"Only admin is allowed to use this function");
        _signature[uniqueKey]=signature;
    }

    function retrieveSignature(string memory uniqueKey) external  view returns (string memory){
        // require(_checkAccess[account]==true,"Storage : not authorized to use this function");
        return _signature[uniqueKey];
    }

}
