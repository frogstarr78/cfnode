var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cfftp />');
}, Error, 'Missing required action attribute.');

// directory actions
is.throws(function () {
	r = cf.parse('<cfftp action="changedir" />');
}, Error, 'Missing required directory attribute.');

is.throws(function () {
	r = cf.parse('<cfftp action="createdir" />');
}, Error, 'Missing required directory attribute.');

is.throws(function () {
	r = cf.parse('<cfftp action="listDir" name="dirname" />');
}, Error, 'Missing required directory attribute.');

is.throws(function () {
	r = cf.parse('<cfftp action="listDir" directory="dirname" />');
}, Error, 'Missing required name attribute.');

is.throws(function () {
	r = cf.parse('<cfftp action="exists_dir" />');
}, Error, 'Missing required directory attribute.');
// directory actions

is.throws(function () {
	r = cf.parse('<cfftp action="rename" new="newname" />');
}, Error, 'Missing required existing attribute.');

is.throws(function () {
	r = cf.parse('<cfftp action="rename" existing="oldname" />');
}, Error, 'Missing required new attribute.');

// item actions
is.throws(function () {
	r = cf.parse('<cfftp action="exists" />');
}, Error, 'Missing required item attribute.');

is.throws(function () {
	r = cf.parse('<cfftp action="remove"/>');
}, Error, 'Missing required item attribute.');
// item actions

is.throws(function () {
	r = cf.parse('<cfftp action="getFile" remote_file="remfile" />');
}, Error, 'Missing required local_file attribute.');

is.throws(function () {
	r = cf.parse('<cfftp action="getFile" local_file="remfile" />');
}, Error, 'Missing required remote_file attribute.');

is.throws(function () {
	r = cf.parse('<cfftp action="put_file">');
}, Error, 'Missing required local_file attribute.');

is.throws(function () {
	r = cf.parse('<cfftp action="get_file" local_file="remfile" />');
}, Error, 'Missing required remote_file attribute.');

is.throws(function () {
	r = cf.parse('<cfftp action="existsFile" />');
}, Error, 'Missing required remote_file attribute.');

r = cf.parse('<cfftp ' +
'action="changeDir" ' +
'directory="newrmdir" ' +
'/>');
is.equal(r.attributes.action, 'change_dir');
is.equal(r.attributes.directory, 'newrmdir');
is.deepEqual(r.attributes.ascii_extension_list, 'txt;htm;html;cfm;cfml;shtm;shtml;css;asp;asa'.split(';'));
is.equal(r.attributes.fail_if_exists, true);
is.equal(r.attributes.passive, false);
is.equal(r.attributes.timeout, 30);
is.equal(r.attributes.transfer_mode, 'auto');

r = cf.parse('<cfftp ' +
'action="list_dir" ' +
'directory="newrmdir2" ' +
'name="qname" ' +
'/>');
is.equal(r.attributes.action, 'list_dir');
is.deepEqual(r.attributes.ascii_extension_list, 'txt;htm;html;cfm;cfml;shtm;shtml;css;asp;asa'.split(';'));
is.equal(r.attributes.directory, 'newrmdir2');
is.equal(r.attributes.fail_if_exists, true);
is.equal(r.attributes.name, 'qname');
is.equal(r.attributes.passive, false);
is.equal(r.attributes.timeout, 30);
is.equal(r.attributes.transfer_mode, 'auto');

r = cf.parse('<cfftp ' +
'new="newdirname" ' +
'proxyPassword="ppass" ' +
'proxyUser="puser" ' +
'connection="conn" ' +
'passive="true" ' +
'timeout="60" ' +
'proxyPort="91" ' +
'fail_if_exists="false" ' +
'proxyServer="localhost" ' + 
'action="rename" ' +
'password="pass" ' +
'existing="oldrmdir" ' +
'/>');
is.equal(r.attributes.action, 'rename');
is.equal(r.attributes.connection, 'conn');
is.equal(r.attributes.existing, 'oldrmdir');
is.equal(r.attributes.fail_if_exists, false);
is.equal(r.attributes.new, 'newdirname');
is.equal(r.attributes.passive, true);
is.equal(r.attributes.proxy_password, 'ppass');
is.equal(r.attributes.proxy_port, 91);
is.equal(r.attributes.proxy_server, 'localhost');
is.equal(r.attributes.proxy_user, 'puser');
is.equal(r.attributes.timeout, 60);

r = cf.parse('<cfftp ' +
'new="newdirname" ' +
'proxyPassword="ppass" ' +
'transfer_mode="ascii" ' +
'proxyUser="puser" ' +
'connection="conn" ' +
'ascii_extension_list="txt;htm;html;php" ' +
'local_file="localfile" ' +
'remote_file="remotefile" ' +
'passive="true" ' +
'timeout="60" ' +
'proxyPort="91" ' +
'fail_if_exists="false" ' +
'proxyServer="localhost" ' + 
'action="put_file" ' +
'password="pass" ' +
'existing="oldrmdir" ' +
'/>');
is.equal(r.attributes.action, 'put_file');
is.deepEqual(r.attributes.ascii_extension_list, 'txt;htm;html;php'.split(';'));
is.equal(r.attributes.connection, 'conn');
is.equal(r.attributes.existing, 'oldrmdir');
is.equal(r.attributes.fail_if_exists, false);
is.equal(r.attributes.new, 'newdirname');
is.equal(r.attributes.passive, true);
is.equal(r.attributes.proxy_password, 'ppass');
is.equal(r.attributes.proxy_port, 91);
is.equal(r.attributes.proxy_server, 'localhost');
is.equal(r.attributes.proxy_user, 'puser');
is.equal(r.attributes.timeout, 60);
is.equal(r.attributes.transfer_mode, 'ascii');

test.ok();
