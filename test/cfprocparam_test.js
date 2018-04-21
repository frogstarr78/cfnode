const test = require('./testlib'),
    should = require('should');

describe("Parsing a cfprocparam tag", function() {
    it('throws an error when missing required cf_sql_type attribute', function () {
        (function () { r = test.cfparser.parse('<cfprocparam value="1" />'); }).should.throw('Missing required "cf_sql_type" attribute.');
    })

    it('throws an error when missing required value attribute', function () {
        (function () { test.cfparser.parse('<cfprocparam CFSQLtype="CF_SQL_BIT" type="in">'); }).should.throw('Missing required "value" attribute.');
    })

    it('throws an error when missing required variable attribute', function () {
        (function () { test.cfparser.parse('<cfprocparam CFSQLtype="CF_SQL_BIT" type="out">'); }).should.throw('Missing required "variable" attribute.');
    })

    it('throws an error when missing required variable attribute', function () {
        (function () { test.cfparser.parse('<cfprocparam CFSQLtype="CF_SQL_BIT" type="inout">'); }).should.throw('Missing required "variable" attribute.');
    })

    it('works as expected', function() {
        r = test.cfparser.parse('<cfprocparam cfsqltype="CF_SQL_BIT" value="1">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('procparam');
        r.attributes.cf_sql_type.should.eql('CF_SQL_BIT');
        r.attributes.value.should.eql('1');
        r.attributes.max_length.should.eql(0);
        r.attributes.null.should.be.false;
        r.attributes.scale.should.eql(0);
        r.attributes.type.should.eql('in');

        r = test.cfparser.parse('<cfprocparam value="cfprocparam_test2" variable="cfprocparam_var" cfsqltype="CF_SQL_VARCHAR" type="inout" maxlength="20" null="yes" scale="2" />');
        r.should.be.instanceof(Object);
        r.tag.should.eql('procparam');
        r.attributes.value.should.eql('cfprocparam_test2');
        r.attributes.variable.should.eql('cfprocparam_var');
        r.attributes.null.should.be.true;
        r.attributes.scale.should.eql(2);
        r.attributes.cf_sql_type.should.eql('CF_SQL_VARCHAR');
        r.attributes.type.should.eql('inout');
        r.attributes.max_length.should.eql(20);

        r = test.cfparser.parse('<CFPROCPARAM VALUE="2" VARIABLE="cfprocparam_var" CFSQLTYPE="CF_SQL_VARCHAR" TYPE="inout" MAXLENGTH="21" NULL="yes" SCALE="3" />');
        r.should.be.instanceof(Object);
        r.tag.should.eql('procparam');
        r.attributes.value.should.eql('2');
        r.attributes.variable.should.eql('cfprocparam_var');
        r.attributes.null.should.be.true;
        r.attributes.scale.should.eql(3);
        r.attributes.cf_sql_type.should.eql('CF_SQL_VARCHAR');
        r.attributes.type.should.eql('inout');
        r.attributes.max_length.should.eql(21);
    })
})
