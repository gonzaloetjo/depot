class Noeud {
    constructor(valeur) {
      this.valeur = valeur
      this.gauche = undefined
      this.droite = undefined
    }

    ajouterValeur(v){
        var r = Math.random()
        if (this.gauche === undefined && r > 0.5){
            this.gauche = new Noeud(v)
        } else {
            if (this.droite === undefined) {
                this.droite = new Noeud(v)
            } else {
                r = Math.random()
                if (r > 0,5){
                    this.gauche.ajouterValeur(v)
                }
                else {
                    this.droit.ajouterValeur(v)
                }
            }
        }
    }
    afficherValeur() {
        console.log(this.valeur)
        if (this.gauche) this.gauche.afficherValeur()
        if (this.droite) this.droite.afficherValeur()
    }
}
   
class Arbre {
    constructor(valeur) {
        this.racine = new Noeud(valeur)
    }
    ajouterValeur(valeur) {
        this.racine.ajouterValeur(valeur)
    }
    afficherArbre() {
        
    }
}

let monArbre = new Arbre(5)

console.log(monArbre)

monArbre.ajouterValeur(4)
monArbre.ajouterValeur(6)
monArbre.ajouterValeur(7)
monArbre.ajouterValeur(8)
monArbre.ajouterValeur(8)
monArbre.ajouterValeur(8)
monArbre.ajouterValeur(8)

console.log(monArbre)
// A faire: Une fonction d'affichage de l'arbre


monArbre.afficherArbre()