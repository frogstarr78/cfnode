const is = require('assert'), test = require('./testlib');

var r;
is.throws(function () {
	r = test.cfparser.parse('<cfprocresult max_rows="2">');
}, Error, "Missing required name attribute");

r = test.cfparser.parse('<cfprocresult name="procresult">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'procresult');
is.equal(r.attributes.name, 'procresult');
is.equal(r.attributes.max_rows, -1);
is.equal(r.attributes.result_set, 1);

r = test.cfparser.parse('<cfprocresult maxRows="5" name="procresult2" resultSet="11">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'procresult');
is.equal(r.attributes.name, 'procresult2');
is.equal(r.attributes.max_rows, 5);
is.equal(r.attributes.result_set, 11);

r = test.cfparser.parse('<CFPROCRESULT NAME="procresult3" MAXROWS="10" RESULTSET="11" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'procresult');
is.equal(r.attributes.name, 'procresult3');
is.equal(r.attributes.max_rows, 10);
is.equal(r.attributes.result_set, 11);
