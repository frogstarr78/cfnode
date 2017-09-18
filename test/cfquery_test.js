const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cfquery></cfquery>');
}, Error, "Missing required attributes");

r = test.cfparser.parse('<cfquery name="cfquery_test"></cfquery>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'query');
is.equal(r.content, '');
is.equal(r.attributes.name, 'cfquery_test');
is.equal(r.attributes.block_factor, 1);
is.equal(r.attributes.max_rows, Infinity);

r = test.cfparser.parse('<cfquery name="cfquery_test" blockFactor="10" maxRows="2">' +
"\n</cfquery>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'query');
is.equal(r.content, "\n");
is.equal(r.attributes.name, 'cfquery_test');
is.equal(r.attributes.block_factor, 10);
is.equal(r.attributes.max_rows, 2);

r = test.cfparser.parse('<cfquery name="cfquery_test" blockFactor="5" cachedAfter="#CreateTimeSpan(5, 4, 3, 2)#" cachedWithin="#CreateTimeSpan(9, 8, 7, 6)#" dataSource="dsn" dbtype="hql" debug="yes" maxRows="10" ormoptions="#{cachename=something}#" password="pass" result="reslt" timeout="5" username="usr">' +
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
is.equal(r.attributes.max_rows, 10)
is.equal(r.attributes.ormoptions, "#{cachename=something}#")
is.equal(r.attributes.password, "pass")
is.equal(r.attributes.result, "reslt")
is.equal(r.attributes.timeout, 5)
is.equal(r.attributes.username, "usr")

r = test.cfparser.parse('<CFQUERY' +
		' NAME="cfquery_test"' +
        ' BLOCKfACTOR="5"' +
		' CACHEDAFTER="#CreateTimeSpan(1,2,3,4)#"' + 
		' CACHEDWITHIN="#CreateTimeSpan(5,6,7,8)#"' + 
		' DATASOURCE="dsn"' + 
		' DBTYPE="hql"' + 
		' DEBUG="yes"' + 
		' MAXROWS="10"' + 
		' ORMOPTIONS="#{cachename=something}#"' + 
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
is.equal(r.attributes.max_rows, 10)
is.equal(r.attributes.ormoptions, "#{cachename=something}#")
is.equal(r.attributes.password, "pass")
is.equal(r.attributes.result, "reslt")
is.equal(r.attributes.timeout, 5)
is.equal(r.attributes.username, "usr")
