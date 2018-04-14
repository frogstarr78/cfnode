const should = require('should'), test = require('./testlib');

describe('Parser parsing the cffeed tag', function () {
    describe('with the create action', function () {
        it('should throw an error when missing a required name attribute', function () {
            (function () { r = test.cfparser.parse('<cffeed output_file="/path/to/output" xml_var="feed_xml_var">'); })
                .should.throw('Missing required "name" attribute.');
        });

        it('should throw an error when missing a required name attribute regardless the order of other attributes', function () {
            (function () { r = test.cfparser.parse('<cffeed action="create" output_file="/path/to/output" xml_var="feed_xml_var">'); })
                .should.throw('Missing required "name" attribute.');
        });

        it('should throw an error when missing a output_file attribute regardless the order of other attributes', function () {
            (function () { r = test.cfparser.parse('<cffeed name="cffeed">'); })
                .should.throw('Missing one of required "output_file" or "xml_var" attributes.');
        });

        it('should behave as expected with few defined attributes', function () {
            r = test.cfparser.parse('<cffeed name="cffeed1" output_file="/path/to/output1">');
            r.should.be.instanceof(Object);
            r.tag.should.eql('feed');
            r.attributes.action.should.eql('create');
            r.attributes.name.should.eql('cffeed1');
            r.attributes.output_file.should.eql('/path/to/output1');
        });

        it('should behave as expected with some other defined attributes', function () {
            r = test.cfparser.parse('<cffeed action="create" name="cffeed2" output_file="/path/to/output2">');
            r.should.be.instanceof(Object);
            r.tag.should.eql('feed');
            r.attributes.action.should.eql('create');
            r.attributes.name.should.eql('cffeed2');
            r.attributes.output_file.should.eql('/path/to/output2');
        });

        it('should behave as expected with some other defined attributes', function () {
            r = test.cfparser.parse('<cffeed action="create" name="cffeed3" xml_var="feed_xml_var1">');
            r.should.be.instanceof(Object);
            r.tag.should.eql('feed');
            r.attributes.action.should.eql('create');
            r.attributes.name.should.eql('cffeed3');
            r.attributes.xml_var.should.eql('feed_xml_var1');
        });

        it('should behave as expected with more defined attributes', function () {
            r = test.cfparser.parse('<cffeed action="create" name="cffeed4" output_file="/path/to/output3" xml_var="feed_xml_var2">');
            r.should.be.instanceof(Object);
            r.tag.should.eql('feed');
            r.attributes.action.should.eql('create');
            r.attributes.escape_chars.should.be.false;
            r.attributes.name.should.eql('cffeed4');
            r.attributes.output_file.should.eql('/path/to/output3');
            r.attributes.overwrite.should.be.false;
            r.attributes.xml_var.should.eql('feed_xml_var2');
        });

        it('should behave as expected with lots of defined attributes', function () {
            r = test.cfparser.parse('<cffeed action="create" name="cffeed5" output_file="/path/to/output4" xml_var="feed_xml_var3" overwrite="yes" escapeChars="true">');
            r.should.be.instanceof(Object);
            r.tag.should.eql('feed');
            r.attributes.action.should.eql('create');
            r.attributes.escape_chars.should.be.true;
            r.attributes.name.should.eql('cffeed5');
            r.attributes.output_file.should.eql('/path/to/output4');
            r.attributes.overwrite.should.be.true;
            r.attributes.xml_var.should.eql('feed_xml_var3');
        });

        it('should behave as expected with lots of defined attributes specified in all caps', function () {
            r = test.cfparser.parse('<CFFEED ' +
            'XMLVAR="feed_xml_var4" ' +
            'OVERWRITE="1" ' +
            'OUTPUTFILE="/path/to/output5" ' +
            'ESCAPECHARS="1" ' +
            'NAME="cffeed6" '+
            '>');
            r.attributes.action.should.eql('create');
            r.attributes.escape_chars.should.be.true;
            r.attributes.name.should.eql('cffeed6');
            r.attributes.output_file.should.eql('/path/to/output5');
            r.attributes.overwrite.should.be.true;
            r.attributes.xml_var.should.eql('feed_xml_var4');
        });
    });

    describe('with the query action', function () {
        it('should throw an error when the required query attribute is missing', function () {
            (function () { r = test.cfparser.parse('<cffeed properties="#meta#" output_file="/path/to/output" xml_var="feed_xml_var">'); })
                .should.throw('Missing required "query" attribute.');
        });

        it('should throw an error when the required properties attribute is missing', function () {
            (function () { r = test.cfparser.parse('<cffeed action="create" query="#get_data#" output_file="/path/to/output" xml_var="feed_xml_var">'); })
                .should.throw('Missing required "properties" attribute.');
        });

        it('should throw an error when the required output_file attribute is missing', function () {
            (function () { r = test.cfparser.parse('<cffeed action="create" query="#get_data#" properties="#meta#" xml_var="feed_val" >'); })
                .should.throw('Missing required "output_file" attribute.');
        });

        it('should throw an error when the required xml_var attribute is missing', function () {
            (function () { r = test.cfparser.parse('<cffeed action="create" query="#get_data#" properties="#meta#" output_file="/path/to/output_file/" >'); })
                .should.throw('Missing required "xml_var" attribute.');
        });

        it('should work as exected with minimal attributes defined', function () {
            r = test.cfparser.parse('<cffeed query="#query1#" properties="#meta1#" output_file="/path/to/output1">');
            r.should.be.instanceof(Object);
            r.tag.should.eql('feed');
            r.attributes.action.should.eql('create');
            r.attributes.escape_chars.should.be.false;
            r.attributes.output_file.should.eql('/path/to/output1');
            r.attributes.ignore_enclosure_error.should.be.false;
            r.attributes.overwrite.should.be.false;
            r.attributes.properties.should.eql('#meta1#');
            r.attributes.query.should.eql('#query1#');
        });

        it('should work as exected with minimal attributes defined', function () {
            r = test.cfparser.parse('<cffeed query="#query2#" properties="#meta2#" xml_var="var1">');
            r.should.be.instanceof(Object);
            r.tag.should.eql('feed');
            r.attributes.action.should.eql('create');
            r.attributes.properties.should.eql('#meta2#');
            r.attributes.query.should.eql('#query2#');
            r.attributes.overwrite.should.be.false;
            r.attributes.xml_var.should.eql('var1');
        });

        it('should work as exected with some other attributes defined', function () {
            r = test.cfparser.parse('<cffeed query="#query3#" properties="#meta3#" output_file="/path/to/output2" xml_var="var2">');
            r.should.be.instanceof(Object);
            r.tag.should.eql('feed');
            r.attributes.action.should.eql('create');
            r.attributes.properties.should.eql('#meta3#');
            r.attributes.query.should.eql('#query3#');
            r.attributes.output_file.should.eql('/path/to/output2');
            r.attributes.overwrite.should.be.false;
            r.attributes.xml_var.should.eql('var2');
        });

        it('should work as exected with many attributes defined', function () {
            r = test.cfparser.parse('<cffeed action="create" query="#query4#" properties="#meta4#" column_map="#map1#" output_file="/path/to/output3" overwrite="true">');
            r.should.be.instanceof(Object);
            r.tag.should.eql('feed');
            r.attributes.action.should.eql('create');
            r.attributes.column_map.should.eql('#map1#');
            r.attributes.properties.should.eql('#meta4#');
            r.attributes.query.should.eql('#query4#');
            r.attributes.output_file.should.eql('/path/to/output3');
            r.attributes.overwrite.should.be.true;
        });

        it('should work as exected with some attributes defined all in caps', function () {
            r = test.cfparser.parse('<CFFEED ' +
            'XMLVAR="feed_xml_var3" ' +
            'OVERWRITE="1" ' +
            'QUERY="#query5#" ' +
            'COLUMNMAP="#map2#" ' +
            'OUTPUTFILE="/path/to/output4" ' +
            'PROPERTIES="#meta5#" '+
            '>');
            r.should.be.instanceof(Object);
            r.tag.should.eql('feed');
            r.attributes.action.should.eql('create');
            r.attributes.column_map.should.eql('#map2#');
            r.attributes.properties.should.eql('#meta5#');
            r.attributes.query.should.eql('#query5#');
            r.attributes.output_file.should.eql('/path/to/output4');
            r.attributes.overwrite.should.be.true;
            r.attributes.xml_var.should.eql('feed_xml_var3');
        });
    });
    describe('with the query action', function () {
        it('should throw an error when missing the required source attribute', function () {
            (function () { r = test.cfparser.parse('<cffeed action="read" name="cffeed_read">'); })
                .should.throw('Missing required "source" attribute.');
        });

        it('should throw an error when missing the required source attribute', function () {
            (function () { r = test.cfparser.parse('<cffeed action="read" source="cffeed_read_source">'); })
                .should.throw('Missing required one of name, properties, query, output_file, or xml_var attribute.');
        });

        it('should work as expected with few attributes defined', function () {
            r = test.cfparser.parse('<cffeed source="http://localhost" action="read" query="#query1#" properties="#meta1#" output_file="/path/to/output1" xml_var="feed_xml_var" name="cffeed1">');
            r.should.be.instanceof(Object);
            r.tag.should.eql('feed');
            r.attributes.action.should.eql('read');
            r.attributes.escape_chars.should.be.false;
            r.attributes.ignore_enclosure_error.should.be.false;
            r.attributes.name.should.eql('cffeed1');
            r.attributes.output_file.should.eql('/path/to/output1');
            r.attributes.overwrite.should.be.false;
            r.attributes.overwrite_enclosure.should.be.false;
            r.attributes.properties.should.eql('#meta1#');
            r.attributes.proxy_port.should.eql(80);
            r.attributes.query.should.eql('#query1#');
            r.attributes.source.should.eql('http://localhost/');
            r.attributes.xml_var.should.eql('feed_xml_var');
        });

        it('should work as expected with many attributes defined', function () {
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
            r.should.be.instanceof(Object);
            r.tag.should.eql('feed');
            r.attributes.action.should.eql("read");
            r.attributes.column_map.should.eql("#map1#");
            r.attributes.enclosure_dir.should.eql(".");
            r.attributes.escape_chars.should.be.true;
            r.attributes.ignore_enclosure_error.should.be.true;
            r.attributes.name.should.eql('cffeed2');
            r.attributes.output_file.should.eql("/path/to/output3");
            r.attributes.overwrite.should.be.true;
            r.attributes.overwrite_enclosure.should.be.true;
            r.attributes.properties.should.eql("#meta2#");
            r.attributes.proxy_password.should.eql("password");
            r.attributes.proxy_port.should.eql(90);
            r.attributes.proxy_server.should.eql("localhost");
            r.attributes.proxy_user.should.eql("me");
            r.attributes.query.should.eql("#query2#");
            r.attributes.source.should.eql("ftp://localhost/");
            r.attributes.timeout.should.eql(10);
            r.attributes.user_agent.should.eql("CFNode");
            r.attributes.xml_var.should.eql("feed_xml");
        });

        it('should work as expected with many attributes defined all in caps', function () {
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
            r.should.be.instanceof(Object);
            r.tag.should.eql('feed');
            r.attributes.action.should.eql("read");
            r.attributes.column_map.should.eql("#map2#");
            r.attributes.enclosure_dir.should.eql(".");
            r.attributes.escape_chars.should.be.true;
            r.attributes.ignore_enclosure_error.should.be.true;
            r.attributes.name.should.eql("cffeed3");
            r.attributes.output_file.should.eql("/path/to/output4");
            r.attributes.overwrite.should.be.true;
            r.attributes.overwrite_enclosure.should.be.true;
            r.attributes.properties.should.eql("#meta3#");
            r.attributes.proxy_password.should.eql("password");
            r.attributes.proxy_port.should.eql(90);
            r.attributes.proxy_server.should.eql("localhost");
            r.attributes.proxy_user.should.eql("me");
            r.attributes.query.should.eql("#query2#");
            r.attributes.source.should.eql("rss://localhost");
            r.attributes.timeout.should.eql(10);
            r.attributes.user_agent.should.eql("CFNode");
            r.attributes.xml_var.should.eql("feed_xml");
        });
    });
});
