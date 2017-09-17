const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cfloop>');
}, Error, 'Missing required closing tag');

is.throws(function () {
	r = test.cfparser.parse('<cfloop></cfloop>');
}, Error, 'Missing required attributes.');

is.throws(function () {
	r = test.cfparser.parse('<cfloop list="a,b,c"></cfloop>');
}, Error, 'Missing required index attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfloop index="count"></cfloop>');
}, Error, 'Missing required list attribute.');

r = test.cfparser.parse('<cfloop index="item" list="a,b,c"></cfloop>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loop');
is.equal(r.content, "");
is.equal(r.attributes.index, 'item');
is.deepEqual(r.attributes.list, ['a', 'b', 'c']);
is.equal(r.attributes.delimiter, ',');

r = test.cfparser.parse('<cfloop index="item" delimiter=":" list="a,b,c"></cfloop>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loop');
is.equal(r.content, "");
is.equal(r.attributes.index, 'item');
is.deepEqual(r.attributes.list, ['a', 'b', 'c']);
is.equal(r.attributes.delimiter, ':');

r = test.cfparser.parse('<CFLOOP INDEX="item" LIST="a,b,c" DELIMITER=";"></CFLOOP>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loop');
is.equal(r.content, "");
is.equal(r.attributes.index, 'item');
is.deepEqual(r.attributes.list, ['a', 'b', 'c']);
is.equal(r.attributes.delimiter, ';');

test.ok();
