class Cercle {
    constructor(v) {
        this.rayon = v
    }
    aire(){
        return Math.PI * this.rayon * this.rayon 
    }
    perimetre(){
        return 2*Math.PI*this.rayon;    
    }
}

let c = new Cercle(5);
console.log({'aire': c.aire(), 'perimetre': c.perimetre()});
