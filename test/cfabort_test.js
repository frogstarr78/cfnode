const should = require('should'),
        test = require('./testlib');

describe("Parser should parse cfabort tag", function () {
  it("works as expected", function () {
    r = test.cfparser.parse('<cfabort />');
    r.should.be.instanceof(Object);
    r.tag.should.equal('abort');
    should(r.attributes.show_error).be.undefined;

    r = test.cfparser.parse('<CFABORT>');
    r.should.be.instanceof(Object);
    r.tag.should.equal('abort');
    should(r.attributes.show_error).be.undefined;

    r = test.cfparser.parse('<cfabort showError="say something man">');
    r.should.be.instanceof(Object);
    r.tag.should.equal('abort');
    r.attributes.show_error.should.equal('say something man');

    r = test.cfparser.parse('<CFABORT SHOWERROR="nothing to see here. move along." />');
    r.should.be.instanceof(Object);
    r.tag.should.equal('abort');
    r.attributes.show_error.should.equal('nothing to see here. move along.');
  });
});




