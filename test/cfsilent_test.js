var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	testlib = require('./testlib');

var r;

r = cf.parse('<cfsilent></cfsilent>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'silent');
is.equal(r.content, '');

r = cf.parse('<cfsilent>' +
"\n</cfsilent>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'silent');
is.equal(r.content, "\n");


r = cf.parse('<CFSILENT>' +
" </CFSILENT>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'silent');
is.equal(r.content, ' ');

testlib.die("Success!", 0);
