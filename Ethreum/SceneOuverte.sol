pragma solidity 0.6.0;

contract SceneOuvert{
    string[12] passagesArtistes; /** name of artist in strings, there are 12 */
    uint creneauxLibres = 12; /** empty slots per night */
    uint tour; /** désigne la case de l’artiste en cours de passage. */
    
    function sInscrire(string memory nomDArtiste) public { 
        /** allow anyone to adjust an artist (public)*/
        if (creneauxLibres > 0) {
            passagesArtistes[12 - creneauxLibres] = nomDArtiste;
            creneauxLibres -= 1;
        }
    }
    
    
     function passerArtisteSuivant() public {
       if (tour <= 12) { /** addition 3.1.1 */
           tour += 1;
        }
    }
    
    function getTour() public view returns (uint) {
        return tour;
    }
    
    function artisteEnCours() public view returns (string memory){
        if (tour == 12) {
            return "FIN";
        }
        else {
            return passagesArtistes[tour-1];
        }
    }
}