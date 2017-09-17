const is = require('assert'), test = require('./testlib');

var r;

r = test.cfparser.parse('<cflogout>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'logout');
is.equal(r.content, '');

r = test.cfparser.parse('<CFLOGOUT>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'logout');
is.equal(r.content, '');

test.ok();
