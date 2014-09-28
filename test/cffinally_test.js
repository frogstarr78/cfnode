var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

r = cf.parse('<cffinally ></cffinally>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'finally');
is.equal(r.content, '');

r = cf.parse('<CFFINALLY></CFFINALLY>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'finally');
is.equal(r.content, '');

r = cf.parse('<CFFINALLY>' +
"\n</CFFINALLY>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'finally');
is.equal(r.content, "\n");

r = cf.parse('<CFFINALLY>' +
"\nBetter stuff here\n</CFFINALLY>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'finally');
is.equal(r.content, "\nBetter stuff here\n");

test.ok();
