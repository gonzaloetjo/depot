const prompt = require('prompt-sync')({sigint: true});

var guess = prompt("Write a number: ");
let number = []
//let letters = [A,F]
changer = function(rest){
    switch(rest) {
        case 10: rest = "A"
            break
        case 11: rest = "B" 
            break
        case 12: rest = "C"  
            break 
        case 13: rest = "D" 
            break   
        case 14: rest = "E"
            break       
        case 15: rest = "F"  
            break 
    }
    return rest
}

hex = (argument) => {
    let rest = 0
    if ((argument % 16) >= 0 && (argument % 16) != argument) {
        rest = argument % 16 
        if (rest > 9){
            rest = changer(rest)
        }
        number.unshift(rest)

        hex(Math.floor(argument/16))
    } 
    else {
        rest = argument
        number.unshift(rest)
        console.log(number)
    } 
    if (number.length % 2 === 1) {
        number.unshift(0)
    }
    let numbers = []
    for (let i = 0; i < number.length; i += 1) {
            if (i % 2 === 0){
                numbers.push(number[i].toString()+number[i+1].toString())
            }
    }
    return numbers

}
a = hex(guess)
console.log(`this is your hex number (big endian): 0x${a.join(" ")}`)
console.log(`this is your hex number (small endian): 0x${a.reverse().join(" ")}`)


