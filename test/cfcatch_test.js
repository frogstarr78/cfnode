var is = require('assert'),
	PEG= require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;
r = cf.parse('<cfcatch></cfcatch>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'catch');
is.equal(r.content, '');

r = cf.parse('<CFCATCH></CFCATCH>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'catch');
is.equal(r.content, '');

r = cf.parse('<cfcatch type="database">something done</cfcatch>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'catch');
is.equal(r.attributes.type, 'database');
is.equal(r.content, 'something done');


r = cf.parse('<CFCATCH TYPE="database">' +
"\nsomething more done" +
"\n</cfcatch>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'catch');
is.equal(r.attributes.type, 'database');
is.equal(r.content, "\nsomething more done\n");

test.ok();
