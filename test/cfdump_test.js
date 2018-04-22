const should = require('should'),
        test = require('./testlib');

describe('Parsing the cfdump tag', function () {
	it('should thow an error when missing a required var attribute', function () {
		(function () { test.cfparser.parse('<cfdump showUDFs="true">'); }).should.throw('Missing required var attribute.');
	});

	it('should thow an error when the var attribute is invalid', function () {
		(function () { test.cfparser.parse('<cfdump var="cfnode_test">'); }).should.throw('Expected "#" but "c" found.');
	});

	it('should work as expected with minimal attributes specified', function () {
		r = test.cfparser.parse('<cfdump var="#cfnode_test#">');
		r.should.be.instanceof(Object);
		r.tag.should.eql('dump');
		r.attributes.var.should.eql('cfnode_test');
	});

	it('should work as expected with some additional attributes specified', function () {
		r = test.cfparser.parse('<cfdump output="console" var="#something#">');
		r.should.be.instanceof(Object);
		r.tag.should.eql('dump');
		r.attributes.var.should.eql('something');
		r.attributes.output.should.eql('console');
	});

	it('should work as expected with still more attributes specified', function () {
		r = test.cfparser.parse('<cfdump label="somethingelse" hide="password" show="username,email" var="#query#" expand="true">');
		r.should.be.instanceof(Object);
		r.tag.should.eql('dump');
		r.attributes.label.should.eql('somethingelse');
		r.attributes.hide.should.eql('password');
		r.attributes.show.should.eql(['username', 'email']);
		r.attributes.var.should.eql('query');
		r.attributes.expand.should.be.true;
	});

  it('should work as expected with many attributes specified all in', function () {
    r = test.cfparser.parse('<cfdump' +
        ' abort="true"' +
        ' keys="4"' +
        ' metainfo="no"' +
        ' top="10"' +
        ' var="#var#"' +
          ' expand="1"' +
          ' format="text"' +
          ' hide="password"' +
          ' label="lbl"' +
          ' output="browser"' +
          ' show="name,address,email,username"' +
          ' showUDFs="yes"' +
    '>');
    r.should.be.instanceof(Object);
    r.tag.should.eql('dump');
    r.attributes.abort.should.be.true;
    r.attributes.expand.should.be.true;
    r.attributes.format.should.eql("text");
    r.attributes.hide.should.eql("password");
    r.attributes.keys.should.eql(4);
    r.attributes.label.should.eql("lbl");
    r.attributes.metainfo.should.be.false;
    r.attributes.output.should.eql("browser");
	r.attributes.show.should.eql(['name', 'address', 'email', 'username']);
    r.attributes.show_udfs.should.be.true;
    r.attributes.top.should.eql(10);
    r.attributes.var.should.eql("var");
  });

  it('should work as expected with many attributes specified all in caps', function () {
    r = test.cfparser.parse('<cfdump' +
        ' ABORT="true"' +
        ' KEYS="4"' +
        ' METAINFO="no"' +
        ' TOP="10"' +
        ' VAR="#var#"' +
          ' EXPAND="1"' +
          ' FORMAT="text"' +
          ' HIDE="password"' +
          ' LABEL="lbl"' +
          ' OUTPUT="browser"' +
          ' SHOW="name,address,email,username"' +
          ' SHOWUDFS="yes"' +
    '>');
    r.should.be.instanceof(Object);
    r.tag.should.eql('dump');
    r.attributes.abort.should.be.true;
    r.attributes.expand.should.be.true;
    r.attributes.format.should.eql("text");
    r.attributes.hide.should.eql("password");
    r.attributes.keys.should.eql(4);
    r.attributes.label.should.eql("lbl");
    r.attributes.metainfo.should.be.false;
    r.attributes.output.should.eql("browser");
	r.attributes.show.should.eql(['name', 'address', 'email', 'username']);
    r.attributes.show_udfs.should.be.true;
    r.attributes.top.should.eql(10);
    r.attributes.var.should.eql("var");
  });
});
