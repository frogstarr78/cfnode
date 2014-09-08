var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

r = cf.parse('<cftry></cftry>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'try');
is.equal(r.content, '');

r = cf.parse('<cftry>' +
"\n</cftry>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'try');
is.equal(r.content, "\n");


r = cf.parse('<CFTRY>' +
" </CFTRY>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'try');
is.equal(r.content, ' ');

test.ok();
