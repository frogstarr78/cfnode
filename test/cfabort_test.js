const should = require('should'),
        test = require('./testlib');

describe("Parser should parse cfabort tag", function () {
  it("should create a cftag object (when the text is lowercase) with no attributes", function () {
    r = test.cfparser.parse('<cfabort />');
    r.should.be.instanceof(Object);
    r.tag.should.equal('abort');
    should(r.attributes.show_error).be.undefined;
  });

  it("should create a cftag object (when the text is uppercase) with no attributes", function () {
    r = test.cfparser.parse('<CFABORT>');
    r.should.be.instanceof(Object);
    r.tag.should.equal('abort');
    should(r.attributes.show_error).be.undefined;
  });

  it("should create a cftag object (when the text is lowercase) with attributes", function () {
    r = test.cfparser.parse('<cfabort showError="say something man">');
    r.should.be.instanceof(Object);
    r.tag.should.equal('abort');
    r.attributes.show_error.should.equal('say something man');
  });

  it("should create a cftag object (when the text is uppercase) with attributes", function () {
    r = test.cfparser.parse('<CFABORT SHOWERROR="nothing to see here. move along." />');
    r.should.be.instanceof(Object);
    r.tag.should.equal('abort');
    r.attributes.show_error.should.equal('nothing to see here. move along.');
  });
});




