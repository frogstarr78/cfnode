var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

r = cf.parse('<cfbreak>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'break');
is.equal(r.content, '');

r = cf.parse('<CFBREAK>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'break');
is.equal(r.content, '');

test.ok();
