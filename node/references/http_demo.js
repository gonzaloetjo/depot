const http = require('http');

// Create server object
http.createServer((req, res) => {
    // write a response
    res.write('Hello world')
    res.end()
}).listen(5000, () => console.log('server running'));