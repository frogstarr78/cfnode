var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	testlib = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cfelse>');
}, Error, 'Missing required closing tag');

r = cf.parse('<cfelse></cfif>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'else');
is.equal(r.content, '');

r = cf.parse('<CFELSE></cfif>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'else');
is.equal(r.content, '');

r = cf.parse('<cfelse>' + 
"\nOtherwise we do this" +
'</cfif>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'else');
is.equal(r.content, "\nOtherwise we do this");

r = cf.parse('<CFELSE>' + 
"\nOtherwise we do this.\nStrang looking test." +
'</CFIF>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'else');
is.equal(r.content, "\nOtherwise we do this.\nStrang looking test.");

testlib.die("Success!", 0);
