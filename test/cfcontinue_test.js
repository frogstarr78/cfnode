const should = require('should'),
        test = require('./testlib');

describe('Parsing the cfcontinue tag', function () {
    it('should work as expected', function () {
        r = test.cfparser.parse('<cfcontinue>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('continue');
        r.content.should.eql('');
    });

    it('should work as expected when all in caps', function () {
        r = test.cfparser.parse('<CFCONTINUE>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('continue');
        r.content.should.eql('');
    });
});
