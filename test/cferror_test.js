const should = require('should'), test = require('./testlib');

describe('Parsing the cferror tag', function () {
  it("should throw an error without any required attributes", function () {
    (function () { r = test.cfparser.parse('<cferror>'); }).should.throw('Expected " ", "\\n", or "\\t" but ">" found.');
  });

  it("should throw an error without any required attributes", function () {
    (function () { r = test.cfparser.parse('<cferror >'); }).should.throw('Expected " ", "\\n", "\\t", [eE], [mM], or [tT] but ">" found.');
  });

  it("should throw an error without required template attribute", function () {
    (function () { r = test.cfparser.parse('<cferror type="request">'); }).should.throw('Missing required "template" attribute.');
  });

  it("should throw an error without required type attribute", function () {
    (function () { r = test.cfparser.parse('<cferror template="/path/to/error.cfm">'); }).should.throw('Missing required "type" attribute.');
  });

  it("should work as expected with minimal attributes defined", function () {
    r = test.cfparser.parse('<cferror type="request" template="/path/to/error.cfm">');
    r.should.be.instanceof(Object);
    r.tag.should.eql('error');
    r.attributes.type.should.eql('request');
    r.attributes.template.should.eql('/path/to/error.cfm');
    r.attributes.exception.should.eql('any');
  });

  it("should work as expected with many attributes defined", function () {
    r = test.cfparser.parse('<cferror template="/path/to/error2.cfm" type="request" mailTo="none@example.com" exception="lock" />');
    r.should.be.instanceof(Object);
    r.tag.should.eql('error');
    r.attributes.type.should.eql('request');
    r.attributes.template.should.eql('/path/to/error2.cfm');
    r.attributes.mail_to.should.eql('none@example.com');
    r.attributes.exception.should.eql('lock');
  });

  it("should work as expected with many attributes defined all in caps", function () {
    r = test.cfparser.parse('<CFERROR TEMPLATE="/path/to/error2.cfm" TYPE="request" MAILTO="none@example.com" EXCEPTION="lock">');
    r.should.be.instanceof(Object);
    r.tag.should.eql('error');
    r.attributes.type.should.eql('request');
    r.attributes.template.should.eql('/path/to/error2.cfm');
    r.attributes.mail_to.should.eql('none@example.com');
    r.attributes.exception.should.eql('lock');
  });
});
