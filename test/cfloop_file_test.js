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
	r = cf.parse('<cfloop file="/tmp/file"></cfloop>');
}, Error, 'Missing required index attribute.');

is.throws(function () {
	r = cf.parse('<cfloop index="count"></cfloop>');
}, Error, 'Missing required file attribute.');

r = cf.parse('<cfloop index="item" file="/tmp/file"></cfloop>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loop');
is.equal(r.content, "");
is.equal(r.attributes.index, 'item');
is.deepEqual(r.attributes.file, '/tmp/file');

r = cf.parse('<cfloop index="item" delimiter=":" characters="10" file="/a/b/c"></cfloop>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loop');
is.equal(r.content, "");
is.equal(r.attributes.index, 'item');
is.equal(r.attributes.file, '/a/b/c');
is.equal(r.attributes.delimiter, ':');
is.equal(r.attributes.characters, 10);

r = cf.parse('<CFLOOP CHARACTERS="11" DELIMITER=":/" FILE="/a/b/c" INDEX="item"></cfloop>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loop');
is.equal(r.content, "");
is.equal(r.attributes.index, 'item');
is.equal(r.attributes.file, '/a/b/c');
is.equal(r.attributes.delimiter, ':/');
is.equal(r.attributes.characters, 11);

test.ok();
