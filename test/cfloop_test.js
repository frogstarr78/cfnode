const should = require('should'),
        test = require('./testlib');

describe('Parsing a loop tag', function () {
	describe('looping over a query', function () {
		it('should throw an error when missing a closing tag', function () {
			(function () { r = test.cfparser.parse('<cfloop>'); }).should.throw('Missing required closing tag');
		});

		it('should throw an error without a query attribute', function () {
			(function () { r = test.cfparser.parse('<cfloop></cfloop>'); }).should.throw('Missing required query attribute.');
		});

		it('works as expected', function () {
			r = test.cfparser.parse('<cfloop query="cfloop_query"></cfloop>');
			r.should.be.instanceof(Object);
			r.tag.should.eql('loop');
			r.content.should.eql("");
			r.attributes.query.should.eql('cfloop_query');
			r.attributes.start_row.should.eql(1);

			r = test.cfparser.parse('<cfloop query="cfloop_query2" startRow="2" endRow="3">' +
			"We'll only ever get here #count#" +
			"\n</cfloop>");
			r.should.be.instanceof(Object);
			r.tag.should.eql('loop');
			r.content.should.eql("We'll only ever get here #count#\n");
			r.attributes.query.should.eql('cfloop_query2');
			r.attributes.start_row.should.eql(2);
			r.attributes.end_row.should.eql(3);

			r = test.cfparser.parse('<CFLOOP QUERY="cfloop_query3" STARTROW="3" ENDROW="4">' +
			"We'll only ever get here #count#" +
			"\n</CFLOOP>");
			r.should.be.instanceof(Object);
			r.tag.should.eql('loop');
			r.content.should.eql("We'll only ever get here #count#\n");
			r.attributes.query.should.eql('cfloop_query3');
			r.attributes.start_row.should.eql(3);
			r.attributes.end_row.should.eql(4);
		});
	});
	describe('looping over a query', function () {
	});
});
