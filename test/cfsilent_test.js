const is = require('assert'), test = require('./testlib');

var r;

r = test.cfparser.parse('<cfsilent></cfsilent>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'silent');
is.equal(r.content, '');

r = test.cfparser.parse('<cfsilent>' +
"\n</cfsilent>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'silent');
is.equal(r.content, "\n");


r = test.cfparser.parse('<CFSILENT>' +
" </CFSILENT>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'silent');
is.equal(r.content, ' ');

test.ok();
