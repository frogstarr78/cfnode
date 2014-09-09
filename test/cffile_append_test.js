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
	r = cf.parse('<cffile file="/tmp/file" output="something" >');
}, Error, 'Missing required action attribute.');

is.throws(function () {
	r = cf.parse('<cffile action="append" file="/tmp/file" >');
}, Error, 'Missing required output attribute.');

is.throws(function () {
	r = cf.parse('<cffile action="append" output="something" />');
}, Error, 'Missing required file attribute.');

r = cf.parse('<cffile action="append" output="cffile_test" file="/tmp/file">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'append');
is.equal(r.attributes.output, 'cffile_test');
is.equal(r.attributes.file, '/tmp/file');
is.equal(r.attributes.add_newline, true);
is.equal(r.attributes.charset, 'utf-8');
is.equal(r.attributes.fix_newline, false);

r = cf.parse('<cffile action="append" output="cffile_test2" file="/tmp/file" ' +
'add_newline="no" charset="us-ascii" fix_newline="yes" mode="721" attributes="normal">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'append');
is.equal(r.attributes.output, 'cffile_test2');
is.equal(r.attributes.file, '/tmp/file');
is.equal(r.attributes.add_newline, false);
is.equal(r.attributes.charset, 'us-ascii');
is.equal(r.attributes.fix_newline, true);
is.deepEqual(r.attributes.attributes, ['normal']);
is.equal(r.attributes.mode, 721);

r = cf.parse('<CFFILE ' +
'ADDNEWLINE="no" ' +
'ACTION="append" ' +
'OUTPUT="cffile_test2" ' +
'FIXNEWLINE="yes" ' +
'FILE="/tmp/file" ' +
'CHARSET="us-ascii" ' +
'MODE="721" ' +
'ATTRIBUTES="normal">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'append');
is.equal(r.attributes.output, 'cffile_test2');
is.equal(r.attributes.file, '/tmp/file');
is.equal(r.attributes.add_newline, false);
is.equal(r.attributes.charset, 'us-ascii');
is.equal(r.attributes.fix_newline, true);
is.deepEqual(r.attributes.attributes, ['normal']);
is.equal(r.attributes.mode, 721);

test.ok();
