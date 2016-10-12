var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cfzip action="delete">');
}, Error, 'Missing required file attribute.');

r = cf.parse('<cfzip action="delete" file="/tmp/file">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'delete');
is.equal(r.attributes.file, '/tmp/file');

r = cf.parse('<CFZIP ' +
'FILE="/tmp/file" ' +
'ACTION="delete">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'delete');
is.equal(r.attributes.file, '/tmp/file');

r = cf.parse('<cfzip action="delete" file="/tmp/file" entry_path="/tmp/path/to/file" filter="*.cfm" recurse="yes">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'delete');
is.equal(r.attributes.entry_path, '/tmp/path/to/file');
is.equal(r.attributes.file, '/tmp/file');
is.equal(r.attributes.filter, '*.cfm');
is.equal(r.attributes.recurse, true);

r = cf.parse('<cfzip ' +
'entryPath="/tmp/path/to/file" ' +
'file="/tmp/file" ' +
'filter="*.cfm" ' + 
'action="delete" ' +
'recurse="yes">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'delete');
is.equal(r.attributes.entry_path, '/tmp/path/to/file');
is.equal(r.attributes.file, '/tmp/file');
is.equal(r.attributes.filter, '*.cfm');
is.equal(r.attributes.recurse, true);

test.ok();
