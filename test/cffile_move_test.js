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
	r = cf.parse('<cffile source="/tmp/sfile" destination="/tmp/dfile" />');
}, Error, 'Missing required action attribute.');

is.throws(function () {
	r = cf.parse('<cffile source="/tmp/sfile" action="move" >');
}, Error, 'Missing required destination attribute.');

is.throws(function () {
	r = cf.parse('<cffile action="move" destination="/tmp/file" >');
}, Error, 'Missing required source attribute.');

r = cf.parse('<cffile action="move" destination="/tmp/dfile" source="/tmp/sfile">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'move');
is.equal(r.attributes.destination, '/tmp/dfile');
is.equal(r.attributes.source, '/tmp/sfile');
is.equal(r.attributes.charset, 'utf-8');

r = cf.parse('<cffile action="move" destination="/tmp/dfile" source="/tmp/sfile" ' +
'charset="us-ascii" mode="721" attributes="normal">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'move');
is.equal(r.attributes.destination, '/tmp/dfile');
is.equal(r.attributes.source, '/tmp/sfile');
is.equal(r.attributes.charset, 'us-ascii');
is.deepEqual(r.attributes.attributes, ['normal']);
is.equal(r.attributes.mode, 721);

r = cf.parse('<CFFILE ' +
'ACTION="move" ' +
'DESTINATION="/tmp/dfile" ' +
'SOURCE="/tmp/sfile" ' +
'CHARSET="us-ascii" ' +
'MODE="721" ' +
'ATTRIBUTES="normal">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'move');
is.equal(r.attributes.destination, '/tmp/dfile');
is.equal(r.attributes.source, '/tmp/sfile');
is.equal(r.attributes.charset, 'us-ascii');
is.deepEqual(r.attributes.attributes, ['normal']);
is.equal(r.attributes.mode, 721);

test.ok();
