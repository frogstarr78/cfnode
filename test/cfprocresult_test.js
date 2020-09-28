const test = require('./testlib'),
    should = require('should');

describe("Parsing a cfprocresult tag ", function() {
    it('thows an error when missing required name attribute', function () {
        (function () { test.cfparser.parse('<cfprocresult max_rows="2">'); }).should.throw('Missing required "name" attribute.');
    });

    it('works as expected', function () {
        r = test.cfparser.parse('<cfprocresult name="procresult">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('procresult');
        r.attributes.name.should.eql('procresult');
        r.attributes.max_rows.should.eql(-1);
        r.attributes.result_set.should.eql(1);

        r = test.cfparser.parse('<cfprocresult maxRows="5" name="procresult2" resultSet="11">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('procresult');
        r.attributes.name.should.eql('procresult2');
        r.attributes.max_rows.should.eql(5);
        r.attributes.result_set.should.eql(11);

        r = test.cfparser.parse('<CFPROCRESULT NAME="procresult3" MAXROWS="10" RESULTSET="11" />');
        r.should.be.instanceof(Object);
        r.tag.should.eql('procresult');
        r.attributes.name.should.eql('procresult3');
        r.attributes.max_rows.should.eql(10);
        r.attributes.result_set.should.eql(11);
    });
});
