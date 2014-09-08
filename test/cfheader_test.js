var is = require('assert'),
	PEG= require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;
is.throws(function () {
	r = cf.parse('<cfheader>');
}, Error, "Missing required name or statusCode attribute.");

is.throws(function () {
	r = cf.parse('<cfheader charset="iso-8859-1">');
}, Error, "Missing required name or statusCode attribute.");

r = cf.parse('<cfheader name="cfheader_test" value="#value#">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'header');
is.equal(r.attributes.charset, 'UTF-8');
is.equal(r.attributes.name, 'cfheader_test');
is.equal(r.attributes.value, '#value#');

r = cf.parse('<cfheader statusCode="301" statusText="Temporary Redirect" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'header');
is.equal(r.attributes.status_code, '301');
is.equal(r.attributes.status_text, 'Temporary Redirect');
is.equal(r.attributes.charset, 'UTF-8');

r = cf.parse('<CFHEADER NAME="cfheader_test2" VALUE="#value#" CHARSET="us-ascii" statusCode="303" statusText="A redirect"/>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'header');
is.equal(r.attributes.name, 'cfheader_test2');
is.equal(r.attributes.value, '#value#');
is.equal(r.attributes.charset, 'us-ascii');
is.equal(r.attributes.status_code, '303');
is.equal(r.attributes.status_text, 'A redirect');

test.ok();
