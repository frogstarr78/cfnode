const is = require('assert'), test = require('./testlib');

var r;

r = test.cfparser.parse('<cfsetting>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'setting');

r = test.cfparser.parse('<cfsetting enableCFoutputOnly="0">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'setting');
is.equal(r.attributes.enable_cfoutput_only, false);

r = test.cfparser.parse('<cfsetting requestTimeOut="4">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'setting');
is.equal(r.attributes.request_timeout, 4);

r = test.cfparser.parse('<cfsetting' +
	' showDebugOutput="1"' +
	' requestTimeOut="1"' +
	' enableCFoutputOnly="0"' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'setting');
is.equal(r.attributes.request_timeout, 1);
is(r.attributes.show_debug_output);
is(!r.attributes.enable_cfoutput_only);

r = test.cfparser.parse('<CFSETTING' +
	' SHOWDEBUGOUTPUT="1"' +
	' REQUESTTIMEOUT="1"' +
	' ENABLECFOUTPUTONLY="0"' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'setting');
is.equal(r.attributes.request_timeout, 1);
is(r.attributes.show_debug_output);
is(!r.attributes.enable_cfoutput_only);

test.ok();
