const test = require('./testlib'),
    should = require('should');

describe("Parsing a cfqueryparam tag ", function() {
    it('should thow an error when missing required name attribute', function () {
        (function () { test.cfparser.parse('<cfquery></cfquery>'); }).should.throw('Expected " ", "\\n", "\\t", or [pP] but ">" found.');
    });

    it('should work as expected', function () {
        r = test.cfparser.parse('<cfquery name="cfquery_test"></cfquery>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('query');
        r.content.should.eql('');
        r.attributes.name.should.eql('cfquery_test');
        r.attributes.block_factor.should.eql(1);
        r.attributes.max_rows.should.eql(Infinity);

        r = test.cfparser.parse('<cfquery name="cfquery_test" blockFactor="10" maxRows="2">' +
        "\n</cfquery>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('query');
        r.content.should.eql("\n");
        r.attributes.name.should.eql('cfquery_test');
        r.attributes.block_factor.should.eql(10);
        r.attributes.max_rows.should.eql(2);

        r = test.cfparser.parse('<cfquery name="cfquery_test" blockFactor="5" cachedAfter="#CreateTimeSpan(5, 4, 3, 2)#" cachedWithin="#CreateTimeSpan(9, 8, 7, 6)#" dataSource="dsn" dbtype="hql" debug="yes" maxRows="10" ormoptions="#{cachename=something}#" password="pass" result="reslt" timeout="5" username="usr">' +
        "\n</cfquery>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('query');
        r.content.should.eql("\n");
        r.attributes.name.should.eql('cfquery_test');
        r.attributes.block_factor.should.eql(5);
        r.attributes.cached_after.should.be.instanceof(Date)
        r.attributes.cached_within.should.be.instanceof(Date)
        r.attributes.datasource.should.eql("dsn")
        r.attributes.dbtype.should.eql("hql")
        r.attributes.debug.should.be.true
        r.attributes.max_rows.should.eql(10)
        r.attributes.ormoptions.should.eql("#{cachename=something}#")
        r.attributes.password.should.eql("pass")
        r.attributes.result.should.eql("reslt")
        r.attributes.timeout.should.eql(5)
        r.attributes.username.should.eql("usr")

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
        r.should.be.instanceof(Object);
        r.tag.should.eql('query');
        r.content.should.eql("\nThis is the content that is saved #NOW()#\n");
        r.attributes.name.should.eql('cfquery_test');
        r.attributes.block_factor.should.eql(5);
        r.attributes.cached_after.should.be.instanceof(Date);
        r.attributes.cached_within.should.be.instanceof(Date);
        r.attributes.datasource.should.eql("dsn")
        r.attributes.dbtype.should.eql("hql")
        r.attributes.debug.should.be.true;
        r.attributes.max_rows.should.eql(10)
        r.attributes.ormoptions.should.eql("#{cachename=something}#")
        r.attributes.password.should.eql("pass")
        r.attributes.result.should.eql("reslt")
        r.attributes.timeout.should.eql(5)
        r.attributes.username.should.eql("usr")
    });
});
