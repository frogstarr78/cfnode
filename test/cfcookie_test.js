var is = require('assert'),
	util = require('util'),
	path = require('path'),
	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	testlib = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cfcookie>');
}, Error);

is.throws(function () {
	r = cf.parse('<cfcookie path="/path/here" name="cfcookietest">');
}, Error, "Expecting error when path with no domain was specified.");

r = cf.parse('<cfcookie name="cfcookietest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
is.equal(r.attributes.expires.toLocaleString(), new Date().toLocaleString());

r = cf.parse('<cfcookie name="cfcookietest" domain=".example.com">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
is.equal(r.attributes.domain, '.example.com');
is.equal(r.attributes.expires.toLocaleString(), new Date().toLocaleString());

r = cf.parse('<cfcookie domain=".example.com" name="cfcookietest" secure="no">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
is.equal(r.attributes.domain, '.example.com');
is.equal(r.attributes.secure, false);
is.equal(r.attributes.expires.toLocaleString(), new Date().toLocaleString());

r = cf.parse('<cfcookie path="/path/here" domain=".example.com" value="hello test" name="cfcookietest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
is.equal(r.attributes.path, '/path/here');
is.equal(r.attributes.domain, '.example.com');
is.equal(r.attributes.value, 'hello test');
is.equal(r.attributes.expires.toLocaleString(), new Date().toLocaleString());

r = cf.parse('<cfcookie expires="now" name="cfcookietest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
is.equal(r.attributes.expires.toLocaleString(), new Date().toLocaleString());

r = cf.parse('<cfcookie expires="never" name="cfcookietest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
is.equal(r.attributes.expires.toLocaleString(), human_date('in 30 years').toLocaleString());

r = cf.parse('<cfcookie expires="2013-01-01" name="cfcookietest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
is.equal(r.attributes.expires.toLocaleString(), new Date(2013, 0, 01).toLocaleString());

r = cf.parse('<cfcookie expires="2013-01-01 12:34:56.1110" name="cfcookietest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
is.equal(r.attributes.expires.toLocaleString(), new Date("Tuesday, January 01, 2013 12:34:56").toLocaleString());

r = cf.parse('<cfcookie expires="5" name="cfcookietest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
//is.equal(r.attributes.expires.toLocaleString(), Date().toLocaleString());

r = cf.parse('<cfcookie expires="5" name="cfcookietest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
//is.equal(r.attributes.expires.toLocaleString(), new Date().toLocaleString());

r = cf.parse('<CFCOOKIE'+
	' DOMAIN=".example.com"' +
	' NAME="cfcookietest"' +
	' EXPIRES="never"' +
	' HTTPONLY="false"' +
	' PATH="/path"' +
	' SECURE="no"' +
	' VALUE="cfcookietest"' +
'>');

is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
is.equal(r.attributes.domain, ".example.com");
is.equal(r.attributes.http_only, false);
is.equal(r.attributes.path, "/path");
is.equal(r.attributes.secure, false);
is.equal(r.attributes.value, "cfcookietest");
is.equal(r.attributes.expires.toLocaleString(), human_date('in 30 years').toLocaleString());

testlib.die("Success!", 0);
