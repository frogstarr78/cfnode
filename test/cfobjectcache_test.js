const test = require('./testlib'),
    should = require('should');

describe("Parsing a cfobjectcache tag", function() {
    it('throws an error when missing a required action attribute', function () {
        (function () { test.cfparser.parse('<cfobjectcache >'); }).should.throw('Expected " ", "\\n", "\\t", or [aA] but ">" found.');
    });

    it('works as expected', function () {
        r = test.cfparser.parse('<cfobjectcache action="clear">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('objectcache');
        r.attributes.action.should.eql('clear');

        r = test.cfparser.parse('<cfobjectcache action="clear">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('objectcache');
        r.attributes.action.should.eql('clear');

        r = test.cfparser.parse('<cfobjectcache' +
                ' action="clear"' +
        '>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('objectcache');
        r.attributes.action.should.eql('clear');

        r = test.cfparser.parse('<CFOBJECTCACHE' +
                ' ACTION="clear"' +
        '>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('objectcache');
        r.attributes.action.should.eql('clear');
    });
});
