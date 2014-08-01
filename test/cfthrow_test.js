var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	testlib = require('./testlib');

var r;

r = cf.parse('<cfthrow>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'throw');
is.equal(r.content, '');

r = cf.parse('<CFTHROW>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'throw');
is.equal(r.content, '');

testlib.die("Success!", 0);
