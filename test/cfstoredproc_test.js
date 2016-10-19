var is = require('assert'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;
is.throws(function () {
	r = cf.parse('<cfstoredproc>');
}, Error, "Missing required attributes");

is.throws(function () {
	r = cf.parse('<cfstoredproc />');
}, Error, "Missing required attributes");

is.throws(function () {
	r = cf.parse('<cfstoredproc datasource="cfstoredproc_dsn">');
}, Error, "Missing required procedure attribute");

is.throws(function () {
	r = cf.parse('<cfstoredproc datasource="">');
}, Error, "Empty datasource attribute");

is.throws(function () {
	r = cf.parse('<cfstoredproc procedure="cfstoredproc_proc">');
}, Error, "Missing required datasource attribute");

is.throws(function () {
	r = cf.parse('<cfstoredproc procedure="">');
}, Error, "Empty procedure attribute");

r = cf.parse('<cfstoredproc dataSource="cfstoredproc_dsn2" procedure="cfstoredproc_proc2">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'storedproc');
is.equal(r.attributes.datasource, 'cfstoredproc_dsn2');
is.equal(r.attributes.procedure, 'cfstoredproc_proc2');
is.equal(r.attributes.block_factor, 1);
is.equal(r.attributes.debug, false);
is.equal(r.attributes.return_code, false);

r = cf.parse('<cfstoredproc blockFactor="3" datasource="dsn3" debug="1" procedure="tbl3" returnCode="no" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'storedproc');
is.equal(r.attributes.block_factor, 3);
is.equal(r.attributes.datasource, 'dsn3');
is.equal(r.attributes.debug, true);
is.equal(r.attributes.procedure, 'tbl3');
is.equal(r.attributes.return_code, false);

r = cf.parse('<cfstoredproc ' +
'blockFactor="5" ' +
'debug="yes" ' +
'procedure="tbl4" ' +
'datasource="dsn4" ' +
'result="this" ' +
'password="mypass3" ' +
'username="noone_else" ' +
'cachedAfter="2014-08-09" ' +
'cachedWithin="#CreateTimeSpan(1, 2, 3, 4)#" ' +
'returnCode="no" ' +
'/>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'storedproc');
is.equal(r.attributes.block_factor, 5);
is.equal(r.attributes.debug, true);
is.equal(r.attributes.datasource, 'dsn4');
is.equal(r.attributes.procedure, 'tbl4');
is.equal(r.attributes.result, 'this');
is.equal(r.attributes.password, "mypass3");
is.equal(r.attributes.username, "noone_else");
is(r.attributes.cached_after instanceof Date )
is(r.attributes.cached_within instanceof Date )
is.equal(r.attributes.return_code, false);

r = cf.parse('<CFSTOREDPROC BLOCKFACTOR="5" DEBUG="yes" PROCEDURE="tbl4" DATASOURCE="dsn4" RESULT="this" PASSWORD="mypass3" USERNAME="noone_else" CACHEDAFTER="2014-08-09" CACHEDWITHIN="#CreateTimeSpan(5, 6, 7, 8)#" RETURNCODE="no" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'storedproc');
is.equal(r.attributes.block_factor, 5);
is.equal(r.attributes.debug, true);
is.equal(r.attributes.datasource, 'dsn4');
is.equal(r.attributes.procedure, 'tbl4');
is.equal(r.attributes.result, 'this');
is.equal(r.attributes.password, "mypass3");
is.equal(r.attributes.username, "noone_else");
is(r.attributes.cached_after instanceof Date )
is(r.attributes.cached_within instanceof Date )
is.equal(r.attributes.return_code, false);

test.ok();
