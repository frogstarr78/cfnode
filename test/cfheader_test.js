const should = require('should'),
	    test = require('./testlib');

describe('Parsing the cfheader tag', function () {
	it('should thow an error when missing required attributes', function () {
		(function () { r = test.cfparser.parse('<cfheader charset="UTF-8" value="#value#" >'); }).should.throw('Missing one of required "name" or "status_code" attributes.');
	});

	it('should work as expected', function () {
		r = test.cfparser.parse('<cfheader name="cfheader_test" value="#value#">');
		r.should.be.instanceof(Object);
		r.tag.should.eql('header');
		r.attributes.charset.should.eql('UTF-8');
		r.attributes.name.should.eql('cfheader_test');
		r.attributes.value.should.eql('#value#');

		r = test.cfparser.parse('<cfheader statusCode="301" statusText="Temporary Redirect" />');
		r.should.be.instanceof(Object);
		r.tag.should.eql('header');
		r.attributes.status_code.should.eql(301);
		r.attributes.status_text.should.eql('Temporary Redirect');
		r.attributes.charset.should.eql('UTF-8');

		r = test.cfparser.parse('<CFHEADER NAME="cfheader_test2" VALUE="#value#" CHARSET="us-ascii" statusCode="303" statusText="A redirect"/>');
		r.should.be.instanceof(Object);
		r.tag.should.eql('header');
		r.attributes.name.should.eql('cfheader_test2');
		r.attributes.value.should.eql('#value#');
		r.attributes.charset.should.eql('us-ascii');
		r.attributes.status_code.should.eql(303);
		r.attributes.status_text.should.eql('A redirect');
	});
});
