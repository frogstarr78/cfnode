var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cfelseif>');
}, Error, 'Missing required closing tag');

is.throws(function () {
	r = cf.parse('<cfelseif></cfelseif>');
}, Error, 'Missing required expression.');

is.throws(function () {
	r = cf.parse('<cfelseif ></cfelseif>');
}, Error, 'Missing required expression.');

r = cf.parse('<cfelseif TRIM(username) EQ "">' +
"username is an empty string" +
'</cfif>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'elseif');
is.equal(r.expression, 'TRIM(username) EQ ""');
is.equal(r.content, "username is an empty string");
is.deepEqual(r.attributes, {});

r = cf.parse('<CFELSEIF 1 NE 0>' +
"\nThen do something" +
'</CFIF>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'elseif');
is.equal(r.expression, '1 NE 0');
is.equal(r.content, "\nThen do something");
is.deepEqual(r.attributes, {});

r = cf.parse('<cfelseif TRIM(username) EQ "">' +
"username is an empty string" +
'<cfelse>nothing</cfif>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'elseif');
is.equal(r.expression, 'TRIM(username) EQ ""');
is.equal(r.content, "username is an empty string");
is.deepEqual(r.attributes, {});

r = cf.parse('<cfelseif TRIM(username) EQ "">' +
"username is an empty string" +
'<cfelseif TRIM(username) EQ "me">empty</cfif>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'elseif');
is.equal(r.expression, 'TRIM(username) EQ ""');
is.equal(r.content, "username is an empty string");
is.deepEqual(r.attributes, {});

test.ok();
