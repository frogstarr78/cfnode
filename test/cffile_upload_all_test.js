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
	r = cf.parse('<cffile destination="/tmp/dfile" />');
}, Error, 'Missing required action attribute.');

is.throws(function () {
	r = cf.parse('<cffile action="upload_all" >');
}, Error, 'Missing required destination attribute.');

r = cf.parse('<cffile action="upload_all" destination="/tmp/dfile" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'upload_all');
is.equal(r.attributes.destination, '/tmp/dfile');
is.equal(r.attributes.name_conflict, 'error');

r = cf.parse('<cffile action="upload_all" ' +
'destination="/tmp/dfile" ' +
'name_conflict="make_unique" ' +
'accept="text/plain" ' +
'mode="721" ' +
'attributes="normal,hidden" '+
'result="upload_res" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'upload_all');
is.equal(r.attributes.destination, '/tmp/dfile');
is.equal(r.attributes.accept, 'text/plain');
is.equal(r.attributes.name_conflict, 'make_unique');
is.deepEqual(r.attributes.attributes, ['normal', 'hidden']);
is.equal(r.attributes.mode, 721);
is.equal(r.attributes.result, 'upload_res');

r = cf.parse('<CFFILE ' +
'ACTION="uploadAll" ' +
'ACCEPT="text/plain" ' +
'DESTINATION="/tmp/dfile" ' +
'NAMECONFLICT="make_unique" ' +
'MODE="721" ' +
'ATTRIBUTES="normal, hidden, readOnly" '+
'RESULT="upload_res" ' +
'/>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'upload_all');
is.equal(r.attributes.destination, '/tmp/dfile');
is.equal(r.attributes.accept, 'text/plain');
is.equal(r.attributes.name_conflict, 'error');
is.deepEqual(r.attributes.attributes, ['normal', 'hidden', 'readOnly']);
is.equal(r.attributes.mode, 721);
is.equal(r.attributes.result, 'upload_res');

test.ok();
