const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cfreturn>');
}, Error, 'Missing required expression.');

is.throws(function () {
	r = test.cfparser.parse('<cfreturn >');
}, Error, 'Missing required expression.');

r = test.cfparser.parse('<cfreturn TRIM(username)>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'return');
is.equal(r.expression, 'TRIM(username)');
is.deepEqual(r.attributes, {});

r = test.cfparser.parse('<CFRETURN 1 NE 0>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'return');
is.equal(r.expression, '1 NE 0');
is.deepEqual(r.attributes, {});
