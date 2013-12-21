var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	testlib = require('./testlib');

var r;

r = cf.parse('<cfsetting>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'setting');

r = cf.parse('<cfsetting enableCFoutputOnly="0">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'setting');
is.equal(r.attributes.enable_cfoutput_only, false);

r = cf.parse('<cfsetting requestTimeOut="4">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'setting');
is.equal(r.attributes.request_timeout, 4);

r = cf.parse('<cfsetting' +
	' showDebugOutput="1"' +
	' requestTimeOut="1"' +
	' enableCFoutputOnly="0"' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'setting');
is.equal(r.attributes.request_timeout, 1);
is(r.attributes.show_debug_output);
is(!r.attributes.enable_cfoutput_only);

r = cf.parse('<CFSETTING' +
	' SHOWDEBUGOUTPUT="1"' +
	' REQUESTTIMEOUT="1"' +
	' ENABLECFOUTPUTONLY="0"' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'setting');
is.equal(r.attributes.request_timeout, 1);
is(r.attributes.show_debug_output);
is(!r.attributes.enable_cfoutput_only);

testlib.die("Success!", 0);
