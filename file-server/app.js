var http = require("http"),
	url = require("url"),
	path = require("path"),
	fs = require("fs");

const hostname = '127.0.0.1';
const port = 8080;

function onFileNotExist(response) {
	response.writeHead(404, { "Content-Type": "text/plain"});
	response.write("404 Not Found\n");
	response.end();
}

function onFileReadError(response, err) {
	response.writeHead(500, { "Content-Type": "text/plain"});
	response.write(err + "\n");
	response.end();
}

function onFileSuccess(response, file) {
	response.writeHead(200);
	response.write(file, "binary");
	response.end();
}

const handler = function(request, response) {
	var uri = url.parse(request.url).pathname;
	var filename = path.join(process.cwd(), uri);
	fs.exists(filename, (exists) => {
		if (!exists) {
			onFileNotExist(response);
			return;
		}

		fs.readFile(filename, "binary", (err, file) => {
			if (err) {
				onFileReadError(response, err);
			} else {
				onFileSuccess(response, file);
			}
		});
	});
};

const server = http.createServer(handler);

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});