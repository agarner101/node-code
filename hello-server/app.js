const http = require('http');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((request, response) => {
	response.writeHead("200", {"Content-Type": "text/html"});
	response.write("Hello, world!");
	response.end();
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});