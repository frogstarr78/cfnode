var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

r = cf.parse('<cfdefaultcase>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'defaultcase');

r = cf.parse('<CFDEFAULTCASE>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'defaultcase');

test.ok();
