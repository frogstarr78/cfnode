var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cfpop />');
}, Error, 'Missing required server attribute.');

is.throws(function () {
	r = cf.parse('<cfpop server="localhost" action="getAll" />');
}, Error, 'Missing required name attribute.');

is.throws(function () {
	r = cf.parse('<cfpop server="localhost" action="get_header_only" />');
}, Error, 'Missing required name attribute.');

r = cf.parse('<cfpop ' +
'server="localhost" ' +
'name="cfpop_test" ' +
'/>');
is.equal(r.attributes.action, 'get_header_only');
is.equal(r.attributes.debug, false);
is.equal(r.attributes.generate_unique_filenames, false);
is.equal(r.attributes.name, 'cfpop_test');
is.equal(r.attributes.port, 110);
is.equal(r.attributes.server, 'localhost');
is.equal(r.attributes.start_row, 1);
is.equal(r.attributes.timeout, 60);

r = cf.parse('<cfpop ' +
'server="localhost" ' +
'action="getAll" ' +
'name="cfpop_test2" ' +
'/>');
is.equal(r.attributes.action, 'get_all');
is.equal(r.attributes.debug, false);
is.equal(r.attributes.generate_unique_filenames, false);
is.equal(r.attributes.name, 'cfpop_test2');
is.equal(r.attributes.port, 110);
is.equal(r.attributes.server, 'localhost');
is.equal(r.attributes.start_row, 1);
is.equal(r.attributes.timeout, 60);

r = cf.parse('<cfpop ' +
'name="cfpop_test3" ' +
'start_row="6" ' +
'attachmentPath="/tmp" ' +
'uid="1234" ' +
'server="localhost" ' +
'action="delete" ' +
'message_number="1234" ' +
'timeout="90" ' +
'generate_unique_filenames="yes" ' +
'password="pass" ' +
'username="user" ' +
'port="995" ' +
'max_rows="3" ' +
'/>');
is.equal(r.attributes.action, "delete");
is.equal(r.attributes.attachment_path, "/tmp");
is.equal(r.attributes.generate_unique_filenames, true);
is.equal(r.attributes.max_rows, 3);
is.equal(r.attributes.message_number, "1234");
is.equal(r.attributes.name, "cfpop_test3");
is.equal(r.attributes.password, "pass");
is.equal(r.attributes.port, 995);
is.equal(r.attributes.server, "localhost");
is.equal(r.attributes.start_row, 6);
is.equal(r.attributes.timeout, "90");
is.equal(r.attributes.uid, 1234);
is.equal(r.attributes.username, "user");

test.ok();
