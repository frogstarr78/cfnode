Object.prototype.has_key = function (key) { return Object.keys(this).indexOf(key) > -1; }
String.prototype.reduce = function () { return this; }
String.prototype.join = function () { return this; }

var uri = require('url'),
	util = require('util');

function is_empty(v) {
    return v === undefined || v === null || v === '';
}
exports.is_empty = is_empty;

function to_underbar(n) {
	return n.replace(/([A-Z])/g, function(v) {
		return '_' + v.toLowerCase();
	});
};
exports.to_underbar = to_underbar;

function to_camelcase(n) {
	var parts = n.split('_');
	var ret = '';

	parts.forEach(function (part) { 
		ret += is_empty(part) ? part : to_capitalize(part)	
	});
	return ret;
};
exports.to_camelcase = to_camelcase;

function to_capitalize(n) {
	return n[0].toUpperCase() + n.slice(1, n.length);
};
exports.to_capitalize = to_capitalize;

function flatten(v, dodenullify=false) {
	r = v.reduce(function(prev, curr) { 
		return prev.concat(Array.isArray(curr) ? flatten(curr) : [curr]);
	}, []);
	return dodenullify ? denullify(r) : r;
}
exports.flatten = flatten;

function denullify(v) {
	return v.filter((x) => x !== null);
}
exports.denullify = denullify;

function objectify (string) {
	var no = {};
	key_values = string.split(',');
	for( var i=0; i < key_values.length; i++ ) {
		key_val = key_values[i].split('=');
		no[key_val[0].trim()] = key_val[1].trim().replace(/['"]/g, '');
	}
	return no;
}
exports.objectify = objectify;

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
		array: function (s) { return s.indexOf(',') ? s.split(/, ?/g) : s; },
		camel: to_camelcase,
		caps: to_capitalize,
		float: parseFloat,
		int: parseInt,
		lower: function (n) { return n.toLowerCase(); }, 
		object: objectify,
		upper: function (n) { return n.toUpperCase(); }, 
		under: to_underbar,
		trim: function (t) { return t.trim(); },
		uri: function (u) { return uri.parse(u, true).href; }
	}

	var r = flatten(v).join('');

	var f;
	for(var i=0; i< args.length; i++) {
//		console.dir({args: args, i: i, argsi: args[i], funcMap: funcMap, r: r});
		if ( funcMap.has_key(args[i]) ) {
			f = funcMap[args[i]];
			r = f(r);
		}
	}
	return r;
}
exports.stringify = stringify;

function mkDate(v) {
	return new Date(Date.parse(is_empty(v) ? Date() : v));
}
exports.mkDate = mkDate;

function is_empty (thing) {
	return is_missing(thing) ? true : thing.length == 0;
}
exports.is_empty = is_empty;

function is_missing (thing) {
	return typeof thing === 'undefined' || thing === null ? true : false;
}
exports.is_missing = is_missing;
