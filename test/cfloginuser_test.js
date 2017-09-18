const should = require('should'),
        test = require('./testlib');

var r;

describe("Parser should parse cfloginuser tag", function () {
  describe("should error without...", function () {
    it("...any required attributes", function () {
      test.cfparser.parse('<cfloginuser>').should.throw("Missing required attributes");
    });

    it("...a required roles attribute", function () {
      test.cfparser.parse('<cfloginuser name="who" password="pass">').throw("Missing required roles attributes");
    });

    it("...a required name attribute", function () {
      test.cfparser.parse('<cfloginuser roles="a,b" password="pass3">').throw("Missing required name attribute");
    });

    it("...a required password attribute", function () {
      test.cfparser.parse('<cfloginuser name="who3" roles="a2,b2">').throw("Missing required password attributes");
    });
  });



  describe("just fine with appropriate tags", function () {
    it("should do what we'd expect", function () {
      r = test.cfparser.parse('<cfloginuser name="who4" password="pass4" roles="n,p,r">');
      r.should.be.instanceof(Object);
      r.tag.should.equal('loginuser');
      r.attributes.name.should.equal('who4');
      r.attributes.password.should.equal('pass4');
      r.attributes.roles.should.deepEqual(['n', 'p', 'r']);
    });
  });

  describe("just fine with appropriate tags in a different order", function () {
    it("should do what we'd expect", function () {
      r = test.cfparser.parse('<cfloginuser name="who5" roles="n,r,p" password="pass5" />');
      r.should.be.instanceof(Object);
      r.tag.should.equal('loginuser');
      r.attributes.name.should.equal('who5');
      r.attributes.password.should.equal('pass5');
      r.attributes.roles.should.deepEqual(['n', 'r', 'p']);
    });
  });

  describe("just fine with appropriate tags in a different order", function () {
    it("should do what we'd expect", function () {
      r = test.cfparser.parse('<cfloginuser password="pass6" roles="p,r,n" name="who6"/>');
      r.should.be.instanceof(Object);
      r.tag.should.equal('loginuser');
      r.attributes.name.should.equal('who6');
      r.attributes.password.should.equal('pass6');
      r.attributes.roles.should.deepEqual(['p', 'r', 'n']);
    });
  });

  describe("just fine with appropriate tags in a different order and all caps tag and attributes", function () {
    it("should do what we'd expect", function () {
      r = test.cfparser.parse('<CFLOGINUSER ROLES="a3,b3" PASSWORD="pass10" NAME="who10">');
      r.should.be.instanceof(Object);
      r.tag.should.equal('loginuser');
      r.attributes.name.should.equal('who10');
      r.attributes.password.should.equal('pass10');
      r.attributes.roles.should.deepEqual(['a3', 'b3']);
    });
  });
});
