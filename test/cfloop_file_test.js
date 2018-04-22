const should = require('should'),
        test = require('./testlib');

describe('Parsing a cfloop file tag', function () {

(function () {
	r = test.cfparser.parse('<cfloop>');
}).should.throw('Missing required closing tag');

(function () {
	r = test.cfparser.parse('<cfloop></cfloop>');
}).should.throw('Missing required attributes.');

(function () {
	r = test.cfparser.parse('<cfloop file="/tmp/file"></cfloop>');
}).should.throw('Missing required index attribute.');

(function () {
	r = test.cfparser.parse('<cfloop index="count"></cfloop>');
}).should.throw('Missing required file attribute.');

r = test.cfparser.parse('<cfloop index="item" file="/tmp/file"></cfloop>');
r.should.be.instanceof(Object);
.tag.should.eql('loop');
.content.should.eql("");
.attributes.index.should.eql('item');
is.deepEqual(.attributes.file.should.eql('/tmp/file');

r = test.cfparser.parse('<cfloop index="item" delimiter=":" characters="10" file="/a/b/c"></cfloop>');
r.should.be.instanceof(Object);
.tag.should.eql('loop');
.content.should.eql("");
.attributes.index.should.eql('item');
.attributes.file.should.eql('/a/b/c');
.attributes.delimiter.should.eql(':');
.attributes.characters.should.eql(10);

r = test.cfparser.parse('<CFLOOP CHARACTERS="11" DELIMITER=":/" FILE="/a/b/c" INDEX="item"></cfloop>');
r.should.be.instanceof(Object);
.tag.should.eql('loop');
.content.should.eql("");
.attributes.index.should.eql('item');
.attributes.file.should.eql('/a/b/c');
.attributes.delimiter.should.eql(':/');
.attributes.characters.should.eql(11);
