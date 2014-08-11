var is = require('assert'),
	PEG= require('pegjs'),
	cf = require(__dirname + '/../cf'),
	testlib = require('./testlib');

var r;
is.throws(function () {
	r = cf.parse('<cfqueryparam>');
}, Error, "Missing required value attribute");

is.throws(function () {
	r = cf.parse('<cfqueryparam value="cfqueryparam_test">');
}, Error, "Required value attribute isn't correct format");

r = cf.parse('<cfqueryparam value="#cfqueryparam_test#">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'queryparam');
is.equal(r.attributes.value, 'cfqueryparam_test');
is.equal(r.attributes.list, false);
is.equal(r.attributes.null, false);
is.equal(r.attributes.scale, 0);
is.equal(r.attributes.separator, ',');
is.equal(r.attributes.cf_sql_type, 'CF_SQL_CHAR');

r = cf.parse('<cfqueryparam value="#cfqueryparam_test#" cfsqltype="CF_SQL_INTEGER">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'queryparam');
is.equal(r.attributes.value, 'cfqueryparam_test');
is.equal(r.attributes.list, false);
is.equal(r.attributes.null, false);
is.equal(r.attributes.scale, 0);
is.equal(r.attributes.separator, ',');
is.equal(r.attributes.cf_sql_type, 'CF_SQL_INTEGER');

r = cf.parse('<cfqueryparam value="#cfqueryparam_test#" cfsqltype="CF_SQL_MONEY" list="yes" maxLength="4" null="yes" scale="3" separator="\t">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'queryparam');
is.equal(r.attributes.value, 'cfqueryparam_test');
is.equal(r.attributes.list, true);
is.equal(r.attributes.null, true);
is.equal(r.attributes.scale, 3);
is.equal(r.attributes.separator, "\t");
is.equal(r.attributes.cf_sql_type, 'CF_SQL_MONEY');
is.equal(r.attributes.max_length, 4);

r = cf.parse('<CFQUERYPARAM CFSQLTYPE="CF_SQL_MONEY" VALUE="#cfqueryparam_test#" LIST="yes" MAXLENGTH="4" NULL="yes" SCALE="3" SEPARATOR="\t">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'queryparam');
is.equal(r.attributes.value, 'cfqueryparam_test');
is.equal(r.attributes.list, true);
is.equal(r.attributes.null, true);
is.equal(r.attributes.scale, 3);
is.equal(r.attributes.separator, "\t");
is.equal(r.attributes.cf_sql_type, 'CF_SQL_MONEY');
is.equal(r.attributes.max_length, 4);

testlib.die("Success!", 0);
