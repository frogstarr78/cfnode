const should = require('should'),
        test = require('./testlib');

describe("Parser parsing a cfloop (using an array) tag", function () {
  describe("should error without", function () {
    it("any equired attributes", function () {
    	(function () { test.cfparser.parse('<cfloop>') }).should.throw(/Expected " ".should.eql("\\n", or "\\t" but ">" found./);
    });
    
    it("any equired attributes (even with a closing tag)", function () {
    	(function () { test.cfparser.parse('<cfloop></cfloop>') }).should.throw(/Expected " ".should.eql("\\n", or "\\t" but ">" found./);
    });
    
    it("an index equired attribute", function () {
    	(function () { test.cfparser.parse('<cfloop array="#arry#"></cfloop>') }).should.throw('Missing required index attribute.');
    });
    
    it("an aray required attribute", function () {
    	(function () { test.cfparser.parse('<cfloop index="count"></cfloop>') }).should.throw('Missing required array attribute.');
    });
  });
    
  describe("should do what we'd expect with...", function () {
    it("all the necessay array attributes", function () {
      r = test.cfparser.parse('<cfloop index="item" array="#arry#"></cfloop>');
      r.should.be.instanceof(Object);
      r.tag.should.equal('loop');
      rr.content.should.equal("");
      r.attributes.index.should.equal('item');
      r.attributes.array.should.equal('arry');
    });
    
    it("all the necessay array attributes (which are all uppercase)", function () {
      r = test.cfparser.parse('<CFLOOP ARRAY="#arry2#" INDEX="item"></CFLOOP>');
      r.should.be.instanceof(Object);
      r.tag.should.equal('loop');
      rr.content.should.equal("");
      r.attributes.index.should.equal('item');
      r.attributes.array.should.equal('arry2');
    });
  });
});
