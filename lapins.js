const prompt = require('prompt-sync')({sigint: true});

var generation = prompt("choose how many generations you want bunnies to reproduce ");
var old = 1
var ne = 0
var res = 0

function fib(generation) {
    for (i = 1; i <= generation-1; i++) {
        if (i == 1){
            console.log(i + " pair of old bunnies")
        }
        res = ne + old
        ne = old
        old = res
        console.log(res + " pair of bunnies. There are " + ne*2 + " young bunnies")
        return res
    }
}

fib(generation)

//console.log(process.argv[2])