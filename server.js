var http    = require('http'),
    url     = require('url'),
	fs      = require('fs'),
	path    = require('path'),
	util    = require('util'),
	log     = console.log,
	debug   = util.debug,
	inspect = console.dir,
	cf      = require('./cf');


var serveFile = function(rPath, response) {
	fs.exists(rPath, function (exs) {
		if ( exs ) {
			response.writeHead(200, {'Content-Type': 'text/html'});
			fs.readFile(rPath, function(err, data) {
				if ( err ) throw err;
				response.end(data);
			});
		} else {
			response.writeHead(404, {'Content-Type': 'text/plain'});
			response.end("Requested file '" + rPath + "' doesn't exist\n");
		}
	});
}

var handleResponse = function(request, response) {
	var reqPath = path.join(__dirname, url.parse(request.url).pathname)

	fs.exists(reqPath, function (ex) {
		if( ex ) {
			fs.stat(reqPath, function (err, stat) {
				if ( err ) throw err;

				if ( stat.isFile() ) {
					serveFile(reqPath, response);
				} else if ( stat.isDirectory() ) {
					reqPath = path.join(reqPath, 'index.cfm');
					serveFile(reqPath, response);
				}
			});
		} else {
			response.writeHead(404, {'Content-Type': 'text/plain'});
			response.end("Requested file '" + reqPath + "' doesn't exist\n");
		}
	});
}

http.createServer(function (request, response) {
	var docRoot = __dirname;
	handleResponse(request, response);
		
}).listen(process.env.npm_package_config_port, process.env.npm_package_config_host);

log('Server running at http://' + process.env.npm_package_config_host + ':' + process.env.npm_package_config_port);
