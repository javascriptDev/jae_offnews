/**
 * Created by a2014 on 14-6-17.
 */
var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {

    var url = req.url;

    if (url == '/') {
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        fs.readFile('/newDesign/index.html', 'utf8', function (err, data) {
            res.write(data);
            res.end();
        });

    } else {
        var a = url.split('.')[1] == 'js' ? 'application/x-javascript' : 'text/css';
        var u = url.replace('/', '');
        var ct = a + ';charset=utf-8';
        res.writeHead(200, {'Content-Type': ct});
        if (u != 'favicon.ico') {
            fs.readFile(url.replace('/', ''), 'utf8', function (err, data) {
                res.write(data);
                res.end();
            });
        }
    }


}).listen(process.env.PORT || 1337, null);
