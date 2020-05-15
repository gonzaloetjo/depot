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
    uint[] team_portions;
    //address[] whitelist; //in case of using a table instead of the mapping

    constructor() public {
        //owner = msg.sender;
        dateLimit = now + 10 days;
    }
    
    struct Whitelists {
        string name; // description
        uint portion;
        mapping (address => bool) _whitelist_team;// association keys values
        //mapping (bool => address[]) _lists;
        //address[] addresses;
        uint dateFin; // end date for voting
        uint rate_team;
    }

    Whitelists[] public whitelists;
    mapping (address => bool) members;
    mapping (uint256 => address[]) addresses;
    mapping (address => uint) indices;
    //mapping (bool => uint[]) tryhard;
    //Whitelists[] public whitelists;
    function newGroup(uint _portion,string memory _name, uint _rate_team) public onlyOwner limitGroups {
        require(_portion < 100);
        require(_rate_team < 3);
        whitelists.push(Whitelists(_name,_portion, now + 7 days, _rate_team));
        team_portions.push(_portion);
    }
    function add (address _address, uint indice) public onlyOwner {
        //require(owner == msg.sender, "Not Owner")
        require(_address != address(0), "Can't add this address");
        require(!members[_address], "This address already has a team" ); //!decisions[indice].aVote[msg.sender]
        require(now <= dateLimit, "Date Limit !");
        whitelists[indice]._whitelist_team[_address] = true;
        //whitelists[indice]._lists[true].push[_address];
        //whitelists[indice].address.push(_address);
        members[_address] = true;
        addresses[indice].push(_address);
        indices[_address] = indice;
        
        //tryhard[]
        //whitelist.push(_address) // in case of using the table
    }
    function getList (uint indice) public view returns (string memory, uint, address [] memory) {
        return (whitelists[indice].name, whitelists[indice].portion, addresses[indice]);
    }
    
    modifier limitGroups() {
        require(whitelists.length < 5);
        _;
    }
    
    //modifier proportionsSum() {
        //require(team_portions[0] + team_portions[1] + team_portions[2] + team_portions[3] = 100);
    //}
}