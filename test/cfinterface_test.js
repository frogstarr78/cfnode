const should = require('should'),
        test = require('./testlib');

describe('parsing a cfinterface tag', function () {
    it('should work even without attributes', function () {
        r = test.cfparser.parse('<cfinterface></cfinterface>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('interface');
        r.content.should.eql('');
        r.attributes.should.eql({});
    });

    it('should work even without attributes', function () {
        r = test.cfparser.parse('<cfinterface display_name="an_interface">Here</cfinterface>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('interface');
        r.content.should.eql('Here');
        r.attributes.display_name.should.eql('an_interface');
    });

    it('should work with attributes', function () {
        r = test.cfparser.parse('<cfinterface ' +
        'display_name="cfinterface_test2" ' +
        'extends="other_interface" ' +
        'hint="Just a hint" ' +
        '></cfinterface>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('interface');
        r.content.should.eql('');
        r.attributes.display_name.should.eql('cfinterface_test2');
        r.attributes.extends.should.eql('other_interface');
        r.attributes.hint.should.eql('Just a hint');
    });

    it('should work with all-caps attributes', function () {
        r = test.cfparser.parse('<CFINTERFACE ' +
        'DISPLAYNAME="cfinterface_test3" ' +
        'EXTENDS="other_interface,another_interface" ' +
        'HINT="Just a hint" ' +
        '></CFINTERFACE>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('interface');
        r.content.should.eql('');
        r.attributes.display_name.should.eql('cfinterface_test3');
	    r.attributes.extends.should.eql(['other_interface', 'another_interface']);
        r.attributes.hint.should.eql('Just a hint');
    });
});
