/**
 * Created by addison on 14-6-23.
 *
 * 请求静态文件处理函数
 * 类型:
 *
 * html
 * js
 * css
 * image - [bmp,png,jpg,jpeg,gif]
 *
 *
 */
var fs = require('fs');


function staticFile(req, res) {
    var url = req.url;

    var mime = {
        js: 'application/x-javascript',
        css: 'text/css',
        html: 'text/html',
        png: 'image/png',
        gif: 'image/gif',
        jpeg: 'image/jpeg',
        bmp: 'image/bmp',
        jpg: 'image/jpg',
        ico: 'image/x-icon'
    }
    var cache = [];
    var filePath = url;
    filePath.indexOf('?') != -1 ? filePath = filePath.split('?')[0] : filePath;
    filePath = filePath.substr(1, filePath.length);
    var sp = filePath.split('.');
    var fileType = sp[sp.length - 1];
    var ct = mime[fileType];
    filePath == '' ? filePath = 'index.html' : null;
    if (filePath != '') {
        ct = ct + ';charset=utf-8';
        fs.exists(filePath, function (a) {
            if (a) {
                fs.readFile(filePath, function (err, data) {
                    res.writeHead(200, {'Content-Type': ct});
                    res.write(data, 'binary');
                    res.end();
                });
            } else {
                if (filePath.indexOf('?') != -1) {
                    fs.readFile('index.html', function (err, data) {
                        res.writeHead(200, {'Content-Type': mime['html']});
                        res.write(data, 'binary');
                        res.end();
                    });
                } else {
                    res.write(filePath);
                    res.end();
                }
            }
        })
    }
}
exports.sf = staticFile;