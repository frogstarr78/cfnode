const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cffeed properties="#meta#" output_file="/path/to/output" xml_var="feed_xml_var">');
}, Error, 'Missing required query attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cffeed action="create" query="#get_data#" output_file="/path/to/output" xml_var="feed_xml_var">');
}, Error, 'Missing required properties attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cffeed action="create" query="#get_data#" properties="#meta#" >');
}, Error, 'Missing required output_file or xml_var attribute.');

r = test.cfparser.parse('<cffeed query="#query1#" properties="#meta1#" output_file="/path/to/output1">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action, 'create');
is.equal(r.attributes.escape_chars, false);
is.equal(r.attributes.output_file, '/path/to/output1');
is.equal(r.attributes.ignore_enclosure_error, false);
is.equal(r.attributes.overwrite, false);
is.equal(r.attributes.properties, '#meta1#');
is.equal(r.attributes.query, '#query1#');

r = test.cfparser.parse('<cffeed query="#query2#" properties="#meta2#" xml_var="var1">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action, 'create');
is.equal(r.attributes.properties, '#meta2#');
is.equal(r.attributes.query, '#query2#');
is.equal(r.attributes.overwrite, false);
is.equal(r.attributes.xml_var, 'var1');

r = test.cfparser.parse('<cffeed query="#query3#" properties="#meta3#" output_file="/path/to/output2" xml_var="var2">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action, 'create');
is.equal(r.attributes.properties, '#meta3#');
is.equal(r.attributes.query, '#query3#');
is.equal(r.attributes.output_file, '/path/to/output2');
is.equal(r.attributes.overwrite, false);
is.equal(r.attributes.xml_var, 'var2');

r = test.cfparser.parse('<cffeed action="create" query="#query4#" properties="#meta4#" column_map="#map1#" output_file="/path/to/output3" overwrite="true">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action, 'create');
is.equal(r.attributes.column_map, '#map1#');
is.equal(r.attributes.properties, '#meta4#');
is.equal(r.attributes.query, '#query4#');
is.equal(r.attributes.output_file, '/path/to/output3');
is.equal(r.attributes.overwrite, true);

r = test.cfparser.parse('<CFFEED ' +
'XMLVAR="feed_xml_var3" ' +
'OVERWRITE="1" ' +
'QUERY="#query5#" ' +
'COLUMNMAP="#map2#" ' +
'OUTPUTFILE="/path/to/output4" ' +
'PROPERTIES="#meta5#" '+
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action, 'create');
is.equal(r.attributes.column_map, '#map2#');
is.equal(r.attributes.properties, '#meta5#');
is.equal(r.attributes.query, '#query5#');
is.equal(r.attributes.output_file, '/path/to/output4');
is.equal(r.attributes.overwrite, true);
is.equal(r.attributes.xml_var, 'feed_xml_var3');

