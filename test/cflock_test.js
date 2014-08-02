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
is.equal(r.attributes.name, undefined);
is.equal(r.attributes.throw_on_timeout, true);
is.equal(r.attributes.type, 'exclusive');

r = cf.parse('<cflock name="cflock" timeout="5" throw_on_timeout="no" type="readOnly">' +
"\n</cflock>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'lock');
is.equal(r.content, "\n");
is.equal(r.attributes.timeout, 5);
is.equal(r.attributes.name, 'cflock');
is.equal(r.attributes.throw_on_timeout, false);
is.equal(r.attributes.type, 'readOnly');

r = cf.parse('<CFLOCK NAME="cflock2" TIMEOUT="6" THROW_ON_TIMEOUT="NO" TYPE="readOnly">' +
"\nSome stuff here" + 
"\n</CFLOCK>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'lock');
is.equal(r.content, "\nSome stuff here\n");
is.equal(r.attributes.timeout, 6);
is.equal(r.attributes.name, 'cflock2');
is.equal(r.attributes.throw_on_timeout, false);
is.equal(r.attributes.type, 'readOnly');

testlib.die("Success!", 0);
