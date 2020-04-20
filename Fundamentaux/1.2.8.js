// Utilisation du module crypto pour la cryptographie assymétrique
const crypto = require('crypto')
let hash = enc => crypto.createHash('sha256').update(enc).digest('hex').substr(0,2)

let chaine = ["AA","BB","CC","DD", "EE"], leaves = [], total = [leaves], dist = ""
for (let i = 0; i < chaine.length; i++) {leaves.push(hash(Buffer.from(chaine[i])))}
total = [leaves], dist = ""
array = arr => {
    let node = []
    if (arr.length % 2 !== 0 && arr.length > 1){
        dist = arr[arr.length-1]
        arr = arr.slice(0,arr.length-1)
    }
    if (arr.length > 1) {
        for (let i = 0; i < arr.length-1; i += 2) {
            dist !== "" ? node.push(hash(Buffer.from(arr[i]+arr[i+1])), dist) : node.push(hash(Buffer.from(arr[i]+arr[i+1])));      
        }
        total.unshift(node)
        dist = ""
        array(node)
    }
    return total
}

class MerkleTree {
    constructor(chaine) {
        this.leaves = chaine.map(transaction => hash(transaction));
        this.tree = array(this.leaves)
        this.base = chaine
    }
    afficher() {
        console.log("base: " + this.base)
        console.log("leaves: " + this.leaves)
        console.log("tree: ")
        console.log(this.tree)
    }
}
let tree = new MerkleTree(chaine)
console.log(tree.afficher(chaine))