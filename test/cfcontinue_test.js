const is = require('assert'), test = require('./testlib');

var r;

r = test.cfparser.parse('<cfcontinue>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'continue');
is.equal(r.content, '');

r = test.cfparser.parse('<CFCONTINUE>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'continue');
is.equal(r.content, '');

test.ok();
