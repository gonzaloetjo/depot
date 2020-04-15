const https = require('https')
const express = require('express')
const app = express()

const port = 5000;
const url = "https://blockchain.info/rawblock/"



app.listen(5000, function () {
  console.log(`App listening on port ${port}!`)
})

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/block/:block', function (req, res, next) {
    let block = req.params.block;
    console.log(block)

	https.get( url + block, response => {
	    let resultat = "";
	    response.on("data", data => {
	        resultat += data;
	    })
	    response.on('end', () =>{
	        let blockJSON = JSON.parse(resultat)
	        let str = 'Block N° : '+block+'<br>Date : '+new Date(blockJSON.time*1000)+'<br>'
	        	str += 'Hauteur : '+blockJSON.height+'<br>'
	        	for (let i=0,j=blockJSON.tx.length;i<j;i++){
	        		str += 'Hash '+(i+1)+' : '+blockJSON.tx[i].hash+'<br>'
	        	}
	        	
						
	        console.log(blockJSON)

        	res.send(JSON.stringify(str))
	    })
	})

})
