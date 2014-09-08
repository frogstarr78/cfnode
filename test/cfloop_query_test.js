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
}, Error, 'Missing required query attribute.');

r = cf.parse('<cfloop query="cfloop_query"></cfloop>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loop');
is.equal(r.content, "");
is.equal(r.attributes.query, 'cfloop_query');
is.equal(r.attributes.start_row, 1);

r = cf.parse('<cfloop query="cfloop_query2" startRow="2" endRow="3">' +
"We'll only ever get here #count#" +
"\n</cfloop>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loop');
is.equal(r.content, "We'll only ever get here #count#\n");
is.equal(r.attributes.query, 'cfloop_query2');
is.equal(r.attributes.start_row, 2);
is.equal(r.attributes.end_row, 3);

r = cf.parse('<CFLOOP QUERY="cfloop_query3" STARTROW="3" ENDROW="4">' +
"We'll only ever get here #count#" +
"\n</CFLOOP>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loop');
is.equal(r.content, "We'll only ever get here #count#\n");
is.equal(r.attributes.query, 'cfloop_query3');
is.equal(r.attributes.start_row, 3);
is.equal(r.attributes.end_row, 4);

test.ok();
