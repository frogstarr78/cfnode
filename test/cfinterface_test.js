var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

r = cf.parse('<cfinterface></cfinterface>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'interface');
is.equal(r.content, '');
is.deepEqual(r.attributes, {});

r = cf.parse('<cfinterface display_name="an_interface">Here</cfinterface>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'interface');
is.equal(r.content, 'Here');
is.equal(r.attributes.display_name, 'an_interface');

r = cf.parse('<cfinterface ' +
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

r = cf.parse('<CFINTERFACE ' +
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
