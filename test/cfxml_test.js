const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cfxml case_sensitive="no">');
}, Error, "Missing required variable attribute.");

r = test.cfparser.parse("<cfxml variable='cfxml_test2' />");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'xml');
is.equal(r.attributes.variable, 'cfxml_test2');
is.equal(r.attributes.case_sensitive, false);

r = test.cfparser.parse("<cfxml variable='cfxml_test3' case_sensitive='yes'>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'xml');
is.equal(r.attributes.variable, 'cfxml_test3');
is.equal(r.attributes.case_sensitive, true);

r = test.cfparser.parse("<CFXML VARIABLE='cfxml_test4' CASESENSITIVE='yes' />");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'xml');
is.equal(r.attributes.variable, 'cfxml_test4');
is.equal(r.attributes.case_sensitive, true);

test.ok();
