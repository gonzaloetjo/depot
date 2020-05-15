pragma solidity ^0.6.0;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Credibilite {
  
   using SafeMath for uint256;
  
   mapping (address => uint256) public cred;
   mapping (bytes32 => bool) public hashs; // liste des hashs remis
   bytes32[] private devoirs;
   
   function produireHash(string memory url) pure public returns(bytes32) {
       keccak256(bytes(url));
   }
   function transfer(address destinataire, uint value) public {
       require(value > 0);
       require(cred[destinataire] > 0);
       require(cred[msg.sender]-1 >= value, "you can't send this amount");
       cred[destinataire] = cred[destinataire].add(value);
       cred[msg.sender] = cred[msg.sender].sub(value);
   }
   function remettre(bytes32 dev) public returns (uint){
      require(!hashs[dev], "Hash already in !");
      hashs[dev] = true;   
      devoirs.push(dev);
      return devoirs.length;
   }
}