var is = require('assert'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	testlib = require('./testlib');

var r;
is.throws(function () {
	r = cf.parse('<cfobjectcache>');
}, Error, "Missing required action attribute");

r = cf.parse('<cfobjectcache action="clear">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'objectcache');
is.equal(r.attributes.action, 'clear');

r = cf.parse('<cfobjectcache action="clear">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'objectcache');
is.equal(r.attributes.action, 'clear');

r = cf.parse('<cfobjectcache' +
		' action="clear"' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'objectcache');
is.equal(r.attributes.action, 'clear');

r = cf.parse('<CFOBJECTCACHE' +
		' ACTION="clear"' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'objectcache');
is.equal(r.attributes.action, 'clear');

testlib.die("Success!", 0);
