var is = require('assert'),
	PEG= require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;
is.throws(function () {
	r = cf.parse('<cferror>');
}, Error, "Missing required attributes");

is.throws(function () {
	r = cf.parse('<cferror type="request">');
}, Error, "Missing required template attribute");

is.throws(function () {
	r = cf.parse('<cferror template="/path/to/error.cfm">');
}, Error, "Missing required type attribute");

r = cf.parse('<cferror type="request" template="/path/to/error.cfm">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'error');
is.equal(r.attributes.type, 'request');
is.equal(r.attributes.template, '/path/to/error.cfm');
is.equal(r.attributes.exception, 'any');

r = cf.parse('<cferror template="/path/to/error2.cfm" type="request" mailTo="none@example.com" exception="lock" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'error');
is.equal(r.attributes.type, 'request');
is.equal(r.attributes.template, '/path/to/error2.cfm');
is.equal(r.attributes.mail_to, 'none@example.com');
is.equal(r.attributes.exception, 'lock');

r = cf.parse('<CFERROR TEMPLATE="/path/to/error2.cfm" TYPE="request" MAILTO="none@example.com" EXCEPTION="lock">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'error');
is.equal(r.attributes.type, 'request');
is.equal(r.attributes.template, '/path/to/error2.cfm');
is.equal(r.attributes.mail_to, 'none@example.com');
is.equal(r.attributes.exception, 'lock');

test.ok();
