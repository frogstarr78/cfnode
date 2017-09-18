const is = require('assert'), test = require('./testlib');

var r;

r = test.cfparser.parse('<cfdefaultcase>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'defaultcase');

r = test.cfparser.parse('<CFDEFAULTCASE>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'defaultcase');

test.ok();
