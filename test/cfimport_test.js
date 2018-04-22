const test = require('./testlib'),
	should = require('should');

describe('parsing a cfimport tag', function () {
    it('thows an error when missing required attributes', function () {
        (function () { test.cfparser.parse('<cfimport>') }).should.throw('Missing required "taglib" attribute.');
    });

    it('thows an error when missing the required "prefix" attribute', function () {
        (function () { test.cfparser.parse('<cfimport taglib="/path/to/taglib.cfc">') }).should.throw('Missing required "prefix" attribute.');
    });

    it('thows an error when missing the required "taglib" attribute', function () {
        (function () { test.cfparser.parse('<cfimport prefix="cfnode_test">') }).should.throw('Missing required "taglib" attribute.');
    });

    it('should work as expected', function () {
        r = test.cfparser.parse('<cfimport taglib="/path/to/taglib.jsp" prefix="">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('import');
        r.attributes.prefix.should.eql('');
        r.attributes.taglib.should.eql('/path/to/taglib.jsp');
    });

    it('should work as expected with different attribute values', function () {
        r = test.cfparser.parse('<cfimport taglib="/path/to/taglib.jsp" prefix="cfnode" />');
        r.should.be.instanceof(Object);
        r.tag.should.eql('import');
        r.attributes.prefix.should.eql('cfnode');
        r.attributes.taglib.should.eql('/path/to/taglib.jsp');
    });

    it('should work as expected with empty prefix attribute', function () {
        r = test.cfparser.parse('<cfimport prefix="" taglib="/path/to/taglib.cfc">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('import');
        r.attributes.prefix.should.eql('');
        r.attributes.taglib.should.eql('/path/to/taglib.cfc');
    });

    it('should work as expected with all-caps attributes', function () {
        r = test.cfparser.parse('<CFIMPORT PREFIX="" TAGLIB="/path/to/taglib.cfc">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('import');
        r.attributes.prefix.should.eql('');
        r.attributes.taglib.should.eql('/path/to/taglib.cfc');
    });
});
