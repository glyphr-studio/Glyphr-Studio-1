var http = require('http'),
    path = require('path'),
    fs = require('fs');

http.createServer(function(req, res){
    var root = "app",
        url = "",
        contentType = "text/html",
        filePath = "",
        rootFile = "glyphr.html",
        stream,
        mimeTypes = {
            '.txt': 'text/plain',
            '.html': 'text/html',
            '.css': 'text/css',
            '.xml': 'application/xml',
            '.json': 'application/json',
            '.js': 'application/javascript',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.png': 'image/png',
            '.svg': 'image/svg+xml'
        };

    if (req.method !== 'GET') {
        res.writeHead(405);
        res.end('Unsupported request method', 'utf8');
        return;
    }

    if ('.' + req.url !== './') {
        filePath = root + req.url;
    } else {
        filePath = root + '/' + rootFile;
    }

    fs.exists(filePath, function(file) {
        if (file === false) {
            res.writeHead(404);
            res.end();
            return;
        }

        stream = fs.createReadStream(filePath);

        stream.on('error', function(error) {
            res.writeHead(500);
            res.end();
            return;
        });

        contentType = mimeTypes[path.extname(filePath)];

        res.setHeader('Content-Type', contentType);
        res.writeHead(200);

        stream.pipe(res);
        stream.on('end', function() {
            res.end();
        });
    });

}).listen(3000);

console.log('Server running at http://localhost:3000/');
