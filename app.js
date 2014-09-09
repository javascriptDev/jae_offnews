var http = require('http');
var fs = require('./staticFile').sf;
http.createServer(function (req, res) {
    fs(req, res);
}).listen(process.env.PORT || 1337, null);
