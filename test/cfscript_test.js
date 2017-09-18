const is = require('assert'), test = require('./testlib');

var r;
r = test.cfparser.parse('<cfscript></cfscript>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'script');
is.equal(r.content, '');

r = test.cfparser.parse('<CFSCRIPT></CFSCRIPT>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'script');
is.equal(r.content, '');

r = test.cfparser.parse('<cfscript>something done</cfscript>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'script');
is.equal(r.content, 'something done');


r = test.cfparser.parse('<CFSCRIPT>' +
"\nsomething more done" +
"\n</CFSCRIPT>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'script');
is.equal(r.content, "\nsomething more done\n");
