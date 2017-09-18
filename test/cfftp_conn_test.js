const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cfftp />');
}, Error, 'Missing required action attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfftp action="open" server="localhost" username="user" password="pass" />');
}, Error, 'Missing required connection attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfftp action="open" server="localhost" username="user" connection="conn" />');
}, Error, 'Missing required password attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfftp action="open" password="pass" username="user" connection="conn" />');
}, Error, 'Missing required server attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfftp action="open" server="localhost" password="pass" connection="conn" />');
}, Error, 'Missing required username attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfftp action="open" secure="yes" server="localhost" username="user" connection="conn"/>');
}, Error, 'Missing required key or password attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfftp action="open" secure="yes" server="localhost" username="user" password="pass" passphrase="passph" connection="conn"/>');
}, Error, 'Unexpected passphrase used with no key attribute specified.');

is.throws(function () {
	r = test.cfparser.parse('<cfftp action="close" />');
}, Error, 'Missing required connection attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfftp action="close" buffer_size="8" connection="conn"/>');
}, Error, 'Unexpected buffer_size used with action == "close" attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfftp action="close" action_param="user" connection="conn"/>');
}, Error, 'Unexpected action_param used with action == "close" attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfftp action="quote" action_param="user" secure="true" />');
}, Error, 'Unexpected secure connection used with action == "quote" attribute.');

r = test.cfparser.parse('<cfftp ' +
'action="open" ' +
'secure="yes" ' +
'server="localhost" ' +
'username="user" ' +
'password="pass" ' +
'connection="myconn" ' +
'/>');
is.equal(r.attributes.action, 'open');
is.equal(r.attributes.connection, 'myconn');
is.equal(r.attributes.passive, false);
is.equal(r.attributes.password, 'pass');
is.equal(r.attributes.server, 'localhost');
is.equal(r.attributes.secure, true);
is.equal(r.attributes.username, 'user');

r = test.cfparser.parse('<cfftp ' +
'action="open" ' +
'secure="yes" ' +
'server="localhost" ' +
'username="user" ' +
'key="ssh-rsa" ' +
'passphrase="stuff" ' +
'connection="myconn" ' +
'/>');
is.equal(r.attributes.action, 'open');
is.equal(r.attributes.connection, 'myconn');
is.equal(r.attributes.key, 'ssh-rsa');
is.equal(r.attributes.passive, false);
is.equal(r.attributes.passphrase, 'stuff');
is.equal(r.attributes.server, 'localhost');
is.equal(r.attributes.secure, true);
is.equal(r.attributes.username, 'user');

r = test.cfparser.parse('<cfftp ' +
'action="open" ' +
'server="localhost" ' +
'username="user" ' +
'password="pass" ' +
'connection="myconn" ' +
'/>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'ftp');
is.equal(r.attributes.action, 'open');
is.equal(r.attributes.connection, 'myconn');
is.equal(r.attributes.passive, false);
is.equal(r.attributes.password, 'pass');
is.equal(r.attributes.port, 21);
is.equal(r.attributes.retry_count, 1);
is.equal(r.attributes.server, 'localhost');
is.equal(r.attributes.stop_on_error, true);
is.equal(r.attributes.timeout, 30);
is.equal(r.attributes.username, 'user');

r = test.cfparser.parse('<cfftp ' +
'action="close" ' +
'connection="myconn2" ' +
'/>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'ftp');
is.equal(r.attributes.action, 'close');
is.equal(r.attributes.connection, 'myconn2');

r = test.cfparser.parse('<cfftp ' + 
'stop_on_error="no" ' + 
'action="open" ' + 
'server="localhost" ' + 
'retryCount="5" ' + 
'username="user" ' + 
'port="990" ' + 
'timeout="90" ' + 
'password="pass" ' + 
'passive="yes" ' + 
'connection="myconn3" ' + 
'/>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'ftp');
is.equal(r.attributes.action, 'open');
is.equal(r.attributes.connection, 'myconn3');
is.equal(r.attributes.passive, true);
is.equal(r.attributes.password, 'pass');
is.equal(r.attributes.port, 990);
is.equal(r.attributes.retry_count, 5);
is.equal(r.attributes.server, 'localhost');
is.equal(r.attributes.stop_on_error, false);
is.equal(r.attributes.timeout, 90);
is.equal(r.attributes.username, 'user');

r = test.cfparser.parse('<cfftp ' +
'action="acct" ' +
'action_param="user" ' +
'buffer_size="12" ' +
'connection="conn4" ' +
'port="990" ' +
'proxy_server="localhost" ' +
'proxy_port="90" ' +
'proxy_user="puser" ' +
'proxy_password="ppass" ' +
'retry_count="10" ' +
'server="localhost" ' +
'stop_on_error="false" ' +
'timeout="31" ' +
'/>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'ftp');
is.equal(r.attributes.action, "acct");
is.equal(r.attributes.action_param, 'user');
is.equal(r.attributes.buffer_size, 12);
is.equal(r.attributes.connection, 'conn4');
is.equal(r.attributes.port, "990");
is.equal(r.attributes.proxy_server, "localhost");
is.equal(r.attributes.proxy_port, "90");
is.equal(r.attributes.proxy_user, "puser");
is.equal(r.attributes.proxy_password, "ppass");
is.equal(r.attributes.retry_count, "10");
is.equal(r.attributes.stop_on_error, false);
is.equal(r.attributes.timeout, 31);

r = test.cfparser.parse('<cfftp ' +
'action="open" ' +
'buffer_size="11" ' +
'connection="conn5" ' +
'fingerprint="01:23:45:57::89:ab:cd:ef" ' +
'key="/path/to/private.key" ' +
'passive="true" ' +
'password="pass" ' +
'passphrase="key_pass" ' +
'port="990" ' +
'proxy_server="example.com" ' +
'proxy_port="991" ' +
'proxy_user="puser" ' +
'proxy_password="ppass" ' +
'retry_count="13" ' +
'secure="true" ' +
'server="localhost" ' +
'stop_on_error="true" ' +
'timeout="67" ' +
'username="user3" ' +
'/>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'ftp');
is.equal(r.attributes.action, "open");
is.equal(r.attributes.buffer_size, "11");
is.equal(r.attributes.connection, "conn5");
is.equal(r.attributes.fingerprint, "01:23:45:57::89:ab:cd:ef");
is.equal(r.attributes.key, "/path/to/private.key");
is.equal(r.attributes.passive, true);
is.equal(r.attributes.passphrase, "key_pass");
is.equal(r.attributes.password, "pass");
is.equal(r.attributes.port, 990);
is.equal(r.attributes.proxy_password, "ppass");
is.equal(r.attributes.proxy_port, 991);
is.equal(r.attributes.proxy_server, "example.com");
is.equal(r.attributes.proxy_user, "puser");
is.equal(r.attributes.retry_count, "13");
is.equal(r.attributes.secure, true);
is.equal(r.attributes.server, "localhost");
is.equal(r.attributes.stop_on_error, true);
is.equal(r.attributes.timeout, 67);
is.equal(r.attributes.username, "user3");

