pragma solidity ^0.6.4;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
   
contract Cogere {
    using SafeMath for uint;
    mapping (address => uint) organisateurs;


    constructor() internal {
        organisateurs[msg.sender] = 100;   
    }

    function transfererOrga(address orga, uint parts) public {
        require(organisateurs[msg.sender] >= parts, "You have not enough responsabilities");
        require(!estOrga(orga), "you are not an org");
        require(orga != address(0), "Adress 0 doens't work");
        organisateurs[msg.sender] =  organisateurs[msg.sender].sub(parts);
        organisateurs[orga] = parts;
    }
    
    function estOrga(address orga) public view returns (bool){
         return (organisateurs[orga] > 0) ? true : false;
    }
} 

contract CagnotteFestival is Cogere{
    using SafeMath for uint;
    mapping (address => bool) festivaliers;
    uint placesRestantes;
    uint private depensesTotales;
    string[] sponsors;
    uint constant LIMIT = 100;
    //mapping (address => bool) stored;
    
    function payer(address payable destinataire, uint montant) public {
        require(estOrga(msg.sender));
        require(destinataire != address(0));
        require(montant > 0);
        destinataire.transfer(montant); // transfer works like  revert() it cancels all. .send() works and only gives back a false if no enough money.
    }
     
    function acheterTicket() public payable {
        require(msg.value>= 500 finney,"Place à 0.5 Ethers");
        require(placesRestantes>0,"Plus de places !");
        festivaliers[msg.sender]=true;
    }
    
    function comptabiliserDepense(uint montant) private {
        depensesTotales += montant;
    }
    
    function sponsoriser(string memory nom) public payable {
        if(msg.value >= 30 ether && sponsors.limit >= LIMIT) {
            sponsors.push(nom);
        }
    }

}


