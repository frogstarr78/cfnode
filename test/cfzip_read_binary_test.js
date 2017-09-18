const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cfzip action="readbinary" file="/tmp/file.zip" entry_path="/tmp/files" >');
}, Error, 'Missing required variable attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfzip action="readbinary" variable="something" entry_path="/tmp/files2" />');
}, Error, 'Missing required file attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfzip action="readbinary" variable="something" file="/tmp/files.zip" />');
}, Error, 'Missing required entry_path attribute.');

r = test.cfparser.parse('<cfzip action="readbinary" variable="cfzip_test" file="/tmp/file.zip" entry_path="/tmp/files3" >');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'readbinary');
is.equal(r.attributes.variable, 'cfzip_test');
is.equal(r.attributes.file, '/tmp/file.zip');
is.equal(r.attributes.entry_path, '/tmp/files3');

r = test.cfparser.parse('<CFZIP ' +
'ENTRY_PATH="/tmp/files4" ' +
'VARIABLE="cfzip_test3" ' +
'ACTION="read_binary" ' +
'FILE="/tmp/file.zip" ' + 
'/>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'read_binary');
is.equal(r.attributes.entry_path, '/tmp/files4');
is.equal(r.attributes.file, '/tmp/file.zip');
is.equal(r.attributes.variable, 'cfzip_test3');


r = test.cfparser.parse('<CFZIP ' +
'VARIABLE="cfzip_test3" ' +
'ACTION="readBinary" ' +
'ENTRYPATH="/tmp/files5" ' +
'FILE="/tmp/file.zip" ' + 
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'read_binary');
is.equal(r.attributes.entry_path, '/tmp/files5');
is.equal(r.attributes.file, '/tmp/file.zip');
is.equal(r.attributes.variable, 'cfzip_test3');
