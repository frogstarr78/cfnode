const should = require('should'),
        test = require('./testlib');

describe('Parsing the cfdefaultcase tag', function () {
  it("should work as expected with an all lowercase definition", function () {
    r = test.cfparser.parse('<cfdefaultcase>');
    r.should.be.instanceof(Object);
    r.tag.should.eql('defaultcase');
  });

  it("should work as expected with an all uppercase definition", function () {
    r = test.cfparser.parse('<CFDEFAULTCASE>');
    r.should.be.instanceof(Object);
    r.tag.should.eql('defaultcase');
  });
});
