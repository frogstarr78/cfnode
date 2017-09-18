const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
  r = test.cfparser.parse('<cffeed action="read" name="cffeed_read">');
}, Error, 'Missing required source attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cffeed action="read" source="cffeed_read_source">');
}, Error, 'Missing required one of name, properties, query, output_file, or xml_var attribute.');

r = test.cfparser.parse('<cffeed source="http://localhost" action="read" query="#query1#" properties="#meta1#" output_file="/path/to/output1" xml_var="feed_xml_var" name="cffeed1">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action, 'read');
is.equal(r.attributes.escape_chars, false);
is.equal(r.attributes.ignore_enclosure_error, false);
is.equal(r.attributes.name, 'cffeed1');
is.equal(r.attributes.output_file, '/path/to/output1');
is.equal(r.attributes.overwrite, false);
is.equal(r.attributes.overwrite_enclosure, false);
is.equal(r.attributes.properties, '#meta1#');
is.equal(r.attributes.proxy_port, 80);
is.equal(r.attributes.query, '#query1#');
is.equal(r.attributes.source, 'http://localhost/');
is.equal(r.attributes.xml_var, 'feed_xml_var');

r = test.cfparser.parse('<cffeed ' +
'action="read" ' +
'columnMap="#map1#" ' +
'enclosureDir="." ' +
'escapeChars="yes" ' +
'ignoreEnclosureError="yes" ' +
'name="cffeed2" ' +
'outputFile="/path/to/output3" ' +
'overwrite="yes" ' +
'overwriteEnclosure="yes" ' +
'properties="#meta2#" ' +
'proxyPassword="password" ' +
'proxyPort="90" ' +
'proxyServer="localhost" ' +
'proxyUser="me" ' +
'query="#query2#" ' +
'source="ftp://localhost" ' +
'timeout="10" ' +
'userAgent="CFNode" ' +
'xmlVar="feed_xml" ' +
' />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action,"read");
is.equal(r.attributes.column_map,"#map1#");
is.equal(r.attributes.enclosure_dir,".");
is.equal(r.attributes.escape_chars, true);
is.equal(r.attributes.ignore_enclosure_error, true);
is.equal(r.attributes.name,"cffeed2");
is.equal(r.attributes.output_file,"/path/to/output3");
is.equal(r.attributes.overwrite, true);
is.equal(r.attributes.overwrite_enclosure, true);
is.equal(r.attributes.properties,"#meta2#");
is.equal(r.attributes.proxy_password,"password");
is.equal(r.attributes.proxy_port,"90");
is.equal(r.attributes.proxy_server,"localhost");
is.equal(r.attributes.proxy_user,"me");
is.equal(r.attributes.query,"#query2#");
is.equal(r.attributes.source,"ftp://localhost/");
is.equal(r.attributes.timeout,"10");
is.equal(r.attributes.user_agent,"CFNode");
is.equal(r.attributes.xml_var,"feed_xml");

r = test.cfparser.parse('<CFFEED ' +
'IGNOREENCLOSUREERROR="yes" ' +
'OVERWRITEENCLOSURE="yes" ' +
'ESCAPECHARS="yes" ' +
'PROPERTIES="#meta3#" ' +
'OVERWRITE="yes" ' +
'COLUMNMAP="#map2#" ' +
'PROXYPORT="90" ' +
'QUERY="#query2#" ' +
'PROXYPASSWORD="password" ' +
'NAME="cffeed3" ' +
'OUTPUTFILE="/path/to/output4" ' +
'ACTION="read" ' +
'SOURCE="rss://localhost" ' +
'TIMEOUT="10" ' +
'ENCLOSUREDIR="." ' +
'PROXYUSER="me" ' +
'XMLVAR="feed_xml" ' +
'USERAGENT="CFNode" ' +
'PROXYSERVER="localhost" ' +
' />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'feed');
is.equal(r.attributes.action,"read");
is.equal(r.attributes.column_map,"#map2#");
is.equal(r.attributes.enclosure_dir,".");
is.equal(r.attributes.escape_chars, true);
is.equal(r.attributes.ignore_enclosure_error, true);
is.equal(r.attributes.name,"cffeed3");
is.equal(r.attributes.output_file,"/path/to/output4");
is.equal(r.attributes.overwrite, true);
is.equal(r.attributes.overwrite_enclosure, true);
is.equal(r.attributes.properties,"#meta3#");
is.equal(r.attributes.proxy_password,"password");
is.equal(r.attributes.proxy_port,"90");
is.equal(r.attributes.proxy_server,"localhost");
is.equal(r.attributes.proxy_user,"me");
is.equal(r.attributes.query,"#query2#");
is.equal(r.attributes.source,"rss://localhost");
is.equal(r.attributes.timeout,"10");
is.equal(r.attributes.user_agent,"CFNode");
is.equal(r.attributes.xml_var,"feed_xml");

