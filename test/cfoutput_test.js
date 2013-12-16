var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	testlib = require('./testlib');

var r;

r = cf.parse('<cfoutput></cfoutput>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'output');
is.equal(r.content, '');

r = cf.parse('<cfoutput query="output">' +
"\n</cfoutput>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'output');
is.equal(r.attributes.query, "output");
is.equal(r.attributes.start_row, 1);
is.equal(r.attributes.max_rows, -1);
is.equal(r.attributes.group_case_sensitive, true);
is.equal(r.content, "\n");

r = cf.parse('<cfoutput query="output">' +
"\nThis is the content that is saved #NOW()#" +
"\n</cfoutput>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'output');
is.equal(r.attributes.query, 'output');
is.equal(r.attributes.start_row, 1);
is.equal(r.attributes.max_rows, -1);
is.equal(r.attributes.group_case_sensitive, true);
is.equal(r.content, "\nThis is the content that is saved #NOW()#\n");

r = cf.parse('<cfoutput query="output" startRow="2" maxRows="10" group="id" groupCaseSensitive="no">' +
"\nThis is the content that is saved #NOW()#" +
"\n</cfoutput>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'output');
is.equal(r.attributes.query, 'output');
is.equal(r.attributes.start_row, 2);
is.equal(r.attributes.max_rows, 10);
is.equal(r.attributes.group, 'id');
is.equal(r.attributes.group_case_sensitive, false);
is.equal(r.content, "\nThis is the content that is saved #NOW()#\n");

testlib.die("Success!", 0);
