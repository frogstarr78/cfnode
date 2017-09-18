const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cfimap action="close" />');
}, Error, 'Missing required connection attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfimap action="open" username="user" password="pass" server="localhost" />');
}, Error, 'Missing required connection attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfimap action="open" connection="cfimap_conn" password="pass" server="localhost" />');
}, Error, 'Missing required username attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfimap action="open" connection="cfimap_conn" username="user" server="localhost" />');
}, Error, 'Missing required password attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfimap action="open" connection="cfimap_conn" username="user" password="pass" />');
}, Error, 'Missing required server attribute.');

['delete_folder', 'create_folder'].forEach(function(action, i, arry) {
	is.throws(function () {
		r = test.cfparser.parse('<cfimap action="' + action + '" />');
	}, Error, 'Missing required folder attribute.');
});

['get_all', 'get_header_only', 'list_all_folders'].forEach(function(action, i, arry) {
	is.throws(function () {
		r = test.cfparser.parse('<cfimap action="' + action + '" />');
	}, Error, 'Missing required name attribute.');
});

is.throws(function () {
	r = test.cfparser.parse('<cfimap action="rename_folder" new_folder="nu_folder" />');
}, Error, 'Missing required folder attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfimap action="rename_folder" folder="old_folder" />');
}, Error, 'Missing required new_folder attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfimap action="move_mail" />');
}, Error, 'Missing required new_folder attribute.');


r = test.cfparser.parse('<cfimap ' +
'name="cfimap_test" ' +
'/>');
is.equal(r.attributes.action, 'get_header_only');
is.equal(r.attributes.folder, 'INBOX');
is.equal(r.attributes.name, 'cfimap_test');
is.equal(r.attributes.port, 143);
is.equal(r.attributes.recurse, false);
is.equal(r.attributes.secure, false);
is.equal(r.attributes.stop_on_error, true);
is.equal(r.attributes.timeout, 60);

r = test.cfparser.parse('<cfimap ' +
'action="list_all_folders" ' +
'name="cfimap_test2" ' +
'/>');
is.equal(r.attributes.action, 'list_all_folders');
is.equal(r.attributes.folder, 'mailbox');
is.equal(r.attributes.name, 'cfimap_test2');
is.equal(r.attributes.port, 143);
is.equal(r.attributes.recurse, false);
is.equal(r.attributes.secure, false);
is.equal(r.attributes.stop_on_error, true);
is.equal(r.attributes.timeout, 60);

r = test.cfparser.parse('<cfimap ' +
'name="cfimap_test3" ' +
'secure="yes" ' +
'/>');
is.equal(r.attributes.action, 'get_header_only');
is.equal(r.attributes.folder, 'INBOX');
is.equal(r.attributes.name, 'cfimap_test3');
is.equal(r.attributes.port, 993);
is.equal(r.attributes.recurse, false);
is.equal(r.attributes.secure, true);
is.equal(r.attributes.stop_on_error, true);
is.equal(r.attributes.timeout, 60);

r = test.cfparser.parse('<cfimap ' +
'server="localhost" ' +
'connection="cfimap_conn" ' +
'action="open" ' +
'password="pass" ' +
'username="user" ' +
'/>');
is.equal(r.attributes.action, 'open');
is.equal(r.attributes.connection, 'cfimap_conn');
is.equal(r.attributes.server, 'localhost');
is.equal(r.attributes.username, 'user');
is.equal(r.attributes.password, 'pass');

r = test.cfparser.parse('<cfimap action="create_folder" folder="old_folder" />');
is.equal(r.attributes.action, 'create_folder');
is.equal(r.attributes.folder, 'old_folder');

r = test.cfparser.parse('<cfimap action="delete_folder" folder="old_folder" />');
is.equal(r.attributes.action, 'delete_folder');
is.equal(r.attributes.folder, 'old_folder');

r = test.cfparser.parse('<cfimap action="get_all" name="cfimap_test4" />');
is.equal(r.attributes.action, 'get_all');
is.equal(r.attributes.name, 'cfimap_test4');

r = test.cfparser.parse('<cfimap action="move_mail" newFolder="/tmp/flder" />');
is.equal(r.attributes.action, 'move_mail');
is.equal(r.attributes.new_folder, '/tmp/flder');

r = test.cfparser.parse('<cfimap action="rename_folder" folder="old_folder" new_folder="new_folder" />');
is.equal(r.attributes.action, 'rename_folder');
is.equal(r.attributes.new_folder, 'new_folder');
is.equal(r.attributes.folder, 'old_folder');

