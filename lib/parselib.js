Object.prototype.has_key = function (key) { return Object.keys(this).indexOf(key) > -1; }
String.prototype.reduce = function () { return this; }
String.prototype.join = function () { return this; }

var uri = require('url');

function to_underbar(n) {
	return n.replace(/([A-Z])/g, function(v) {
		return '_' + v.toLowerCase();
	});
};
exports.to_underbar = to_underbar;

function flatten(v) {
	return v.reduce(function(prev, curr) { 
		return prev.concat(Array.isArray(curr) ? flatten(curr) : [curr]);
	}, []);
}
exports.flatten = flatten;

function stringify(v, andFunc) {
	var args = [];
	for(var i=1; i<arguments.length; i++) {
		if( Array.isArray(arguments[i]) ){
			args = flatten(arguments[i]);
		} else {
			args.push(arguments[i]);
		}
	}
	var funcMap = {
		int: parseInt,
		lower: function (n) { return n.toLowerCase(); }, 
		under: to_underbar,
		trim: function (t) { return t.trim(); },
		uri: function (u) { return uri.parse(u, true).path; }
	}

	var r = flatten(v).join('');

	var f;
	for(var i=0; i< args.length; i++) {
//		console.dir({args: args, i: i, argsi: args[i], funcMap: funcMap});
		if ( funcMap.has_key(args[i]) ) {
			f = funcMap[args[i]];
			return f(r);
		}
	}
	return r;
}
exports.stringify = stringify;

function mkDate(v) {
	return new Date(Date.parse(v == '' ? Date() : v));
}
exports.mkDate = mkDate;
