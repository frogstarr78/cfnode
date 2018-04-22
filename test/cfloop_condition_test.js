const should = require('should'),
        test = require('./testlib');

describe('Parsing a cfloop condition tag', function () {

(function () {
	r = test.cfparser.parse('<cfloop>');
}).should.throw('Missing required closing tag');

(function () {
	r = test.cfparser.parse('<cfloop></cfloop>');
}).should.throw('Missing required condition attribute.');

r = test.cfparser.parse('<cfloop condition="count lt 5"></cfloop>');
r.should.be.instanceof(Object);
.tag.should.eql('loop');
.content.should.eql("");
.attributes.condition.should.eql('count lt 5');

r = test.cfparser.parse('<cfloop condition="count lt 5">' +
"We'll only ever get here #count#" +
"\n</cfloop>");
r.should.be.instanceof(Object);
.tag.should.eql('loop');
.content.should.eql("We'll only ever get here #count#\n");
.attributes.condition.should.eql('count lt 5');

r = test.cfparser.parse('<CFLOOP CONDITION="count gte 1">' +
"We'll only ever get here #count#" +
"\n</CFLOOP>");
r.should.be.instanceof(Object);
.tag.should.eql('loop');
.content.should.eql("We'll only ever get here #count#\n");
.attributes.condition.should.eql('count gte 1');
