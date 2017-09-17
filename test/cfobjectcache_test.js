const is = require('assert'), test = require('./testlib');

var r;
is.throws(function () {
	r = test.cfparser.parse('<cfobjectcache>');
}, Error, "Missing required action attribute");

r = test.cfparser.parse('<cfobjectcache action="clear">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'objectcache');
is.equal(r.attributes.action, 'clear');

r = test.cfparser.parse('<cfobjectcache action="clear">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'objectcache');
is.equal(r.attributes.action, 'clear');

r = test.cfparser.parse('<cfobjectcache' +
		' action="clear"' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'objectcache');
is.equal(r.attributes.action, 'clear');

r = test.cfparser.parse('<CFOBJECTCACHE' +
		' ACTION="clear"' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'objectcache');
is.equal(r.attributes.action, 'clear');

test.ok();
