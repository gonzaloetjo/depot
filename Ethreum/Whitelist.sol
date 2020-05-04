pragma solidity 0.6.0;

contract Owned {
    address owner;

    function Own() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}

contract Whitelist is Owned {
    uint256 dateLimit;
    //address[] whitelist; //in case of using a table instead of the mapping
    mapping (address => bool) public _whitelist; // association keys values
    
    constructor() public {
        //owner = msg.sender;
        dateLimit = now + 10 days;
    }
    
    function add (address _address) public onlyOwner {
        //require(owner == msg.sender, "Not Owner")
        require(_address != address(0), "Can't add this address");
        require(now <= dateLimit, "Date Limit !");
        _whitelist[_address] = true;
        //whitelist.push(_address) // in case of using the table
    }
    

    function getList (address _adress) public view returns (uint) {
        
    }
}