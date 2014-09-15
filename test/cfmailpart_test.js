var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;


is.throws(function () {
	r = cf.parse('<cfmailpart></cfmailpart>');
}, Error, "Missing required attributes.");

r = cf.parse('<cfmailpart type="text"></cfmailpart>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'mailpart');
is.equal(r.attributes.type, 'text');
is.equal(r.attributes.wrap_text, 80);

r = cf.parse('<cfmailpart ' +
'type="text" ' + 
'charset="us-ascii" ' +
'wraptext="30">' +
"\nStuff" +
'</cfmailpart>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'mailpart');
is.equal(r.content, "\nStuff");
is.equal(r.attributes.type, 'text');
is.equal(r.attributes.charset, 'us-ascii');
is.equal(r.attributes.wrap_text, 30);

r = cf.parse('<CFMAILPART ' +
'TYPE="text" ' + 
'CHARSET="us-ascii" ' +
'WRAPTEXT="30">' +
"\nStuff" +
'</CFMAILPART>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'mailpart');
is.equal(r.content, "\nStuff");
is.equal(r.attributes.type, 'text');
is.equal(r.attributes.charset, 'us-ascii');
is.equal(r.attributes.wrap_text, 30);

test.ok();
