var is = require('assert'),
	util = require('util'),
	path = require('path'),
	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cflogin>');
}, Error, "Missing closing tag");

r = cf.parse('<cflogin ></cflogin>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'login');
is.equal(r.attributes.application_token, 'CFAUTHORIZATION_');
is.equal(r.attributes.idle_timeout, 1800);

r = cf.parse('<cflogin applicationToken="CFAUTHORIZATION_cflogin" cookie_domain=".example.com" idle_timeout="180">' +
"\n</cflogin>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'login');
is.equal(r.content, "\n");
is.equal(r.attributes.application_token, 'CFAUTHORIZATION_cflogin');
is.equal(r.attributes.idle_timeout, 180);
is.equal(r.attributes.cookie_domain, '.example.com');

r = cf.parse('<CFLOGIN APPLICATIONTOKEN="CFAUTHORIZATION_cflogin" cookie_domain=".example.com" idle_timeout="180">' + 
"\nSome stuff here" + 
"\n</CFLOGIN>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'login');
is.equal(r.content, "\nSome stuff here\n");
is.equal(r.attributes.application_token, 'CFAUTHORIZATION_cflogin');
is.equal(r.attributes.idle_timeout, 180);
is.equal(r.attributes.cookie_domain, '.example.com');

test.ok();
