const https = require('https')
const express = require('express')
const path = require('path')
const app = express()
var portfinder = require('portfinder'); //https://github.com/http-party/node-portfinder
portfinder.basePort = 5000;
portfinder.highestPort = 6000;


function NumberBetween(min, max) {
    return (Math.random() * (max-min) | 0) + min;
}
// console.log(portfinder.getPort(function(err,port){
//     return port
// }))

var port = NumberBetween(5000,6000)


class Node {
    constructor(name, port) {
        this.name = name
        this.message = undefined
        this.port = port
    }

    // createServer(0, function () {
    //     this.port = this.address().port;
    //     console.log('server was assigned port ' + port);
    //     createServer(port+1, function () {
    //       var port = this.address().port;
    //       console.log('server was assigned port ' + port);
    //       createServer(0, function () {
    //         var port = this.address().port;
    //         // This line will show that the OS skipped the occupied port and assigned the next available port.
    //         console.log('server was assigned port ' + port);
    //       });
    //     });
    //   });


    server() {
        app.listen(port, function () {
        console.log(`App listening on port ${port}!`)
      })
    }

}

let listens = new Node("Hola",port)

console.log(listens)

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
//const port = 3000;
//const url = "https://blockchain.info/rawblock/"
// block/000000000002de92d93fcb92eeb2be097af8570a70fa5a8c6df473626891c9d6"

// const logger = (req, res, next) => {
//     console.log('Hello');
// }

// app.use(logger)

// app.listen(port, function () {
//   console.log(`App listening on port ${port}!`)
// })

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

// app.get('/block/:block', function (req, res, next) {
//     let block = req.params.block;
//     console.log(block)

// 	https.get( url + block, response => {
// 	    let result = "";
// 	    response.on("data", data => {
// 	        result += data;
// 	    })
// 	    response.on('end', () =>{
// 	        let blockJSON = JSON.parse(result)
// 	        let str = 'Block N° : '+block+'<br>Date : '+new Date(blockJSON.time*1000)+'<br>'
// 	        	str += 'Height : '+blockJSON.height+'<br>'
// 	        	for (let i=0,j=blockJSON.tx.length;i<j;i++){
// 	        		str += 'Hash '+(i+1)+' : '+blockJSON.tx[i].hash+'<br>'
// 	        	}
	        	
						
// 	        console.log(blockJSON)

//         	res.send(JSON.stringify(str))
// 	    })
// 	})

// })
