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
}, Error, 'Missing required attributes.');

is.throws(function () {
	r = cf.parse('<cfloop collection="#struct#"></cfloop>');
}, Error, 'Missing required index attribute.');

is.throws(function () {
	r = cf.parse('<cfloop index="count"></cfloop>');
}, Error, 'Missing required collection attribute.');

r = cf.parse('<cfloop index="item" collection="#struct#"></cfloop>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loop');
is.equal(r.content, "");
is.equal(r.attributes.index, 'item');
is.equal(r.attributes.collection, 'struct');

r = cf.parse('<CFLOOP COLLECTION="#struct2#" INDEX="item"></CFLOOP>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loop');
is.equal(r.content, "");
is.equal(r.attributes.index, 'item');
is.equal(r.attributes.collection, 'struct2');

test.ok();
