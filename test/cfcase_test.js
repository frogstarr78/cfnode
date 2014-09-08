var is = require('assert'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;
is.throws(function () {
	r = cf.parse('<cfcase>');
}, Error, 'Missing required value attribute');

is.throws(function () {
	r = cf.parse('<cfcase delimiters=",">');
}, Error, 'Missing required value attribute');

r = cf.parse('<cfcase value="#cfcase_test#">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'case');
is.equal(r.attributes.value, '#cfcase_test#');
is.equal(r.attributes.delimiter, ',');

r = cf.parse('<cfcase value="a,b,c" delimiter=";">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'case');
is.equal(r.attributes.value, 'a,b,c');
is.equal(r.attributes.delimiter, ';');

r = cf.parse('<CFCASE VALUE="a.b,c.d" DELIMITER=",.">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'case');
is.equal(r.attributes.value, 'a.b,c.d');
is.equal(r.attributes.delimiter, ',.');

test.ok();
