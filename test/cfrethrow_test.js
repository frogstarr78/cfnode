const is = require('assert'), test = require('./testlib');

var r;

r = test.cfparser.parse('<cfrethrow>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'rethrow');
is.equal(r.content, '');

r = test.cfparser.parse('<CFRETHROW>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'rethrow');
is.equal(r.content, '');

test.ok();
