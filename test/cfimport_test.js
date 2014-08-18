var is = require('assert'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	testlib = require('./testlib');

var r;
is.throws(function () {
	r = cf.parse('<cfimport>');
}, Error, "Missing required attributes");

is.throws(function () {
	r = cf.parse('<cfimport taglib="/path/to/taglib.cfc">');
}, Error, "Missing required prefix attribute");

is.throws(function () {
	r = cf.parse('<cfimport prefix="cfnode_test">');
}, Error, "Missing required taglib attribute");

r = cf.parse('<cfimport taglib="/path/to/taglib.jsp" prefix="">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'import');
is.equal(r.attributes.prefix, '');
is.equal(r.attributes.taglib, '/path/to/taglib.jsp');

r = cf.parse('<cfimport taglib="/path/to/taglib.jsp" prefix="cfnode" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'import');
is.equal(r.attributes.prefix, 'cfnode');
is.equal(r.attributes.taglib, '/path/to/taglib.jsp');

r = cf.parse('<cfimport prefix="" taglib="/path/to/taglib.cfc">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'import');
is.equal(r.attributes.prefix, '');
is.equal(r.attributes.taglib, '/path/to/taglib.cfc');

r = cf.parse('<CFIMPORT PREFIX="" TAGLIB="/path/to/taglib.cfc">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'import');
is.equal(r.attributes.prefix, '');
is.equal(r.attributes.taglib, '/path/to/taglib.cfc');

testlib.die("Success!", 0);
