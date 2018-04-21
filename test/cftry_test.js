const test = require('./testlib'),
    should = require('should');

describe("Parsing a cfxml tag", function() {
    it('works as expected', function () {
        r = test.cfparser.parse('<cftry></cftry>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('try');
        r.content.should.eql('');

        r = test.cfparser.parse('<cftry>' +
        "\n</cftry>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('try');
        r.content.should.eql("\n");


        r = test.cfparser.parse('<CFTRY>' +
        " </CFTRY>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('try');
        r.content.should.eql(' ');
    })
})
