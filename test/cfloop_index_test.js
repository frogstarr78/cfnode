const should = require('should'),
        test = require('./testlib');

describe('Parsing a cfloop index tag', function () {

(function () {
	r = test.cfparser.parse('<cfloop>');
}).should.throw('Missing required closing tag');

(function () {
	r = test.cfparser.parse('<cfloop></cfloop>');
}).should.throw('Missing required attributes.');

(function () {
	r = test.cfparser.parse('<cfloop index="count" from="1"></cfloop>');
}).should.throw('Missing required to attribute.');

(function () {
	r = test.cfparser.parse('<cfloop index="count" to="2"></cfloop>');
}).should.throw('Missing required from attribute.');

(function () {
	r = test.cfparser.parse('<cfloop from="1" to="2"></cfloop>');
}).should.throw('Missing required index attribute.');

r = test.cfparser.parse('<cfloop index="count" from="1" to="3"></cfloop>');
r.should.be.instanceof(Object);
.tag.should.eql('loop');
.content.should.eql("");
.attributes.index.should.eql('count');
.attributes.from.should.eql(1);
.attributes.to.should.eql(3);
.attributes.step.should.eql(1);

r = test.cfparser.parse('<cfloop index="count" from="1" to="4" step="2" charset="utf8">' +
"We'll only ever get here #count#" +
"\n</cfloop>");
r.should.be.instanceof(Object);
.tag.should.eql('loop');
.content.should.eql("We'll only ever get here #count#\n");
.attributes.index.should.eql('count');
.attributes.from.should.eql(1);
.attributes.to.should.eql(4);
.attributes.step.should.eql(2);
.attributes.charset.should.eql('utf8');

r = test.cfparser.parse('<CFLOOP INDEX="count" FROM="1" TO="4" STEP="3" CHARSET="utf8">' +
"We'll only ever get here #count#" +
"\n</CFLOOP>");
r.should.be.instanceof(Object);
.tag.should.eql('loop');
.content.should.eql("We'll only ever get here #count#\n");
.attributes.index.should.eql('count');
.attributes.from.should.eql(1);
.attributes.to.should.eql(4);
.attributes.step.should.eql(3);
.attributes.charset.should.eql('utf8');
