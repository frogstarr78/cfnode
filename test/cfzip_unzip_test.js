var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cfzip action="unzip" file="/tmp/file.zip" >');
}, Error, 'Missing required destination attribute.');

is.throws(function () {
	r = cf.parse('<cfzip action="unzip" destination="/tmp/files" />');
}, Error, 'Missing file file attribute.');

r = cf.parse('<cfzip action="unzip" file="/tmp/file.zip" destination="/tmp/files" >');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'unzip');
is.equal(r.attributes.destination, '/tmp/files');
is.equal(r.attributes.file, '/tmp/file.zip');

r = cf.parse('<cfzip ' +
'destination="/tmp/dst" ' +
'filter="*.txt" ' +
'recurse="true" ' +
'overwrite="true" ' +
'entry_path="/files" ' +
'action="unzip" ' +
'store_path="/tmp/files"' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'unzip');
is.equal(r.attributes.store_path, '/tmp/files');
is.equal(r.attributes.destination, '/tmp/dst');
is.equal(r.attributes.file, '/tmp/file.zip');
is.equal(r.attributes.filter, '*.txt');
is.equal(r.attributes.recurse, true);
is.equal(r.attributes.show_directory, true);

r = cf.parse('<CFZIP ' +
'RECURSE="true" ' +
'OVERWRITE="true" ' +
'FILTER="*.txt" ' +
'ENTRYPATH="/files" ' +
'DESTINATION="/tmp/files" ' +
'STORE_PATH="/tmp/dst" ' +
'ACTION="unzip"' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'unzip');
is.equal(r.attributes.entry_path, '/tmp/files');
is.equal(r.attributes.file, '/tmp/file.zip');
is.equal(r.attributes.filter, '*.txt');
is.equal(r.attributes.recurse, true);
is.equal(r.attributes.show_directory, true);
is.equal(r.attributes.variable, 'cfzip_unzip_test3');

r = cf.parse('<cfzip ' +
'entrypath="/tmp/files" ' +
'filter="*.txt" ' +
'action="unzip" ' +
'file="/tmp/file.zip"' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'unzip');
is.equal(r.attributes.entry_path, '/tmp/files');
is.equal(r.attributes.file, '/tmp/file.zip');
is.equal(r.attributes.filter, '*.txt');
is.equal(r.attributes.recurse, true);
is.equal(r.attributes.show_directory, true);

r = cf.parse('<CFZIP ' +
'entrypath="/tmp/files" ' +
'filter="*.jpg" ' +
'variable="cfzip_unzip_test5" ' +
'file="/tmp/file.zip" ' +
'entrypath="/tmp/files2" ' +
'action="unzip" ' +
'variable="cfzip_unzip_test6" ' +
'file="/tmp/file2.zip" ' +
'filter="*.png" ' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'unzip');
is.equal(r.attributes.entry_path, '/tmp/files2');
is.equal(r.attributes.file, '/tmp/file2.zip');
is.equal(r.attributes.filter, '*.png');
is.equal(r.attributes.recurse, false);
is.equal(r.attributes.show_directory, false);
is.equal(r.attributes.variable, 'cfzip_unzip_test6');

test.ok();
