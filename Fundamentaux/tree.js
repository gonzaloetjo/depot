class Noeud {
    constructor(val, parent) {
        this.valeur = val;
        this.gauche = undefined;
        this.droite = undefined;
        this.parent = parent;
    }
    ajouterNoeud(v){
        if (this.valeur === undefined && this.parent === undefined){
            this.valeur = v            
        }
        else {
            if (v<this.valeur){
                if (this.gauche === undefined){
                    this.gauche = new Noeud(v,this)
                } else {
                    this.gauche.ajouterNoeud(v)
                }
            } else {
                if (this.droite === undefined) {
                        this.droite = new Noeud(v,this)
                } else {
                    this.droite.ajouterNoeud(v)
                }
            }
        }
    }

    affichageInfixe(){
        let affichage = []
        if(this.gauche !== undefined){
            affichage = this.gauche.affichageInfixe()
        }
        affichage.push(this.valeur)
        if(this.droite !== undefined){
            affichage = affichage.concat(this.droite.affichageInfixe())
        }
        return affichage
    }

    deleteThis(valeur) {
        // if 
    }

    findValue(valeur) {
        if (valeur === this.valeur){
            return this
        }
        else if (valeur > this.valeur) {
            return this.droite.findValue(valeur)
        }
        else {
            return this.gauche.findValue(valeur)
        }
    }

    // Affiche la valeur du noeud et la valeur de ses deux enfants et de son parent
    toString() {
        var out = "Noeud " + this.valeur + ":  L";
        
        this.gauche === undefined ? out += "-" : out += this.gauche.valeur;
        out += " R";
        
        this.droite === undefined ? out += "-" : out += this.droite.valeur;
        out += " P";
        
        this.parent === undefined ? out += "-" : out += this.parent.valeur;
        console.log(out);
    }
}
class Arbre {
    constructor(valeur) {
        this.racine = new Noeud(valeur);
    }
    
    //Méthode pour trouver une valeur donnée dans un arbre binaire de recherche
    trouverNoeud(valeur) {        
        return this.racine.findValue(valeur)
    }
    //Méthode pour ajouter un noeud
    ajouterNoeud(valeur) {
        this.racine.ajouterNoeud(valeur)
    }
    
    //Méthode pour supprimer un noeud
    supprimerNoeud(valeur) {
        this.racine.deleteThis(valeur)
    }
    
    //Méthode pour afficher l’arbre selon un parcours infixe
    //Cette méthode doit retournée un tableau contenant la valeur des noeuds
    infixe() {
        if (this.racine !== undefined){
            return this.racine.affichageInfixe()
        }
    }
    
    //Méthode pour afficher la valeur d'un noeud à partir de sa valeur
    printNoeud (valeur) {
        let noeud = this.trouverNoeud(valeur);
        if (noeud !== undefined) noeud.toString();
    return noeud.valeur
    }
}

let a = new Arbre();
a.ajouterNoeud(30);
a.ajouterNoeud(18);
a.ajouterNoeud(24);
a.ajouterNoeud(11);
a.ajouterNoeud(33);
a.ajouterNoeud(13);
a.ajouterNoeud(40);
a.ajouterNoeud(46);
a.ajouterNoeud(14);
a.ajouterNoeud(21);
a.ajouterNoeud(12);
a.ajouterNoeud(10);
a.ajouterNoeud(31);
a.ajouterNoeud(35);
a.ajouterNoeud(32);

console.log(a.infixe());
console.log(a.printNoeud(24));
//console.log(a.supprimerNoeud(11))

[ 10, 11, 12, 13, 14, 18, 21, 24, 30, 31, 32, 33, 35, 40, 46 ]
[ 10, 11, 12, 13, 14, 18, 21, 24, 30, 30, 31, 32, 33, 35, 40, 46 ]
