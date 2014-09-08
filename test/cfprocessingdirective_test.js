var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

r = cf.parse('<cfprocessingdirective></cfprocessingdirective>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'processingdirective');
is.equal(r.content, '');

r = cf.parse('<cfprocessingdirective>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'processingdirective');
is.equal(r.content, '');

r = cf.parse('<cfprocessingdirective />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'processingdirective');
is.equal(r.content, '');

r = cf.parse('<cfprocessingdirective pageEncoding="utf-8">' +
"\n</cfprocessingdirective>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'processingdirective');
is.equal(r.attributes.page_encoding, "utf-8");
is.equal(r.attributes.suppress_whitespace, false);
is.equal(r.content, "\n");

r = cf.parse('<cfprocessingdirective pageEncoding="us-ascii" suppressWhitespace="yes">' +
"\nThis is the content that is saved #NOW()#" +
"\n</cfprocessingdirective>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'processingdirective');
is.equal(r.attributes.page_encoding, "us-ascii");
is.equal(r.attributes.suppress_whitespace, true);
is.equal(r.content, "\nThis is the content that is saved #NOW()#\n");

r = cf.parse('<CFPROCESSINGDIRECTIVE PAGEENCODING="us-ascii" SUPPRESSWHITESPACE="yes">' +
"\nThis is the content that is saved #NOW()#" +
"\n</CFPROCESSINGDIRECTIVE>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'processingdirective');
is.equal(r.attributes.page_encoding, "us-ascii");
is.equal(r.attributes.suppress_whitespace, true);
is.equal(r.content, "\nThis is the content that is saved #NOW()#\n");

r = cf.parse('<CFPROCESSINGDIRECTIVE PAGEENCODING="us-ascii" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'processingdirective');
is.equal(r.attributes.page_encoding, "us-ascii");
is.equal(r.attributes.suppress_whitespace, false);
is.equal(r.content, "");

test.ok();
