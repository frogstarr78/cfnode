var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

r = cf.parse('<cftrace></cftrace>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'trace');
is.equal(r.content, '');
is.equal(r.attributes.abort, false);
is.equal(r.attributes.inline, false);
is.equal(r.attributes.type, 'information');

r = cf.parse('<cftrace></cftrace>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'trace');
is.equal(r.content, '');
is.equal(r.attributes.abort, false);
is.equal(r.attributes.inline, false);
is.equal(r.attributes.type, 'information');

r = cf.parse('<cftrace var="FORM.username">' +
"\n</cftrace>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'trace');
is.equal(r.content, "\n");
is.equal(r.attributes.abort, false);
is.equal(r.attributes.inline, false);
is.equal(r.attributes.type, 'information');
is.equal(r.attributes.var, 'FORM.username');

r = cf.parse('<cftrace var="FORM.username" inline="0" abort="yes" category="trace category" type="warning" text="trace text">' +
"\nThis is the content that is saved #NOW()#" +
"\n</cftrace>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'trace');
is.equal(r.content, "\nThis is the content that is saved #NOW()#\n");
is.equal(r.attributes.abort, true);
is.equal(r.attributes.inline, false);
is.equal(r.attributes.type, 'warning');
is.equal(r.attributes.var, 'FORM.username');
is.equal(r.attributes.category, 'trace category');
is.equal(r.attributes.text, 'trace text');

r = cf.parse('<CFTRACE' +
		' VAR="FORM.username"' +
		' INLINE="1"' +
		' ABORT="yes"' + 
		' CATEGORY="trace category"' + 
		' TYPE="warning"' + 
		' TEXT="trace text"' + 
'>' + 
"\nThis is the content that is saved #NOW()#" +
"\n</cftrace>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'trace');
is.equal(r.content, "\nThis is the content that is saved #NOW()#\n");
is.equal(r.attributes.abort, true);
is.equal(r.attributes.inline, true);
is.equal(r.attributes.type, 'warning');
is.equal(r.attributes.var, 'FORM.username');
is.equal(r.attributes.category, 'trace category');
is.equal(r.attributes.text, 'trace text');

test.ok();
