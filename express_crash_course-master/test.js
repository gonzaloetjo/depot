var net = require('net');

createServer(0, function () {
  var port = this.address().port;
  console.log('server was assigned port ' + port);
  createServer(port+1, function () {
    var port = this.address().port;
    console.log('server was assigned port ' + port);
    createServer(0, function () {
      var port = this.address().port;
      // This line will show that the OS skipped the occupied port and assigned the next available port.
      console.log('server was assigned port ' + port);
    });
  });
});

function createServer(port, callback) {
  console.log('create server with port ' + port);
  var server = net.createServer();
  server.listen(port, callback).unref();
}