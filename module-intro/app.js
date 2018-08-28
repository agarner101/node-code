var http = require('http');
var dt = require('./time-module');

const hostname = '127.0.0.1';
const port = 8080;

const handler = function(request, response) {
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("The date and time is currently: " + dt.getDate());
	response.end();
};

const server = http.createServer(handler);

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});