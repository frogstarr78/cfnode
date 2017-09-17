const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cfloop>');
}, Error, 'Missing required closing tag');

is.throws(function () {
	r = test.cfparser.parse('<cfloop></cfloop>');
}, Error, 'Missing required condition attribute.');

r = test.cfparser.parse('<cfloop condition="count lt 5"></cfloop>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loop');
is.equal(r.content, "");
is.equal(r.attributes.condition, 'count lt 5');

r = test.cfparser.parse('<cfloop condition="count lt 5">' +
"We'll only ever get here #count#" +
"\n</cfloop>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loop');
is.equal(r.content, "We'll only ever get here #count#\n");
is.equal(r.attributes.condition, 'count lt 5');

r = test.cfparser.parse('<CFLOOP CONDITION="count gte 1">' +
"We'll only ever get here #count#" +
"\n</CFLOOP>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loop');
is.equal(r.content, "We'll only ever get here #count#\n");
is.equal(r.attributes.condition, 'count gte 1');

test.ok();
