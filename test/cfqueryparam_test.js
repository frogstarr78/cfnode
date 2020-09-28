const test = require('./testlib'),
    should = require('should');

describe("Parsing a cfqueryparam tag ", function() {
    it('thows errors when missing required attributes', function () {
        (function () { test.cfparser.parse('<cfqueryparam list="yes" >'); }).should.throw('Missing required "value" attribute.');
    });

    it('works as expected', function () {
        r = test.cfparser.parse('<cfqueryparam value="#cfqueryparam_test#">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('queryparam');
        r.attributes.value.should.eql('#cfqueryparam_test#');
        r.attributes.list.should.be.false;
        r.attributes.null.should.be.false;
        r.attributes.scale.should.eql(0);
        r.attributes.separator.should.eql(',');
        r.attributes.cf_sql_type.should.eql('CF_SQL_CHAR');

        r = test.cfparser.parse('<cfqueryparam value="#cfqueryparam_test#" cfsqltype="CF_SQL_INTEGER">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('queryparam');
        r.attributes.value.should.eql('#cfqueryparam_test#');
        r.attributes.list.should.be.false;
        r.attributes.null.should.be.false;
        r.attributes.scale.should.eql(0);
        r.attributes.separator.should.eql(',');
        r.attributes.cf_sql_type.should.eql('CF_SQL_INTEGER');

        r = test.cfparser.parse('<cfqueryparam value="#cfqueryparam_test#" cfsqltype="CF_SQL_MONEY" list="yes" maxLength="4" null="yes" scale="3" separator="\t">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('queryparam');
        r.attributes.value.should.eql('#cfqueryparam_test#');
        r.attributes.list.should.be.true;
        r.attributes.null.should.be.true;
        r.attributes.scale.should.eql(3);
        r.attributes.separator.should.eql("\t");
        r.attributes.cf_sql_type.should.eql('CF_SQL_MONEY');
        r.attributes.max_length.should.eql(4);

        r = test.cfparser.parse('<CFQUERYPARAM CFSQLTYPE="CF_SQL_MONEY" VALUE="#cfqueryparam_test#" LIST="yes" MAXLENGTH="4" NULL="yes" SCALE="3" SEPARATOR="\t">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('queryparam');
        r.attributes.value.should.eql('#cfqueryparam_test#');
        r.attributes.list.should.be.true;
        r.attributes.null.should.be.true;
        r.attributes.scale.should.eql(3);
        r.attributes.separator.should.eql("\t");
        r.attributes.cf_sql_type.should.eql('CF_SQL_MONEY');
        r.attributes.max_length.should.eql(4);
    });
});
