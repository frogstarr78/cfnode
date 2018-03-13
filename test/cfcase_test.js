const should = require('should'), test = require('./testlib');

describe('Parsing the cfcase tag', function () {
    it('should error without any defined attributes', function () {
        (function () { test.cfparser.parse('<cfcase>'); }).should.throw(/Expected " ", "\\n", or "\\t" but ">" found./);
    });

    it('should error without required value attribute but with other attributes', function () {
        (function () { test.cfparser.parse('<cfcase delimiter=",">'); }).should.throw('Missing required "value" attribute.');
    });

    it('should error without valid value attribute', function () {
        (function () { test.cfparser.parse('<cfcase value="">'); }).should.throw('Missing required "value" attribute.');
    });

    it('should work as expected, defining default values', function () {
        r = test.cfparser.parse('<cfcase value="#cfcase_test#">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('case');
        r.attributes.value.should.eql('#cfcase_test#');
        r.attributes.delimiter.should.eql(',');
    });

    it('should work as expected, overwriting default values', function () {
        r = test.cfparser.parse('<cfcase value="a,b,c" delimiter=";">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('case');
        r.attributes.value.should.eql('a,b,c');
        r.attributes.delimiter.should.eql(';');
    });

    it('should work as expected with all-caps attributes', function () {
        r = test.cfparser.parse('<CFCASE VALUE="a.b,c.d" DELIMITER=",.">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('case');
        r.attributes.value.should.eql('a.b,c.d');
        r.attributes.delimiter.should.eql(',.');
    });
});
