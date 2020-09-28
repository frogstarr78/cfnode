const should = require('should'),
        test = require('./testlib');

describe('Parsing a cfsavecontent tag', function () {
    it('should throw an error when missing variable attribute', function () {
        (function () { r = test.cfparser.parse('<cfsavecontent></cfsavecontent>'); }).should.throw(Error);
    })

    it('works as expected', function () {
        r = test.cfparser.parse('<cfsavecontent variable="savecontent"></cfsavecontent>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('savecontent');
        r.attributes.variable.should.eql('savecontent');
        r.content.should.eql('');

        r = test.cfparser.parse('<cfsavecontent variable="savecontent">' +
        "\n</cfsavecontent>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('savecontent');
        r.attributes.variable.should.eql("savecontent");
        r.content.should.eql("\n");

        r = test.cfparser.parse('<CFSAVECONTENT' +
                ' VARIABLE="savecontent">' +
        "\nThis is the content that is saved #NOW()#" +
        "\n</CFSAVECONTENT>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('savecontent');
        r.attributes.variable.should.eql('savecontent');
        r.content.should.eql("\nThis is the content that is saved #NOW()#\n");

        r = test.cfparser.parse('<cfsavecontent variable="savecontent">' +
        "\nThis is the content that is saved #NOW()#" +
        "\n</cfsavecontent>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('savecontent');
        r.attributes.variable.should.eql('savecontent');
        r.content.should.eql("\nThis is the content that is saved #NOW()#\n");
    });
});
