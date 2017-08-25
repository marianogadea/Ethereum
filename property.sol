pragma solidity ^0.4.0;

contract propertyMgmt {
    Property[] public properties;
    address public government;
    mapping (address => uint) public owner;

    // Events allow light clients to react on
    // changes efficiently.
    //event transfer(address from, address to, uint propCode);

    struct Property {
          string street;
          string description;
          uint value;
          address owner;
    }



    // This is the constructor whose code is
    // run only when the contract is created.
    function propertyMgmt () {
        government = msg.sender;
    }



    function createProperty(string street, string description, uint value, address owner) returns (uint PropertyID)
    {
        if (msg.sender != government) return; //only government can assign{
        PropertyID = properties.length++;
        Property storage p = properties[PropertyID];
        p.street = street;
        p.description = description;
        p.value = value;
        p.owner = owner;
        return PropertyID;
    }

    function transferProperty(address newOwner, uint PropertyID)
    {   
        if (properties[PropertyID].owner != msg.sender) return;
        Property storage p = properties[PropertyID];
        p.owner = newOwner;
    }
}
 
 