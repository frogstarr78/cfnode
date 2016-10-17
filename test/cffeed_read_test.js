var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cffeed action="read" properties="#astruct#" query="#query#" name="#struct#" source="/path/to/feed.xml" outputFile="/tmp/cffile.out" >');
}, Error, 'Missing required xml_var attribute.');

is.throws(function () {
	r = cf.parse('<cffeed action="read" properties="#astruct#" query="#query#" name="#struct#" outputFile="/tmp/cffile.out" xmlVar="feed" >');
}, Error, 'Missing required source attribute.');

is.throws(function () {
	r = cf.parse('<cffeed action="read" properties="#astruct#" query="#query#" source="/path/to/feed.xml" outputFile="/tmp/cffile.out" xmlVar="feed" >');
}, Error, 'Missing required name attribute.');

is.throws(function () {
	r = cf.parse('<cffeed action="read" properties="#astruct#" query="#query#" name="#struct#" source="/path/to/feed.xml" xmlVar="feed" >');
}, Error, 'Missing required output_file attribute.');

is.throws(function () {
	r = cf.parse('<cffeed action="read" properties="#astruct#" name="#struct#" source="/path/to/feed.xml" outputFile="/tmp/cffile.out" xmlVar="feed" >');
}, Error, 'Missing required query attribute.');

is.throws(function () {
	r = cf.parse('<cffeed action="read" query="#query#" name="#struct#" source="/path/to/feed.xml" outputFile="/tmp/cffile.out" xmlVar="feed" >');
}, Error, 'Missing required properties attribute.');

r = cf.parse('<cffeed action="read" properties="#astruct#" query="#query#" name="#struct#" source="/path/to/feed.xml" outputFile="/tmp/cffile.out" xmlVar="feed" >');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action, 'read');
is.equal(r.attributes.escape_chars, false);
is.equal(r.attributes.ignore_enclosure_error, false);
is.equal(r.attributes.output_file, '/tmp/cffile.out');
is.equal(r.attributes.overwrite, false);
is.equal(r.attributes.overwrite_enclosure, false);
is.equal(r.attributes.properties, '#astruct#');
is.equal(r.attributes.proxy_port, 80);
is.equal(r.attributes.query, '#aquery#');
is.equal(r.attributes.timeout, 60);
is.equal(r.attributes.user_agent, 'cfNode ColdFusion');
is.equal(r.attributes.xml_var, 'feed');

r = cf.parse('<cffeed ' +
'output_file="/tmp/cffile2.out" ' +
'properties="#astruct2#" ' +
'xmlVar="feed2" ' +
'column_map="#columns#" ' +
'query="#aquery2#" ' +
'overwrite="true" ' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action, 'read');
is.equal(r.attributes.column_map, '#columns#');
is.equal(r.attributes.output_file, '/tmp/cffile2.out');
is.equal(r.attributes.overwrite, true);
is.equal(r.attributes.properties, '#astruct2#');
is.equal(r.attributes.query, '#aquery2#');
is.equal(r.attributes.xml_var, 'feed2');

r = cf.parse('<CFFEED ' +
'OUTPUTFILE="/tmp/cffile3.out" ' +
'PROPERTIES="#astruct3#" ' +
'XMLVAR="feed3" ' +
'COLUMNMAP="#columns2#" ' +
'QUERY="#aquery3#" ' +
'OVERWRITE="1" ' +
'ACTION="read" ' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action, 'read');
is.equal(r.attributes.column_map, '#columns2#');
is.equal(r.attributes.output_file, '/tmp/cffile3.out');
is.equal(r.attributes.overwrite, true);
is.equal(r.attributes.properties, '#astruct3#');
is.equal(r.attributes.query, '#aquery3#');
is.equal(r.attributes.xml_var, 'feed3');

r = cf.parse('<cffeed ' +
'output_file="/tmp/cffile2.out" ' +
'properties="astruct2" ' +
'xmlVar="feed2" ' +
'xmlVar="feed4" ' +
'query="#aquery2#" ' +
'action="read" ' +
'output_file="/tmp/cffile4.out" ' +
'query="#aquery4#" ' +
'properties="#astruct4#" ' +
'overwrite="true" ' +
'action="read" ' +
'>');
is.equal(r.tag, 'feed');
is.equal(r.attributes.action, 'read');
is.equal(r.attributes.output_file, '/tmp/cffile4.out');
is.equal(r.attributes.overwrite, true);
is.equal(r.attributes.properties, '#astruct4#');
is.equal(r.attributes.query, '#aquery4#');
is.equal(r.attributes.xml_var, 'feed4');

test.ok();
