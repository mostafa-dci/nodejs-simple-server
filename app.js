const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    if (req.url === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hello World' }));
    } else if (req.url.split('/')[1] === 'assets') {
        let file = req.url.split('/')[req.url.split('/').length - 1];
        let fileExtension = file.split('.')[file.split('.').length - 1];
        res.writeHead(200, { 'Content-Type': `text/${fileExtension === 'css' ? 'css' : 'javascript'}` });
        fs.readFile(__dirname + "/public/" + req.url, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify({ message: 'File not found' }));
            } else {
                res.end(data);
            }
        }
        );
    } else {
        fs.readFile(`${__dirname}/views${req.url === '/' ? '/index' : req.url}.html`, (err, data) => {
            if (err) {
                res.writeHead(404);
                fs.readFile(__dirname + "/views/notfound.html", (error, data) => {
                    if (error) {
                        res.end(JSON.stringify({ message: 'File not found' }));
                    } else {
                        res.end(data)
                    }
                })
            } else {
                res.end(data);
            }
        }
        );
    }
}
);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);