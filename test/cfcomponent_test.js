const is = require('assert'), test = require('./testlib');

var r;

r = test.cfparser.parse('<cfcomponent></cfcomponent>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'component');
is.equal(r.content, '');
is.equal(r.attributes.accessors, false);
is.equal(r.attributes.extends, 'component');
is.equal(r.attributes.mapped_super_class, false);
is.equal(r.attributes.output, false);
is.equal(r.attributes.serializable, true);
is.equal(r.attributes.style, 'rpc');

r = test.cfparser.parse('<cfcomponent accessors="yes">Here</cfcomponent>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'component');
is.equal(r.content, 'Here');
is.equal(r.attributes.accessors, true);

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
is.equal(r instanceof Object, true);
is.equal(r.tag, 'component');
is.equal(r.content, '');
is.equal(r.attributes.accessors, true);
is.equal(r.attributes.alias, 'integer');
is.equal(r.attributes.binding_name, 'bound');
is.equal(r.attributes.display_name, 'cfcomponent_test2');
is.equal(r.attributes.extends, 'other_component');
is.equal(r.attributes.hint, 'Just a hint');
is.equal(r.attributes.implements, 'interface');
is.equal(r.attributes.mapped_super_class, true);
is.equal(r.attributes.namespace, 'cfcomponent_ns');
is.equal(r.attributes.output, true);
is.equal(r.attributes.port_type_name, 'ptn');
is.equal(r.attributes.serializable, false);
is.equal(r.attributes.service_address, "https://example.com/here");
is.equal(r.attributes.service_port_name, "spn");
is.equal(r.attributes.style, 'document');
is.equal(r.attributes.wsdl_file, '/tmp/file');

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
is.equal(r instanceof Object, true);
is.equal(r.tag, 'component');
is.equal(r.content, '');
is.equal(r.attributes.accessors, true);
is.equal(r.attributes.alias, 'integer');
is.equal(r.attributes.binding_name, 'bound');
is.equal(r.attributes.display_name, 'cfcomponent_test2');
is.equal(r.attributes.extends, 'other_component');
is.equal(r.attributes.hint, 'Just a hint');
is.equal(r.attributes.implements, 'interface');
is.equal(r.attributes.mapped_super_class, true);
is.equal(r.attributes.namespace, 'cfcomponent_ns');
is.equal(r.attributes.output, true);
is.equal(r.attributes.port_type_name, 'ptn');
is.equal(r.attributes.serializable, false);
is.equal(r.attributes.service_address, "https://example.com/here");
is.equal(r.attributes.service_port_name, "spn");
is.equal(r.attributes.style, 'document');
is.equal(r.attributes.wsdl_file, 'https://example.com/there');

