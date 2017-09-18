const is = require('assert'), test = require('./testlib');

var r;


is.throws(function () {
	r = test.cfparser.parse('<cfmailparam>');
}, Error, "Missing required attributes.");

is.throws(function () {
	r = test.cfparser.parse('<cfmailparam name="cfmail_name" file="/path/to/file" />');
}, Error, "Unexpectedly defined name and file attributes.");

r = test.cfparser.parse('<cfmailparam name="cfmailparam_test">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'mailparam');
is.equal(r.attributes.name, 'cfmailparam_test');
is.equal(r.attributes.disposition, 'attachment');
is.equal(r.attributes.remove, false);

r = test.cfparser.parse('<cfmailparam file="/path/to/file">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'mailparam');
is.equal(r.attributes.file, '/path/to/file');
is.equal(r.attributes.disposition, 'attachment');
is.equal(r.attributes.remove, false);

r = test.cfparser.parse('<cfmailparam name="cfmailparam_test2" disposition="inline" remove="yes" content="hello world" content_id="123abc" type="plain" value="val" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'mailparam');
is.equal(r.attributes.content_id, "123abc");
is.equal(r.attributes.disposition, "inline");
is.equal(r.attributes.name, "cfmailparam_test2");
is.equal(r.attributes.content, "hello world");
is.equal(r.attributes.remove, true);
is.equal(r.attributes.type, "plain");
is.equal(r.attributes.value, "val");

r = test.cfparser.parse('<cfmailparam file="/tmp/path" disposition="inline" remove="yes" content="hello world" content_id="123abc" type="text" value="val" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'mailparam');
is.equal(r.attributes.content_id, "123abc");
is.equal(r.attributes.disposition, "inline");
is.equal(r.attributes.file, "/tmp/path");
is.equal(r.attributes.content, "hello world");
is.equal(r.attributes.remove, true);
is.equal(r.attributes.type, "text");
is.equal(r.attributes.value, "val");

r = test.cfparser.parse('<CFMAILPARAM FILE="/tmp/path" DISPOSITION="inline" REMOVE="yes" CONTENT="hello world" CONTENT_ID="123abc" TYPE="html" VALUE="val" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'mailparam');
is.equal(r.attributes.content_id, "123abc");
is.equal(r.attributes.disposition, "inline");
is.equal(r.attributes.file, "/tmp/path");
is.equal(r.attributes.content, "hello world");
is.equal(r.attributes.remove, true);
is.equal(r.attributes.type, "html");
is.equal(r.attributes.value, "val");
