const should = require('should'),
        test = require('./testlib');

describe('Parsing a loop tag', function () {
    it("throws an error without any required attributes", function () {
    	(function () { test.cfparser.parse('<cfloop>') }).should.throw('Expected " ", "\\n", or "\\t" but ">" found.');
		(function () { test.cfparser.parse('<cfloop></cfloop>') }).should.throw('Expected " ", "\\n", or "\\t" but ">" found.');
		(function () { test.cfparser.parse('<cfloop ></cfloop>') }).should.throw('Expected " ", "\\n", "\\t", [aA], [cC], [dD], [eE], [fF], [iI], [lL], [qQ], [sS], or [tT] but ">" found.');
	});

	describe('iterating over an array', function () {
		it("throws an error without a required index attribute", function () {
			(function () { test.cfparser.parse('<cfloop array="#arry#"></cfloop>') }).should.throw('Missing required "index" attribute.');
		});
		
		it("throws an error without a required array attribute", function () {
			(function () { test.cfparser.parse('<cfloop index="count"></cfloop>') }).should.throw('Missing required "array" attribute.');
		});
		
		it('works as expected', function () {
			r = test.cfparser.parse('<cfloop index="item" array="#arry#"></cfloop>');
			r.should.be.instanceof(Object);
			r.tag.should.equal('loop');
			r.content.should.equal("");
			r.attributes.index.should.equal('item');
			r.attributes.array.should.equal('arry');

			r = test.cfparser.parse('<CFLOOP ARRAY="#arry2#" INDEX="item"></CFLOOP>');
			r.should.be.instanceof(Object);
			r.tag.should.equal('loop');
			r.content.should.equal("");
			r.attributes.index.should.equal('item');
			r.attributes.array.should.equal('arry2');
		});
	});

	describe('iterating over a collection', function () {
		it("throws an error without a required index attribute", function () {
			(function () { test.cfparser.parse('<cfloop collection="#struct#"></cfloop>'); }).should.throw('Missing required "index" attribute.');
		});
		
		it("throws an error without a required array attribute", function () {
			(function () { test.cfparser.parse('<cfloop index="count"></cfloop>') }).should.throw('Missing required "array" attribute.');
		});

		it('works as expected', function () {
			r = test.cfparser.parse('<cfloop index="item" collection="#struct#"></cfloop>');
			r.should.be.instanceof(Object);
			r.tag.should.eql('loop');
			r.content.should.eql("");
			r.attributes.index.should.eql('item');
			r.attributes.collection.should.eql('struct');

			r = test.cfparser.parse('<CFLOOP COLLECTION="#struct2#" INDEX="item"></CFLOOP>');
			r.should.be.instanceof(Object);
			r.tag.should.eql('loop');
			r.content.should.eql("");
			r.attributes.index.should.eql('item');
			r.attributes.collection.should.eql('struct2');
		});
	});

	describe('iterating over a condition', function () {
		it('works as expected', function () {
			r = test.cfparser.parse('<cfloop condition="count lt 5"></cfloop>');
			r.should.be.instanceof(Object);
			r.tag.should.eql('loop');
			r.content.should.eql("");
			r.attributes.condition.should.eql('count lt 5');

			r = test.cfparser.parse('<cfloop condition="count lt 5">' +
			"We'll only ever get here #count#" +
			"\n</cfloop>");
			r.should.be.instanceof(Object);
			r.tag.should.eql('loop');
			r.content.should.eql("We'll only ever get here #count#\n");
			r.attributes.condition.should.eql('count lt 5');

			r = test.cfparser.parse('<CFLOOP CONDITION="count gte 1">' +
			"We'll only ever get here #count#" +
			"\n</CFLOOP>");
			r.should.be.instanceof(Object);
			r.tag.should.eql('loop');
			r.content.should.eql("We'll only ever get here #count#\n");
			r.attributes.condition.should.eql('count gte 1');
		});
	});

	describe('iterating over a date_time range', function () {
		it("throws an error without a required to attribute", function () {
			(function () { test.cfparser.parse('<cfloop index="count" from="1"></cfloop>'); }).should.throw('Missing required "to" attribute.');
		});

		it("throws an error without a required from attribute", function () {
			(function () { test.cfparser.parse('<cfloop index="count" to="2"></cfloop>'); }).should.throw('Missing required "from" attribute.');
		});

		it("throws an error without a required index attribute", function () {
			(function () { test.cfparser.parse('<cfloop from="1" to="2"></cfloop>'); }).should.throw('Missing required "index" attribute.');
		});

		it('works as expected', function () {
			r = test.cfparser.parse('<cfloop index="day" from="Now()" to="#CreateTimeSpan(8, 0, 0, 0)#"></cfloop>');
			r.should.be.instanceof(Object);
			r.tag.should.eql('loop');
			r.content.should.eql("");
			r.attributes.index.should.eql('day');
			r.attributes.from.should.be.instanceof(Date);
			r.attributes.to.should.be.instanceof(Date);
			r.attributes.step.should.be.instanceof(Date);

			r = test.cfparser.parse('<cfloop index="count" from="Now()" to="#CreateTimeSpan(8, 0, 0, 0)#" step="#CreateTimeSpan(2, 0, 0, 0)#">' +
			"We'll only ever get here #count#" +
			"\n</cfloop>");
			r.should.be.instanceof(Object);
			r.tag.should.eql('loop');
			r.content.should.eql("We'll only ever get here #count#\n");
			r.attributes.index.should.eql('count');
			r.attributes.from.should.be.instanceof(Date);
			r.attributes.to.should.be.instanceof(Date);
			r.attributes.step.should.be.instanceof(Date);
			r.attributes.step.should.be.instanceof(Date);

			r = test.cfparser.parse('<CFLOOP INDEX="count" FROM="Now()" TO="#CreateTimeSpan(8, 0, 0, 0)#" STEP="#CreateTimeSpan(3, 1, 0, 0)#">' +
			"We'll only ever get here #count#" +
			"\n</CFLOOP>");
			r.should.be.instanceof(Object);
			r.tag.should.eql('loop');
			r.content.should.eql("We'll only ever get here #count#\n");
			r.attributes.index.should.eql('count');
			r.attributes.from.should.be.instanceof(Date);
			r.attributes.to.should.be.instanceof(Date);
			r.attributes.step.should.be.instanceof(Date);
		});
	});

	describe('iterating over a file', function () {

		it("throws an error without a required from attribute", function () {
			(function () { test.cfparser.parse('<cfloop file="/tmp/file"></cfloop>'); }).should.throw('Missing required "index" attribute.');
		});

		it("throws an error without a required from attribute", function () {
			(function () { test.cfparser.parse('<cfloop index="count"></cfloop>'); }).should.throw('Missing required "array" attribute.');
		});

		it('works as expected', function () {
			r = test.cfparser.parse('<cfloop index="item" file="/tmp/file"></cfloop>');
			r.should.be.instanceof(Object);
			r.tag.should.eql('loop');
			r.content.should.eql("");
			r.attributes.index.should.eql('item');
			r.attributes.file.should.eql('/tmp/file');

			r = test.cfparser.parse('<cfloop index="item" delimiter=":" characters="10" file="/a/b/c"></cfloop>');
			r.should.be.instanceof(Object);
			r.tag.should.eql('loop');
			r.content.should.eql("");
			r.attributes.index.should.eql('item');
			r.attributes.file.should.eql('/a/b/c');
			r.attributes.delimiter.should.eql(':');
			r.attributes.characters.should.eql(10);

			r = test.cfparser.parse('<CFLOOP CHARACTERS="11" DELIMITER=":/" FILE="/a/b/c" INDEX="item"></cfloop>');
			r.should.be.instanceof(Object);
			r.tag.should.eql('loop');
			r.content.should.eql("");
			r.attributes.index.should.eql('item');
			r.attributes.file.should.eql('/a/b/c');
			r.attributes.delimiter.should.eql(':/');
			r.attributes.characters.should.eql(11);
		});
	});

	describe('iterating over a index', function () {
		it('throws an error when missing the required to attribute', function () {
			(function () { test.cfparser.parse('<cfloop index="count" from="1"></cfloop>'); }).should.throw('Missing required "to" attribute.');
		});

		it('throws an error when missing the required from attribute', function () {
			(function () { test.cfparser.parse('<cfloop index="count" to="2"></cfloop>'); }).should.throw('Missing required "from" attribute.');
		});

		it('throws an error when missing the required index attribute', function () {
			(function () { test.cfparser.parse('<cfloop from="1" to="2"></cfloop>'); }).should.throw('Missing required "index" attribute.');
		});

		it('works as expected', function () {
			r = test.cfparser.parse('<cfloop index="count" from="1" to="3"></cfloop>');
			r.should.be.instanceof(Object);
			r.tag.should.eql('loop');
			r.content.should.eql("");
			r.attributes.index.should.eql('count');
			r.attributes.from.should.eql(1);
			r.attributes.to.should.eql(3);
			r.attributes.step.should.eql(1);

			r = test.cfparser.parse('<cfloop index="count" from="1" to="4" step="2" charset="utf8">' +
			"We'll only ever get here #count#" +
			"\n</cfloop>");
			r.should.be.instanceof(Object);
			r.tag.should.eql('loop');
			r.content.should.eql("We'll only ever get here #count#\n");
			r.attributes.index.should.eql('count');
			r.attributes.from.should.eql(1);
			r.attributes.to.should.eql(4);
			r.attributes.step.should.eql(2);
			r.attributes.charset.should.eql('utf8');

			r = test.cfparser.parse('<CFLOOP INDEX="count" FROM="1" TO="4" STEP="3" CHARSET="utf8">' +
			"We'll only ever get here #count#" +
			"\n</CFLOOP>");
			r.should.be.instanceof(Object);
			r.tag.should.eql('loop');
			r.content.should.eql("We'll only ever get here #count#\n");
			r.attributes.index.should.eql('count');
			r.attributes.from.should.eql(1);
			r.attributes.to.should.eql(4);
			r.attributes.step.should.eql(3);
			r.attributes.charset.should.eql('utf8');
		});
	});

	describe('iterating over a list', function () {
		it('throws an error when missing the required index attribute', function () {
			(function () { test.cfparser.parse('<cfloop list="a,b,c"></cfloop>'); }).should.throw('Missing required "index" attribute.');
		});

		it('throws an error when missing the required index attribute', function () {
			(function () { test.cfparser.parse('<cfloop index="count"></cfloop>'); }).should.throw('Missing required "array" attribute.');
		});

		it('works as expected', function () {
			r = test.cfparser.parse('<cfloop index="item" list="a,b,c"></cfloop>');
			r.should.be.instanceof(Object);
			r.tag.should.eql('loop');
			r.content.should.eql("");
			r.attributes.index.should.eql('item');
			r.attributes.list.should.eql(['a', 'b', 'c']);
			r.attributes.delimiter.should.eql(',');

			r = test.cfparser.parse('<cfloop index="item" delimiter=":" list="a,b,c"></cfloop>');
			r.should.be.instanceof(Object);
			r.tag.should.eql('loop');
			r.content.should.eql("");
			r.attributes.index.should.eql('item');
			r.attributes.list.should.eql(['a', 'b', 'c']);
			r.attributes.delimiter.should.eql(':');

			r = test.cfparser.parse('<CFLOOP INDEX="item" LIST="a,b,c" DELIMITER=";"></CFLOOP>');
			r.should.be.instanceof(Object);
			r.tag.should.eql('loop');
			r.content.should.eql("");
			r.attributes.index.should.eql('item');
			r.attributes.list.should.eql(['a', 'b', 'c']);
			r.attributes.delimiter.should.eql(';');
		});
	});

	describe('iterating over a query', function () {
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
});
