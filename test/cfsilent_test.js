const test = require('./testlib'),
    should = require('should');

describe("Parsing a cfsilent tag", function() {
    it('woks as expected', function () {
        r = test.cfparser.parse('<cfsilent></cfsilent>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('silent');
        r.content.should.eql('');

        r = test.cfparser.parse('<cfsilent>' +
        "\n</cfsilent>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('silent');
        r.content.should.eql("\n");


        r = test.cfparser.parse('<CFSILENT>' +
        " </CFSILENT>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('silent');
        r.content.should.eql(' ');
    })
})
