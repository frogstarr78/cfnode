const should = require('should'),
	    test = require('./testlib');

describe('Parsing the cfhttpparam tag', function () {
	it('should throw an error when missing the required "type" attribute', function () {
		(function () {
			test.cfparser.parse('<cfhttpparam name="cfhttpparam_test" value="cfhp_test_val" />');
		}).should.throw('Missing required "type" attribute.');
	});

	it('should throw an error when missing the required "value" attribute', function () {
		(function () {
			test.cfparser.parse('<cfhttpparam name="cfhttpparam_test" type="header" />');
		}).should.throw('Missing required "value" attribute.');
	});

	it('should throw an error when missing the required "name" attribute', function () {
		(function () {
			test.cfparser.parse('<cfhttpparam value="cfhttpparam_test" type="header" />');
		}).should.throw('Missing required "name" attribute.');
	});

	it('should throw an error when missing the required "name" attribute', function () {
		(function () {
			test.cfparser.parse('<cfhttpparam name="cfhttpparam_test" type="file" />');
		}).should.throw('Missing required "file" attribute.');
	});

	it('should work as expected', function () {
		r = test.cfparser.parse('<cfhttpparam type="xml" value="xml_val" />');
		r.should.be.instanceof(Object);
		r.tag.should.eql('httpparam');
		r.attributes.encoded.should.be.true;
		r.attributes.type.should.eql('xml');
		r.attributes.value.should.eql('xml_val');

		r = test.cfparser.parse('<cfhttpparam type="body" value="body_val" />');
		r.should.be.instanceof(Object);
		r.tag.should.eql('httpparam');
		r.attributes.encoded.should.be.true;
		r.attributes.type.should.eql('body');
		r.attributes.value.should.eql('body_val');

		r = test.cfparser.parse('<cfhttpparam name="cfhttpparam_test2" value="val" type="header" />');
		r.should.be.instanceof(Object);
		r.tag.should.eql('httpparam');
		r.attributes.name.should.eql('cfhttpparam_test2');
		r.attributes.value.should.eql('val');
		r.attributes.type.should.eql('header');
		r.attributes.encoded.should.be.true;

		r = test.cfparser.parse('<cfhttpparam name="cfhttpparam_test3" value="val" type="header" encoded="no" mime_type="text/html" file="/bogus/path" />');
		r.should.be.instanceof(Object);
		r.tag.should.eql('httpparam');
		r.attributes.encoded.should.be.false;
		r.attributes.file.should.eql('/bogus/path');
		r.attributes.mime_type.should.eql('text/html');
		r.attributes.name.should.eql('cfhttpparam_test3');
		r.attributes.type.should.eql('header');
		r.attributes.value.should.eql('val');

		r = test.cfparser.parse('<CFHTTPPARAM ' +
		'NAME="cfhttpparam_test4" ' +
		'VALUE="val" ' +
		'TYPE="header" ' +
		'ENCODED="no" ' +
		'MIMETYPE="text/html" ' +
		'FILE="/bogus/path" ' +
		'/>');
		r.should.be.instanceof(Object);
		r.tag.should.eql('httpparam');
		r.attributes.encoded.should.be.false;
		r.attributes.file.should.eql('/bogus/path');
		r.attributes.mime_type.should.eql('text/html');
		r.attributes.name.should.eql('cfhttpparam_test4');
		r.attributes.type.should.eql('header');
		r.attributes.value.should.eql('val');
		r.attributes.type.should.eql('header');
		r.attributes.encoded.should.be.false;
	});
});
