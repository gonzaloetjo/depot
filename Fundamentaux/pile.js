let table = []

let str = "suis je Bonjour AFFICHE pile une rien SUPPRIME AFFICHE"

function interprete(str) {
    array = str.split(" ")
    for (let i = 0; i < array.length; i++) {
        (i === 4) ? mid_word = table.pop() : 
        (i === array.length-2) ? table.pop : 
        (i === array.length-1) ? table.push(mid_word) :
        table.push(array[i])        
    }
    return table
}

console.log(interprete(str))