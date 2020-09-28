const test = require('./testlib'),
    should = require('should');

describe("Parsing a cftrace tag", function() {
    it('works as expected', function () {
        r = test.cfparser.parse('<cftrace></cftrace>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('trace');
        r.content.should.eql('');
        r.attributes.abort.should.be.false;
        r.attributes.inline.should.be.false;
        r.attributes.type.should.eql('information');

        r = test.cfparser.parse('<cftrace></cftrace>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('trace');
        r.content.should.eql('');
        r.attributes.abort.should.be.false;
        r.attributes.inline.should.be.false;
        r.attributes.type.should.eql('information');

        r = test.cfparser.parse('<cftrace var="FORM.username">' +
        "\n</cftrace>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('trace');
        r.content.should.eql("\n");
        r.attributes.abort.should.be.false;
        r.attributes.inline.should.be.false;
        r.attributes.type.should.eql('information');
        r.attributes.var.should.eql('FORM.username');

        r = test.cfparser.parse('<cftrace var="FORM.username" inline="0" abort="yes" category="trace category" type="warning" text="trace text">' +
        "\nThis is the content that is saved #NOW()#" +
        "\n</cftrace>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('trace');
        r.content.should.eql("\nThis is the content that is saved #NOW()#\n");
        r.attributes.abort.should.be.true;
        r.attributes.inline.should.be.false;
        r.attributes.type.should.eql('warning');
        r.attributes.var.should.eql('FORM.username');
        r.attributes.category.should.eql('trace category');
        r.attributes.text.should.eql('trace text');

        r = test.cfparser.parse('<CFTRACE' +
                ' VAR="FORM.username"' +
                ' INLINE="1"' +
                ' ABORT="yes"' + 
                ' CATEGORY="trace category"' + 
                ' TYPE="warning"' + 
                ' TEXT="trace text"' + 
        '>' + 
        "\nThis is the content that is saved #NOW()#" +
        "\n</cftrace>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('trace');
        r.content.should.eql("\nThis is the content that is saved #NOW()#\n");
        r.attributes.abort.should.be.true;
        r.attributes.inline.should.be.true;
        r.attributes.type.should.eql('warning');
        r.attributes.var.should.eql('FORM.username');
        r.attributes.category.should.eql('trace category');
        r.attributes.text.should.eql('trace text');
    })
})
