var is = require('assert'),
	util = require('util'),
	path = require('path'),
	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cfcache>');
}, Error);

is.throws(function () {
	r = cf.parse('<cfcache action="get" id="get1"></cfcache>');
}, Error, "Missing required name attribute for get action.");

is.throws(function () {
	r = cf.parse('<cfcache action="get" id="get2" name=""></cfcache>');
}, Error, "Invalid name attribute for get action.");

is.throws(function () {
	r = cf.parse('<cfcache action="get" name="get3"></cfcache>');
}, Error, "Missing required id attribute for get action.");

is.throws(function () {
	r = cf.parse('<cfcache action="get" name="get4" id=""></cfcache>');
}, Error, "Invalide id attribute for get action.");

is.throws(function () {
	r = cf.parse('<cfcache action="put" id="put1"></cfcache>');
}, Error, "Missing required value attribute for put action.");

is.throws(function () {
	r = cf.parse('<cfcache action="put" id="put2" value=""></cfcache>');
}, Error, "Invalide value attribute for put action.");

is.throws(function () {
	r = cf.parse('<cfcache action="put" value="#put3#"></cfcache>');
}, Error, "Missing required id attribute for put action.");

is.throws(function () {
	r = cf.parse('<cfcache action="put" id="" value="put4"></cfcache>');
}, Error, "Invalid id attribute for put action.");

is.throws(function () {
	r = cf.parse('<cfcache action="flush"></cfcache>');
}, Error, "Missing required id attribute for flush action.");

is.throws(function () {
	r = cf.parse('<cfcache action="flush" id=""></cfcache>');
}, Error, "Invalid id attribute for flush action.");

r = cf.parse('<cfcache>' +
"Pointless test\n" +
'</cfcache>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cache');
is.equal(r.content, "Pointless test\n");
is.equal(r.attributes.action, 'serverCache');
is.equal(r.attributes.disk_persistent, false);
is.equal(r.attributes.strip_whitespace, false);
is.equal(r.attributes.throw_on_error, false);
is.equal(r.attributes.use_cache, true);
is.equal(r.attributes.use_query_string, false);
is.equal(r.attributes.overflow_to_disk, false);

r = cf.parse('<cfcache ' +
'action="cache" ' +
'dependsOn="variables.abc,variables.xyz,url.params" ' +
'directory="/tmp/" ' +
'expireURL="*/expire?q=*" ' +
'diskPersistent="true" ' + 
'overflowToDisk="yes" ' +
'idleTime="1.5" ' +
'password="password" ' +
'port="8080" ' +
'protocol="http://" ' +
'stripWhiteSpace="yes" ' +
'throwOnError="1" ' +
'timespan="0.25" ' +
'useCache="false" ' +
'usequerystring="true" ' +
'username="username">' +
"\nThe page fragment to be cached, if any.\n" +
'</cfcache>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cache');
is.equal(r.content, "\nThe page fragment to be cached, if any.\n");
is.equal(r.attributes.action, 'cache');
is.deepEqual(r.attributes.depends_on, ['variables.abc', 'variables.xyz', 'url.params']);
is.equal(r.attributes.directory, '/tmp/');
is.equal(r.attributes.disk_persistent, true);
is.equal(r.attributes.expire_url, '*/expire?q=*');
is.equal(r.attributes.idle_time, 1.5);
is.equal(r.attributes.overflow_to_disk, true);
is.equal(r.attributes.password, "password");
is.equal(r.attributes.port, "8080");
is.equal(r.attributes.protocol, "http://");
is.equal(r.attributes.strip_whitespace, true);
is.equal(r.attributes.throw_on_error, true);
is.equal(r.attributes.timespan, 0.25);
is.equal(r.attributes.use_cache, false);
is.equal(r.attributes.use_query_string, true);
is.equal(r.attributes.username, 'username');

r = cf.parse('<CFCACHE ' +
'ACTION="optimal" ' +
'DEPENDSON="variables.abc,url.params" ' +
'DIRECTORY="/home/tmp/" ' +
'EXPIREURL="*/expire?q=*" ' +
'IDLETIME="2.5" ' +
'PASSWORD="password" ' +
'PORT="8081" ' +
'PROTOCOL="https://" ' +
'STRIPWHITESPACE="yes" ' +
'THROWONERROR="1" ' +
'TIMESPAN="1.25" ' +
'USECACHE="no" ' +
'USEQUERYSTRING="yes" ' +
'USERNAME="username2">' +
"\nThe page fragment to be cached, if any.\n" +
'</CFCACHE>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cache');
is.equal(r.content, "\nThe page fragment to be cached, if any.\n");
is.equal(r.attributes.action, 'optimal');
is.deepEqual(r.attributes.depends_on, ['variables.abc', 'url.params']);
is.equal(r.attributes.directory, '/home/tmp/');
is.equal(r.attributes.expire_url, '*/expire?q=*');
is.equal(r.attributes.idle_time, 2.5);
is.equal(r.attributes.password, "password");
is.equal(r.attributes.port, "8081");
is.equal(r.attributes.protocol, "https://");
is.equal(r.attributes.strip_whitespace, true);
is.equal(r.attributes.throw_on_error, true);
is.equal(r.attributes.timespan, 1.25);
is.equal(r.attributes.use_cache, false);
is.equal(r.attributes.use_query_string, true);
is.equal(r.attributes.username, 'username2');

test.ok();
