const is = require('assert'), test = require('./testlib');

var r;


is.throws(function () {
	r = test.cfparser.parse('<cfmailpart></cfmailpart>');
}, Error, "Missing required attributes.");

r = test.cfparser.parse('<cfmailpart type="text"></cfmailpart>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'mailpart');
is.equal(r.attributes.type, 'text');
is.equal(r.attributes.wrap_text, 80);

r = test.cfparser.parse('<cfmailpart ' +
'type="text" ' + 
'charset="us-ascii" ' +
'wraptext="30">' +
"\nStuff" +
'</cfmailpart>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'mailpart');
is.equal(r.content, "\nStuff");
is.equal(r.attributes.type, 'text');
is.equal(r.attributes.charset, 'us-ascii');
is.equal(r.attributes.wrap_text, 30);

r = test.cfparser.parse('<CFMAILPART ' +
'TYPE="text" ' + 
'CHARSET="us-ascii" ' +
'WRAPTEXT="30">' +
"\nStuff" +
'</CFMAILPART>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'mailpart');
is.equal(r.content, "\nStuff");
is.equal(r.attributes.type, 'text');
is.equal(r.attributes.charset, 'us-ascii');
is.equal(r.attributes.wrap_text, 30);
