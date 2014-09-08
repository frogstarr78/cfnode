var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

r = cf.parse('<cfexit>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'exit');
is.equal(r.attributes.method, 'exitTag');

r = cf.parse('<cfexit/>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'exit');
is.equal(r.attributes.method, 'exitTag');

r = cf.parse('<cfexit method="loop" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'exit');
is.equal(r.attributes.method, 'loop');

r = cf.parse('<cfexit method="exitTag">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'exit');
is.equal(r.attributes.method, 'exitTag');

r = cf.parse('<CFEXIT METHOD="exitTemplate">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'exit');
is.equal(r.attributes.method, 'exitTemplate');

test.ok();
