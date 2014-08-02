var is = require('assert'),
	PEG= require('pegjs'),
	cf = require(__dirname + '/../cf'),
	testlib = require('./testlib');

var r;
r = cf.parse('<cfabort />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'abort');
is.equal(r.attributes.show_error, undefined);

r = cf.parse('<CFABORT>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'abort');
is.equal(r.attributes.show_error, undefined);

r = cf.parse('<cfabort showError="say something man">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'abort');
is.equal(r.attributes.show_error, 'say something man');


r = cf.parse('<CFABORT SHOWERROR="nothing to see here. move along." />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'abort');
is.equal(r.attributes.show_error, 'nothing to see here. move along.');

testlib.die("Success!", 0);
