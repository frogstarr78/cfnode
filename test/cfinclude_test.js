const is = require('assert'), test = require('./testlib');

var r;
is.throws(function () {
	r = test.cfparser.parse('<cfinclude>');
}, Error, "Missing required template attribute");

r = test.cfparser.parse('<cfinclude template="/path/to/taglib.jsp">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'include');
is.equal(r.attributes.template, '/path/to/taglib.jsp');

r = test.cfparser.parse('<CFINCLUDE TEMPLATE="/path/to/taglib.cfc">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'include');
is.equal(r.attributes.template, '/path/to/taglib.cfc');

