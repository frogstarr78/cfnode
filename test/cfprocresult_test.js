var is = require('assert'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;
is.throws(function () {
	r = cf.parse('<cfprocresult>');
}, Error, "Missing required name attribute");

r = cf.parse('<cfprocresult name="procresult">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'procresult');
is.equal(r.attributes.name, 'procresult');
is.equal(r.attributes.max_rows, -1);
is.equal(r.attributes.result_set, 1);

r = cf.parse('<cfprocresult maxRows="5" name="procresult2" resultSet="11">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'procresult');
is.equal(r.attributes.name, 'procresult2');
is.equal(r.attributes.max_rows, 5);
is.equal(r.attributes.result_set, 11);

r = cf.parse('<CFPROCRESULT NAME="procresult3" MAXROWS="10" RESULTSET="11" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'procresult');
is.equal(r.attributes.name, 'procresult3');
is.equal(r.attributes.max_rows, 10);
is.equal(r.attributes.result_set, 11);

test.ok();
