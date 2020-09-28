const should = require('should'),
        test = require('./testlib');

describe('Parsing the cfcatch tag', function () {

    it('behaves as expected w/out any attributes', function () {
        r = test.cfparser.parse('<cfcatch ></cfcatch>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('catch');
        r.content.should.eql('');
    });

    it('behaves as expected w/out any attributes but all in caps', function () {
        r = test.cfparser.parse('<CFCATCH></CFCATCH>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('catch');
        r.content.should.eql('');
    });

    it('behaves as expected w/ some attributes', function () {
        r = test.cfparser.parse('<cfcatch type="database">something done</cfcatch>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('catch');
        r.attributes.type.should.eql('database');
        r.content.should.eql('something done');
    });

    it('behaves as expected w/ some attributes and all in caps', function () {
        r = test.cfparser.parse('<CFCATCH TYPE="database">' +
        "\nsomething more done" +
        "\n</CFCATCH>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('catch');
        r.attributes.type.should.eql('database');
        r.content.should.eql("\nsomething more done\n");
    });
});
