const should = require('should'), test = require('./testlib');

describe('Parsing the cfcontent tag', function () {
    it('should behave as expected with no attributes defined', function () {
        r = test.cfparser.parse('<cfcontent>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('content');
        r.attributes.delete_file.should.eql(false);
        r.attributes.reset.should.eql(true);
    });

    it('should behave as expected with an attribute defined', function () {
        r = test.cfparser.parse('<cfcontent deleteFile="yes">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('content');
        r.attributes.delete_file.should.eql(true);
        r.attributes.reset.should.eql(true);
    });

    it('should behave as expected with a bunch of attributes defined', function () {
        r = test.cfparser.parse('<cfcontent deleteFile="yes" file="/path/to/file" reset="no" type="utf-8" variable="cfcontent_var" />');
        r.should.be.instanceof(Object);
        r.tag.should.eql('content');
        r.attributes.delete_file.should.eql(true);
        r.attributes.file.should.eql('/path/to/file');
        r.attributes.reset.should.eql(false);
        r.attributes.type.should.eql('utf-8');
        r.attributes.variable.should.eql('cfcontent_var');
    });

    it('should behave as expected with a bunch of attributes defined all in caps', function () {
        r = test.cfparser.parse('<CFCONTENT DELETEFILE="yes" FILE="/path/to/file" RESET="no" TYPE="utf-8" VARIABLE="cfcontent_var2" />');
        r.should.be.instanceof(Object);
        r.tag.should.eql('content');
        r.attributes.delete_file.should.eql(true);
        r.attributes.file.should.eql('/path/to/file');
        r.attributes.reset.should.eql(false);
        r.attributes.type.should.eql('utf-8');
        r.attributes.variable.should.eql('cfcontent_var2');
    });
});
