const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cfelse>');
}, Error, 'Missing required closing tag');

r = test.cfparser.parse('<cfelse></cfif>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'else');
is.equal(r.content, '');

r = test.cfparser.parse('<CFELSE></cfif>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'else');
is.equal(r.content, '');

r = test.cfparser.parse('<cfelse>' + 
"\nOtherwise we do this" +
'</cfif>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'else');
is.equal(r.content, "\nOtherwise we do this");

r = test.cfparser.parse('<CFELSE>' + 
"\nOtherwise we do this.\nStrang looking test." +
'</CFIF>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'else');
is.equal(r.content, "\nOtherwise we do this.\nStrang looking test.");

