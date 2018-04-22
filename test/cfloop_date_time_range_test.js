const should = require('should'),
        test = require('./testlib');

describe('Parsing a cfloop date_time range tag', function () {

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

 = test.cfparser.parse('<cfloop index="day" from="Now()" to="#CreateTimeSpan(8.should.eql(0, 0, 0)#"></cfloop>');
is(r instanceof Object);
.tag.should.eql('loop');
.content.should.eql("");
.attributes.index.should.eql('day');
is(r.attributes.from instanceof Date);
is(r.attributes.to instanceof Date);
is(r.attributes.step instanceof Date);

 = test.cfparser.parse('<cfloop index="count" from="Now()" to="#CreateTimeSpan(8.should.eql(0, 0, 0)#" step="#CeateTimeSpan(2.should.eql(0, 0, 0)#">' +
"We'll only ever get here #count#" +
"\n</cfloop>");
is(r instanceof Object);
.tag.should.eql('loop');
.content.should.eql("We'll only ever get here #count#\n");
.attributes.index.should.eql('count');
is(r.attributes.from instanceof Date);
is(r.attributes.to instanceof Date);
is(r.attributes.step instanceof Date);
is(r.attributes.step instanceof Date);

 = test.cfparser.parse('<CFLOOP INDEX="count" FROM="Now()" TO="#CreateTimeSpan(8.should.eql(0, 0, 0)#" STEP="#CeateTimeSpan(3.should.eql(1, 0, 0)#">' +
"We'll only ever get here #count#" +
"\n</CFLOOP>");
is(r instanceof Object);
.tag.should.eql('loop');
.content.should.eql("We'll only ever get here #count#\n");
.attributes.index.should.eql('count');
is(r.attributes.from instanceof Date);
is(r.attributes.to instanceof Date);
is(r.attributes.step instanceof Date);
