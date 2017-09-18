const is = require('assert'), test = require('./testlib');

var r;
is.throws(function () {
	r = test.cfparser.parse('<cfimport>');
}, Error, "Missing required attributes");

is.throws(function () {
	r = test.cfparser.parse('<cfimport taglib="/path/to/taglib.cfc">');
}, Error, "Missing required prefix attribute");

is.throws(function () {
	r = test.cfparser.parse('<cfimport prefix="cfnode_test">');
}, Error, "Missing required taglib attribute");

r = test.cfparser.parse('<cfimport taglib="/path/to/taglib.jsp" prefix="">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'import');
is.equal(r.attributes.prefix, '');
is.equal(r.attributes.taglib, '/path/to/taglib.jsp');

r = test.cfparser.parse('<cfimport taglib="/path/to/taglib.jsp" prefix="cfnode" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'import');
is.equal(r.attributes.prefix, 'cfnode');
is.equal(r.attributes.taglib, '/path/to/taglib.jsp');

r = test.cfparser.parse('<cfimport prefix="" taglib="/path/to/taglib.cfc">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'import');
is.equal(r.attributes.prefix, '');
is.equal(r.attributes.taglib, '/path/to/taglib.cfc');

r = test.cfparser.parse('<CFIMPORT PREFIX="" TAGLIB="/path/to/taglib.cfc">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'import');
is.equal(r.attributes.prefix, '');
is.equal(r.attributes.taglib, '/path/to/taglib.cfc');

