var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cfzip action="list" file="/tmp/file.zip" entrypath="/tmp/files" >');
}, Error, 'Missing required variable attribute.');

is.throws(function () {
	r = cf.parse('<cfzip action="list" variable="something" entrypath="/tmp/files" />');
}, Error, 'Missing required file attribute.');

is.throws(function () {
	r = cf.parse('<cfzip file="/tmp/file.zip" variable="something" action="list" />');
}, Error, 'Missing required entry_path attribute.');

r = cf.parse('<cfzip action="list" variable="cfzip_list_test" file="/tmp/file.zip" entrypath="/tmp/files" >');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'list');
is.equal(r.attributes.entry_path, '/tmp/files');
is.equal(r.attributes.file, '/tmp/file.zip');
is.equal(r.attributes.variable, 'cfzip_list_test');

r = cf.parse('<cfzip ' +
'entrypath="/tmp/files" ' +
'filter="*.txt" ' +
'recurse="true" ' +
'show_directory="true" ' +
'variable="cfzip_list_test2" ' +
'action="list" ' +
'file="/tmp/file.zip"' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'list');
is.equal(r.attributes.entry_path, '/tmp/files');
is.equal(r.attributes.file, '/tmp/file.zip');
is.equal(r.attributes.filter, '*.txt');
is.equal(r.attributes.recurse, true);
is.equal(r.attributes.show_directory, true);
is.equal(r.attributes.variable, 'cfzip_list_test2');

r = cf.parse('<cfzip ' +
'ACTION="list" ' +
'SHOW_DIRECTORY="true" ' +
'FILTER="*.txt" ' +
'ENTRY_PATH="/tmp/files" ' +
'RECURSE="true" ' +
'VARIABLE="cfzip_list_test3" ' +
'FILE="/tmp/file.zip"' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'list');
is.equal(r.attributes.entry_path, '/tmp/files');
is.equal(r.attributes.file, '/tmp/file.zip');
is.equal(r.attributes.filter, '*.txt');
is.equal(r.attributes.recurse, true);
is.equal(r.attributes.show_directory, true);
is.equal(r.attributes.variable, 'cfzip_list_test3');

r = cf.parse('<CFZIP ' +
'entrypath="/tmp/files" ' +
'filter="*.txt" ' +
'variable="cfzip_list_test4" ' +
'action="list" ' +
'file="/tmp/file.zip"' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'list');
is.equal(r.attributes.entry_path, '/tmp/files');
is.equal(r.attributes.file, '/tmp/file.zip');
is.equal(r.attributes.filter, '*.txt');
is.equal(r.attributes.recurse, false);
is.equal(r.attributes.show_directory, false);
is.equal(r.attributes.variable, 'cfzip_list_test4');

r = cf.parse('<CFZIP ' +
'entrypath="/tmp/files" ' +
'filter="*.jpg" ' +
'variable="cfzip_list_test5" ' +
'file="/tmp/file.zip" ' +
'entrypath="/tmp/files2" ' +
'action="list" ' +
'variable="cfzip_list_test6" ' +
'file="/tmp/file2.zip" ' +
'filter="*.png" ' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'list');
is.equal(r.attributes.entry_path, '/tmp/files2');
is.equal(r.attributes.file, '/tmp/file2.zip');
is.equal(r.attributes.filter, '*.png');
is.equal(r.attributes.recurse, false);
is.equal(r.attributes.show_directory, false);
is.equal(r.attributes.variable, 'cfzip_list_test6');

test.ok();
