var is = require('assert'),
	util = require('util'),
	path = require('path'),
	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	testlib = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cflock>');
}, Error, "Missing closing tag");

is.throws(function () {
	r = cf.parse('<cflock></cflock>');
}, Error, "Missing required timeout attribute");

r = cf.parse('<cflock timeout="1"></cflock>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'lock');
is.equal(r.attributes.timeout, 1);
is.equal(r.attributes.throw_on_timeout, true);
is.equal(r.attributes.type, 'exclusive');

r = cf.parse('<cflock applicationToken="CFAUTHORIZATION_cflock" cookie_domain=".example.com" idle_timeout="180">' +
"\n</cflock>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'lock');
is.equal(r.content, "\n");
is.equal(r.attributes.application_token, 'CFAUTHORIZATION_cflock');
is.equal(r.attributes.idle_timeout, 180);
is.equal(r.attributes.cookie_domain, '.example.com');

r = cf.parse('<CFLOGIN APPLICATIONTOKEN="CFAUTHORIZATION_cflock" cookie_domain=".example.com" idle_timeout="180">' + 
"\nSome stuff here" + 
"\n</CFLOGIN>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'lock');
is.equal(r.content, "\nSome stuff here\n");
is.equal(r.attributes.application_token, 'CFAUTHORIZATION_cflock');
is.equal(r.attributes.idle_timeout, 180);
is.equal(r.attributes.cookie_domain, '.example.com');

testlib.die("Success!", 0);
