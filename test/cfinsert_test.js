var is = require('assert'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;
is.throws(function () {
	r = cf.parse('<cfinsert>');
}, Error, "Missing required attributes");

is.throws(function () {
	r = cf.parse('<cfinsert />');
}, Error, "Missing required attributes");

is.throws(function () {
	r = cf.parse('<cfinsert datasource="cfinsert_dsn">');
}, Error, "Missing required tablename attribute");

is.throws(function () {
	r = cf.parse('<cfinsert datasource="">');
}, Error, "Empty datasource attribute");

is.throws(function () {
	r = cf.parse('<cfinsert tableName="cfinsert_table">');
}, Error, "Missing required datasource attribute");

is.throws(function () {
	r = cf.parse('<cfinsert tableName="cfinsert_table">');
}, Error, "Empty tablename attribute");

r = cf.parse('<cfinsert dataSource="cfinsert_dsn2" tableName="cfinsert_table2">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'insert');
is.equal(r.attributes.datasource, 'cfinsert_dsn2');
is.equal(r.attributes.table_name, 'cfinsert_table2');

r = cf.parse('<cfinsert datasource="dsn3" tableName="tbl3" formFields="id,name,three" password="mypass2" tableOwner="noone_else" tableQualifier="pg_catalog2" username="me2" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'insert');
is.equal(r.attributes.datasource, 'dsn3');
is.equal(r.attributes.table_name, 'tbl3');
is.deepEqual(r.attributes.form_fields, ['id', 'name', 'three']);
is.equal(r.attributes.password, "mypass2");
is.equal(r.attributes.table_owner, "noone_else");
is.equal(r.attributes.table_qualifier, "pg_catalog2");
is.equal(r.attributes.username, 'me2');

r = cf.parse('<CFINSERT DATASOURCE="dsn4" TABLENAME="tbl4" FORMFIELDS="id,name,three,four" PASSWORD="mypass3" TABLEOWNER="noone_else" TABLEQUALIFIER="pg_catalog3" USERNAME="me3">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'insert');
is.equal(r.attributes.datasource, 'dsn4');
is.equal(r.attributes.table_name, 'tbl4');
is.deepEqual(r.attributes.form_fields, ['id', 'name', 'three', 'four']);
is.equal(r.attributes.password, "mypass3");
is.equal(r.attributes.table_owner, "noone_else");
is.equal(r.attributes.table_qualifier, "pg_catalog3");
is.equal(r.attributes.username, 'me3');

test.ok();
