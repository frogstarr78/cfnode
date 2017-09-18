const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cffile />');
}, Error, 'Missing required attributes.');

is.throws(function () {
	r = test.cfparser.parse('<cffile fileField="sfile" destination="/tmp/dfile" />');
}, Error, 'Missing required action attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cffile fileField="sfile" action="upload" >');
}, Error, 'Missing required destination attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cffile action="upload" destination="/tmp/dfile" >');
}, Error, 'Missing required fileField attribute.');

r = test.cfparser.parse('<cffile action="upload" destination="/tmp/dfile" fileField="cffile_upload_test">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'upload');
is.equal(r.attributes.destination, '/tmp/dfile');
is.equal(r.attributes.file_field, 'cffile_upload_test');
is.equal(r.attributes.name_conflict, 'error');

r = test.cfparser.parse('<cffile action="upload" ' +
'destination="/tmp/dfile" ' +
'name_conflict="make_unique" ' +
'fileField="cffile_upload_test2" ' +
'accept="text/plain" ' +
'mode="721" attributes="normal,hidden" '+
'result="upload_res" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'upload');
is.equal(r.attributes.destination, '/tmp/dfile');
is.equal(r.attributes.accept, 'text/plain');
is.equal(r.attributes.name_conflict, 'make_unique');
is.equal(r.attributes.file_field, 'cffile_upload_test2');
is.deepEqual(r.attributes.attributes, ['normal', 'hidden']);
is.equal(r.attributes.mode, 721);
is.equal(r.attributes.result, 'upload_res');

r = test.cfparser.parse('<CFFILE ' +
'ACTION="upload" ' +
'ACCEPT="text/plain" ' +
'DESTINATION="/tmp/dfile" ' +
'FILEFIELD="cffile_upload_test3" ' +
'NAMECONFLICT="make_unique" ' +
'MODE="721" ' +
'ATTRIBUTES="normal, hidden, readOnly" '+
'RESULT="upload_res" ' +
'/>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'upload');
is.equal(r.attributes.destination, '/tmp/dfile');
is.equal(r.attributes.accept, 'text/plain');
is.equal(r.attributes.name_conflict, 'error');
is.equal(r.attributes.file_field, 'cffile_upload_test3');
is.deepEqual(r.attributes.attributes, ['normal', 'hidden', 'readOnly']);
is.equal(r.attributes.mode, 721);
is.equal(r.attributes.result, 'upload_res');

