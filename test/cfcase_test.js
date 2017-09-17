const is = require('assert'), test = require('./testlib');

var r;
is.throws(function () {
	r = test.cfparser.parse('<cfcase>');
}, Error, 'Missing required value attribute');

is.throws(function () {
	r = test.cfparser.parse('<cfcase delimiter=",">');
}, Error, 'Missing required value attribute');

r = test.cfparser.parse('<cfcase value="#cfcase_test#">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'case');
is.equal(r.attributes.value, '#cfcase_test#');
is.equal(r.attributes.delimiter, ',');

r = test.cfparser.parse('<cfcase value="a,b,c" delimiter=";">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'case');
is.equal(r.attributes.value, 'a,b,c');
is.equal(r.attributes.delimiter, ';');

r = test.cfparser.parse('<CFCASE VALUE="a.b,c.d" DELIMITER=",.">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'case');
is.equal(r.attributes.value, 'a.b,c.d');
is.equal(r.attributes.delimiter, ',.');

test.ok();
