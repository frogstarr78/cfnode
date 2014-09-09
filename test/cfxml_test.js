var is = require('assert'),
	PEG= require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cfxml >');
}, Error, "Missing required variable attribute.");

is.throws(function () {
	r = cf.parse('<cfxml variable="" >');
}, Error, "Empty variable attribute value.");

r = cf.parse("<cfxml variable='cfxml_test2' />");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'xml');
is.equal(r.attributes.variable, 'cfxml_test2');
is.equal(r.attributes.case_sensitive, false);

r = cf.parse("<cfxml variable='cfxml_test3' case_sensitive='yes'>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'xml');
is.equal(r.attributes.variable, 'cfxml_test3');
is.equal(r.attributes.case_sensitive, true);

r = cf.parse("<CFXML VARIABLE='cfxml_test4' CASESENSITIVE='yes' />");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'xml');
is.equal(r.attributes.variable, 'cfxml_test4');
is.equal(r.attributes.case_sensitive, true);

test.ok();
