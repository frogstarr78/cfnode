const should = require('should'),
	  test = require('./testlib');

describe("Parser should parse cfrethrow tag", function () {
	it("should work as expected", function () {
		r = test.cfparser.parse('<cfrethrow>');
		r.should.be.instanceof(Object);
		r.tag.should.be.eql('rethrow');
		r.content.should.be.eql('');
	});

	it("should work as expected (all in caps)", function () {
		r = test.cfparser.parse('<CFRETHROW>');
		r.should.be.instanceof(Object);
		r.tag.should.be.eql('rethrow');
		r.content.should.be.eql('');
	});
});
