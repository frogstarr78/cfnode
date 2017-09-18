const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cfldap />');
}, Error, 'Missing required server attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfldap server="localhost" />');
}, Error, 'Missing required name attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfldap server="localhost" action="query" attributes="*" />');
}, Error, 'Missing required name attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfldap server="localhost" name="cfldap_test" username="user" password="pass" attributes="*" />');
}, Error, 'Missing required start attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfldap server="localhost" name="cfldap_test" password="pass" start="dc=example,dc=org" secure="CFSSL_BASIC" attributes="*" />');
}, Error, 'Missing required username attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfldap server="localhost" name="cfldap_test" username="user" start="dc=example,dc=org" secure="CFSSL_BASIC" attributes="*" />');
}, Error, 'Missing required password attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfldap server="localhost" name="cfldap_test" username="user" password="pass" start="dc=example,dc=org" secure="CFSSL_BASIC" />');
}, Error, 'Missing required attributes attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfldap action="add" attributes="name" />');
}, Error, 'Missing required dn attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfldap action="add" dn="dc=example,dc=org" />');
}, Error, 'Missing required attributes attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfldap action="modify" attributes="name" />');
}, Error, 'Missing required dn attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfldap action="modify" dn="dc=example,dc=org" />');
}, Error, 'Missing required attributes attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfldap action="modify_dn" attributes="name" />');
}, Error, 'Missing required dn attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfldap action="modify_dn" dn="dc=example,dc=org" />');
}, Error, 'Missing required attributes attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfldap action="delete" />');
}, Error, 'Missing required dn attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfldap server="localhost" name="cfldap_test" username="user" password="pass" attributes="*" start="dc=example,dc=org" secure="CFSSL_RSA" />');
}, Error, 'Unexpected secure attribute value.');

r = test.cfparser.parse('<cfldap ' +
'server="localhost" ' +
'action="add" ' +
'dn="dc=example,dc=org" ' +
'attributes="*" ' +
'/>');
is.equal(r.attributes.action, 'add');
is.equal(r.attributes.delimiter, ';');
is.equal(r.attributes.filter, 'objectclass = *');
is.equal(r.attributes.port, 389);
is.equal(r.attributes.rebind, false);
is.equal(r.attributes.modify_type, 'replace');
is.equal(r.attributes.scope, 'one_level');
is.equal(r.attributes.separator, ',');
is.equal(r.attributes.sort_control, 'asc');
is.equal(r.attributes.start_row, 1);
is.equal(r.attributes.timeout, 60000);
is.equal(r.attributes.username, 'anonymous');

r = test.cfparser.parse('<cfldap ' +
'username="user" ' +
'secure="CFSSL_BASIC" ' +
'filter="objectclass = posixAccount" ' +
'password="pass" ' +
'delimiter="|" ' +
'start_row="3" ' +
'sort_control="nocase,desc" ' +
'rebind="yes" ' +
'modify_type="delete" ' +
'name="cfldap_test" ' +
'port="636" ' +
'dn="dc=example,dc=org" ' +
'scope="subtree" ' +
'attributes="*" ' +
'start="dc=example,dc=org" ' +
'timeout="30" ' +
'separator="." ' +
'server="localhost" ' +
'/>');
is.equal(r.attributes.action, 'query');
is.equal(r.attributes.attributes, "*");
is.equal(r.attributes.delimiter, '|');
is.equal(r.attributes.dn, "dc=example,dc=org");
is.equal(r.attributes.filter, 'objectclass = posixAccount');
is.equal(r.attributes.modify_type, 'delete');
is.equal(r.attributes.name, "cfldap_test");
is.equal(r.attributes.password, "pass");
is.equal(r.attributes.port, 636);
is.equal(r.attributes.rebind, true);
is.equal(r.attributes.scope, 'subtree');
is.equal(r.attributes.secure, "CFSSL_BASIC");
is.equal(r.attributes.separator, '.');
is.equal(r.attributes.server, "localhost");
is.equal(r.attributes.sort_control, "nocase,desc");
is.equal(r.attributes.start, "dc=example,dc=org");
is.equal(r.attributes.start_row, 3);
is.equal(r.attributes.timeout, 30);
is.equal(r.attributes.username, 'user');

r = test.cfparser.parse('<cfldap ' +
'server="localhost" ' +
'action="add" ' +
'sort_control="desc" ' +
'dn="dc=example,dc=org" ' +
'modify_type="add" ' +
'attributes="email" ' +
'/>');
is.equal(r.attributes.action, 'add');
is.equal(r.attributes.attributes, "email");
is.equal(r.attributes.dn, "dc=example,dc=org");
is.equal(r.attributes.modify_type, 'add');
is.equal(r.attributes.server, "localhost");
is.equal(r.attributes.sort_control, "desc");

r = test.cfparser.parse('<cfldap ' +
'server="localhost" ' +
'action="add" ' +
'sort_control="nocase , asc" ' +
'dn="dc=example,dc=net" ' +
'modify_type="add" ' +
'attributes="name,org" ' +
'/>');
is.equal(r.attributes.action, 'add');
is.equal(r.attributes.attributes, "name,org");
is.equal(r.attributes.dn, "dc=example,dc=net");
is.equal(r.attributes.modify_type, 'add');
is.equal(r.attributes.server, "localhost");
is.equal(r.attributes.sort_control, "nocase , asc");

