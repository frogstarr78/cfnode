const should = require('should'), test = require('./testlib');

describe('Parsing the cfdefaultcase tag', function () {
  it("should work as expected with an all lowercase definition", function () {
    r = test.cfparser.parse('<cfexit>');
    r.should.be.instanceof(Object);
    r.tag.should.eql('exit');
    r.attributes.method.should.eql('exitTag');
  });

  it('should work as expected with an all lowercase definition and trailing "/"', function () {
    r = test.cfparser.parse('<cfexit/>');
    r.should.be.instanceof(Object);
    r.tag.should.eql('exit');
    r.attributes.method.should.eql('exitTag');
  });

  it("should work as expected with an attribute", function () {
    r = test.cfparser.parse('<cfexit method="loop" />');
    r.should.be.instanceof(Object);
    r.tag.should.eql('exit');
    r.attributes.method.should.eql('loop');
  });

  it("should work as expected with another attribute", function () {
    r = test.cfparser.parse('<cfexit method="exitTag">');
    r.should.be.instanceof(Object);
    r.tag.should.eql('exit');
    r.attributes.method.should.eql('exitTag');
  });

  it("should work as expected with an attribute all in caps", function () {
    r = test.cfparser.parse('<CFEXIT METHOD="exitTemplate">');
    r.should.be.instanceof(Object);
    r.tag.should.eql('exit');
    r.attributes.method.should.eql('exitTemplate');
  });
});
