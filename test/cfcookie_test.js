var is = require('assert'),
	util = require('util'),
	path = require('path'),
	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cfcookie>');
}, Error, 'Missing required name attribute.');

r = cf.parse('<cfcookie name="cfcookietest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');

r = cf.parse('<cfcookie name="cfcookietest" domain=".example.com">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
is.equal(r.attributes.domain, '.example.com');

r = cf.parse('<cfcookie domain=".example.com" name="cfcookietest" secure="no">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
is.equal(r.attributes.domain, '.example.com');
is.equal(r.attributes.secure, false);
is.equal(r.attributes.expires, 'session');

is.throws(function () {
	r = cf.parse('<cfcookie path="/path/here" name="cfcookietest">');
}, Error, "Expecting error when path with no domain was specified.");
r = cf.parse('<cfcookie path="/path/here" domain=".example.com" value="hello test" name="cfcookietest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
is.equal(r.attributes.path, '/path/here');
is.equal(r.attributes.domain, '.example.com');
is.equal(r.attributes.value, 'hello test');

r = cf.parse('<cfcookie expires="now" name="cfcookietest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
test.equalDate(r.attributes.expires, new Date());

r = cf.parse('<cfcookie expires="never" name="cfcookietest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
test.equalDate(r.attributes.expires, human_date('in 30 years'));

r = cf.parse('<cfcookie expires="2013-01-01" name="cfcookietest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
is.deepEqual(r.attributes.expires, new Date(2013, 0, 01));
//test.equalDate(r.attributes.expires, new Date(2013, 0, 01));

r = cf.parse('<cfcookie expires="2013-01-01 12:34:56" name="cfcookietest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
test.equalTime(r.attributes.expires, new Date(2013, 01, 01, 12, 34, 56));

r = cf.parse('<cfcookie expires="5" name="cfcookietest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
test.equalDate(r.attributes.expires, human_date('in 5 days'));

r = cf.parse('<cfcookie name="cfcookietest" domain=".example.com" expires="now" httponly="yes" path="/" secure="no" value="abc">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
is.equal(r.attributes.domain, '.example.com');
test.equalDate(r.attributes.expires, new Date());
is.equal(r.attributes.http_only, true);
is.equal(r.attributes.path, '/');
is.equal(r.attributes.secure, false);
is.equal(r.attributes.value, 'abc');

r = cf.parse('<CFCOOKIE NAME="cfcookietest2" DOMAIN=".example.com" EXPIRES="now" HTTPONLY="yes" PATH="/" SECURE="no" VALUE="abc">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest2');
is.equal(r.attributes.domain, '.example.com');
test.equalDate(r.attributes.expires, new Date());
is.equal(r.attributes.http_only, true);
is.equal(r.attributes.path, '/');
is.equal(r.attributes.secure, false);
is.equal(r.attributes.value, 'abc');

test.ok();
