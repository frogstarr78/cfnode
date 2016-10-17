var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cffeed action="create" name="#astruct#" outputFile="/tmp/cffile.out" >');
}, Error, 'Missing required xml_var attribute.');

is.throws(function () {
	r = cf.parse('<cffeed action="create" output_file="/tmp/cffile.out" xmlVar="feed" />');
}, Error, 'Missing required name attribute.');

is.throws(function () {
	r = cf.parse('<cffeed action="create" name="#astruct#" xmlVar="feed" />');
}, Error, 'Missing required output_file attribute.');

r = cf.parse('<cffeed action="create" name="#astruct#" xmlVar="feed" output_file="/tmp/cffile.out" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action, 'create');
is.equal(r.attributes.escape_chars, false);
is.equal(r.attributes.ignore_enclosure_error, false);
is.equal(r.attributes.name, '#astruct#');
is.equal(r.attributes.output_file, '/tmp/cffile.out');
is.equal(r.attributes.overwrite, false);
is.equal(r.attributes.overwrite_enclosure, false);
is.equal(r.attributes.proxy_port, 80);
is.equal(r.attributes.timeout, 60);
is.equal(r.attributes.user_agent, 'cfNode ColdFusion');
is.equal(r.attributes.xml_var, 'feed');

r = cf.parse('<cffeed ' +
'output_file="/tmp/cffile2.out" ' +
'name="#astruct2#" ' +
'xmlVar="feed2" ' +
'escape_chars="yes" ' +
'overwrite="true" ' +
'action="create" ' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action, 'create');
is.equal(r.attributes.name, '#astruct2#');
is.equal(r.attributes.output_file, '/tmp/cffile2.out');
is.equal(r.attributes.overwrite, true);
is.equal(r.attributes.xml_var, 'feed2');
is.equal(r.attributes.escape_chars, true);

r = cf.parse('<CFFEED ' +
'OUTPUTFILE="/tmp/cffile3.out" ' +
'NAME="#astruct3#" ' +
'XMLVAR="feed3" ' +
'ESCAPECHARS="yes" ' +
'OVERWRITE="1" ' +
'ACTION="create" ' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action, 'create');
is.equal(r.attributes.name, '#astruct3#');
is.equal(r.attributes.output_file, '/tmp/cffile3.out');
is.equal(r.attributes.overwrite, true);
is.equal(r.attributes.xml_var, 'feed3');
is.equal(r.attributes.escape_chars, true);

r = cf.parse('<cffeed ' +
'output_file="/tmp/cffile2.out" ' +
'name="#astruct2#" ' +
'xmlVar="feed2" ' +
'xmlVar="feed4" ' +
'action="read" ' +
'overwrite="false" ' +
'escape_chars="false" ' +
'output_file="/tmp/cffile4.out" ' +
'escape_chars="yes" ' +
'name="#astruct4#" ' +
'overwrite="true" ' +
'action="create" ' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action, 'create');
is.equal(r.attributes.name, '#astruct4#');
is.equal(r.attributes.output_file, '/tmp/cffile4.out');
is.equal(r.attributes.overwrite, true);
is.equal(r.attributes.xml_var, 'feed4');
is.equal(r.attributes.escape_chars, true);

test.ok();
