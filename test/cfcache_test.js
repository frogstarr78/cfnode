const should = require('should'),
        test = require('./testlib');

describe('Parsing a cfcache tag', function () {
    it('thows an error with no attributes defined', function() {
        (function () { r = test.cfparser.parse('<cfcache>'); }).should.throw('');
    });

    it('thows an error without a name attribute defined with get action', function() {
        (function () { r = test.cfparser.parse('<cfcache action="get" id="get1"></cfcache>'); }).should.throw('Missing required "name" attribute.');
    });

    it('thows an error without a valid name attribute defined with get action', function() {
        (function () { r = test.cfparser.parse('<cfcache action="get" id="get2" name=""></cfcache>'); }).should.throw('Missing required "name" attribute.');
    });

    it('thows an error without an id attribute defined with get action', function() {
        (function () { r = test.cfparser.parse('<cfcache action="get" name="get3"></cfcache>'); }).should.throw('Missing required "id" attribute.');
    });

    it('thows an error without a valid id attribute defined with get action', function() {
        (function () { r = test.cfparser.parse('<cfcache action="get" name="get4" id=""></cfcache>'); }).should.throw('Missing required "id" attribute.');
    });

    it('thows an error without a value attribute defined with put action', function() {
        (function () { r = test.cfparser.parse('<cfcache action="put" id="put1"></cfcache>'); }).should.throw('Missing required "value" attribute.');
    });

    it('thows an error without a valid value attribute defined with put action', function() {
        (function () { r = test.cfparser.parse('<cfcache action="put" id="put2" value=""></cfcache>'); }).should.throw('Missing required "value" attribute.');
    });

    it('thows an error without an id attribute defined with put action', function() {
        (function () { r = test.cfparser.parse('<cfcache action="put" value="#put3#"></cfcache>'); }).should.throw('Missing required "id" attribute.');
    });

    it('thows an error without a valid id attribute defined with put action', function() {
        (function () { r = test.cfparser.parse('<cfcache action="put" id="" value="put4"></cfcache>'); }).should.throw('Missing required "id" attribute.');
    });

    it('thows an error without a id attribute defined with flush action', function() {
        (function () { r = test.cfparser.parse('<cfcache action="flush"></cfcache>'); }).should.throw('Missing required "id" attribute.');
    });

    it('thows an error without a valid id attribute defined with flush action', function() {
        (function () { r = test.cfparser.parse('<cfcache action="flush" id=""></cfcache>'); }).should.throw('Missing required "id" attribute.');
    });

    it('should work as expected when setting few attributes', function () {
        r = test.cfparser.parse('<cfcache >' +
        "Pointless test\n" +
        '</cfcache>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('cache');
        r.content.should.eql("Pointless test\n");
        r.attributes.action.should.eql('serverCache');
        r.attributes.disk_persistent.should.eql(false);
        r.attributes.strip_whitespace.should.eql(false);
        r.attributes.throw_on_error.should.eql(false);
        r.attributes.use_cache.should.eql(true);
        r.attributes.use_query_string.should.eql(false);
        r.attributes.overflow_to_disk.should.eql(false);
    });

    it('should work as expected when setting a bunch of attributes', function () {
        r = test.cfparser.parse('<cfcache ' +
        'action="cache" ' +
        'dependsOn="variables.abc,variables.xyz,url.params" ' +
        'directory="/tmp/" ' +
        'expireURL="*/expire?q=*" ' +
        'diskPersistent="true" ' + 
        'overflowToDisk="yes" ' +
        'idleTime="1.5" ' +
        'password="password" ' +
        'port="8080" ' +
        'protocol="http://" ' +
        'stripWhiteSpace="yes" ' +
        'throwOnError="1" ' +
        'timespan="0.25" ' +
        'useCache="false" ' +
        'usequerystring="true" ' +
        'username="username">' +
        "\nThe page fagment to be cached, if any.\n" +
        '</cfcache>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('cache');
        r.content.should.eql("\nThe page fagment to be cached, if any.\n");
        r.attributes.action.should.eql('cache');
        r.attributes.depends_on.should.eql(['variables.abc', 'variables.xyz', 'url.params']);
        r.attributes.directory.should.eql('/tmp/');
        r.attributes.disk_persistent.should.eql(true);
        r.attributes.expire_url.should.eql('*/expire?q=*');
        r.attributes.idle_time.should.eql(1.5);
        r.attributes.overflow_to_disk.should.eql(true);
        r.attributes.password.should.eql("password");
        r.attributes.port.should.eql(8080);
        r.attributes.protocol.should.eql("http://");
        r.attributes.strip_whitespace.should.eql(true);
        r.attributes.throw_on_error.should.eql(true);
        r.attributes.timespan.should.eql(0.25);
        r.attributes.use_cache.should.eql(false);
        r.attributes.use_query_string.should.eql(true);
        r.attributes.username.should.eql('username');
    });

    it('should work as expected when setting a bunch of attributes all in caps', function () {
        r = test.cfparser.parse('<CFCACHE ' +
        'ACTION="optimal" ' +
        'DEPENDSON="variables.abc,url.params" ' +
        'DIRECTORY="/home/tmp/" ' +
        'EXPIREURL="*/expire?q=*" ' +
        'IDLETIME="2.5" ' +
        'PASSWORD="password" ' +
        'PORT="8081" ' +
        'PROTOCOL="https://" ' +
        'STRIPWHITESPACE="yes" ' +
        'THROWONERROR="1" ' +
        'TIMESPAN="1.25" ' +
        'USECACHE="no" ' +
        'USEQUERYSTRING="yes" ' +
        'USERNAME="username2">' +
        "\nThe page fagment to be cached, if any.\n" +
        '</CFCACHE>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('cache');
        r.content.should.eql("\nThe page fagment to be cached, if any.\n");
        r.attributes.action.should.eql('optimal');
       r.attributes.depends_on.should.eql(['variables.abc', 'url.params']);
        r.attributes.directory.should.eql('/home/tmp/');
        r.attributes.expire_url.should.eql('*/expire?q=*');
        r.attributes.idle_time.should.eql(2.5);
        r.attributes.password.should.eql("password");
        r.attributes.port.should.eql(8081);
        r.attributes.protocol.should.eql("https://");
        r.attributes.strip_whitespace.should.eql(true);
        r.attributes.throw_on_error.should.eql(true);
        r.attributes.timespan.should.eql(1.25);
        r.attributes.use_cache.should.eql(false);
        r.attributes.use_query_string.should.eql(true);
        r.attributes.username.should.eql('username2');
    });
});
