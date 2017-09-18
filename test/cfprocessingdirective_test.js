const is = require('assert'), test = require('./testlib');

var r;

r = test.cfparser.parse('<cfprocessingdirective></cfprocessingdirective>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'processingdirective');
is.equal(r.content, '');

r = test.cfparser.parse('<cfprocessingdirective>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'processingdirective');
is.equal(r.content, '');

r = test.cfparser.parse('<cfprocessingdirective />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'processingdirective');
is.equal(r.content, '');

r = test.cfparser.parse('<cfprocessingdirective pageEncoding="utf-8">' +
"\n</cfprocessingdirective>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'processingdirective');
is.equal(r.attributes.page_encoding, "utf-8");
is.equal(r.attributes.suppress_whitespace, false);
is.equal(r.content, "\n");

r = test.cfparser.parse('<cfprocessingdirective pageEncoding="us-ascii" suppressWhitespace="yes">' +
"\nThis is the content that is saved #NOW()#" +
"\n</cfprocessingdirective>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'processingdirective');
is.equal(r.attributes.page_encoding, "us-ascii");
is.equal(r.attributes.suppress_whitespace, true);
is.equal(r.content, "\nThis is the content that is saved #NOW()#\n");

r = test.cfparser.parse('<CFPROCESSINGDIRECTIVE PAGEENCODING="us-ascii" SUPPRESSWHITESPACE="yes">' +
"\nThis is the content that is saved #NOW()#" +
"\n</CFPROCESSINGDIRECTIVE>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'processingdirective');
is.equal(r.attributes.page_encoding, "us-ascii");
is.equal(r.attributes.suppress_whitespace, true);
is.equal(r.content, "\nThis is the content that is saved #NOW()#\n");

r = test.cfparser.parse('<CFPROCESSINGDIRECTIVE PAGEENCODING="us-ascii" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'processingdirective');
is.equal(r.attributes.page_encoding, "us-ascii");
is.equal(r.attributes.suppress_whitespace, false);
is.equal(r.content, "");
