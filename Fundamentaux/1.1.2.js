const prompt = require('prompt-sync')({sigint: true});

var result = prompt("incert a number between 1 and 100: ");

for (i = 1; i<100; i++) {
    guess = i
    difference = guess - result
    if (guess == result) {
        console.log("la reponse est " + guess);
        break
    }
    else {
        console.log("Ma proposition est " + guess);
    }
}