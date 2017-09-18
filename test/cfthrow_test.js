const is = require('assert'), test = require('./testlib');

var r;

r = test.cfparser.parse('<cfthrow>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'throw');
is.equal(r.content, '');

r = test.cfparser.parse('<CFTHROW>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'throw');
is.equal(r.content, '');
