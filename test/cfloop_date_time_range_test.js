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

r = test.cfparser.parse('<cfloop index="day" from="Now()" to="#CreateTimeSpan(8, 0, 0, 0)#"></cfloop>');
is(r instanceof Object);
is.equal(r.tag, 'loop');
is.equal(r.content, "");
is.equal(r.attributes.index, 'day');
is(r.attributes.from instanceof Date);
is(r.attributes.to instanceof Date);
is(r.attributes.step instanceof Date);

r = test.cfparser.parse('<cfloop index="count" from="Now()" to="#CreateTimeSpan(8, 0, 0, 0)#" step="#CreateTimeSpan(2, 0, 0, 0)#">' +
"We'll only ever get here #count#" +
"\n</cfloop>");
is(r instanceof Object);
is.equal(r.tag, 'loop');
is.equal(r.content, "We'll only ever get here #count#\n");
is.equal(r.attributes.index, 'count');
is(r.attributes.from instanceof Date);
is(r.attributes.to instanceof Date);
is(r.attributes.step instanceof Date);
is(r.attributes.step instanceof Date);

r = test.cfparser.parse('<CFLOOP INDEX="count" FROM="Now()" TO="#CreateTimeSpan(8, 0, 0, 0)#" STEP="#CreateTimeSpan(3, 1, 0, 0)#">' +
"We'll only ever get here #count#" +
"\n</CFLOOP>");
is(r instanceof Object);
is.equal(r.tag, 'loop');
is.equal(r.content, "We'll only ever get here #count#\n");
is.equal(r.attributes.index, 'count');
is(r.attributes.from instanceof Date);
is(r.attributes.to instanceof Date);
is(r.attributes.step instanceof Date);
