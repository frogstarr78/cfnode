var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cfreturn>');
}, Error, 'Missing required expression.');

is.throws(function () {
	r = cf.parse('<cfreturn >');
}, Error, 'Missing required expression.');

r = cf.parse('<cfreturn TRIM(username)>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'return');
is.equal(r.expression, 'TRIM(username)');
is.deepEqual(r.attributes, {});

r = cf.parse('<CFRETURN 1 NE 0>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'return');
is.equal(r.expression, '1 NE 0');
is.deepEqual(r.attributes, {});

test.ok();
