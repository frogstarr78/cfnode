const is = require('assert'), test = require('./testlib');

var r;

r = test.cfparser.parse('<cfbreak>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'break');
is.equal(r.content, '');

r = test.cfparser.parse('<CFBREAK>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'break');
is.equal(r.content, '');

