const is = require('assert'), test = require('./testlib');

var r;
is.throws(function () {
	r = test.cfparser.parse('<cfupdate>');
}, Error, "Missing required attributes");

is.throws(function () {
	r = test.cfparser.parse('<cfupdate />');
}, Error, "Missing required attributes");

is.throws(function () {
	r = test.cfparser.parse('<cfupdate datasource="cfupdate_dsn">');
}, Error, "Missing required tablename attribute");

is.throws(function () {
	r = test.cfparser.parse('<cfupdate datasource="">');
}, Error, "Empty datasource attribute");

is.throws(function () {
	r = test.cfparser.parse('<cfupdate tableName="cfupdate_table">');
}, Error, "Missing required datasource attribute");

is.throws(function () {
	r = test.cfparser.parse('<cfupdate tableName="">');
}, Error, "Empty tablename attribute");

r = test.cfparser.parse('<cfupdate dataSource="cfupdate_dsn2" tableName="cfupdate_table2">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'update');
is.equal(r.attributes.datasource, 'cfupdate_dsn2');
is.equal(r.attributes.table_name, 'cfupdate_table2');

r = test.cfparser.parse('<cfupdate datasource="dsn3" tableName="tbl3" formFields="id,name,three" password="mypass2" tableOwner="noone_else" tableQualifier="pg_catalog2" username="me2" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'update');
is.equal(r.attributes.datasource, 'dsn3');
is.equal(r.attributes.table_name, 'tbl3');
is.deepEqual(r.attributes.form_fields, ['id', 'name', 'three']);
is.equal(r.attributes.password, "mypass2");
is.equal(r.attributes.table_owner, "noone_else");
is.equal(r.attributes.table_qualifier, "pg_catalog2");
is.equal(r.attributes.username, 'me2');

r = test.cfparser.parse('<CFUPDATE DATASOURCE="dsn4" TABLENAME="tbl4" FORMFIELDS="id,name,three,four" PASSWORD="mypass3" TABLEOWNER="noone_else" TABLEQUALIFIER="pg_catalog3" USERNAME="me3">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'update');
is.equal(r.attributes.datasource, 'dsn4');
is.equal(r.attributes.table_name, 'tbl4');
is.deepEqual(r.attributes.form_fields, ['id', 'name', 'three', 'four']);
is.equal(r.attributes.password, "mypass3");
is.equal(r.attributes.table_owner, "noone_else");
is.equal(r.attributes.table_qualifier, "pg_catalog3");
is.equal(r.attributes.username, 'me3');
