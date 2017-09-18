const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cffile />');
}, Error, 'Missing required attributes.');

is.throws(function () {
	r = test.cfparser.parse('<cffile file="/tmp/file" variable="something" >');
}, Error, 'Missing required action attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cffile action="read" file="/tmp/file" >');
}, Error, 'Missing required variable attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cffile action="read" variable="something" />');
}, Error, 'Missing required file attribute.');

r = test.cfparser.parse('<cffile action="read" variable="cffile_test" file="/tmp/file" >');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'read');
is.equal(r.attributes.variable, 'cffile_test');
is.equal(r.attributes.file, '/tmp/file');
is.equal(r.attributes.charset, 'utf-8');

r = test.cfparser.parse('<cffile action="read" charset="us-ascii" variable="cffile_test2" file="/tmp/file">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'read');
is.equal(r.attributes.variable, 'cffile_test2');
is.equal(r.attributes.file, '/tmp/file');
is.equal(r.attributes.charset, 'us-ascii');

r = test.cfparser.parse('<CFFILE ' +
'ACTION="read" ' +
'VARIABLE="cffile_test3" ' +
'FILE="/tmp/file" ' +
'CHARSET="us-ascii" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'read');
is.equal(r.attributes.variable, 'cffile_test3');
is.equal(r.attributes.file, '/tmp/file');
is.equal(r.attributes.charset, 'us-ascii');

test.ok();
