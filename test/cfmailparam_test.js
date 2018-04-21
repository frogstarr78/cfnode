const test = require('./testlib'),
    should = require('should');

describe("Parsing a cfmailpart tag", function() {
    it('throws an error when missing a required attributes', function () {
        (function () { r = test.cfparser.parse('<cfmailparam>'); }).should.throw('Expected " ", "\\n", or "\\t" but ">" found.');
    })

    it('throws an error when both name and file attributes are defined', function () {
        (function () { r = test.cfparser.parse('<cfmailparam name="cfmail_name" file="/path/to/file" />'); }).should.throw("Unexpectedly defined name and file attributes.");
    })

    it('works as expected', function () {
        r = test.cfparser.parse('<cfmailparam name="cfmailparam_test">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('mailparam');
        r.attributes.name.should.eql('cfmailparam_test');
        r.attributes.disposition.should.eql('attachment');
        r.attributes.remove.should.be.false;

        r = test.cfparser.parse('<cfmailparam file="/path/to/file">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('mailparam');
        r.attributes.file.should.eql('/path/to/file');
        r.attributes.disposition.should.eql('attachment');
        r.attributes.remove.should.be.false;

        r = test.cfparser.parse('<cfmailparam name="cfmailparam_test2" disposition="inline" remove="yes" content="hello world" content_id="123abc" type="plain" value="val" />');
        r.should.be.instanceof(Object);
        r.tag.should.eql('mailparam');
        r.attributes.content_id.should.eql("123abc");
        r.attributes.disposition.should.eql("inline");
        r.attributes.name.should.eql("cfmailparam_test2");
        r.attributes.content.should.eql("hello world");
        r.attributes.remove.should.be.true;
        r.attributes.type.should.eql("plain");
        r.attributes.value.should.eql("val");

        r = test.cfparser.parse('<cfmailparam file="/tmp/path" disposition="inline" remove="yes" content="hello world" content_id="123abc" type="text" value="val" />');
        r.should.be.instanceof(Object);
        r.tag.should.eql('mailparam');
        r.attributes.content_id.should.eql("123abc");
        r.attributes.disposition.should.eql("inline");
        r.attributes.file.should.eql("/tmp/path");
        r.attributes.content.should.eql("hello world");
        r.attributes.remove.should.be.true;
        r.attributes.type.should.eql("text");
        r.attributes.value.should.eql("val");

        r = test.cfparser.parse('<CFMAILPARAM FILE="/tmp/path" DISPOSITION="inline" REMOVE="yes" CONTENT="hello world" CONTENT_ID="123abc" TYPE="html" VALUE="val" />');
        r.should.be.instanceof(Object);
        r.tag.should.eql('mailparam');
        r.attributes.content_id.should.eql("123abc");
        r.attributes.disposition.should.eql("inline");
        r.attributes.file.should.eql("/tmp/path");
        r.attributes.content.should.eql("hello world");
        r.attributes.remove.should.be.true;
        r.attributes.type.should.eql("html");
        r.attributes.value.should.eql("val");
    });
});
