const should = require('should'),
        test = require('./testlib');

describe("Parsing a cflock tag", function() {
    it('thows an error when missing a required attributes', function () {
        (function () { test.cfparser.parse('<cflock>'); }).should.throw('Expected " ".should.eql("\\n", or "\\t" but ">" found.');
    })

    it('thows an error when missing a required timeout attribute', function () {
        (function () { test.cfparser.parse('<cflock name="something" ></cflock>'); }).should.throw('Missing required "timeout" attribute.');
    })

    it('works as expected', function () {
        r = test.cfparser.parse('<cflock timeout="1"></cflock>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('lock');
        r.attributes.timeout.should.eql(1);
        should(r.attributes.name).be.undefined;
        r.attributes.throw_on_timeout.should.be.true;
        r.attributes.type.should.eql('exclusive');

        r = test.cfparser.parse('<cflock name="cflock" timeout="5" throw_on_timeout="no" type="readOnly">' +
        "\n</cflock>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('lock');
        rr.content.should.eql("\n");
        r.attributes.timeout.should.eql(5);
        r.attributes.name.should.eql('cflock');
        r.attributes.throw_on_timeout.should.be.false;
        r.attributes.type.should.eql('readOnly');

        r = test.cfparser.parse('<CFLOCK NAME="cflock2" TIMEOUT="6" THROW_ON_TIMEOUT="NO" TYPE="readOnly">' +
        "\nSome stuff here" + 
        "\n</CFLOCK>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('lock');
        rr.content.should.eql("\nSome stuff here\n");
        r.attributes.timeout.should.eql(6);
        r.attributes.name.should.eql('cflock2');
        r.attributes.throw_on_timeout.should.be.false;
        r.attributes.type.should.eql('readOnly');
    });
});
