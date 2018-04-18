const should = require('should'),
	    test = require('./testlib');

describe('Parsing the cfflush tag', function () {
	it('should work as expected', function () {
		r = test.cfparser.parse('<cffinally ></cffinally>');
		r.should.be.instanceof(Object);
		r.tag.should.eql('finally');
		r.content.should.eql('');

		r = test.cfparser.parse('<CFFINALLY></CFFINALLY>');
		r.should.be.instanceof(Object);
		r.tag.should.eql('finally');
		r.content.should.eql('');

		r = test.cfparser.parse('<CFFINALLY>' +
		"\n</CFFINALLY>");
		r.should.be.instanceof(Object);
		r.tag.should.eql('finally');
		r.content.should.eql("\n");

		r = test.cfparser.parse('<CFFINALLY>' +
		"\nBetter stuff here\n</CFFINALLY>");
		r.should.be.instanceof(Object);
		r.tag.should.eql('finally');
		r.content.should.eql("\nBetter stuff here\n");
	});
});
