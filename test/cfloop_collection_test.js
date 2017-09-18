const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cfloop>');
}, Error, 'Missing required closing tag');

is.throws(function () {
	r = test.cfparser.parse('<cfloop></cfloop>');
}, Error, 'Missing required attributes.');

is.throws(function () {
	r = test.cfparser.parse('<cfloop collection="#struct#"></cfloop>');
}, Error, 'Missing required index attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfloop index="count"></cfloop>');
}, Error, 'Missing required collection attribute.');

r = test.cfparser.parse('<cfloop index="item" collection="#struct#"></cfloop>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loop');
is.equal(r.content, "");
is.equal(r.attributes.index, 'item');
is.equal(r.attributes.collection, 'struct');

r = test.cfparser.parse('<CFLOOP COLLECTION="#struct2#" INDEX="item"></CFLOOP>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loop');
is.equal(r.content, "");
is.equal(r.attributes.index, 'item');
is.equal(r.attributes.collection, 'struct2');

test.ok();
