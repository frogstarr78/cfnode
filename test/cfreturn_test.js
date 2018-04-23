const should = require('should'),
        test = require('./testlib');

describe('Parsing a cfreturn tag', function () {

    it('throws an error when missing a required expression', function () {
        (function () { test.cfparser.parse('<cfreturn />'); }).should.throw('Expected [hH] but "u" found.');
        (function () { test.cfparser.parse('<cfreturn >'); }).should.throw('Expected [hH] but "u" found.');
        (function () { test.cfparser.parse('<cfreturn>');  }).should.throw('Expected [hH] but "u" found.');
    });

    it('works as expected', function () {
        r = test.cfparser.parse('<cfreturn TRIM(username)>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('return');
        r.expression.should.eql('TRIM(username)');
        r.attributes.should.eql({});

        r = test.cfparser.parse('<CFRETURN 1 NE 0>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('return');
        r.expression.should.eql('1 NE 0');
        r.attributes.should.eql({});
    });
});
