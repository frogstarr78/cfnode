const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cffile />');
}, Error, 'Missing required attributes.');

is.throws(function () {
	r = test.cfparser.parse('<cffile file="/tmp/file" variable="something" >');
}, Error, 'Missing required action attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cffile action="read_binary" file="/tmp/file" >');
}, Error, 'Missing required variable attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cffile action="read_binary" variable="something" />');
}, Error, 'Missing required file attribute.');

r = test.cfparser.parse('<cffile action="readbinary" variable="cffile_test" file="/tmp/file" >');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'readbinary');
is.equal(r.attributes.variable, 'cffile_test');
is.equal(r.attributes.file, '/tmp/file');

r = test.cfparser.parse('<CFFILE ' +
'ACTION="read" ' +
'VARIABLE="cffile_test3" ' +
'FILE="/tmp/file" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'read_binary');
is.equal(r.attributes.variable, 'cffile_test3');
is.equal(r.attributes.file, '/tmp/file');


r = test.cfparser.parse('<CFFILE ' +
'ACTION="readBinary" ' +
'VARIABLE="cffile_test3" ' +
'FILE="/tmp/file" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'read_binary');
is.equal(r.attributes.variable, 'cffile_test3');
is.equal(r.attributes.file, '/tmp/file');

