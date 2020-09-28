const test = require('./testlib'),
    should = require('should');

describe("Parsing a cflog tag", function() {
    it('thows an error when missing a required text attribute', function () {
        (function () { test.cfparser.parse('<cflog file="/path">'); }).should.throw('Missing required "text" attribute.');
    })

    it('works as expected', function () {
        r = test.cfparser.parse('<cflog text="cflog test">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('log');
        r.attributes.text.should.eql('cflog test');
        r.attributes.application.should.be.true;
        r.attributes.log.should.eql('application');
        r.attributes.type.should.eql('information');

        r = test.cfparser.parse('<cflog text="cflog test" file="where">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('log');
        r.attributes.text.should.eql('cflog test');
        r.attributes.application.should.be.true;
        r.attributes.log.should.eql('application');
        r.attributes.type.should.eql('information');
        r.attributes.file.should.eql('where');

        r = test.cfparser.parse('<cflog text="cflog test" application="true" file="log" type="fatal" log="scheduler">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('log');
        r.attributes.text.should.eql('cflog test');
        r.attributes.application.should.be.true;
        r.attributes.file.should.eql('log');
        r.attributes.log.should.eql('application');
        r.attributes.type.should.eql('fatal');

        r = test.cfparser.parse('<CFLOG TEXT="cflog test" APPLICATION="true" FILE="log" TYPE="fatal" LOG="scheduler">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('log');
        r.attributes.text.should.eql('cflog test');
        r.attributes.application.should.be.true;
        r.attributes.file.should.eql('log');
        r.attributes.log.should.eql('application');
        r.attributes.type.should.eql('fatal');

        r = test.cfparser.parse('<cflog text="cflog test" application="true" type="fatal" log="scheduler">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('log');
        r.attributes.text.should.eql('cflog test');
        r.attributes.application.should.be.true;
        should(r.attributes.file).be.undefined;
        r.attributes.log.should.eql('scheduler');
        r.attributes.type.should.eql('fatal');

        r = test.cfparser.parse('<CFLOG TEXT="cflog test" APPLICATION="true" TYPE="fatal" LOG="Scheduler">');
        r.should.be.instanceof(Object);
        r.attributes.application.should.be.true;
        should(r.attributes.file).be.undefined;
        r.attributes.log.should.eql('scheduler');
        r.attributes.type.should.eql('fatal');
    });
});
