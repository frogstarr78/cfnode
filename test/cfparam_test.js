const test = require('./testlib'),
    should = require('should');

describe("Parsing a cfparam tag", function() {
    it('should throw an error when missing a required name attribute', function () {
        (function () { test.cfparser.parse('<cfparam default="abc">'); }).should.throw('Missing required "name" attribute.');
    });

    it('works as expected', function () {
        r = test.cfparser.parse('<cfparam name="cfparamtest">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('param');
        r.attributes.name.should.eql('cfparamtest');

        r = test.cfparser.parse('<cfparam name="cfparamtest" default="abc">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('param');
        r.attributes.name.should.eql('cfparamtest');
        r.attributes.default.should.eql('abc');

        r = test.cfparser.parse('<cfparam default="13" name="cfparamtest" min="1" max="20">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('param');
        r.attributes.name.should.eql('cfparamtest');
        r.attributes.min.should.eql(1);
        r.attributes.max.should.eql(20);
        r.attributes.default.should.eql('13');

        r = test.cfparser.parse('<cfparam default="a@b.com" pattern="[^@]+@([^\.]+.)+.+" name="cfparamtest" type="regex" min="1" max="4">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('param');
        r.attributes.name.should.eql('cfparamtest');
        r.attributes.default.should.eql('a@b.com');
        r.attributes.pattern.should.eql(new RegExp("[^@]+@([^\.]+.)+.+"));
        r.attributes.type.should.eql('regex');
        r.attributes.min.should.eql(1);
        r.attributes.max.should.eql(4);

        r = test.cfparser.parse('<CFPARAM DEFAULT="a@b.com" PATTERN="[^@]+@([^\.]+.)+.+" NAME="cfparamtest" TYPE="regex" MIN="1" MAX="4">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('param');
        r.attributes.name.should.eql('cfparamtest');
        r.attributes.default.should.eql('a@b.com');
        r.attributes.pattern.should.eql(new RegExp("[^@]+@([^\.]+.)+.+"));
        r.attributes.type.should.eql('regex');
        r.attributes.min.should.eql(1);
        r.attributes.max.should.eql(4);
    });
});
