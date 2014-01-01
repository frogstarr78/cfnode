var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	testlib = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cfquery></cfquery>');
}, Error, "Missing required attributes");

r = cf.parse('<cfquery name="cfquery_test"></cfquery>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'query');
is.equal(r.content, '');
is.equal(r.attributes.name, 'cfquery_test');
is.equal(r.attributes.block_factor, 1);
is.equal(r.attributes.max_rows, Infinity);

r = cf.parse('<cfquery name="cfquery_test" blockFactor="10" maxRows="2">' +
"\n</cfquery>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'query');
is.equal(r.content, "\n");
is.equal(r.attributes.name, 'cfquery_test');
is.equal(r.attributes.block_factor, 10);
is.equal(r.attributes.max_rows, 2);

r = cf.parse('<cfquery name="cfquery_test" blockFactor="5" cachedAfter="#CreateTimeSpan()#" cachedWithin="#CreateTimeSpan()#" dataSource="dsn" dbtype="hql" debug="yes" maxRows="10" ormoptions="#{cachename=\"\"}#" password="pass" result="reslt" timeout="5" username="usr">' +
"\n</cfquery>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'query');
is.equal(r.content, "\n");
is.equal(r.attributes.name, 'cfquery_test');
is.equal(r.attributes.block_factor, 5);
is(r.attributes.cached_after instanceof Date )
is(r.attributes.cached_within instanceof Date )
is.equal(r.attributes.datasource, "dsn")
is.equal(r.attributes.dbtype, "hql")
is.equal(r.attributes.debug, true)
is.equal(r.attributes.maxRows, 10)
is.equal(r.attributes.ormoptions, "#{cachename=\"\"}#")
is.equal(r.attributes.password, "pass")
is.equal(r.attributes.result, "reslt")
is.equal(r.attributes.timeout, 5)
is.equal(r.attributes.username, "usr")

r = cf.parse('<CFQUERY' +
		' NAME="cfquery_test"' +
        ' BLOCKfACTOR="5"' +
		' CACHEDAFTER="#CreateTimeSpan()#"' + 
		' CACHEDWITHIN="#CreateTimeSpan()#"' + 
		' DATASOURCE="dsn"' + 
		' DBTYPE="hql"' + 
		' DEBUG="yes"' + 
		' MAXROWS="10"' + 
		' ORMOPTIONS="#{cachename=\"\"}#"' + 
		' PASSWORD="pass"' + 
		' RESULT="reslt"' + 
		' TIMEOUT="5"' + 
		' USERNAME="usr"' +
'>' + 
"\nThis is the content that is saved #NOW()#" +
"\n</CFQUERY>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'query');
is.equal(r.content, "\nThis is the content that is saved #NOW()#\n");
is.equal(r.attributes.name, 'cfquery_test');
is.equal(r.attributes.block_factor, 5);
is(r.attributes.cached_after instanceof Date )
is(r.attributes.cached_within instanceof Date )
is.equal(r.attributes.datasource, "dsn")
is.equal(r.attributes.dbtype, "hql")
is.equal(r.attributes.debug, true)
is.equal(r.attributes.maxRows, 10)
is.equal(r.attributes.ormoptions, "#{cachename=\"\"}#")
is.equal(r.attributes.password, "pass")
is.equal(r.attributes.result, "reslt")
is.equal(r.attributes.timeout, 5)
is.equal(r.attributes.username, "usr")

testlib.die("Success!", 0);
