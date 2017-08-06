var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cfinvoke />');
}, Error, 'Missing required attributes.');

is.throws(function () {
	r = cf.parse('<cfinvoke component="/tmp/sfile" method="/tmp/dfile" >');
}, Error, 'Missing required return_variable attribute.');

is.throws(function () {
	r = cf.parse('<cfinvoke component="/tmp/sfile" return_variable="/tmp/dfile" >');
}, Error, 'Missing required method attribute.');

is.throws(function () {
	r = cf.parse('<cfinvoke method="/tmp/sfile" return_variable="/tmp/dfile" >');
}, Error, 'Missing required component attribute.');

r = cf.parse('<cfinvoke component="comp_name" method="comp_meth" return_variable="retVal">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'invoke');
is.equal(r.attributes.component, 'comp_name');
is.equal(r.attributes.method, 'comp_meth');
is.equal(r.attributes.return_variable, 'retVal');

r = cf.parse('<cffile action="copy" mode="721" attributes="normal" destination="/tmp/dfile" source="/tmp/sfile">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'copy');
is.equal(r.attributes.destination, '/tmp/dfile');
is.equal(r.attributes.source, '/tmp/sfile');
is.deepEqual(r.attributes.attributes, ['normal']);
is.equal(r.attributes.mode, 721);

r = cf.parse('<CFFILE ' +
'ACTION="copy" ' +
'MODE="721" ' +
'SOURCE="/tmp/sfile" ' +
'ATTRIBUTES="normal,readOnly" ' +
'DESTINATION="/tmp/dfile">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'copy');
is.equal(r.attributes.destination, '/tmp/dfile');
is.equal(r.attributes.source, '/tmp/sfile');
is.deepEqual(r.attributes.attributes, ['normal', 'readOnly']);
is.equal(r.attributes.mode, 721);

test.ok();
