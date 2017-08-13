var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

r = cf.parse('<cfzip file="/path/to/destination.file" source="/path/to/source" >');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.action, 'zip');
is.equal(r.attributes.file, '/path/to/destination.file');
is.equal(r.attributes.source, '/path/to/source');

is.throws(function () {
  r = cf.parse('<cfzip action="delete" >');
}, Error, "Missing required file attribute.");

is.throws(function () {
	r = cf.parse('<cfzip action="list" name="size" >');
}, Error, "Missing required file attribute.");

is.throws(function () {
	r = cf.parse('<cfzip action="list" file="/path/to/file.zip" >');
}, Error, "Missing required name attribute.");

is.throws(function () {
	r = cf.parse('<cfzip action="read" entry_path="/path/to/" file="file.zip" >');
}, Error, "Missing required variable attribute.");

is.throws(function () {
	r = cf.parse('<cfzip action="read" file="file.zip" variable="read_zip" >');
}, Error, "Missing required entry_path attribute.");

is.throws(function () {
	r = cf.parse('<cfzip action="read" entry_path="/path/to/" variable="read_zip" >');
}, Error, "Missing required file attribute.");

is.throws(function () {
	r = cf.parse('<cfzip action="readbinary" entry_path="/path/to/" file="file.zip" >');
}, Error, "Missing required variable attribute.");

is.throws(function () {
	r = cf.parse('<cfzip action="read_binary" file="file.zip" variable="read_zip" >');
}, Error, "Missing required entry_path attribute.");

is.throws(function () {
	r = cf.parse('<cfzip action="readBinary" entry_path="/path/to/" variable="read_zip" >');
}, Error, "Missing required file attribute.");

is.throws(function () {
	r = cf.parse('<cfzip action="unzip" file="/path/to/file.zip" >');
}, Error, "Missing required destination attribute.");

is.throws(function () {
  r = cf.parse('<cfzip action="unzip" destination="/path/to/unzip/to" >');
}, Error, "Missing required file attribute.");

is.throws(function () {
	r = cf.parse('<cfzip action="zip" source="/path/to/unzip/to" >');
}, Error, "Missing required file attribute.");

is.throws(function () {
	r = cf.parse('<cfzip action="zip" file="/path/to/zip/dir" >');
}, Error, "Missing required source attribute.");

r = cf.parse('<cfzip file="/path/to/file.zip" source="/path/to/content_to/zip" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.charset, 'utf-8');
is.equal(r.attributes.action, 'zip');
is.equal(r.attributes.store_path, true);
is.equal(r.attributes.show_directory, false);
is.equal(r.attributes.recurse, true);
is.equal(r.attributes.overwrite, false);
is.equal(r.attributes.file, "/path/to/file.zip");
is.equal(r.attributes.source, "/path/to/content_to/zip");

r = cf.parse('<cfzip ' +
'charset="us-ascii" ' +
'file="/path/to/file.zip" ' +
'recurse="yes" ' +
'filter="*.txt" ' +
'store_path="no" ' +
'prefix="prefix_path" ' +
'source="/tmp/spath" ' +
'store_path="no" ' +
'/>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.charset, 'us-ascii');
is.equal(r.attributes.action, 'zip');
is.equal(r.attributes.store_path, false);
is.equal(r.attributes.show_directory, false);
is.equal(r.attributes.recurse, true);
is.equal(r.attributes.prefix, "prefix_path");
is.equal(r.attributes.file, "/path/to/file.zip");
is.equal(r.attributes.source, "/tmp/spath");

r = cf.parse('<cfzip ' +
'action="unzip" ' +
'charset="us-ascii" ' +
'file="/path/to/file.zip" ' +
'recurse="yes" ' +
'filter="*.txt" ' +
'store_path="no" ' +
'destination="/tmp/dpath" ' +
'prefix="prefix_path" ' +
'overwrite="no" ' +
'store_path="no" ' +
'/>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zip');
is.equal(r.attributes.charset, 'us-ascii');
is.equal(r.attributes.action, 'unzip');
is.equal(r.attributes.filter, '*.txt');
is.equal(r.attributes.store_path, false);
is.equal(r.attributes.show_directory, false);
is.equal(r.attributes.recurse, true);
is.equal(r.attributes.prefix, "prefix_path");
is.equal(r.attributes.file, "/path/to/file.zip");
is.equal(r.attributes.destination, "/tmp/dpath");

r = cf.parse('<CFZIPPARAM '+
'CHARSET="us-ascii" ' +
'CONTENT="content written" ' +
'RECURSE="yes" ' +
'ENTRYPATH="/tmp/dpath" ' +
'FILTER="*.txt" ' +
'PREFIX="/tmp/prefix_path" ' +
'SOURCE="/tmp/spath" ' +
'/>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'zipparam');
is.equal(r.attributes.charset, 'us-ascii');
is.equal(r.attributes.recurse, true);
is.equal(r.attributes.content, 'content written');
is.equal(r.attributes.entry_path, '/tmp/dpath');
is.equal(r.attributes.filter, '*.txt');
is.equal(r.attributes.prefix, '/tmp/prefix_path');
is.equal(r.attributes.source, '/tmp/spath');

test.ok();
