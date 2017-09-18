const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cfif>');
}, Error, 'Missing required closing tag');

is.throws(function () {
	r = test.cfparser.parse('<cfif></cfif>');
}, Error, 'Missing required expression.');

is.throws(function () {
	r = test.cfparser.parse('<cfif ></cfif>');
}, Error, 'Missing required expression.');

r = test.cfparser.parse('<cfif TRIM(username) EQ "The most pointless code ever"></cfif>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'if');
is.equal(r.expression, 'TRIM(username) EQ "The most pointless code ever"');
is.equal(r.content, "");
is.deepEqual(r.attributes, {});

r = test.cfparser.parse('<cfif 0 EQ 0>' +
"We'll only ever get here" +
'<cfelseif 1>' + 
"\n</cfif>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'if');
is.equal(r.expression, '0 EQ 0');
is.equal(r.content, "We'll only ever get here");
is.deepEqual(r.attributes, {});

r = test.cfparser.parse('<cfif 0 EQ 0>' +
"We'll only ever get here" +
'<cfelseif 1>' + 
'<cfelse>' + 
"\n</cfif>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'if');
is.equal(r.expression, '0 EQ 0');
is.equal(r.content, "We'll only ever get here");
is.deepEqual(r.attributes, {});

r = test.cfparser.parse('<cfif 1 EQ 0>' +
"We'll never get here" +
'<cfelse></cfif>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'if');
is.equal(r.expression, '1 EQ 0');
is.equal(r.content, "We'll never get here");
is.deepEqual(r.attributes, {});

r = test.cfparser.parse('<CFIF 1 NE 0>' +
"\nThen do something" +
'</CFIF>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'if');
is.equal(r.expression, '1 NE 0');
is.equal(r.content, "\nThen do something");
is.deepEqual(r.attributes, {});

