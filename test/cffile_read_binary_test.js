const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cffile />');
}, Error, 'Missing required attributes.');

is.throws(function () {
	r = test.cfparser.parse('<cffile file="/tmp/file" variable="something" >');
}, Error, 'Missing required action attribute.');

is.throws(function () {
<<<<<<< HEAD
	r = cf.parse('<cffile action="readbinary" file="/tmp/file" >');
}, Error, 'Missing required variable attribute.');

is.throws(function () {
	r = cf.parse('<cffile action="readbinary" variable="something" />');
}, Error, 'Missing required file attribute.');

r = cf.parse('<cffile action="readbinary" variable="cffile_test" file="/tmp/file" >');
=======
	r = test.cfparser.parse('<cffile action="read" file="/tmp/file" >');
}, Error, 'Missing required variable attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cffile action="read" variable="something" />');
}, Error, 'Missing required file attribute.');

r = test.cfparser.parse('<cffile action="read" variable="cffile_test" file="/tmp/file" >');
>>>>>>> simplified_attributes
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'readbinary');
is.equal(r.attributes.variable, 'cffile_test');
is.equal(r.attributes.file, '/tmp/file');

<<<<<<< HEAD
r = cf.parse('<CFFILE ' +
'ACTION="read_binary" ' +
=======
r = test.cfparser.parse('<CFFILE ' +
'ACTION="read" ' +
>>>>>>> simplified_attributes
'VARIABLE="cffile_test3" ' +
'FILE="/tmp/file" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'read_binary');
is.equal(r.attributes.variable, 'cffile_test3');
is.equal(r.attributes.file, '/tmp/file');


r = cf.parse('<CFFILE ' +
'ACTION="readBinary" ' +
'VARIABLE="cffile_test3" ' +
'FILE="/tmp/file" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'read_binary');
is.equal(r.attributes.variable, 'cffile_test3');
is.equal(r.attributes.file, '/tmp/file');

test.ok();
