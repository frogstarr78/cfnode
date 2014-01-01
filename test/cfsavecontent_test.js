var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	testlib = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cfsavecontent></cfsavecontent>');
}, Error);

r = cf.parse('<cfsavecontent variable="savecontent"></cfsavecontent>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'savecontent');
is.equal(r.attributes.variable, 'savecontent');
is.equal(r.content, '');

r = cf.parse('<cfsavecontent variable="savecontent">' +
"\n</cfsavecontent>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'savecontent');
is.equal(r.attributes.variable, "savecontent");
is.equal(r.content, "\n");

r = cf.parse('<cfsavecontent variable="savecontent">' +
"\nThis is the content that is saved #NOW()#" +
"\n</cfsavecontent>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'savecontent');
is.equal(r.attributes.variable, 'savecontent');
is.equal(r.content, "\nThis is the content that is saved #NOW()#\n");

testlib.die("Success!", 0);
