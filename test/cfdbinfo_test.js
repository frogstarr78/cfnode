var is = require('assert'),
	PEG= require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;
is.throws(function () {
	r = cf.parse('<cfdbinfo>');
}, Error, "Missing required attributes");

is.throws(function () {
	r = cf.parse('<cfdbinfo type="dbnames">');
}, Error, "Missing required name attribute");

is.throws(function () {
	r = cf.parse('<cfdbinfo name="cfdbinfo_test">');
}, Error, "Missing required type attribute");

is.throws(function () {
	r = cf.parse('<cfdbinfo type="columns" name="cfdbinfo_test">');
}, Error, "Missing required table attribute");

r = cf.parse('<cfdbinfo type="dbnames" name="cfdbinfo_test">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'dbinfo');
is.equal(r.attributes.type, 'dbnames');
is.equal(r.attributes.name, 'cfdbinfo_test');

r = cf.parse('<cfdbinfo name="cfdbinfo_test" table="users" type="columns">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'dbinfo');
is.equal(r.attributes.type, 'columns');
is.equal(r.attributes.name, 'cfdbinfo_test');
is.equal(r.attributes.table, 'users');

r = cf.parse('<cfdbinfo name="cfdbinfo_test" type="columns" datasource="dsn" table="users" dbname="thedb" username="user" password="thepassword">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'dbinfo');
is.equal(r.attributes.type, 'columns');
is.equal(r.attributes.name, 'cfdbinfo_test');
is.equal(r.attributes.table, 'users');
is.equal(r.attributes.datasource, 'dsn');
is.equal(r.attributes.dbname, 'thedb');
is.equal(r.attributes.username, 'user');
is.equal(r.attributes.password, 'thepassword');

r = cf.parse('<CFDBINFO DATASOURCE="dsn" TABLE="users" DBNAME="thedb" USERNAME="user" PASSWORD="thepassword" NAME="cfdbinfo_test" TYPE="columns">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'dbinfo');
is.equal(r.attributes.type, 'columns');
is.equal(r.attributes.name, 'cfdbinfo_test');
is.equal(r.attributes.table, 'users');
is.equal(r.attributes.datasource, 'dsn');
is.equal(r.attributes.dbname, 'thedb');
is.equal(r.attributes.username, 'user');
is.equal(r.attributes.password, 'thepassword');

test.ok();
