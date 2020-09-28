const should = require('should'),
	    test = require('./testlib');

describe('Parsing the cfflush tag', function () {
	it('should work as expected', function () {
		r = test.cfparser.parse('<cfflush>');
		r.should.be.instanceof(Object);
		r.tag.should.eql('flush');

		r = test.cfparser.parse('<cfflush interval="10">');
		r.should.be.instanceof(Object);
		r.tag.should.eql('flush');
		r.attributes.interval.should.eql(10);

		r = test.cfparser.parse('<CFFLUSH INTERVAL="10">');
		r.should.be.instanceof(Object);
		r.tag.should.eql('flush');
		r.attributes.interval.should.eql(10);
	});
});
