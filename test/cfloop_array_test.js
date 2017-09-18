const should = require('assert'), test = require('./testlib');

is.throws(function () {
	r = test.cfparser.parse('<cfloop>');
}, Error, 'Missing required closing tag');

is.throws(function () {
	r = test.cfparser.parse('<cfloop></cfloop>');
}, Error, 'Missing required attributes.');

is.throws(function () {
	r = test.cfparser.parse('<cfloop array="#arry#"></cfloop>');
}, Error, 'Missing required index attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfloop index="count"></cfloop>');
}, Error, 'Missing required array attribute.');

r = test.cfparser.parse('<cfloop index="item" array="#arry#"></cfloop>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loop');
is.equal(r.content, "");
is.equal(r.attributes.index, 'item');
is.equal(r.attributes.array, 'arry');

r = test.cfparser.parse('<CFLOOP ARRAY="#arry2#" INDEX="item"></CFLOOP>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loop');
is.equal(r.content, "");
is.equal(r.attributes.index, 'item');
is.equal(r.attributes.array, 'arry2');
