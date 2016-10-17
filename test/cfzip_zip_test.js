var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cfzip action="zip" file="/tmp/file.zip" >');
}, Error, 'Missing required source attribute.');

is.throws(function () {
	r = cf.parse('<cfzip action="zip" source="/tmp" />');
}, Error, 'Missing required file attribute.');

r = cf.parse('<cfzip file="/tmp/file.zip" source="/tmp" >');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'zip');
is.equal(r.attributes.source, '/tmp');
is.equal(r.attributes.file, '/tmp/file.zip');
is.equal(r.attributes.overwrite, false);
is.equal(r.attributes.recurse, false);
is.equal(r.attributes.store_path, true);

r = cf.parse('<cfzip action="zip" file="/tmp/file.zip" source="/tmp" >');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'zip');
is.equal(r.attributes.source, '/tmp');
is.equal(r.attributes.file, '/tmp/file.zip');
is.equal(r.attributes.overwrite, false);
is.equal(r.attributes.recurse, false);
is.equal(r.attributes.store_path, true);

r = cf.parse('<cfzip ' +
'prefix="/tmp" ' +
'store_path="false" ' +
'filter="*.txt" ' +
'recurse="true" ' +
'action="zip" ' +
'overwrite="true" ' +
'source="/tmp2" ' +
'file="/tmp/file2.zip" ' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'zip');
is.equal(r.attributes.file, '/tmp/file2.zip');
is.equal(r.attributes.filter, '*.txt');
is.equal(r.attributes.overwrite, true);
is.equal(r.attributes.prefix, "/tmp");
is.equal(r.attributes.recurse, true);
is.equal(r.attributes.source, '/tmp2');
is.equal(r.attributes.store_path, false);

r = cf.parse('<CFZIP ' +
'FILTER="*.txt" ' +
'OVERWRITE="true" ' +
'PREFIX="/tmp" ' +
'ACTION="zip" ' +
'STORE_PATH="false" ' +
'SOURCE="/tmp3" ' +
'FILE="/tmp/file2.zip" ' +
'RECURSE="true" ' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'zip');
is.equal(r.attributes.file, '/tmp/file2.zip');
is.equal(r.attributes.filter, '*.txt');
is.equal(r.attributes.overwrite, true);
is.equal(r.attributes.prefix, "/tmp");
is.equal(r.attributes.recurse, true);
is.equal(r.attributes.source, '/tmp3');
is.equal(r.attributes.store_path, false);

r = cf.parse('<cfzip ' +
'filter="*.txt" ' +
'action="zip" ' +
'source="/tmp4" ' +
'file="/tmp/file.zip"' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'zip');
is.equal(r.attributes.file, '/tmp/file.zip');
is.equal(r.attributes.filter, '*.txt');
is.equal(r.attributes.recurse, false);
is.equal(r.attributes.source, '/tmp4');
is.equal(r.attributes.store_path, true);

r = cf.parse('<CFZIP ' +
'source="/tmp/files" ' +
'filter="*.jpg" ' +
'source="/tmp/dst5" ' +
'file="/tmp/file.zip" ' +
'action="zip" ' +
'file="/tmp/file2.zip" ' +
'filter="*.png" ' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'zip');
is.equal(r.attributes.source, '/tmp/dst5');
is.equal(r.attributes.file, '/tmp/file2.zip');
is.equal(r.attributes.filter, '*.png');
is.equal(r.attributes.recurse, false);
is.equal(r.attributes.store_path, true);

test.ok();
