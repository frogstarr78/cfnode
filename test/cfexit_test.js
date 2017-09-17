const is = require('assert'), test = require('./testlib');

var r;

r = test.cfparser.parse('<cfexit>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'exit');
is.equal(r.attributes.method, 'exitTag');

r = test.cfparser.parse('<cfexit/>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'exit');
is.equal(r.attributes.method, 'exitTag');

r = test.cfparser.parse('<cfexit method="loop" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'exit');
is.equal(r.attributes.method, 'loop');

r = test.cfparser.parse('<cfexit method="exitTag">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'exit');
is.equal(r.attributes.method, 'exitTag');

r = test.cfparser.parse('<CFEXIT METHOD="exitTemplate">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'exit');
is.equal(r.attributes.method, 'exitTemplate');

test.ok();
