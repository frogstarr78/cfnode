const is = require('assert'), test = require('./testlib');

var r;
r = test.cfparser.parse('<cfcatch ></cfcatch>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'catch');
is.equal(r.content, '');

r = test.cfparser.parse('<CFCATCH></CFCATCH>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'catch');
is.equal(r.content, '');

r = test.cfparser.parse('<cfcatch type="database">something done</cfcatch>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'catch');
is.equal(r.attributes.type, 'database');
is.equal(r.content, 'something done');


r = test.cfparser.parse('<CFCATCH TYPE="database">' +
"\nsomething more done" +
"\n</cfcatch>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'catch');
is.equal(r.attributes.type, 'database');
is.equal(r.content, "\nsomething more done\n");

test.ok();
