const should = require('should'),
        test = require('./testlib');

describe('Parsing a cfschedule tag', function () {
    it('throws an error when missing required attributes', function () {
        (function () { test.cfparser.parse('<cfschedule>'); }).should.throw('Expected " ", "\\n", or "\\t" but ">" found.');
    });

    it('throws an error when missing required task attribute', function () {
        (function () { test.cfparser.parse('<cfschedule action="run">'); }).should.throw('Missing required "task" attribute.');
    });

    it('throws an error when missing required action attribute', function () {
        (function () { test.cfparser.parse('<cfschedule task="cfschedule_test">'); }).should.throw('Missing required "action" attribute.');
    });

    it('throws an error when missing required interval attribute', function () {
        (function () { test.cfparser.parse('<cfschedule action="update" task="cfschedule_test" operation="HTTPRequest" start_date="2014-09-09" start_time="1" url="http://example.com" />'); })
            .should.throw('Missing required "interval" attribute.');
    });

    it('throws an error when missing required operation attribute', function () {
        (function () { test.cfparser.parse('<cfschedule action="update" task="cfschedule_test" interval="daily" start_date="2014-09-09" start_time="2" url="http://example.com" />'); })
            .should.throw('Missing required "operation" attribute.');
    });

    it('throws an error when missing required start_date attribute', function () {
        (function () { test.cfparser.parse('<cfschedule action="update" task="cfschedule_test" interval="monthly" operation="HTTPRequest" start_time="3" url="http://example.com" />'); })
            .should.throw('Missing required "start_date" attribute.');
    });

    it('throws an error when missing required start_time attribute', function () {
        (function () { test.cfparser.parse('<cfschedule action="update" task="cfschedule_test" interval="monthly" operation="HTTPRequest" start_date="2014-09-09" url="http://example.com" />'); })
            .should.throw('Missing required "start_time" attribute.');
    });

    it('throws an error when missing required url attribute', function () {
        (function () { test.cfparser.parse('<cfschedule action="update" task="cfschedule_test" interval="monthly" operation="HTTPRequest" start_date="2014-09-09" start_time="4" />'); })
            .should.throw('Missing required "url" attribute.');
    });

    it('throws an error when missing required file attribute', function () {
        (function () { test.cfparser.parse('<cfschedule action="run" task="cfschedule_test2" publish="yes" path="/var/www/html/example.com/" >'); })
            .should.throw('Missing required "file" attribute.');
    });

    it('throws an error when missing required path attribute', function () {
        (function () { test.cfparser.parse('<cfschedule action="run" task="cfschedule_test2" publish="yes" file="/tmp/path/to/content">'); })
            .should.throw('Missing required "path" attribute.');
    });

    it('works as expected', function () {
        r = test.cfparser.parse('<cfschedule action="run" task="cfschedule_test2">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('schedule');
        r.attributes.action.should.eql('run');
        r.attributes.task.should.eql('cfschedule_test2');
        r.attributes.port.should.eql(80);
        r.attributes.proxy_port.should.eql(80);
        r.attributes.publish.should.be.false;
        r.attributes.resolve_url.should.be.false;

        r = test.cfparser.parse('<cfschedule action="delete" task="cfschedule_test3">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('schedule');
        r.attributes.action.should.eql('delete');
        r.attributes.task.should.eql('cfschedule_test3');
        r.attributes.port.should.eql(80);
        r.attributes.proxy_port.should.eql(80);
        r.attributes.publish.should.be.false;
        r.attributes.resolve_url.should.be.false;

        r = test.cfparser.parse('<cfschedule action="pause" task="cfschedule_test4">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('schedule');
        r.attributes.action.should.eql('pause');
        r.attributes.task.should.eql('cfschedule_test4');
        r.attributes.port.should.eql(80);
        r.attributes.proxy_port.should.eql(80);
        r.attributes.publish.should.be.false;
        r.attributes.resolve_url.should.be.false;

        r = test.cfparser.parse('<cfschedule action="resume" task="cfschedule_test5">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('schedule');
        r.attributes.action.should.eql('resume');
        r.attributes.task.should.eql('cfschedule_test5');
        r.attributes.port.should.eql(80);
        r.attributes.proxy_port.should.eql(80);
        r.attributes.publish.should.be.false;
        r.attributes.resolve_url.should.be.false;

        r = test.cfparser.parse('<cfschedule ' +
        'action="update" ' +
        'task="cfschedule_test6" ' +
        'interval="once" ' +
        'operation="HTTPRequest" ' +
        'start_date="2014-09-09" ' +
        'start_time="5" ' +
        'url="http://example.com" ' +
        '/>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('schedule');
        r.attributes.action.should.eql('update');
        r.attributes.task.should.eql('cfschedule_test6');
        r.attributes.port.should.eql(80);
        r.attributes.proxy_port.should.eql(80);
        r.attributes.publish.should.be.false;
        r.attributes.resolve_url.should.be.false;
        r.attributes.interval.should.eql('once');
        r.attributes.operation.should.eql('HTTPRequest');
        r.attributes.start_date.should.eql(new Date('2014-09-09 00:00:00'));
        r.attributes.start_time.should.eql(5);
        r.attributes.url.should.eql('http://example.com/');

        r = test.cfparser.parse('<cfschedule action="run" task="cfschedule_test2" publish="yes" file="/tmp/path/to/content" path="/var/www/html/example.com/" >');
        r.should.be.instanceof(Object);
        r.tag.should.eql('schedule');
        r.attributes.action.should.eql('run');
        r.attributes.task.should.eql('cfschedule_test2');
        r.attributes.port.should.eql(80);
        r.attributes.proxy_port.should.eql(80);
        r.attributes.publish.should.be.true;
        r.attributes.resolve_url.should.be.false;
        r.attributes.file.should.eql("/tmp/path/to/content");
        r.attributes.path.should.eql("/var/www/html/example.com/");

        r = test.cfparser.parse('<cfschedule ' +
        'file="/tmp/path/" ' +
        'action="update" ' +
        'request_timeout="1" ' +
        'path="/tmp/dpath/" ' +
        'task="cfschedule_test7" ' +
        'password="passwd" ' +
        'interval="weekly" ' +
        'operation="HTTPRequest" ' +
        'start_date="2014-09-09" ' +
        'proxy_password="passwd2" ' +
        'end_date="2014-09-10" ' +
        'username="usr" ' +
        'start_time="5" ' +
        'port="8080" ' +
        'end_time="6" ' +
        'proxy_port="8081" ' +
        'resolve_url="yes" ' +
        'proxy_user="puser" ' +
        'publish="yes" ' +
        'proxy_server="example.com" ' +
        'url="http://example.com" ' +
        '/>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('schedule');
        r.attributes.action.should.eql('update');
        r.attributes.end_date.should.eql(new Date('2014-09-10 00:00:00'));
        r.attributes.end_time.should.eql(6);
        r.attributes.file.should.eql("/tmp/path/");
        r.attributes.interval.should.eql('weekly');
        r.attributes.operation.should.eql('HTTPRequest');
        r.attributes.password.should.eql("passwd");
        r.attributes.path.should.eql("/tmp/dpath/");
        r.attributes.port.should.eql(8080);
        r.attributes.proxy_password.should.eql("passwd2");
        r.attributes.proxy_port.should.eql(8081);
        r.attributes.proxy_server.should.eql("example.com");
        r.attributes.proxy_user.should.eql("puser");
        r.attributes.publish.should.be.true;
        r.attributes.resolve_url.should.be.true;
        r.attributes.request_timeout.should.eql(1);
        r.attributes.start_date.should.eql(new Date('2014-09-09 00:00:00'));
        r.attributes.start_time.should.eql(5);
        r.attributes.task.should.eql('cfschedule_test7');
        r.attributes.url.should.eql('http://example.com/');
        r.attributes.username.should.eql('usr');

        r = test.cfparser.parse('<CFSCHEDULE ' +
        'REQUESTTIMEOUT="1" ' +
        'ENDTIME="6" ' +
        'PROXYPORT="8082" ' +
        'PROXYSERVER="example.com" ' +
        'STARTDATE="2014-09-09" ' +
        'OPERATION="HTTPRequest" ' +
        'TASK="cfschedule_test8" ' +
        'PASSWORD="passwd3" ' +
        'ACTION="update" ' +
        'PROXYPASSWORD="passwd4" ' +
        'ENDDATE="2014-09-11" ' +
        'USERNAME="usr" ' +
        'STARTTIME="5" ' +
        'PORT="8081" ' +
        'PATH="/tmp/dpath/" ' +
        'INTERVAL="weekly" ' +
        'RESOLVE_URL="yes" ' +
        'PROXYUSER="puser" ' +
        'FILE="/tmp/path/" ' +
        'PUBLISH="yes" ' +
        'URL="http://example.com" ' +
        '/>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('schedule');
        r.attributes.action.should.eql('update');
        r.attributes.end_date.should.eql(new Date('2014-09-11 00:00:00'));
        r.attributes.end_time.should.eql(6);
        r.attributes.file.should.eql("/tmp/path/");
        r.attributes.interval.should.eql('weekly');
        r.attributes.operation.should.eql('HTTPRequest');
        r.attributes.password.should.eql("passwd3");
        r.attributes.path.should.eql("/tmp/dpath/");
        r.attributes.port.should.eql(8081);
        r.attributes.proxy_password.should.eql("passwd4");
        r.attributes.proxy_port.should.eql(8082);
        r.attributes.proxy_server.should.eql("example.com");
        r.attributes.proxy_user.should.eql("puser");
        r.attributes.publish.should.be.true;
        r.attributes.request_timeout.should.eql(1);
        r.attributes.resolve_url.should.be.true;
        r.attributes.start_date.should.eql(new Date('2014-09-09 00:00:00'));
        r.attributes.start_time.should.eql(5);
        r.attributes.task.should.eql('cfschedule_test8');
        r.attributes.url.should.eql('http://example.com/');
        r.attributes.username.should.eql('usr');
    });
});
