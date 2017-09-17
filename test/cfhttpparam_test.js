const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cfhttpparam name="cfhttpparam_test" value="cfhp_test_val" />');
}, Error, "Missing required type attribute.");

is.throws(function () {
	r = test.cfparser.parse('<cfhttpparam name="cfhttpparam_test" type="header" />');
}, Error, "Missing required value attribute.");

is.throws(function () {
	r = test.cfparser.parse('<cfhttpparam value="cfhttpparam_test" type="header" />');
}, Error, "Missing required name attribute.");

is.throws(function () {
r = test.cfparser.parse('<cfhttpparam name="cfhttpparam_test" type="file" />');
}, Error, "Missing required file attribute.");

r = test.cfparser.parse('<cfhttpparam type="xml" value="xml_val" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'httpparam');
is.equal(r.attributes.encoded, true);
is.equal(r.attributes.type, 'xml');
is.equal(r.attributes.value, 'xml_val');

r = test.cfparser.parse('<cfhttpparam type="body" value="body_val" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'httpparam');
is.equal(r.attributes.encoded, true);
is.equal(r.attributes.type, 'body');
is.equal(r.attributes.value, 'body_val');

r = test.cfparser.parse('<cfhttpparam name="cfhttpparam_test2" value="val" type="header" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'httpparam');
is.equal(r.attributes.name, 'cfhttpparam_test2');
is.equal(r.attributes.value, 'val');
is.equal(r.attributes.type, 'header');
is.equal(r.attributes.encoded, true);

r = test.cfparser.parse('<cfhttpparam name="cfhttpparam_test3" value="val" type="header" encoded="no" mime_type="text/html" file="/bogus/path" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'httpparam');
is.equal(r.attributes.encoded, false);
is.equal(r.attributes.file, '/bogus/path');
is.equal(r.attributes.mime_type, 'text/html');
is.equal(r.attributes.name, 'cfhttpparam_test3');
is.equal(r.attributes.type, 'header');
is.equal(r.attributes.value, 'val');

r = test.cfparser.parse('<CFHTTPPARAM ' +
'NAME="cfhttpparam_test4" ' +
'VALUE="val" ' +
'TYPE="header" ' +
'ENCODED="no" ' +
'MIMETYPE="text/html" ' +
'FILE="/bogus/path" ' +
'/>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'httpparam');
is.equal(r.attributes.encoded, false);
is.equal(r.attributes.file, '/bogus/path');
is.equal(r.attributes.mime_type, 'text/html');
is.equal(r.attributes.name, 'cfhttpparam_test4');
is.equal(r.attributes.type, 'header');
is.equal(r.attributes.value, 'val');
is.equal(r.attributes.type, 'header');
is.equal(r.attributes.encoded, false);

test.ok();
