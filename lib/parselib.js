var util = require('util');

Number.prototype.setMinutes = function (mins) { return new Date(this).setMinutes(mins); }
Number.prototype.setSeconds = function (secs) { return new Date(this).setSeconds(secs); }
Number.prototype.setMilliseconds = function (mills) { return new Date(this).setMilliseconds(mills); }
Number.prototype.toLocaleString = function () { return new Date(this).toLocaleString(); }
Number.prototype.toLocaleTimeString = function () { return new Date(this).toLocaleTimeString(); }

Array.prototype.flatten = function () {
	return this.reduce(function (prev, cur) {
		return prev.concat(cur);
	}, []);
}

function flatten(v) {
	return v.map(function(x) { 
		return Array.isArray(x) ? flatten(x) : x;
	}).join('');
}

exports.flatten = flatten;

function underbar_name(n) {
	return n.replace(/([A-Z])/g, function(v) {
		return '_' + v.toLowerCase();
	});
};
exports.underbar_name = underbar_name;

function mkDate(v) {
	return new Date(Date.parse(v == '' ? Date() : v));
}
exports.mkDate = mkDate;

function dir(label, o) {
	console.log(util.format("%s: <%s> %s", label||'', typeof o, o));
}

exports.dir = dir;
