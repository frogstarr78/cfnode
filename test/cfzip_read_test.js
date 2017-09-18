const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cfzip action="read" file="/tmp/file.zip" entrypath="/tmp/files" >');
}, Error, 'Missing required variable attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfzip action="read" variable="something" entrypath="/tmp/files" />');
}, Error, 'Missing required file attribute.');

r = test.cfparser.parse('<cfzip action="read" variable="cffile_test" file="/tmp/file.zip" entrypath="/tmp/files" >');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'read');
is.equal(r.attributes.entry_path, '/tmp/files');
is.equal(r.attributes.file, '/tmp/file.zip');
is.equal(r.attributes.variable, 'cffile_test');

r = test.cfparser.parse('<cfzip ' +
'entrypath="/tmp/files" ' +
'charset="us-ascii" ' +
'variable="cffile_test2" ' +
'action="read" ' +
'file="/tmp/file.zip">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'read');
is.equal(r.attributes.charset, 'us-ascii');
is.equal(r.attributes.entry_path, '/tmp/files');
is.equal(r.attributes.file, '/tmp/file.zip');
is.equal(r.attributes.variable, 'cffile_test2');

r = test.cfparser.parse('<cfzip ' +
'entry_path="/tmp/files2" ' +
'charset="us-ascii" ' +
'variable="cffile_test2" ' +
'action="read" ' +
'file="/tmp/file.zip"' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'read');
is.equal(r.attributes.charset, 'us-ascii');
is.equal(r.attributes.entry_path, '/tmp/files2');
is.equal(r.attributes.file, '/tmp/file.zip');
is.equal(r.attributes.variable, 'cffile_test2');

r = test.cfparser.parse('<CFZIP ' +
'VARIABLE="cffile_test3" ' +
'FILE="/tmp/file3.zip" ' +
'ENTRYPATH="/tmp/files" ' +
'ACTION="read" ' +
'CHARSET="us-ascii" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'read');
is.equal(r.attributes.variable, 'cffile_test3');
is.equal(r.attributes.file, '/tmp/file3.zip');
is.equal(r.attributes.entry_path, '/tmp/files');
is.equal(r.attributes.charset, 'us-ascii');

r = test.cfparser.parse('<cfzip ' +
'action="read" ' +
'variable="cffile_test2" ' +
'file="/tmp/file.zip" ' +
'entry_path="/tmp/files2" ' +
'/>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'read');
is.equal(r.attributes.charset, 'utf-8');
is.equal(r.attributes.entry_path, '/tmp/files2');
is.equal(r.attributes.file, '/tmp/file.zip');
is.equal(r.attributes.variable, 'cffile_test2');

r = test.cfparser.parse('<cfzip ' +
'charset="utf-8" ' +
'action="read" ' +
'variable="cffile_test2" ' +
'file="/tmp/file.zip" ' +
'charset="us-ascii" ' +
'entry_path="/tmp/files2" ' +
'charset="iso-8859-1" ' +
'/>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'read');
is.equal(r.attributes.charset, 'iso-8859-1');
is.equal(r.attributes.entry_path, '/tmp/files2');
is.equal(r.attributes.file, '/tmp/file.zip');
is.equal(r.attributes.variable, 'cffile_test2');
