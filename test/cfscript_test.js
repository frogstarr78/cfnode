const test = require('./testlib'),
    should = require('should');

describe("Parsing a cfscript tag", function() {
    it('woks as expected', function () {
        r = test.cfparser.parse('<cfscript></cfscript>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('script');
        r.content.should.eql('');

        r = test.cfparser.parse('<CFSCRIPT></CFSCRIPT>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('script');
        r.content.should.eql('');

        r = test.cfparser.parse('<cfscript>something done</cfscript>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('script');
        r.content.should.eql('something done');


        r = test.cfparser.parse('<CFSCRIPT>' +
        "\nsomething more done" +
        "\n</CFSCRIPT>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('script');
        r.content.should.eql("\nsomething more done\n");
    });
});
