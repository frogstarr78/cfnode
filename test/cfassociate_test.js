const should = require('should'), test = require('./testlib');

describe('Parsing the cfassociate tag', function () {
    it('should throw an error without a required base_tag', function () {
        (function () { test.cfparser.parse('<cfassociate data_collection="this">') }).should.throw('Missing required "base_tag" attribute.');
    });

//    it('should throw an error without a required base_tag', function () {
//        (function () { test.cfparser.parse('<cfassociate baseTag="cfnode test">'); }).should.throw('Invalid "base_tag" value.');
//    });

    it('should work as expected', function () {
        r = test.cfparser.parse('<cfassociate baseTag="cfnode_test">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('associate');
        r.attributes.base_tag.should.eql('cfnode_test');
        r.attributes.data_collection.should.eql('AssocAttribs');

        r = test.cfparser.parse('<cfassociate baseTag="cfnode_test" dataCollection="something">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('associate');
        r.attributes.base_tag.should.eql('cfnode_test');
        r.attributes.data_collection.should.eql('something');

        r = test.cfparser.parse('<cfassociate dataCollection="somethingelse" baseTag="cfnode_test">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('associate');
        r.attributes.base_tag.should.eql('cfnode_test');
        r.attributes.data_collection.should.eql('somethingelse');

        r = test.cfparser.parse('<CFASSOCIATE DATACOLLECTION="somethingelse" BASETAG="cfnode_test">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('associate');
        r.attributes.base_tag.should.eql('cfnode_test');
        r.attributes.data_collection.should.eql('somethingelse');
    });
});
