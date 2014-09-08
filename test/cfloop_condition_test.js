var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cfloop>');
}, Error, 'Missing required closing tag');

is.throws(function () {
	r = cf.parse('<cfloop></cfloop>');
}, Error, 'Missing required condition attribute.');

r = cf.parse('<cfloop condition="count lt 5"></cfloop>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loop');
is.equal(r.content, "");
is.equal(r.attributes.condition, 'count lt 5');

r = cf.parse('<cfloop condition="count lt 5">' +
"We'll only ever get here #count#" +
"\n</cfloop>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loop');
is.equal(r.content, "We'll only ever get here #count#\n");
is.equal(r.attributes.condition, 'count lt 5');

r = cf.parse('<CFLOOP CONDITION="count gte 1">' +
"We'll only ever get here #count#" +
"\n</CFLOOP>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loop');
is.equal(r.content, "We'll only ever get here #count#\n");
is.equal(r.attributes.condition, 'count gte 1');

test.ok();
