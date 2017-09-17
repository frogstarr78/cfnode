const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cfschedule>');
}, Error, 'Missing required attributes');

is.throws(function () {
	r = test.cfparser.parse('<cfschedule action="run">');
}, Error, 'Missing required task attribute');

is.throws(function () {
	r = test.cfparser.parse('<cfschedule task="cfschedule_test">');
}, Error, 'Missing required action attribute');

is.throws(function () {
	r = test.cfparser.parse('<cfschedule action="update" task="cfschedule_test" operation="HTTPRequest" start_date="2014-09-09" start_time="1" url="http://example.com" />');
}, Error, 'Missing required interval attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfschedule action="update" task="cfschedule_test" interval="daily" start_date="2014-09-09" start_time="2" url="http://example.com" />');
}, Error, 'Missing required operation attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfschedule action="update" task="cfschedule_test" interval="monthly" operation="HTTPRequest" start_time="3" url="http://example.com" />');
}, Error, 'Missing required start_date attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfschedule action="update" task="cfschedule_test" interval="monthly" operation="HTTPRequest" start_date="2014-09-09" url="http://example.com" />');
}, Error, 'Missing required start_time attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfschedule action="update" task="cfschedule_test" interval="monthly" operation="HTTPRequest" start_date="2014-09-09" start_time="4" />');
}, Error, 'Missing required url attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfschedule action="run" task="cfschedule_test2" publish="yes" path="/var/www/html/example.com/" >');
}, Error, 'Missing required file attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfschedule action="run" task="cfschedule_test2" publish="yes" file="/tmp/path/to/content">');
}, Error, 'Missing required path attribute.');

r = test.cfparser.parse('<cfschedule action="run" task="cfschedule_test2">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'schedule');
is.equal(r.attributes.action, 'run');
is.equal(r.attributes.task, 'cfschedule_test2');
is.equal(r.attributes.port, 80);
is.equal(r.attributes.proxy_port, 80);
is.equal(r.attributes.publish, false);
is.equal(r.attributes.resolve_url, false);

r = test.cfparser.parse('<cfschedule action="delete" task="cfschedule_test3">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'schedule');
is.equal(r.attributes.action, 'delete');
is.equal(r.attributes.task, 'cfschedule_test3');
is.equal(r.attributes.port, 80);
is.equal(r.attributes.proxy_port, 80);
is.equal(r.attributes.publish, false);
is.equal(r.attributes.resolve_url, false);

r = test.cfparser.parse('<cfschedule action="pause" task="cfschedule_test4">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'schedule');
is.equal(r.attributes.action, 'pause');
is.equal(r.attributes.task, 'cfschedule_test4');
is.equal(r.attributes.port, 80);
is.equal(r.attributes.proxy_port, 80);
is.equal(r.attributes.publish, false);
is.equal(r.attributes.resolve_url, false);

r = test.cfparser.parse('<cfschedule action="resume" task="cfschedule_test5">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'schedule');
is.equal(r.attributes.action, 'resume');
is.equal(r.attributes.task, 'cfschedule_test5');
is.equal(r.attributes.port, 80);
is.equal(r.attributes.proxy_port, 80);
is.equal(r.attributes.publish, false);
is.equal(r.attributes.resolve_url, false);

r = test.cfparser.parse('<cfschedule ' +
'action="update" ' +
'task="cfschedule_test6" ' +
'interval="once" ' +
'operation="HTTPRequest" ' +
'start_date="2014-09-09" ' +
'start_time="5" ' +
'url="http://example.com" ' +
'/>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'schedule');
is.equal(r.attributes.action, 'update');
is.equal(r.attributes.task, 'cfschedule_test6');
is.equal(r.attributes.port, 80);
is.equal(r.attributes.proxy_port, 80);
is.equal(r.attributes.publish, false);
is.equal(r.attributes.resolve_url, false);
is.equal(r.attributes.interval, 'once');
is.equal(r.attributes.operation, 'HTTPRequest');
is.deepEqual(r.attributes.start_date, new Date('2014-09-09 00:00:00'));
is.equal(r.attributes.start_time, '5');
is.equal(r.attributes.url, 'http://example.com/');

r = test.cfparser.parse('<cfschedule action="run" task="cfschedule_test2" publish="yes" file="/tmp/path/to/content" path="/var/www/html/example.com/" >');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'schedule');
is.equal(r.attributes.action, 'run');
is.equal(r.attributes.task, 'cfschedule_test2');
is.equal(r.attributes.port, 80);
is.equal(r.attributes.proxy_port, 80);
is.equal(r.attributes.publish, true);
is.equal(r.attributes.resolve_url, false);
is.equal(r.attributes.file, "/tmp/path/to/content");
is.equal(r.attributes.path, "/var/www/html/example.com/");

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
is.equal(r instanceof Object, true);
is.equal(r.tag, 'schedule');
is.equal(r.attributes.action, 'update');
is.deepEqual(r.attributes.end_date, new Date('2014-09-10 00:00:00'));
is.equal(r.attributes.end_time, 6);
is.equal(r.attributes.file, "/tmp/path/");
is.equal(r.attributes.interval, 'weekly');
is.equal(r.attributes.operation, 'HTTPRequest');
is.equal(r.attributes.password, "passwd");
is.equal(r.attributes.path, "/tmp/dpath/");
is.equal(r.attributes.port, 8080);
is.equal(r.attributes.proxy_password, "passwd2");
is.equal(r.attributes.proxy_port, 8081);
is.equal(r.attributes.proxy_server, "example.com");
is.equal(r.attributes.proxy_user, "puser");
is.equal(r.attributes.publish, true);
is.equal(r.attributes.resolve_url, true);
is.equal(r.attributes.request_timeout, 1);
is.deepEqual(r.attributes.start_date, new Date('2014-09-09 00:00:00'));
is.equal(r.attributes.start_time, 5);
is.equal(r.attributes.task, 'cfschedule_test7');
is.equal(r.attributes.url, 'http://example.com/');
is.equal(r.attributes.username, 'usr');

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
is.equal(r instanceof Object, true);
is.equal(r.tag, 'schedule');
is.equal(r.attributes.action, 'update');
is.deepEqual(r.attributes.end_date, new Date('2014-09-11 00:00:00'));
is.equal(r.attributes.end_time, 6);
is.equal(r.attributes.file, "/tmp/path/");
is.equal(r.attributes.interval, 'weekly');
is.equal(r.attributes.operation, 'HTTPRequest');
is.equal(r.attributes.password, "passwd3");
is.equal(r.attributes.path, "/tmp/dpath/");
is.equal(r.attributes.port, 8081);
is.equal(r.attributes.proxy_password, "passwd4");
is.equal(r.attributes.proxy_port, 8082);
is.equal(r.attributes.proxy_server, "example.com");
is.equal(r.attributes.proxy_user, "puser");
is.equal(r.attributes.publish, true);
is.equal(r.attributes.request_timeout, 1);
is.equal(r.attributes.resolve_url, true);
is.deepEqual(r.attributes.start_date, new Date('2014-09-09 00:00:00'));
is.equal(r.attributes.start_time, 5);
is.equal(r.attributes.task, 'cfschedule_test8');
is.equal(r.attributes.url, 'http://example.com/');
is.equal(r.attributes.username, 'usr');

test.ok();
