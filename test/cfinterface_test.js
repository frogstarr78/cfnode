const is = require('assert'), test = require('./testlib');

var r;

r = test.cfparser.parse('<cfinterface></cfinterface>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'interface');
is.equal(r.content, '');
is.deepEqual(r.attributes, {});

r = test.cfparser.parse('<cfinterface display_name="an_interface">Here</cfinterface>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'interface');
is.equal(r.content, 'Here');
is.equal(r.attributes.display_name, 'an_interface');

r = test.cfparser.parse('<cfinterface ' +
'display_name="cfinterface_test2" ' +
'extends="other_interface" ' +
'hint="Just a hint" ' +
'></cfinterface>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'interface');
is.equal(r.content, '');
is.equal(r.attributes.display_name, 'cfinterface_test2');
is.equal(r.attributes.extends, ['other_interface']);
is.equal(r.attributes.hint, 'Just a hint');

r = test.cfparser.parse('<CFINTERFACE ' +
'DISPLAYNAME="cfinterface_test3" ' +
'EXTENDS="other_interface,another_interface" ' +
'HINT="Just a hint" ' +
'></CFINTERFACE>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'interface');
is.equal(r.content, '');
is.equal(r.attributes.display_name, 'cfinterface_test3');
is.deepEqual(r.attributes.extends, ['other_interface', 'another_interface']);
is.equal(r.attributes.hint, 'Just a hint');

test.ok();
