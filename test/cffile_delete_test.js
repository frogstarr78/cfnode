const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cffile />');
}, Error, 'Missing required attributes.');

is.throws(function () {
	r = test.cfparser.parse('<cffile file="/tmp/sfile">');
}, Error, 'Missing required action attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cffile action="delete">');
}, Error, 'Missing required file attribute.');

r = test.cfparser.parse('<cffile action="delete" file="/tmp/file">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'delete');
is.equal(r.attributes.file, '/tmp/file');

r = test.cfparser.parse('<CFFILE ' +
'FILE="/tmp/file" ' +
'ACTION="delete">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'file');
is.equal(r.attributes.action, 'delete');
is.equal(r.attributes.file, '/tmp/file');

