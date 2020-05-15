pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract MarketPlace {
    using SafeMath for uint;

    address public owner;

    enum State {OPEN, INPROGRESS , CLOSED}

    struct User {
        string name;
        uint reputation;
    }

    struct Request {
        uint id;
        uint payment;
        uint deadline;
        string description;
        State state;
        uint minReputation;
        address[] candidates;
    }

    mapping(address => User) public users;
    mapping(address => bool) public blacklist;

    Request[] public requests;

    constructor() public {
        owner = msg.sender;
    }

    function hash(string memory url) public pure returns (bytes32) {
        return keccak256(bytes(url));
    }

    function register(string memory _name) public returns (bool) {
        require(users[msg.sender].reputation < 1, "User already exist!");
        require(blacklist[msg.sender] != true, "User blacklisted!");
        users[msg.sender].reputation = users[msg.sender].reputation.add(1);
        users[msg.sender].name = _name;
        return true;
    }

    function blacklisted(address _address) public {
        require(owner == msg.sender, "Not owner!");
        require(blacklist[_address] != true, "User already blacklisted!");
        blacklist[_address] = true;
        users[_address].reputation = 0;
    }

    function unBlacklisted(address _address) public {
        require(owner == msg.sender, "Not owner!");
        require(blacklist[_address] != false, "User not blacklisted!");
        blacklist[_address] = false;
        users[_address].reputation = 1;
    }

    function addRequest(
        string memory _description,
        uint _payment,
        uint _deadline,
        uint _minReputation
    ) public payable {
        require(users[msg.sender].reputation >= 1, "User not registered!");
        require(blacklist[msg.sender] != true, "User blacklisted!");

        Request memory request;
        request.id = requests.length;
        request.payment = _payment;
        request.description = _description;
        request.deadline = _deadline;
        request.minReputation = _minReputation;
        request.state = State.OPEN;
        requests.push(request);
    }

    function getRequests() public view returns (Request[] memory) {
        //require(users[msg.sender].reputation >= 1, "User not registered!");

		return requests;
	}

    function applyToRequest(uint requestId) public returns (bool) {
        require(users[msg.sender].reputation >= 1, "User not registered!");
        require(users[msg.sender].reputation >= requests[requestId].minReputation, "Not enought reputation");

        requests[requestId].candidates.push(msg.sender);
        return true;
    }

}
