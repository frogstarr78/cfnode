var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

test.fail();
process.exit();

is.throws(function () {
	r = cf.parse('<cfftp />');
}, Error, 'Missing required action attribute.');

is.throws(function () {
	r = cf.parse('<cfftp action="open" server="localhost" username="user" connection="conn" />');
}, Error, 'Missing required password attribute.');

is.throws(function () {
	r = cf.parse('<cfftp action="open" password="pass" username="user" connection="conn" />');
}, Error, 'Missing required server attribute.');

is.throws(function () {
	r = cf.parse('<cfftp action="open" server="localhost" password="pass" connection="conn" />');
}, Error, 'Missing required username attribute.');

is.throws(function () {
	r = cf.parse('<cfftp action="open" server="localhost" username="user" password="pass" />');
}, Error, 'Missing required connection attribute.');

is.throws(function () {
	r = cf.parse('<cfftp action="open" secure="yes" server="localhost" username="user"/>');
}, Error, 'Missing required key or password attribute.');

is.throws(function () {
	r = cf.parse('<cfftp action="close" />');
}, Error, 'Missing required connection attribute.');

is.throws(function () {
	r = cf.parse('<cfftp action="close" action_param="user" />');
}, Error, 'Unexpected action_param used with action == "close" attribute.');

is.throws(function () {
	r = cf.parse('<cfftp action="quote" action_param="user" secure="true" />');
}, Error, 'Unexpected secure connection used with action == "quote" attribute.');

r = cf.parse('<cfftp action="open" secure="yes" server="localhost" username="user" password="pass" connection="myconn" />');
is.equal(r.attributes.action, 'open');
is.equal(r.attributes.connection, 'myconn');
is.equal(r.attributes.passive, false);
is.equal(r.attributes.password, 'pass');
is.equal(r.attributes.server, 'localhost');
is.equal(r.attributes.secure, true);
is.equal(r.attributes.username, 'user');

r = cf.parse('<cfftp action="open" secure="yes" server="localhost" username="user" key="ssh-rsa" passphrase="stuff" connection="myconn" />');
is.equal(r.attributes.action, 'open');
is.equal(r.attributes.connection, 'myconn');
is.equal(r.attributes.key, 'ssh-rsa');
is.equal(r.attributes.passive, false);
is.equal(r.attributes.passphrase, 'stuff');
is.equal(r.attributes.server, 'localhost');
is.equal(r.attributes.secure, true);
is.equal(r.attributes.username, 'user');

r = cf.parse('<cfftp action="open" server="localhost" username="user" password="pass" connection="myconn" />');
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

r = cf.parse('<cfftp action="close" connection="myconn2" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'ftp');
is.equal(r.attributes.action, 'close');
is.equal(r.attributes.connection, 'myconn2');

r = cf.parse('<cfftp ' + 
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

r = cf.parse('<cfftp action="acct" action_param="user" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'ftp');
is.equal(r.attributes.action, 'acct');
is.equal(r.attributes.action_param, 'user');

//r = cf.parse('<cfftp action="create" properties="#astruct#" query="#aquery#" xmlVar="ftp" output_file="/tmp/cffile.out" />');
//is.equal(r instanceof Object, true);
//is.equal(r.tag, 'ftp');
//is.equal(r.attributes.action, 'create');
//is.equal(r.attributes.escape_chars, false);
//is.equal(r.attributes.ignore_enclosure_error, false);
//is.equal(r.attributes.output_file, '/tmp/cffile.out');
//is.equal(r.attributes.overwrite, false);
//is.equal(r.attributes.overwrite_enclosure, false);
//is.equal(r.attributes.properties, '#astruct#');
//is.equal(r.attributes.proxy_port, 80);
//is.equal(r.attributes.query, '#aquery#');
//is.equal(r.attributes.timeout, 60);
//is.equal(r.attributes.user_agent, 'ColdFusion (cfNode)');
//is.equal(r.attributes.xml_var, 'ftp');
//
//r = cf.parse('<cfftp ' +
//'output_file="/tmp/cffile2.out" ' +
//'properties="#astruct2#" ' +
//'xmlVar="ftp2" ' +
//'column_map="#columns#" ' +
//'query="#aquery2#" ' +
//'overwrite="true" ' +
//'action="create" ' +
//'>');
//is.equal(r instanceof Object, true);
//is.equal(r.tag, 'ftp');
//is.equal(r.attributes.action, 'create');
//is.equal(r.attributes.column_map, '#columns#');
//is.equal(r.attributes.output_file, '/tmp/cffile2.out');
//is.equal(r.attributes.overwrite, true);
//is.equal(r.attributes.properties, '#astruct2#');
//is.equal(r.attributes.query, '#aquery2#');
//is.equal(r.attributes.xml_var, 'ftp2');
//
//r = cf.parse('<CFFTP ' +
//'OUTPUTFILE="/tmp/cffile3.out" ' +
//'PROPERTIES="#astruct3#" ' +
//'XMLVAR="ftp3" ' +
//'COLUMNMAP="#columns2#" ' +
//'QUERY="#aquery3#" ' +
//'OVERWRITE="1" ' +
//'ACTION="create" ' +
//'>');
//is.equal(r instanceof Object, true);
//is.equal(r.tag, 'ftp');
//is.equal(r.attributes.action, 'create');
//is.equal(r.attributes.column_map, '#columns2#');
//is.equal(r.attributes.output_file, '/tmp/cffile3.out');
//is.equal(r.attributes.overwrite, true);
//is.equal(r.attributes.properties, '#astruct3#');
//is.equal(r.attributes.query, '#aquery3#');
//is.equal(r.attributes.xml_var, 'ftp3');
//
//r = cf.parse('<cfftp ' +
//'output_file="/tmp/cffile2.out" ' +
//'properties="astruct2" ' +
//'xmlVar="ftp2" ' +
//'xmlVar="ftp4" ' +
//'query="#aquery2#" ' +
//'action="read" ' +
//'output_file="/tmp/cffile4.out" ' +
//'query="#aquery4#" ' +
//'properties="#astruct4#" ' +
//'overwrite="true" ' +
//'action="create" ' +
//'>');
//is.equal(r.tag, 'ftp');
//is.equal(r.attributes.action, 'create');
//is.equal(r.attributes.output_file, '/tmp/cffile4.out');
//is.equal(r.attributes.overwrite, true);
//is.equal(r.attributes.properties, '#astruct4#');
//is.equal(r.attributes.query, '#aquery4#');
//is.equal(r.attributes.xml_var, 'ftp4');

test.ok();
