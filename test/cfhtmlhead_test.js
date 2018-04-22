const should = require('should'),
	    test = require('./testlib');

describe('Parsing the cfhtmlhead tag', function () {
	it('should thow an error when missing a required text attribute', function () {
		(function () { test.cfparser.parse('<cfhtmlhead>'); }).should.throw('Expected " ", "\\n", or "\\t" but ">" found.');
	});

	it('should work as expected', function () {
		r = test.cfparser.parse('<cfhtmlhead text="cfhtmlhead test">');
		r.should.be.instanceof(Object);
		r.tag.should.eql('htmlhead');
		r.attributes.text.should.eql('cfhtmlhead test');

		r = test.cfparser.parse('<cfhtmlhead text="#chr(13)##chr(10)#" />');
		r.should.be.instanceof(Object);
		r.tag.should.eql('htmlhead');
		r.attributes.text.should.eql("#chr(13)##chr(10)#");

		r = test.cfparser.parse('<CFHTMLHEAD TEXT="cfhtmlhead test">');
		r.should.be.instanceof(Object);
		r.tag.should.eql('htmlhead');
		r.attributes.text.should.eql('cfhtmlhead test');

		r = test.cfparser.parse("<cfhtmlhead text=\"<link href='/blog/custom/img/favicon.ico' rel='shortcut icon' type='image/x-icon'>#chr(13)##chr(10)#\" />");
		r.should.be.instanceof(Object);
		r.tag.should.eql('htmlhead');
		r.attributes.text.should.eql("<link href='/blog/custom/img/favicon.ico' rel='shortcut icon' type='image/x-icon'>#chr(13)##chr(10)#");
	});
});
