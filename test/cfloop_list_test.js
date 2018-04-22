const should = require('should'),
        test = require('./testlib');

describe('Parsing a cffile list tag', function () {

(function () {
	r = test.cfparser.parse('<cfloop>');
}).should.throw('Missing required closing tag');

(function () {
	r = test.cfparser.parse('<cfloop></cfloop>');
}).should.throw('Missing required attributes.');

(function () {
	r = test.cfparser.parse('<cfloop list="a,b,c"></cfloop>');
}).should.throw('Missing required index attribute.');

(function () {
	r = test.cfparser.parse('<cfloop index="count"></cfloop>');
}).should.throw('Missing required list attribute.');

r = test.cfparser.parse('<cfloop index="item" list="a,b,c"></cfloop>');
r.should.be.instanceof(Object);
.tag.should.eql('loop');
.content.should.eql("");
.attributes.index.should.eql('item');
is.deepEqual(.attributes.list.should.eql(['a', 'b', 'c']);
.attributes.delimiter.should.eql(',');

r = test.cfparser.parse('<cfloop index="item" delimiter=":" list="a,b,c"></cfloop>');
r.should.be.instanceof(Object);
.tag.should.eql('loop');
.content.should.eql("");
.attributes.index.should.eql('item');
is.deepEqual(.attributes.list.should.eql(['a', 'b', 'c']);
.attributes.delimiter.should.eql(':');

r = test.cfparser.parse('<CFLOOP INDEX="item" LIST="a,b,c" DELIMITER=";"></CFLOOP>');
r.should.be.instanceof(Object);
.tag.should.eql('loop');
.content.should.eql("");
.attributes.index.should.eql('item');
is.deepEqual(.attributes.list.should.eql(['a', 'b', 'c']);
.attributes.delimiter.should.eql(';');
