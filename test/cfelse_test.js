const should = require('should'), test = require('./testlib');

describe('Parsing the cfelse tag', function () {
  it("should throw an error without a closing tag", function () {
    (function () { r = test.cfparser.parse('<cfelse>'); }).should.throw('Expected "<" or any character but end of input found.');
  });

  it("should work as expected with a closing if tag but nothing in the else clause", function () {
    r = test.cfparser.parse('<cfelse></cfif>');
    r.should.be.instanceof(Object);
    r.tag.should.eql('else');
    r.content.should.eql('');
  });

  it("should work as expected with a closing if tag but nothing in the else clause and defined in all caps", function () {
    r = test.cfparser.parse('<CFELSE></cfif>');
    r.should.be.instanceof(Object);
    r.tag.should.eql('else');
    r.content.should.eql('');
  });

  it("should work as expected with a closing if tag and stuff in the else clause", function () {
    r = test.cfparser.parse('<cfelse>' + 
    "\nOtherwise we do this" +
    '</cfif>');
    r.should.be.instanceof(Object);
    r.tag.should.eql('else');
    r.content.should.eql("\nOtherwise we do this");
  });

  it("should work as expected with a closing if tag and stuff in the else clause and defined in all caps", function () {
    r = test.cfparser.parse('<CFELSE>' + 
    "\nOtherwise we do this.\nStrang looking test." +
    '</CFIF>');
    r.should.be.instanceof(Object);
    r.tag.should.eql('else');
    r.content.should.eql("\nOtherwise we do this.\nStrang looking test.");
  });
});
