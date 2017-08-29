pragma solidity ^0.4.0;

contract propertyManagement {
    
    function bytes32ToString(bytes32 x) constant returns (string) {
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
    }
    
    address public government;
    
    struct property {
        bytes32 streetID; //street data expressed in bytes32 format, used for mapping only
        string street;
        string description;
        uint value;
        address owner;
    }


    // Events allow light clients to react on
    // changes efficiently.
    event Create(string street, string description, uint value, address owner);
    event Transfer(address from, address to, string street);
    
    mapping (bytes32 => property) public properties;
    
    function propertyManagement () {
        government = msg.sender;
    }
    
    modifier onlyGovernment {
        require (msg.sender == government);
        _;
    }
    
    modifier onlyOwner (bytes32 street) {
        require (msg.sender == properties[street].owner);
        _;
    }
    
    function createProperty (bytes32 street, string description, uint value, address owner) onlyGovernment {
        property storage p = properties[street];
        p.street = bytes32ToString(street);
        p.streetID = street;
        p.description = description;
        p.value = value;
        p.owner = owner;
        Create(p.street, description,value, owner);
        
    }
    
    function transferProperty(address newOwner, bytes32 street) onlyOwner (street) {   
        property storage p = properties[street];
        address oldOwner = p.owner;
        p.owner = newOwner;
        Transfer(oldOwner, newOwner, p.street);
    }
}
