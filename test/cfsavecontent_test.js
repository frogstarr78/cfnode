const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cfsavecontent></cfsavecontent>');
}, Error);

r = test.cfparser.parse('<cfsavecontent variable="savecontent"></cfsavecontent>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'savecontent');
is.equal(r.attributes.variable, 'savecontent');
is.equal(r.content, '');

r = test.cfparser.parse('<cfsavecontent variable="savecontent">' +
"\n</cfsavecontent>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'savecontent');
is.equal(r.attributes.variable, "savecontent");
is.equal(r.content, "\n");

r = test.cfparser.parse('<CFSAVECONTENT' +
		' VARIABLE="savecontent">' +
"\nThis is the content that is saved #NOW()#" +
"\n</CFSAVECONTENT>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'savecontent');
is.equal(r.attributes.variable, 'savecontent');
is.equal(r.content, "\nThis is the content that is saved #NOW()#\n");

r = test.cfparser.parse('<cfsavecontent variable="savecontent">' +
"\nThis is the content that is saved #NOW()#" +
"\n</cfsavecontent>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'savecontent');
is.equal(r.attributes.variable, 'savecontent');
is.equal(r.content, "\nThis is the content that is saved #NOW()#\n");

test.ok();
