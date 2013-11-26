var fs     = require('fs'),
var cftags = require('./cftags'),
	cffunc = require('./cffunc');

var scopes = {
	variables: null,
	cgi: null,
	session: null,
	cookie: null
};

var parser = function () {
	this.parse = function (file, scopes) {
			
	}
};

exports.cfparser = parser;
