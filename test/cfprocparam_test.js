var is = require('assert'),
	PEG= require('pegjs'),
	cf = require(__dirname + '/../cf'),
	testlib = require('./testlib');

var r;
is.throws(function () {
	r = cf.parse('<cfprocparam>');
}, Error, "Missing required attribute");

is.throws(function () {
	r = cf.parse('<cfprocparam CFSQLtype="CF_SQL_BIT" type="in">');
}, Error, "Missing required value attribute.");

is.throws(function () {
	r = cf.parse('<cfprocparam CFSQLtype="CF_SQL_BIT" type="out">');
}, Error, "Missing required variable attribute.");

is.throws(function () {
	r = cf.parse('<cfprocparam CFSQLtype="CF_SQL_BIT" type="inout">');
}, Error, "Missing required variable attribute.");

r = cf.parse('<cfprocparam cfsqltype="CF_SQL_BIT" value="1">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'procparam');
is.equal(r.attributes.cf_sql_type, 'CF_SQL_BIT');
is.equal(r.attributes.value, 1);
is.equal(r.attributes.max_length, 0);
is.equal(r.attributes.null, false);
is.equal(r.attributes.scale, 0);
is.equal(r.attributes.type, 'in');

r = cf.parse('<cfprocparam value="cfprocparam_test2" variable="cfprocparam_var" cfsqltype="CF_SQL_VARCHAR" type="inout" maxlength="20" null="yes" scale="2" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'procparam');
is.equal(r.attributes.value, 'cfprocparam_test2');
is.equal(r.attributes.variable, 'cfprocparam_var');
is.equal(r.attributes.null, true);
is.equal(r.attributes.scale, 2);
is.equal(r.attributes.cf_sql_type, 'CF_SQL_VARCHAR');
is.equal(r.attributes.type, 'inout');
is.equal(r.attributes.max_length, 20);

r = cf.parse('<CFPROCPARAM VALUE="2" VARIABLE="cfprocparam_var" CFSQLTYPE="CF_SQL_VARCHAR" TYPE="inout" MAXLENGTH="21" NULL="yes" SCALE="3" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'procparam');
is.equal(r.attributes.value, 2);
is.equal(r.attributes.variable, 'cfprocparam_var');
is.equal(r.attributes.null, true);
is.equal(r.attributes.scale, 3);
is.equal(r.attributes.cf_sql_type, 'CF_SQL_VARCHAR');
is.equal(r.attributes.type, 'inout');
is.equal(r.attributes.max_length, 21);

testlib.die("Success!", 0);
