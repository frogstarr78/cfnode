var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	testlib = require('./testlib');

var r;


is.throws(function () {
	r = cf.parse('<cflocation>');
}, Error, 'Missing required url attribute');

r = cf.parse('<cflocation url="/cflocation" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'location');
is.equal(r.attributes.url, '/cflocation');
is.equal(r.attributes.add_token, false);
is.equal(r.attributes.status_code, 301);

r = cf.parse('<cflocation url="/cflocation test" addToken="yes" statusCode="302">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'location');
is.equal(r.attributes.url, '/cflocation%20test');
is.equal(r.attributes.add_token, true);
is.equal(r.attributes.status_code, 302);

r = cf.parse('<CFLOCATION URL="/cflocation_test?q=a" ADDTOKEN="yes" STATUSCODE="303">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'location');
is.equal(r.attributes.url, '/cflocation_test?q=a');
is.equal(r.attributes.add_token, true);
is.equal(r.attributes.status_code, 303);

testlib.die("Success!", 0);
