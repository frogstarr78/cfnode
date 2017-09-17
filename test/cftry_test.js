const is = require('assert'), test = require('./testlib');

var r;

r = test.cfparser.parse('<cftry></cftry>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'try');
is.equal(r.content, '');

r = test.cfparser.parse('<cftry>' +
"\n</cftry>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'try');
is.equal(r.content, "\n");


r = test.cfparser.parse('<CFTRY>' +
" </CFTRY>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'try');
is.equal(r.content, ' ');

test.ok();
