const should = require('should'),
	  test = require('./testlib');

describe("Parser should parse cfprocessingdirective tag", function () {
  it("should ceate a cftag object with no attributes and both an opening and closing tag", function () {
	r = test.cfparser.parse('<cfprocessingdirective></cfprocessingdirective>');
	r.should.be.instanceof(Object);
	r.tag.should.eql('processingdirective');
	r.content.should.eql('');
  });

  it("should ceate a cftag object with no attributes and both just an opening tag", function () {
	r = test.cfparser.parse('<cfprocessingdirective>');
	r.should.be.instanceof(Object);
	r.tag.should.eql('processingdirective');
	r.content.should.eql('');
  });

  it("should ceate a cftag object with no attributes and both just a closing tag", function () {
	r = test.cfparser.parse('<cfprocessingdirective />');
	r.should.be.instanceof(Object);
	r.tag.should.eql('processingdirective');
	r.content.should.eql('');
  });

  it("should ceate a cftag object with an attribute and empty content", function () {
	r = test.cfparser.parse('<cfprocessingdirective pageEncoding="utf-8">' +
	"\n</cfprocessingdirective>");
	r.should.be.instanceof(Object);
	r.tag.should.eql('processingdirective');
	r.attributes.page_encoding.should.eql("utf-8");
	r.attributes.suppress_whitespace.should.eql(false);
	r.content.should.eql("\n");
  });

  it("should ceate a cftag object with attributes and content", function () {
	r = test.cfparser.parse('<cfprocessingdirective pageEncoding="us-ascii" suppressWhitespace="yes">' +
	"\nThis is the content that is saved #NOW()#" +
	"\n</cfprocessingdirective>");
	r.should.be.instanceof(Object);
	r.tag.should.eql('processingdirective');
	r.attributes.page_encoding.should.eql("us-ascii");
	r.attributes.suppress_whitespace.should.eql(true);
	r.content.should.eql("\nThis is the content that is saved #NOW()#\n");
  });

  it("should ceate a cftag object with attributes and content (in all uppercase)", function () {
	r = test.cfparser.parse('<CFPROCESSINGDIRECTIVE PAGEENCODING="us-ascii" SUPPRESSWHITESPACE="yes">' +
	"\nThis is the content that is saved #NOW()#" +
	"\n</CFPROCESSINGDIRECTIVE>");
	r.should.be.instanceof(Object);
	r.tag.should.eql('processingdirective');
	r.attributes.page_encoding.should.eql("us-ascii");
	r.attributes.suppress_whitespace.should.eql(true);
	r.content.should.eql("\nThis is the content that is saved #NOW()#\n");
  });

  it("should ceate a cftag object with attributes and no content (in all uppercase)", function () {
	r = test.cfparser.parse('<CFPROCESSINGDIRECTIVE PAGEENCODING="us-ascii" />');
	r.should.be.instanceof(Object);
	r.tag.should.eql('processingdirective');
	r.attributes.page_encoding.should.eql("us-ascii");
	r.attributes.suppress_whitespace.should.eql(false);
	r.content.should.eql("");
  });
});
