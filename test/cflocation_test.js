const test = require('./testlib'),
    should = require('should');

describe("Parsing a cflocation tag", function() {
    it('thows an error when missing a required url attribute', function () {
        (function () { test.cfparser.parse('<cflocation add_token="yes" >'); }).should.throw('Missing required "url" attribute.');
    });

    it('works as expected', function () {
        r = test.cfparser.parse('<cflocation url="/cflocation" />');
        r.should.be.instanceof(Object);
        r.tag.should.eql('location');
        r.attributes.url.should.eql('/cflocation');
        r.attributes.add_token.should.be.false;
        r.attributes.status_code.should.eql(301);

        r = test.cfparser.parse('<cflocation url="http://www.google.com?q=here" />');
        r.should.be.instanceof(Object);
        r.tag.should.eql('location');
        r.attributes.url.should.eql('http://www.google.com/?q=here');
        r.attributes.add_token.should.be.false;
        r.attributes.status_code.should.eql(301);

        r = test.cfparser.parse('<cflocation url="/cflocation test" addToken="yes" statusCode="302">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('location');
        r.attributes.url.should.eql('/cflocation%20test');
        r.attributes.add_token.should.be.true;
        r.attributes.status_code.should.eql(302);

        r = test.cfparser.parse('<CFLOCATION URL="/cflocation_test?q=a" ADDTOKEN="yes" STATUSCODE="303">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('location');
        r.attributes.url.should.eql('/cflocation_test?q=a');
        r.attributes.add_token.should.be.true;
        r.attributes.status_code.should.eql(303);
    })
})
