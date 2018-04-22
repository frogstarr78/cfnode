const should = require('should'),
        test = require('./testlib');

describe('Parsing the cfivokeargument tag', function () {
    it('should thow an error when missing a required data_source attribute', function () {
        (function () { test.cfparser.parse('<cfinvokeargument name="cfinvarg">'); }).should.throw('Missing required "value" attribute.');
    });

    it('should thow an error when missing a required data_source attribute', function () {
        (function () { test.cfparser.parse('<cfinvokeargument value="cfinvarg">'); }).should.throw('Missing required "name" attribute.');
    });

    it('should work as expected', function () {
        r = test.cfparser.parse('<cfinvokeargument name="cfinvokeargument_test2" value="cfinvarg2" />');
        r.should.be.instanceof(Object);
        r.tag.should.eql('invokeargument');
        r.attributes.name.should.eql('cfinvokeargument_test2');
        r.attributes.value.should.eql('cfinvarg2');
        r.attributes.omit.should.eql(false);

        r = test.cfparser.parse('<cfinvokeargument name="cfinvokeargument_test3" value="cfinvarg3" omit="yes" />');
        r.should.be.instanceof(Object);
        r.tag.should.eql('invokeargument');
        r.attributes.name.should.eql('cfinvokeargument_test3');
        r.attributes.value.should.eql('cfinvarg3');
        r.attributes.omit.should.eql(true);

        r = test.cfparser.parse('<CFINVOKEARGUMENT OMIT="yes" NAME="cfinvokeargument_test4" VALUE="cfinvarg4" />');
        r.should.be.instanceof(Object);
        r.tag.should.eql('invokeargument');
        r.attributes.name.should.eql('cfinvokeargument_test4');
        r.attributes.value.should.eql('cfinvarg4');
        r.attributes.omit.should.eql(true);
    });
});
