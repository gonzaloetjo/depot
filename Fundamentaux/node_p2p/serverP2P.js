const net = require('net')
const portRange = {min: 5000 , max: 6000}
//curl 127.0.0.1:5702
let id = process.argv[2]

function ping(message,port){
    const client = net.createConnection(port,()=>{
        client.write(message)
        client.destroy()
    })
    client.on("error", ()=>{})
}

function launchServer(id, port){
    const server = net.createServer(connection => {
        //Paramteres of server  
        let message
        connection.on('data', data => {
            message = data.toString()
            console.log('I received a message', message)
        })
    })
    server.listen(port)

    server.on('listening', () => {
        console.log(`The node ${id} listens through the port: ${port}`)
        ping(id,portRange.min)
    })

    server.on('error', (err) =>{
        if (err.code == 'EADDRINUSE'&& port < portRange.max)
            launchServer(id, port)
        else
            throw err
    })
}

launchServer(id, Math.floor(Math.random()*(portRange.max-portRange.min))+portRange.min)