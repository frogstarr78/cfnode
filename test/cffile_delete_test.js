var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cffile />');
}, Error, 'Missing required attributes.');

is.throws(function () {
	r = cf.parse('<cffile file="/tmp/sfile">');
}, Error, 'Missing required action attribute.');

is.throws(function () {
	r = cf.parse('<cffile action="delete">');
}, Error, 'Missing required file attribute.');

r = cf.parse('<cffile action="delete" file="/tmp/file">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'delete');
is.equal(r.attributes.file, '/tmp/file');

r = cf.parse('<CFFILE ' +
'FILE="/tmp/file" ' +
'ACTION="delete">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'delete');
is.equal(r.attributes.file, '/tmp/file');

test.ok();
