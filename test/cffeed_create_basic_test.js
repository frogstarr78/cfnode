const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cffeed output_file="/path/to/output" xml_var="feed_xml_var">');
}, Error, 'Missing required name attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cffeed action="create" output_file="/path/to/output" xml_var="feed_xml_var">');
}, Error, 'Missing required name attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cffeed name="cffeed">');
}, Error, 'Missing required output_file or xml_var attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cffeed action="create" name="cffeed">');
}, Error, 'Missing required output_file or xml_var attribute.');

r = test.cfparser.parse('<cffeed name="cffeed1" output_file="/path/to/output1">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action, 'create');
is.equal(r.attributes.name, 'cffeed1');
is.equal(r.attributes.output_file, '/path/to/output1');

r = test.cfparser.parse('<cffeed action="create" name="cffeed2" output_file="/path/to/output2">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action, 'create');
is.equal(r.attributes.name, 'cffeed2');
is.equal(r.attributes.output_file, '/path/to/output2');

r = test.cfparser.parse('<cffeed action="create" name="cffeed3" xml_var="feed_xml_var1">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action, 'create');
is.equal(r.attributes.name, 'cffeed3');
is.equal(r.attributes.xml_var, 'feed_xml_var1');

r = test.cfparser.parse('<cffeed action="create" name="cffeed4" output_file="/path/to/output3" xml_var="feed_xml_var2">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action, 'create');
is.equal(r.attributes.escape_chars, false);
is.equal(r.attributes.name, 'cffeed4');
is.equal(r.attributes.output_file, '/path/to/output3');
is.equal(r.attributes.overwrite, false);
is.equal(r.attributes.xml_var, 'feed_xml_var2');

r = test.cfparser.parse('<cffeed action="create" name="cffeed5" output_file="/path/to/output4" xml_var="feed_xml_var3" overwrite="yes" escapeChars="true">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action, 'create');
is.equal(r.attributes.escape_chars, true);
is.equal(r.attributes.name, 'cffeed5');
is.equal(r.attributes.output_file, '/path/to/output4');
is.equal(r.attributes.overwrite, true);
is.equal(r.attributes.xml_var, 'feed_xml_var3');

r = test.cfparser.parse('<CFFEED ' +
'XMLVAR="feed_xml_var4" ' +
'OVERWRITE="1" ' +
'OUTPUTFILE="/path/to/output5" ' +
'ESCAPECHARS="1" ' +
'NAME="cffeed6" '+
'>');
is.equal(r.attributes.action, 'create');
is.equal(r.attributes.escape_chars, true);
is.equal(r.attributes.name, 'cffeed6');
is.equal(r.attributes.output_file, '/path/to/output5');
is.equal(r.attributes.overwrite, true);
is.equal(r.attributes.xml_var, 'feed_xml_var4');

test.ok();
