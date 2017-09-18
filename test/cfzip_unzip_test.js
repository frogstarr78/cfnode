const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cfzip action="unzip" file="/tmp/file.zip" >');
}, Error, 'Missing required destination attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfzip action="unzip" destination="/tmp/files" />');
}, Error, 'Missing file file attribute.');

r = test.cfparser.parse('<cfzip action="unzip" file="/tmp/file.zip" destination="/tmp/files" >');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'unzip');
is.equal(r.attributes.destination, '/tmp/files');
is.equal(r.attributes.file, '/tmp/file.zip');
is.equal(r.attributes.overwrite, false);
is.equal(r.attributes.recurse, false);
is.equal(r.attributes.store_path, true);

r = test.cfparser.parse('<cfzip ' +
'destination="/tmp/dst" ' +
'filter="*.txt" ' +
'recurse="true" ' +
'overwrite="true" ' +
'entry_path="/tmp/" ' +
'action="unzip" ' +
'store_path="false" ' +
'file="/tmp/file2.zip" ' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'unzip');
is.equal(r.attributes.destination, '/tmp/dst');
is.equal(r.attributes.entry_path, '/tmp/');
is.equal(r.attributes.file, '/tmp/file2.zip');
is.equal(r.attributes.filter, '*.txt');
is.equal(r.attributes.overwrite, true);
is.equal(r.attributes.recurse, true);
is.equal(r.attributes.store_path, false);

r = test.cfparser.parse('<CFZIP ' +
'RECURSE="yes" ' +
'FILE="/tmp/file3.zip" ' +
'OVERWRITE="true" ' +
'FILTER="*.txt" ' +
'ENTRYPATH="/files" ' +
'DESTINATION="/tmp/dst2" ' +
'STORE_PATH="yes" ' +
'ACTION="unzip"' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'unzip');
is.equal(r.attributes.destination, '/tmp/dst2');
is.equal(r.attributes.entry_path, '/files');
is.equal(r.attributes.file, '/tmp/file3.zip');
is.equal(r.attributes.filter, '*.txt');
is.equal(r.attributes.recurse, true);
is.equal(r.attributes.store_path, true);

r = test.cfparser.parse('<cfzip ' +
'entrypath="/tmp/files" ' +
'filter="*.txt" ' +
'destination="/tmp/dst3" ' +
'action="unzip" ' +
'file="/tmp/file.zip"' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'unzip');
is.equal(r.attributes.destination, '/tmp/dst3');
is.equal(r.attributes.entry_path, '/tmp/files');
is.equal(r.attributes.file, '/tmp/file.zip');
is.equal(r.attributes.filter, '*.txt');
is.equal(r.attributes.recurse, false);
is.equal(r.attributes.store_path, true);

r = test.cfparser.parse('<CFZIP ' +
'entrypath="/tmp/files" ' +
'filter="*.jpg" ' +
'destination="/tmp/dst4" ' +
'file="/tmp/file.zip" ' +
'entrypath="/tmp/files2" ' +
'action="unzip" ' +
'file="/tmp/file2.zip" ' +
'filter="*.png" ' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'unzip');
is.equal(r.attributes.destination, '/tmp/dst4');
is.equal(r.attributes.entry_path, '/tmp/files2');
is.equal(r.attributes.file, '/tmp/file2.zip');
is.equal(r.attributes.filter, '*.png');
is.equal(r.attributes.recurse, false);
is.equal(r.attributes.store_path, true);
