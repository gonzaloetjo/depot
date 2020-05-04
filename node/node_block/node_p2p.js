const https = require('https')
const express = require('express')
const path = require('path')
const app = express()
var portfinder = require('portfinder'); //https://github.com/http-party/node-portfinder
portfinder.basePort = 5000;
portfinder.highestPort = 6000;

const fetch = require('node-fetch');

const entierAleatoire = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomPort = entierAleatoire(5000, 6000);
const app = express();

let nom = process.argv[2]
app.get('/', (req, res) => {
res.send(` ${nom} est bien là`)
console.log("On vient de recevoir une demande")
})

app.listen(randomPort, console.log(`Noeud ${nom} lancé sur le port ${randomPort}`))

for (let i = 5000; i < 6000; i++) {
if(i != randomPort){
fetch(`http://127.0.0.1:${i}`)
.then(r=>r.text())
.then(resultat => console.log(resultat))
.catch(()=> { }); 
}
} 

// class Node {
    //     constructor(name) {
//         this.name = name
//         this.message = undefined
//         this.server
//     }


//     server() {
//         app.listen(port, function () {
//         console.log(`App listening on port ${port}!`)
//       })
//     }

// }


// var listens = new Node("Hola")
// console.log(listens)

// var portrange = 5000

// function getPort (cb) {
//     var port = portrange
//     portrange += 1
  
//     var server = net.createServer()
//     server.listen(port, function (err) {
//       server.once('close', function () {
//         cb(port)
//       })
//       server.close()
//     })
//     server.on('error', function (err) {
//       getPort(cb)
//     })
//   }
// const port = 3000;
// const url = "https://blockchain.info/rawblock/"
// block/000000000002de92d93fcb92eeb2be097af8570a70fa5a8c6df473626891c9d6"



