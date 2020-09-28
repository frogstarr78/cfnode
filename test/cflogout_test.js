const should = require('should'),
        test = require('./testlib');

describe("Parser should parse cflogout tag", function () {
  it("should do what we expect with a tag that is all lowecase", function (){
    r = test.cfparser.parse('<cflogout>');
    r.should.be.instanceof(Object);
    r.tag.should.equal('logout');
    r.content.should.equal('');
  });

  it("should do what we expect with a tag that is all uppecase", function (){
    r = test.cfparser.parse('<CFLOGOUT>');
    r.should.be.instanceof(Object);
    r.tag.should.equal('logout');
    r.content.should.equal('');
  });

  it("should do what we expect with a tag that is mixed case", function (){
    r = test.cfparser.parse('<CFLogout>');
    r.should.be.instanceof(Object);
    r.tag.should.equal('logout');
    r.content.should.equal('');
  });
});
