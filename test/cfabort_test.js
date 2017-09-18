const is = require('assert'), test = require('./testlib');

var r;
r = test.cfparser.parse('<cfabort />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'abort');
is.equal(r.attributes.show_error, undefined);

r = test.cfparser.parse('<CFABORT>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'abort');
is.equal(r.attributes.show_error, undefined);

r = test.cfparser.parse('<cfabort showError="say something man">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'abort');
is.equal(r.attributes.show_error, 'say something man');


r = test.cfparser.parse('<CFABORT SHOWERROR="nothing to see here. move along." />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'abort');
is.equal(r.attributes.show_error, 'nothing to see here. move along.');

test.ok();
