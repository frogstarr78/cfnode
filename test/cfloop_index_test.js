const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cfloop>');
}, Error, 'Missing required closing tag');

is.throws(function () {
	r = test.cfparser.parse('<cfloop></cfloop>');
}, Error, 'Missing required attributes.');

is.throws(function () {
	r = test.cfparser.parse('<cfloop index="count" from="1"></cfloop>');
}, Error, 'Missing required to attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfloop index="count" to="2"></cfloop>');
}, Error, 'Missing required from attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfloop from="1" to="2"></cfloop>');
}, Error, 'Missing required index attribute.');

r = test.cfparser.parse('<cfloop index="count" from="1" to="3"></cfloop>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loop');
is.equal(r.content, "");
is.equal(r.attributes.index, 'count');
is.equal(r.attributes.from, 1);
is.equal(r.attributes.to, 3);
is.equal(r.attributes.step, 1);

r = test.cfparser.parse('<cfloop index="count" from="1" to="4" step="2" charset="utf8">' +
"We'll only ever get here #count#" +
"\n</cfloop>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loop');
is.equal(r.content, "We'll only ever get here #count#\n");
is.equal(r.attributes.index, 'count');
is.equal(r.attributes.from, 1);
is.equal(r.attributes.to, 4);
is.equal(r.attributes.step, 2);
is.equal(r.attributes.charset, 'utf8');

r = test.cfparser.parse('<CFLOOP INDEX="count" FROM="1" TO="4" STEP="3" CHARSET="utf8">' +
"We'll only ever get here #count#" +
"\n</CFLOOP>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loop');
is.equal(r.content, "We'll only ever get here #count#\n");
is.equal(r.attributes.index, 'count');
is.equal(r.attributes.from, 1);
is.equal(r.attributes.to, 4);
is.equal(r.attributes.step, 3);
is.equal(r.attributes.charset, 'utf8');

test.ok();
