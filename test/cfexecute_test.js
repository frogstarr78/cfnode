var is = require('assert'),
	PEG= require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cfexecute >');
}, Error, "Missing required name attribute and closing tag.");

is.throws(function () {
	r = cf.parse('<cfexecute ></cfexecute>');
}, Error, "Missing required name attribute.");

is.throws(function () {
	r = cf.parse('<cfexecute name="" >');
}, Error, "Empty name attribute value and closing tag.");

is.throws(function () {
	r = cf.parse('<cfexecute name="" ></cfexecute>');
}, Error, "Empty name attribute value.");

r = cf.parse("<cfexecute name='execute'></cfexecute>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'execute');
is.equal(r.content, '');
is.equal(r.attributes.name, 'execute');
is.equal(r.attributes.timeout, 0);

r = cf.parse("<cfexecute name='execute2' arguments='-v' outputFile='/tmp/outfile' timeout='10' variable='execute_out'>" +
"</cfexecute>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'execute');
is.equal(r.content, '');
is.equal(r.attributes.name, 'execute2');
is.equal(r.attributes.arguments, '-v');
is.equal(r.attributes.output_file, '/tmp/outfile');
is.equal(r.attributes.timeout, 10);
is.equal(r.attributes.variable, 'execute_out');

r = cf.parse("<CFEXECUTE NAME='execute3' ARGUMENTS='-v' OUTPUTFILE='/tmp/outfile' TIMEOUT='11' VARIABLE='execute_out'>" +
"\nSomething, althought I don't know why this is not an empty tag." +
"\nWhat could you possibly add here that would be useful." +
"</CFEXECUTE>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'execute');
is.equal(r.content, "\nSomething, althought I don't know why this is not an empty tag." +
"\nWhat could you possibly add here that would be useful.")
is.equal(r.attributes.name, 'execute3');
is.equal(r.attributes.arguments, '-v');
is.equal(r.attributes.output_file, '/tmp/outfile');
is.equal(r.attributes.timeout, 11);
is.equal(r.attributes.variable, 'execute_out');

test.ok();
