const should = require('should'), test = require('./testlib');

describe('Parsing the cfcomponent tag', function () {
    it('should behave as expected with no attributes defined', function () {
        r = test.cfparser.parse('<cfcomponent></cfcomponent>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('component');
        r.content.should.eql('');
        r.attributes.accessors.should.be.false;
        r.attributes.extends.should.eql('component');
        r.attributes.mapped_super_class.should.be.false;
        r.attributes.output.should.be.false;
        r.attributes.serializable.should.be.true;
        r.attributes.style.should.eql('rpc');
    });

    it('should behave as expected with an attributes defined', function () {
        r = test.cfparser.parse('<cfcomponent accessors="yes">Here</cfcomponent>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('component');
        r.content.should.eql('Here');
        r.attributes.accessors.should.be.true;
    });

    it('should behave as expected with a bunch of attributes defined', function () {
        r = test.cfparser.parse('<cfcomponent ' +
        'accessors="yes" ' +
        'alias="integer" ' +
        'binding_name="bound" ' +
        'display_name="cfcomponent_test2" ' +
        'extends="other_component" ' +
        'hint="Just a hint" ' +
        'implements="interface" ' +
        'mapped_super_class="true" ' +
        'namespace="cfcomponent_ns" ' +
        'output="yes" ' +
        'port_type_name="ptn" ' +
        'serializable="false" ' +
        'service_address="https://example.com/here" ' +
        'service_port_name="spn" ' +
        'style="document" ' +
        'wsdl_file="/tmp/file" ' +
        '></cfcomponent>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('component');
        r.content.should.eql('');
        r.attributes.accessors.should.be.true;
        r.attributes.alias.should.eql('integer');
        r.attributes.binding_name.should.eql('bound');
        r.attributes.display_name.should.eql('cfcomponent_test2');
        r.attributes.extends.should.eql('other_component');
        r.attributes.hint.should.eql('Just a hint');
        r.attributes.implements.should.eql('interface');
        r.attributes.mapped_super_class.should.be.true;
        r.attributes.namespace.should.eql('cfcomponent_ns');
        r.attributes.output.should.be.true;
        r.attributes.port_type_name.should.eql('ptn');
        r.attributes.serializable.should.be.false;
        r.attributes.service_address.should.eql("https://example.com/here");
        r.attributes.service_port_name.should.eql("spn");
        r.attributes.style.should.eql('document');
        r.attributes.wsdl_file.should.eql('/tmp/file');
    });

    it('should behave as expected with a bunch of attributes defined all in caps', function () {
        r = test.cfparser.parse('<CFCOMPONENT ' +
        'ACCESSORS="yes" ' +
        'ALIAS="integer" ' +
        'BINDINGNAME="bound" ' +
        'DISPLAYNAME="cfcomponent_test2" ' +
        'EXTENDS="other_component" ' +
        'HINT="Just a hint" ' +
        'IMPLEMENTS="interface" ' +
        'MAPPEDSUPERCLASS="true" ' +
        'NAMESPACE="cfcomponent_ns" ' +
        'OUTPUT="yes" ' +
        'PORTTYPENAME="ptn" ' +
        'SERIALIZABLE="false" ' +
        'SERVICEADDRESS="https://example.com/here" ' +
        'SERVICEPORTNAME="spn" ' +
        'STYLE="document" ' +
        'WSDLFILE="https://example.com/there" ' +
        '></CFCOMPONENT>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('component');
        r.content.should.eql('');
        r.attributes.accessors.should.be.true;
        r.attributes.alias.should.eql('integer');
        r.attributes.binding_name.should.eql('bound');
        r.attributes.display_name.should.eql('cfcomponent_test2');
        r.attributes.extends.should.eql('other_component');
        r.attributes.hint.should.eql('Just a hint');
        r.attributes.implements.should.eql('interface');
        r.attributes.mapped_super_class.should.be.true;
        r.attributes.namespace.should.eql('cfcomponent_ns');
        r.attributes.output.should.be.true;
        r.attributes.port_type_name.should.eql('ptn');
        r.attributes.serializable.should.be.false;
        r.attributes.service_address.should.eql("https://example.com/here");
        r.attributes.service_port_name.should.eql("spn");
        r.attributes.style.should.eql('document');
        r.attributes.wsdl_file.should.eql('https://example.com/there');
    });
});
