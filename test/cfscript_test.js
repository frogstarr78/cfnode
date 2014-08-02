var is = require('assert'),
	PEG= require('pegjs'),
	cf = require(__dirname + '/../cf'),
	testlib = require('./testlib');

var r;
r = cf.parse('<cfscript></cfscript>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'script');
is.equal(r.content, '');

r = cf.parse('<CFSCRIPT></CFSCRIPT>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'script');
is.equal(r.content, '');

r = cf.parse('<cfscript>something done</cfscript>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'script');
is.equal(r.content, 'something done');


r = cf.parse('<CFSCRIPT>' +
"\nsomething more done" +
"\n</CFSCRIPT>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'script');
is.equal(r.content, "\nsomething more done\n");

testlib.die("Success!", 0);
