const should = require('should'),
	  test = require('./testlib');

describe("Parser should parse cfstoredproc tag", function () {
	it('should error without required "procedure" attribute value', function () {
		(function () { r = test.cfparser.parse('<cfstoredproc datasource="cfstoredproc_dsn">'); }).should.throw('Missing required "procedure" attribute.');
	});

	it('should error with an empty "procedure" attribute value', function () {
		(function () { r = test.cfparser.parse('<cfstoredproc procedure="" datasource="cfspdsn" >'); }).should.throw('Empty "procedure" attribute.');
	});

	it('should error without required "datasource" attribute value', function () {
		(function () { r = test.cfparser.parse('<cfstoredproc procedure="cfstoredproc_proc">'); }).should.throw('Missing required "datasource" attribute.');
	});

	it('should error with empty "datasource" attribute value', function () {
		(function () { r = test.cfparser.parse('<cfstoredproc datasource="" procedure="cfstoredproc_proc">'); }).should.throw('Empty "datasource" attribute.');
	});

	it('should work as expected with minimal attributes defined', function () {
		r = test.cfparser.parse('<cfstoredproc dataSource="cfstoredproc_dsn2" procedure="cfstoredproc_proc2">');
		r.should.be.instanceof(Object);
		r.tag.should.eql('storedproc');
		r.attributes.datasource.should.eql('cfstoredproc_dsn2');
		r.attributes.procedure.should.eql('cfstoredproc_proc2');
		r.attributes.block_factor.should.eql(1);
		r.attributes.debug.should.be.false;
		r.attributes.return_code.should.be.false;
	});

	it('should work as expected with multiple attributes defined', function () {
		r = test.cfparser.parse('<cfstoredproc blockFactor="3" datasource="dsn3" debug="1" procedure="tbl3" returnCode="no" />');
		r.should.be.instanceof(Object);
		r.tag.should.eql('storedproc');
		r.attributes.block_factor.should.eql(3);
		r.attributes.datasource.should.eql('dsn3');
		r.attributes.debug.should.be.true;
		r.attributes.procedure.should.eql('tbl3');
		r.attributes.return_code.should.be.false;
	});

	it('should work as expected with many more attributes defined', function () {
		r = test.cfparser.parse('<cfstoredproc blockFactor="5" debug="yes" procedure="tbl4" datasource="dsn4" result="this" password="mypass3" username="noone_else" cachedAfter="2014-08-09" cachedWithin="#CreateTimeSpan(1, 2, 3, 4)#"  returnCode="no" />');
		r.should.be.instanceof(Object);
		r.tag.should.eql('storedproc');
		r.attributes.block_factor.should.eql(5);
		r.attributes.debug.should.be.true;
		r.attributes.datasource.should.eql('dsn4');
		r.attributes.procedure.should.eql('tbl4');
		r.attributes.result.should.eql('this');
		r.attributes.password.should.eql("mypass3");
		r.attributes.username.should.eql("noone_else");
		r.attributes.cached_after.should.be.instanceof(Date);
		r.attributes.cached_within.should.be.instanceof(Date);
		r.attributes.return_code.should.be.false;
	});

	it('should work as expected with many more attributes defined (all in caps)', function () {
		r = test.cfparser.parse('<CFSTOREDPROC BLOCKFACTOR="5" DEBUG="yes" PROCEDURE="tbl4" DATASOURCE="dsn4" RESULT="this" PASSWORD="mypass3" USERNAME="noone_else" CACHEDAFTER="2014-08-09" CACHEDWITHIN="#CreateTimeSpan(5, 6, 7, 8)#" RETURNCODE="no" />');
		r.should.be.instanceof(Object);
		r.tag.should.eql('storedproc');
		r.attributes.block_factor.should.eql(5);
		r.attributes.debug.should.be.true;
		r.attributes.datasource.should.eql('dsn4');
		r.attributes.procedure.should.eql('tbl4');
		r.attributes.result.should.eql('this');
		r.attributes.password.should.eql("mypass3");
		r.attributes.username.should.eql("noone_else");
		r.attributes.cached_after.should.be.instanceof(Date);
		r.attributes.cached_within.should.be.instanceof(Date);
		r.attributes.return_code.should.be.false;
	});
});
