const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cffile />');
}, Error, 'Missing required attributes.');

is.throws(function () {
	r = test.cfparser.parse('<cffile source="/tmp/sfile" destination="/tmp/dfile" />');
}, Error, 'Missing required action attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cffile source="/tmp/sfile" action="rename" >');
}, Error, 'Missing required destination attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cffile action="rename" destination="/tmp/file" >');
}, Error, 'Missing required source attribute.');

r = test.cfparser.parse('<cffile action="rename" destination="/tmp/dfile" source="/tmp/sfile">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'rename');
is.equal(r.attributes.destination, '/tmp/dfile');
is.equal(r.attributes.source, '/tmp/sfile');

r = test.cfparser.parse('<cffile action="rename" destination="/tmp/dfile" source="/tmp/sfile" ' +
'mode="721" attributes="normal">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'rename');
is.equal(r.attributes.destination, '/tmp/dfile');
is.equal(r.attributes.source, '/tmp/sfile');
is.deepEqual(r.attributes.attributes, ['normal']);
is.equal(r.attributes.mode, 721);

r = test.cfparser.parse('<CFFILE ' +
'ACTION="rename" ' +
'DESTINATION="/tmp/dfile" ' +
'SOURCE="/tmp/sfile" ' +
'MODE="721" ' +
'ATTRIBUTES="normal">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'rename');
is.equal(r.attributes.destination, '/tmp/dfile');
is.equal(r.attributes.source, '/tmp/sfile');
is.deepEqual(r.attributes.attributes, ['normal']);
is.equal(r.attributes.mode, 721);

test.ok();
