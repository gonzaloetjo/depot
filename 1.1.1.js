const prompt = require('prompt-sync')({sigint: true});


var result = NumberBetween(1, 100)

function NumberBetween(min, max) {
    return (Math.random() * (max-min) | 0) + min;
}

for (i = 1; i<100; i++) {
    var guess = prompt("Guess a number between 1 and 100: ");
    difference = guess - result
    if (guess == result) {
        console.log("exact");
        break
    }
    else if (difference > 15) {
        console.log("C'est beaucoup moins");
    }
    else if (difference > 0) {
        console.log("C'est un peu moins");  
    } 
    
    else if (difference < -15) {
        console.log("C'est beaucoup plus");  
    }
    else {
        console.log("C'est un peu plus");  
    }
}
