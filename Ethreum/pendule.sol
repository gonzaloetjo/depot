pragma solidity ^0.6.0;

import "./pulsation.sol";

contract Pendule  {
 //Beat beat; //name of contract inside, and instansation
 string[] public balancier;
 //Beat tac;
 //Beat tic;
 Beat tic = new Beat("tic");
 Beat tac = new Beat("tac");
 /*function provoquePulsation()public{
   beat.addBeat();
 }*/
 
 /*function ajouterTacTic(Beat _tic, Beat _tac)public{
     tac = _tac;
     tic = _tic;
 }*/

 function mouvementsBalancier(uint k) public {
    for(uint i; i < k; i++){
        balancier.push(tic.addBeat());
        balancier.push(tac.addBeat());
    }
 }

}

