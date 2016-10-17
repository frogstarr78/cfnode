var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cffeed action="read" name="#struct#" properties="#astruct#" query="#query#" outputFile="/tmp/cffile.out" xmlVar="feed" >');
}, Error, 'Missing required source attributes.');

is.throws(function () {
	r = cf.parse('<cffeed name="#struct#" >');
}, Error, 'Missing required source attribute.');

is.throws(function () {
	r = cf.parse('<cffeed action="read" source="/path/to/feed/source.xml" >');
}, Error, 'Missing required supplimental attribute.');

r = cf.parse('<cffeed source="/path/to/feed.xml" name="#astructure#" >');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action, 'read');
is.equal(r.attributes.escape_chars, false);
is.equal(r.attributes.ignore_enclosure_error, false);
is.equal(r.attributes.overwrite, false);
is.equal(r.attributes.overwrite_enclosure, false);
is.equal(r.attributes.proxy_port, 80);
is.equal(r.attributes.source, '/path/to/feed.xml');
is.equal(r.attributes.timeout, 60);
is.equal(r.attributes.user_agent, 'ColdFusion (cfNode)');

r = cf.parse('<cffeed source="http://localhost/path/to/feed.xml" name="#astructure#" >');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action, 'read');
is.equal(r.attributes.escape_chars, false);
is.equal(r.attributes.ignore_enclosure_error, false);
is.equal(r.attributes.overwrite, false);
is.equal(r.attributes.overwrite_enclosure, false);
is.equal(r.attributes.proxy_port, 80);
is.equal(r.attributes.timeout, 60);
is.equal(r.attributes.source, 'http://localhost/path/to/feed.xml');
is.equal(r.attributes.user_agent, 'ColdFusion (cfNode)');

r = cf.parse('<cffeed action="read" properties="#astruct#" query="#query#" name="#struct#" source="/path/to/feed2.xml" outputFile="/tmp/cffile.out" xmlVar="feed" >');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action, 'read');
is.equal(r.attributes.output_file, '/tmp/cffile.out');
is.equal(r.attributes.properties, '#astruct#');
is.equal(r.attributes.query, '#query#');
is.equal(r.attributes.source, '/path/to/feed2.xml');
is.equal(r.attributes.xml_var, 'feed');

r = cf.parse('<cffeed ' +
'output_file="/tmp/cffile2.out" ' +
'properties="#astruct2#" ' +
'ignoreEnclosureError="yes" ' +
'xmlVar="feed2" ' +
'enclosureDir="/tmp" ' +
'source="http://localhost/path/to/feed.xml" ' +
'overwrite_enclosure="true" ' +
'proxyServer="example.com" ' +
'proxy_port="88" ' +
'timeout="90" ' +
'query="#aquery2#" ' +
'proxy_user="user" ' +
'userAgent="cfNode" ' +
'proxy_password="pass" ' +
'overwrite="yes" ' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action, 'read');
is.equal(r.attributes.escape_chars, false);
is.equal(r.attributes.ignore_enclosure_error, true);
is.equal(r.attributes.output_file, '/tmp/cffile2.out');
is.equal(r.attributes.overwrite, true);
is.equal(r.attributes.overwrite_enclosure, true);
is.equal(r.attributes.properties, '#astruct2#');
is.equal(r.attributes.proxy_password, 'pass');
is.equal(r.attributes.proxy_port, 88);
is.equal(r.attributes.proxy_server, 'example.com');
is.equal(r.attributes.proxy_user, 'user');
is.equal(r.attributes.query, '#aquery2#');
is.equal(r.attributes.source, 'http://localhost/path/to/feed.xml');
is.equal(r.attributes.timeout, 90);
is.equal(r.attributes.user_agent, 'cfNode');
is.equal(r.attributes.xml_var, 'feed2');

r = cf.parse('<cffeed ' +
'OUTPUTFILE="/tmp/cffile3.out" ' +
'OVERWRITE_ENCLOSURE="true" ' +
'IGNOREENCLOSUREERROR="yes" ' +
'XMLVAR="feed3" ' +
'ENCLOSUREDIR="/tmp" ' +
'PROXY_USER="user" ' +
'QUERY="#aquery3#" ' +
'PROXY_PASSWORD="pass" ' +
'TIMEOUT="91" ' +
'PROXYSERVER="example.com" ' +
'SOURCE="http://localhost/path/to/feed3.xml" ' +
'USERAGENT="cfNode" ' +
'PROXY_PORT="89" ' +
'PROPERTIES="#astruct3#" ' +
'OVERWRITE="yes" ' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action, 'read');
is.equal(r.attributes.escape_chars, false);
is.equal(r.attributes.ignore_enclosure_error, true);
is.equal(r.attributes.output_file, '/tmp/cffile3.out');
is.equal(r.attributes.overwrite, true);
is.equal(r.attributes.overwrite_enclosure, true);
is.equal(r.attributes.properties, '#astruct3#');
is.equal(r.attributes.proxy_password, 'pass');
is.equal(r.attributes.proxy_port, 89);
is.equal(r.attributes.proxy_server, 'example.com');
is.equal(r.attributes.proxy_user, 'user');
is.equal(r.attributes.query, '#aquery3#');
is.equal(r.attributes.source, 'http://localhost/path/to/feed3.xml');
is.equal(r.attributes.timeout, 91);
is.equal(r.attributes.user_agent, 'cfNode');
is.equal(r.attributes.xml_var, 'feed3');

test.ok();
