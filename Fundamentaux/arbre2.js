class Noeud {
    constructor(valeur) {
      this.valeur = valeur
      this.gauche = undefined
      this.droite = undefined
    }

    ajouterValeur(v){
        if (v<this.valeur){
            if (this.gauche === undefined){
                this.gauche = new Noeud(v)
            } else {
                this.gauche.ajouterValeur(v)
            }
        } else {
            if (this.droite === undefined) {
                    this.droite = new Noeud(v)
            } else {
                this.droite.ajouterValeur(v)
            }
        }

    }
    afficherValeur() {
        console.log(this.valeur)
        if (this.gauche) {
            this.gauche.afficherValeur()
        }
        if (this.droite) {
            this.droite.afficherValeur()
        }
    }

    affichageInfixe(){
        let affichage = []
        if(this.gauche !== undefined){
            affichage = this.gauche.affichageInfixe()
            affichage.push(this.valeur)
        }
        if(this.droite !== undefined){
            affichage = affichage.concat(affichage, this.droite.affichageInfixe())
        }
        return affichage
    }
}
   
class Arbre {
    constructor(valeur) {
        this.racine = new Noeud(valeur)
    }
    ajouterValeur(valeur) {
        this.racine.ajouterValeur(valeur)
    }
    affichageInfixe() {
        if (this.racine !== undefined){
            return this.racine.affichageInfixe()
        }
    }
    afficherArbre() {
        
    }
}

let monArbre = new Arbre(6)

console.log(monArbre)

monArbre.ajouterValeur(4)
monArbre.ajouterValeur(7)
monArbre.ajouterValeur(9)
monArbre.ajouterValeur(1)
monArbre.ajouterValeur(12)

//console.log(monArbre)
// A faire: Une fonction d'affichage de l'arbre
console.log(monArbre.affichageInfixe())

//monArbre.afficherArbre()