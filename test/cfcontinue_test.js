var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	testlib = require('./testlib');

var r;

r = cf.parse('<cfcontinue>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'continue');
is.equal(r.content, '');

r = cf.parse('<CFCONTINUE>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'continue');
is.equal(r.content, '');

testlib.die("Success!", 0);
