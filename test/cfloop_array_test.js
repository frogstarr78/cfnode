const should = require('should'), test = require('./testlib');

describe("Parser parsing a cfloop (using an array) tag", function () {
  describe("should error without", function () {
    it("any required attributes", function () {
    	(function () { test.cfparser.parse('<cfloop>') }).should.throw(/Expected " ", "\\n", or "\\t" but ">" found./);
    });
    
    it("any required attributes (even with a closing tag)", function () {
    	(function () { test.cfparser.parse('<cfloop></cfloop>') }).should.throw(/Expected " ", "\\n", or "\\t" but ">" found./);
    });
    
    it("an index required attribute", function () {
    	(function () { test.cfparser.parse('<cfloop array="#arry#"></cfloop>') }).should.throw('Missing required index attribute.');
    });
    
    it("an array required attribute", function () {
    	(function () { test.cfparser.parse('<cfloop index="count"></cfloop>') }).should.throw('Missing required array attribute.');
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
