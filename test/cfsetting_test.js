const test = require('./testlib'),
    should = require('should');

describe("Parsing a cfsetting tag", function() {
    it('works as expected', function () {
        r = test.cfparser.parse('<cfsetting>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('setting');

        r = test.cfparser.parse('<cfsetting enableCFoutputOnly="0">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('setting');
        r.attributes.enable_cfoutput_only.should.be.false;

        r = test.cfparser.parse('<cfsetting requestTimeOut="4">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('setting');
        r.attributes.request_timeout.should.eql(4);

        r = test.cfparser.parse('<cfsetting' +
            ' showDebugOutput="1"' +
            ' requestTimeOut="1"' +
            ' enableCFoutputOnly="0"' +
        '>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('setting');
        r.attributes.request_timeout.should.eql(1);
        r.attributes.show_debug_output.should.be.true;
        r.attributes.enable_cfoutput_only.should.be.false;

        r = test.cfparser.parse('<CFSETTING' +
            ' SHOWDEBUGOUTPUT="1"' +
            ' REQUESTTIMEOUT="1"' +
            ' ENABLECFOUTPUTONLY="0"' +
        '>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('setting');
        r.attributes.request_timeout.should.eql(1);
        r.attributes.show_debug_output.should.be.true;
        r.attributes.enable_cfoutput_only.should.be.false;
    });
});
