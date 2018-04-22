const test = require('./testlib'),
    should = require('should');

describe("Parsing a cftimer tag", function() {
    it('works as expected', function () {
        r = test.cfparser.parse('<cftimer></cftimer>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('timer');
        r.content.should.eql('');
        r.attributes.label.should.eql(' ');
        r.attributes.type.should.eql('debug');

        r = test.cfparser.parse('<cftimer label="timer">' +
        "\n</cftimer>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('timer');
        r.attributes.label.should.eql("timer");
        r.attributes.type.should.eql('debug');
        r.content.should.eql("\n");

        r = test.cfparser.parse('<cftimer label="timer" type="inline">' +
        "\nThis is the content that is saved #NOW()#" +
        "\n</cftimer>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('timer');
        r.attributes.label.should.eql('timer');
        r.attributes.type.should.eql('inline');
        r.content.should.eql("\nThis is the content that is saved #NOW()#\n");

        r = test.cfparser.parse('<CFTIMER LABEL="timer" TYPE="inline">' +
        "\nThis is the content that is saved #NOW()#" +
        "\n</CFTIMER>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('timer');
        r.attributes.label.should.eql('timer');
        r.attributes.type.should.eql('inline');
        r.content.should.eql("\nThis is the content that is saved #NOW()#\n");
    })
})
