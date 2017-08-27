pragma solidity ^0.4.0;

contract propertyMgmt {
    Property[] public properties;
    address public government;
    mapping (address => mapping(uint => bytes32)) public owners;
    uint PropertyID;

    // Events allow light clients to react on
    // changes efficiently.
    //event transfer(address from, address to, uint propCode);

    struct Property {
          bytes32 street;
          string description;
          uint value;
          address owner;
    }
    

    modifier onlyOwner {
          require (msg.sender == properties[PropertyID].owner);
          _;
    }

 


    // This is the constructor whose code is
    // run only when the contract is created.
    function propertyMgmt () {
        government = msg.sender;
    }



    function createProperty(bytes32 street, string description, uint value, address owner) returns (uint PropertyID)
    {
        if (msg.sender != government) return; //only government can assign{
        
        PropertyID = properties.length++;
        Property storage p = properties[PropertyID];
        p.street = street;
        p.description = description;
        p.value = value;
        p.owner = owner;
       // Add to Owners;
        addPropertyToOwner(owner, street);
  
    }

    function transferProperty(address newOwner, uint PropertyID) onlyOwner
    {   
        Property storage p = properties[PropertyID];
        removePropertyFromOwner(p.owner,p.street);
        p.owner = newOwner;
        addPropertyToOwner(p.owner,p.street);
        
        //remove from owner
        
        
    }


    function removePropertyFromOwner(address owner, bytes32 street) {
        uint ownerpropID = 0;
        while (owners[owner][ownerpropID] != street) {
              ownerpropID++;
          }
        delete owners[owner][ownerpropID];   
        //while (owners[owner][ownerpropID] > "0x0") { 
        //    uint ind = ownerpropID+1;
        //    owners[owner][ownerpropID] = owners[owner][ind];
        //    ownerpropID++;
        //}
        
    }
 
    function addPropertyToOwner(address owner, bytes32 street) {
        uint ownerpropID = 0;
        while (owners[owner][ownerpropID] != "") {
            ownerpropID++;
        }
        owners[owner][ownerpropID] = street;
    }
 
    //function isStringEmpty(string text) returns (bool isEmpty)
    //{ bytes memory tempEmptyStringTest = bytes(text); // Uses memory
    //    isEmpty = false;
    //    if (tempEmptyStringTest.length == 0) {
    //        isEmpty = true; 
    //    } 
    //}    
}