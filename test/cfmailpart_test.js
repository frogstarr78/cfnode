const test = require('./testlib'),
    should = require('should');

describe("Parsing a cfmailpart tag", function() {
    it('throws an error when missing a required action attribute', function () {
        (function () { r = test.cfparser.parse('<cfmailpart></cfmailpart>'); }).should.throw('Expected " ", "\\n", or "\\t" but ">" found.');
    })

    it('works as expected', function () {
        r = test.cfparser.parse('<cfmailpart type="text"></cfmailpart>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('mailpart');
        r.attributes.type.should.eql('text');
        r.attributes.wrap_text.should.eql(80);

        r = test.cfparser.parse('<cfmailpart ' +
        'type="text" ' + 
        'charset="us-ascii" ' +
        'wraptext="30">' +
        "\nStuff" +
        '</cfmailpart>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('mailpart');
        r.content.should.eql("\nStuff");
        r.attributes.type.should.eql('text');
        r.attributes.charset.should.eql('us-ascii');
        r.attributes.wrap_text.should.eql(30);

        r = test.cfparser.parse('<CFMAILPART ' +
        'TYPE="text" ' + 
        'CHARSET="us-ascii" ' +
        'WRAPTEXT="30">' +
        "\nStuff" +
        '</CFMAILPART>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('mailpart');
        r.content.should.eql("\nStuff");
        r.attributes.type.should.eql('text');
        r.attributes.charset.should.eql('us-ascii');
        r.attributes.wrap_text.should.eql(30);
    });
});
