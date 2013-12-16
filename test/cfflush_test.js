var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	testlib = require('./testlib');

var r;

r = cf.parse('<cfflush>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'flush');

r = cf.parse('<cfflush interval="10">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'flush');
is.equal(r.attributes.interval, 10);

r = cf.parse('<CFFLUSH INTERVAL="10">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'flush');
is.equal(r.attributes.interval, 10);

testlib.die("Success!", 0);
