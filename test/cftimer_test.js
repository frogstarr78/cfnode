var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

r = cf.parse('<cftimer></cftimer>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'timer');
is.equal(r.content, '');
is.equal(r.attributes.label, ' ');
is.equal(r.attributes.type, 'debug');

r = cf.parse('<cftimer label="timer">' +
"\n</cftimer>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'timer');
is.equal(r.attributes.label, "timer");
is.equal(r.attributes.type, 'debug');
is.equal(r.content, "\n");

r = cf.parse('<cftimer label="timer" type="inline">' +
"\nThis is the content that is saved #NOW()#" +
"\n</cftimer>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'timer');
is.equal(r.attributes.label, 'timer');
is.equal(r.attributes.type, 'inline');
is.equal(r.content, "\nThis is the content that is saved #NOW()#\n");

r = cf.parse('<CFTIMER LABEL="timer" TYPE="inline">' +
"\nThis is the content that is saved #NOW()#" +
"\n</CFTIMER>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'timer');
is.equal(r.attributes.label, 'timer');
is.equal(r.attributes.type, 'inline');
is.equal(r.content, "\nThis is the content that is saved #NOW()#\n");

test.ok();
