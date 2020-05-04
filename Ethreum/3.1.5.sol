pragma solidity ^0.6.4;

contract Assemblee {

    // Structure Decision
    struct Decision {
        string description; // description
        uint votesFor; // number of votes
        uint votesAgainst; // number of votes against
        mapping (address => bool) aVote; // mapping through the addresses that have or haven't voted
        uint dateFin; // end date for voting
    }

    mapping (address => bool) public members; // mapping of members
    Decision[] public decisions; // table of decisions

    function rejoin() public {
       //membres.push(msg.sender);
       require(!members[msg.sender], "you are already a member");
        members[msg.sender] = true;
    }

    function proposerDecision(string memory description) public {

        require(members[msg.sender], "You are not a member");
        decisions.push(Decision(description, 0, 0, now + 7 days));
    }

    function voter(uint indice, bool value) public {
        require(indice < decisions.length && indice >= 0, "Check that the index is correct");
        require(members[msg.sender], "You are not a member under this account");
        require(!decisions[indice].aVote[msg.sender], "you have already voted");
        require(decisions[indice].dateFin > now, "The voting for this decision has ended");
        decisions[indice].aVote[msg.sender] = true; //update decisions mapping regarding this persons vote
        // if value == true, we increment the votes
        (value) ? decisions[indice].votesFor++ : decisions[indice].votesAgainst++;
    }

    function comptabiliser(uint indice) public view returns (int){
        return int(decisions[indice].votesFor - decisions[indice].votesAgainst);
    }
}