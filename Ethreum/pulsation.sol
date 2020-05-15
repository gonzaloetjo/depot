pragma solidity ^0.6.6;

contract Beat {
    uint battement;
    string private message;

    constructor(string memory _word) public {
        battement = 0;
        message = _word;

    }

    function addBeat() public returns(string memory) {
        battement += 1;
        if(random() == 1){
            message = "Criii";
        }
        return message;
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(now, msg.sender))) % 10;
    }

}