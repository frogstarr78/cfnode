const test = require('./testlib'),
    should = require('should');

describe("Parsing a cflogin tag ", function() {
    it('should thow an error when missing required name attribute', function () {
        (function () { test.cfparser.parse('<cflogin>'); }).should.throw('Expected "<" or any character but end of input found.');
    });

    it('should work as expected', function () {
        r = test.cfparser.parse('<cflogin ></cflogin>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('login');
        r.attributes.application_token.should.eql('CFAUTHORIZATION_');
        r.attributes.idle_timeout.should.eql(1800);

        r = test.cfparser.parse('<cflogin applicationToken="CFAUTHORIZATION_cflogin" cookie_domain=".example.com" idle_timeout="180">' +
        "\n</cflogin>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('login');
        r.content.should.eql("\n");
        r.attributes.application_token.should.eql('CFAUTHORIZATION_cflogin');
        r.attributes.idle_timeout.should.eql(180);
        r.attributes.cookie_domain.should.eql('.example.com');

        r = test.cfparser.parse('<CFLOGIN APPLICATIONTOKEN="CFAUTHORIZATION_cflogin" cookie_domain=".example.com" idle_timeout="180">' + 
        "\nSome stuff here" + 
        "\n</CFLOGIN>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('login');
        r.content.should.eql("\nSome stuff here\n");
        r.attributes.application_token.should.eql('CFAUTHORIZATION_cflogin');
        r.attributes.idle_timeout.should.eql(180);
        r.attributes.cookie_domain.should.eql('.example.com');
    });
});
