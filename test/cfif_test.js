const should = require('should'),
	    test = require('./testlib');

describe('Parser parsing the cfif tag', function () {
	it('should throw an error when missing a closing tag', function () {
		(function () { test.cfparser.parse('<cfif>'); }).should.throw('Expected [mM] or [nN] but "f" found.');
		(function () { test.cfparser.parse('<cfif></cfif>'); }).should.throw('Expected [mM] or [nN] but "f" found.');
	});

	it('should throw an error when missing an expression', function () {
		(function () { test.cfparser.parse('<cfif ></cfif>'); }).should.throw('Missing required expression.');
	});

	it('should work as expected', function () {
		r = test.cfparser.parse('<cfif TRIM(username) EQ "The most pointless code ever"></cfif>');
		r.should.be.instanceof(Object);
		r.tag.should.eql('if');
		r.expression.should.eql('TRIM(username) EQ "The most pointless code ever"');
		r.content.should.eql("");
		r.attributes.should.eql({});

		r = test.cfparser.parse('<cfif 0 EQ 0>' +
		"We'll only ever get here" +
		'<cfelseif 1>' + 
		"\n</cfif>");
		r.should.be.instanceof(Object);
		r.tag.should.eql('if');
		r.expression.should.eql('0 EQ 0');
		r.content.should.eql("We'll only ever get here");
		r.attributes.should.eql({});

		r = test.cfparser.parse('<cfif 0 EQ 0>' +
		"We'll only ever get here" +
		'<cfelseif 1>' + 
		'<cfelse>' + 
		"\n</cfif>");
		r.should.be.instanceof(Object);
		r.tag.should.eql('if');
		r.expression.should.eql('0 EQ 0');
		r.content.should.eql("We'll only ever get here");
		r.attributes.should.eql({});

		r = test.cfparser.parse('<cfif 1 EQ 0>' +
		"We'll never get here" +
		'<cfelse></cfif>');
		r.should.be.instanceof(Object);
		r.tag.should.eql('if');
		r.expression.should.eql('1 EQ 0');
		r.content.should.eql("We'll never get here");
		r.attributes.should.eql({});

		r = test.cfparser.parse('<CFIF 1 NE 0>' +
		"\nThen do something" +
		'</CFIF>');
		r.should.be.instanceof(Object);
		r.tag.should.eql('if');
		r.expression.should.eql('1 NE 0');
		r.content.should.eql("\nThen do something");
		r.attributes.should.eql({});
	});
});

