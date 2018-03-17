const should = require('should'), test = require('./testlib');

describe('Parsing the cfelseif tag', function () {
  it("should throw an error without closing tag", function () {
    (function () { test.cfparser.parse('<cfelseif>'); }).should.throw('Expected " ", "/", ">", "\\n", or "\\t" but "i" found.');
  });

  it("should throw an error without an expression", function () {
    (function () { test.cfparser.parse('<cfelseif></cfelseif>'); }).should.throw('Expected " ", "/", ">", "\\n", or "\\t" but "i" found.');
  });

  it("should throw an error without an expression", function () {
    (function () { test.cfparser.parse('<CFELSEIF ></CFELSEIF>'); }).should.throw('Expected "<" or any character but end of input found.');
  });

  it("should work as expected with a minimal as possible detail with a closing if", function () {
    r = test.cfparser.parse('<cfelseif TRIM(username) EQ "">' +
    "username is an empty string" +
    '</cfif>');
    r.should.be.instanceof(Object);
    r.tag.should.eql('elseif');
    r.expression.should.eql('TRIM(username) EQ ""');
    r.content.should.eql("username is an empty string");
    r.attributes.should.eql({});
  });

  it("should work as expected with a minimal as possible detail all in caps and with a closing if", function () {
    r = test.cfparser.parse('<CFELSEIF 1 NE 0>' +
    "\nThen do something" +
    '</CFIF>');
    r.should.be.instanceof(Object);
    r.tag.should.eql('elseif');
    r.expression.should.eql('1 NE 0');
    r.content.should.eql("\nThen do something");
    r.attributes.should.eql({});
  });

  it("should work as expected with a minimal as possible detail with an else & closing if", function () {
    r = test.cfparser.parse('<cfelseif TRIM(username) EQ "">' +
    "username is an empty string" +
    '<cfelse>nothing</cfif>');
    r.should.be.instanceof(Object);
    r.tag.should.eql('elseif');
    r.expression.should.eql('TRIM(username) EQ ""');
    r.content.should.eql("username is an empty string");
    r.attributes.should.eql({});
  });

  it("should work as expected with a minimal as possible detail with an elseif & closing if", function () {
    r = test.cfparser.parse('<cfelseif TRIM(username) EQ "">' +
    "username is an empty string" +
    '<cfelseif TRIM(username) EQ "me">empty</cfif>');
    r.should.be.instanceof(Object);
    r.tag.should.eql('elseif');
    r.expression.should.eql('TRIM(username) EQ ""');
    r.content.should.eql("username is an empty string");
    r.attributes.should.eql({});
  });
});
