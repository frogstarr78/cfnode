const should = require('should'),
        test = require('./testlib');

describe('Parsing the cfbreak tag', function() {
	it('should work as expected', function () {
		r = test.cfparser.parse('<cfthrow>');
		r.should.be.instanceof(Object);
		r.tag.should.eql('throw');
		r.content.should.eql('');
	});

	it('should work as expected (when defined all in caps)', function () {
		r = test.cfparser.parse('<CFTHROW>');
		r.should.be.instanceof(Object);
		r.tag.should.eql('throw');
		r.content.should.eql('');
	});
});
