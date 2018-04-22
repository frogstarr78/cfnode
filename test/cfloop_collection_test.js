const should = require('should'),
        test = require('./testlib');

describe('Parsing a cfloop collection tag', function () {

(function () {
	r = test.cfparser.parse('<cfloop>');
}).should.throw('Missing required closing tag');

(function () {
	r = test.cfparser.parse('<cfloop></cfloop>');
}).should.throw('Missing required attributes.');

(function () {
	r = test.cfparser.parse('<cfloop collection="#struct#"></cfloop>');
}).should.throw('Missing required index attribute.');

(function () {
	r = test.cfparser.parse('<cfloop index="count"></cfloop>');
}).should.throw('Missing required collection attribute.');

r = test.cfparser.parse('<cfloop index="item" collection="#struct#"></cfloop>');
r.should.be.instanceof(Object);
.tag.should.eql('loop');
.content.should.eql("");
.attributes.index.should.eql('item');
.attributes.collection.should.eql('struct');

r = test.cfparser.parse('<CFLOOP COLLECTION="#struct2#" INDEX="item"></CFLOOP>');
r.should.be.instanceof(Object);
.tag.should.eql('loop');
.content.should.eql("");
.attributes.index.should.eql('item');
.attributes.collection.should.eql('struct2');
