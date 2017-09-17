const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cffile />');
}, Error, 'Missing required attributes.');

is.throws(function () {
	r = test.cfparser.parse('<cffile file="/tmp/file" output="something" >');
}, Error, 'Missing required action attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cffile action="write" file="/tmp/file" >');
}, Error, 'Missing required output attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cffile action="write" output="something" />');
}, Error, 'Missing required file attribute.');

r = test.cfparser.parse('<cffile action="write" output="cffile_test" file="/tmp/file">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'write');
is.equal(r.attributes.output, 'cffile_test');
is.equal(r.attributes.file, '/tmp/file');
is.equal(r.attributes.add_newline, true);
is.equal(r.attributes.charset, 'utf-8');
is.equal(r.attributes.fix_newline, false);

r = test.cfparser.parse('<cffile action="write" output="cffile_test2" file="/tmp/file" ' +
'add_newline="no" charset="us-ascii" fix_newline="yes" mode="721" attributes="normal">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'write');
is.equal(r.attributes.output, 'cffile_test2');
is.equal(r.attributes.file, '/tmp/file');
is.equal(r.attributes.add_newline, false);
is.equal(r.attributes.charset, 'us-ascii');
is.equal(r.attributes.fix_newline, true);
is.deepEqual(r.attributes.attributes, ['normal']);
is.equal(r.attributes.mode, 721);

r = test.cfparser.parse('<CFFILE ' +
'ADDNEWLINE="no" ' +
'ACTION="write" ' +
'OUTPUT="cffile_test2" ' +
'FIXNEWLINE="yes" ' +
'FILE="/tmp/file" ' +
'CHARSET="us-ascii" ' +
'MODE="721" ' +
'ATTRIBUTES="normal">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'write');
is.equal(r.attributes.output, 'cffile_test2');
is.equal(r.attributes.file, '/tmp/file');
is.equal(r.attributes.add_newline, false);
is.equal(r.attributes.charset, 'us-ascii');
is.equal(r.attributes.fix_newline, true);
is.deepEqual(r.attributes.attributes, ['normal']);
is.equal(r.attributes.mode, 721);

test.ok();
