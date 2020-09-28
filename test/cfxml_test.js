const should = require('should'),
        test = require('./testlib');

describe("Parsing a cfxml tag", function() {
    it('should thow an error when missing a required variable attribute', function () {
        (function () { r = test.cfparser.parse('<cfxml case_sensitive="no">'); }).should.throw('Missing required "variable" attribute.');
    })

    it('works as expected', function () {
        r = test.cfparser.parse("<cfxml variable='cfxml_test2' />");
        r.should.be.instanceof(Object);
        r.tag.should.eql('xml');
        r.attributes.variable.should.eql('cfxml_test2');
        r.attributes.case_sensitive.should.be.false;

        r = test.cfparser.parse("<cfxml variable='cfxml_test3' case_sensitive='yes'>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('xml');
        r.attributes.variable.should.eql('cfxml_test3');
        r.attributes.case_sensitive.should.be.true;

        r = test.cfparser.parse("<CFXML VARIABLE='cfxml_test4' CASESENSITIVE='yes' />");
        r.should.be.instanceof(Object);
        r.tag.should.eql('xml');
        r.attributes.variable.should.eql('cfxml_test4');
        r.attributes.case_sensitive.should.be.true;
    })
})
