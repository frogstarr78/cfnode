const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cffile />');
}, Error, 'Missing required attributes.');

is.throws(function () {
	r = test.cfparser.parse('<cffile source="/tmp/sfile" destination="/tmp/dfile" >');
}, Error, 'Missing required action attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cffile action="copy" source="/tmp/sfile" >');
}, Error, 'Missing required destination attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cffile action="copy" destination="/tmp/dfile" />');
}, Error, 'Missing required source attribute.');

r = test.cfparser.parse('<cffile action="copy" source="/tmp/sfile" destination="/tmp/dfile">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'copy');
is.equal(r.attributes.destination, '/tmp/dfile');
is.equal(r.attributes.source, '/tmp/sfile');

r = test.cfparser.parse('<cffile action="copy" mode="721" attributes="normal" destination="/tmp/dfile" source="/tmp/sfile">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'copy');
is.equal(r.attributes.destination, '/tmp/dfile');
is.equal(r.attributes.source, '/tmp/sfile');
is.deepEqual(r.attributes.attributes, ['normal']);
is.equal(r.attributes.mode, 721);

r = test.cfparser.parse('<CFFILE ' +
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

