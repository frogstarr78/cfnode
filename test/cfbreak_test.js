const should = require('should'),
	  test = require('./testlib');

describe('Parsing the cfbreak tag', function() {
    it('should work as expected', function () {
        r = test.cfparser.parse('<cfbreak>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('break');
        r.content.should.eql('');
    });

    it('should work as expected with tag defined in caps', function () {
        r = test.cfparser.parse('<CFBREAK>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('break');
        r.content.should.eql('');
    });
});
