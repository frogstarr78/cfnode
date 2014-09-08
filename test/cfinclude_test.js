var is = require('assert'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;
is.throws(function () {
	r = cf.parse('<cfinclude>');
}, Error, "Missing required template attribute");

r = cf.parse('<cfinclude template="/path/to/taglib.jsp">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'include');
is.equal(r.attributes.template, '/path/to/taglib.jsp');

r = cf.parse('<CFINCLUDE TEMPLATE="/path/to/taglib.cfc">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'include');
is.equal(r.attributes.template, '/path/to/taglib.cfc');

test.ok();
