const should = require('assert'), test = require('./testlib');

describe("Parser parsing a cfloop (using an array) tag", function () {
  describe("should error without...", function () {
    it("...any required attributes", function () {
    	test.cfparser.parse('<cfloop>').throws('Missing required closing tag');
    });
    
    it("...any required attributes (even with a closing tag)", function () {
    	test.cfparser.parse('<cfloop></cfloop>').throws('Missing required attributes.');
    });
    
    it("...an index required attribute", function () {
    	test.cfparser.parse('<cfloop array="#arry#"></cfloop>').throws('Missing required index attribute.');
    });
    
    it("...an array required attribute", function () {
    	test.cfparser.parse('<cfloop index="count"></cfloop>').throws('Missing required array attribute.');
    });
  });
    
  describe("should do what we'd expect with...", function () {
    it("all the necessary array attributes", function () {
      r = test.cfparser.parse('<cfloop index="item" array="#arry#"></cfloop>');
      r.should.be.instanceof(Object);
      r.tag.should.equal('loop');
      r.content.should.equal("");
      r.attributes.index.should.equal('item');
      r.attributes.array.should.equal('arry');
    });
    
    it("all the necessary array attributes (which are all uppercase)", function () {
      r = test.cfparser.parse('<CFLOOP ARRAY="#arry2#" INDEX="item"></CFLOOP>');
      r.should.be.instanceof(Object);
      r.tag.should.equal('loop');
      r.content.should.equal("");
      r.attributes.index.should.equal('item');
      r.attributes.array.should.equal('arry2');
    });
  });
});
