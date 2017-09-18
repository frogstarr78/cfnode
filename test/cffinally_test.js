const is = require('assert'), test = require('./testlib');

var r;

r = test.cfparser.parse('<cffinally ></cffinally>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'finally');
is.equal(r.content, '');

r = test.cfparser.parse('<CFFINALLY></CFFINALLY>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'finally');
is.equal(r.content, '');

r = test.cfparser.parse('<CFFINALLY>' +
"\n</CFFINALLY>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'finally');
is.equal(r.content, "\n");

r = test.cfparser.parse('<CFFINALLY>' +
"\nBetter stuff here\n</CFFINALLY>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'finally');
is.equal(r.content, "\nBetter stuff here\n");

