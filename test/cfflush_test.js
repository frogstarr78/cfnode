const is = require('assert'), test = require('./testlib');

var r;

r = test.cfparser.parse('<cfflush>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'flush');

r = test.cfparser.parse('<cfflush interval="10">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'flush');
is.equal(r.attributes.interval, 10);

r = test.cfparser.parse('<CFFLUSH INTERVAL="10">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'flush');
is.equal(r.attributes.interval, 10);

test.ok();
