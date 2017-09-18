const is = require('assert'), test = require('./testlib');

var r;

is.equal = is.deepEqual;
is.throws(function () {
	r = test.cfparser.parse('<cfmail></cfmail>');
}, Error, "Missing required attributes.");

is.throws(function () {
	r = test.cfparser.parse('<cfmail to="me@example.com" from="me@example.com"></cfmail>');
}, Error, "Missing required subject attribute.");

is.throws(function () {
	r = test.cfparser.parse('<cfmail to="me@example.com" subject="cfmail test"></cfmail>');
}, Error, "Missing required from attribute.");

is.throws(function () {
	r = test.cfparser.parse('<cfmail from="me@example.com" subject="cfmail test"></cfmail>');
}, Error, "Missing required to attribute.");

r = test.cfparser.parse('<cfmail ' +
'to="me@example.com" ' +
'from="you@example.com" ' +
'subject="cfmail test"' +
'></cfmail>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'mail');
is.equal(r.content, '');
is.equal(r.attributes.charset, 'utf-8');
is.equal(r.attributes.debug, false);
is.equal(r.attributes.from, 'you@example.com');
is.equal(r.attributes.group, 'CurrentRow');
is.equal(r.attributes.group_case_sensitive, false);
is.equal(r.attributes.mailer_id, 'ColdFusion Application Server');
is.equal(r.attributes.port, 25);
is.equal(r.attributes.priority, 'normal');
is.equal(r.attributes.remove, false);
is.equal(r.attributes.start_row, 1);
is.equal(r.attributes.subject, 'cfmail test');
is.equal(r.attributes.to, 'me@example.com');
is.equal(r.attributes.type, 'text/plain');
is.equal(r.attributes.wrap_text, 80);

r = test.cfparser.parse('<cfmail ' +
'debug="yes" ' +
'group="date" ' +
'to="me@example.com" ' +
'group_case_sensitive="yes" ' +
'charset="us-ascii" ' +
'from="you@example.com" ' +
'mailer_id="CFNode Mail Test" ' +
'wrap_text="30" ' +
'subject="cfmail test" ' +
'priority="1" ' +
'remove="yes" ' +
'type="text/html" ' +
">\nStuff" +
'</cfmail>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'mail');
is.equal(r.content, "\nStuff");
is.equal(r.attributes.charset, 'us-ascii');
is.equal(r.attributes.debug, true);
is.equal(r.attributes.from, 'you@example.com');
is.equal(r.attributes.group, 'date');
is.equal(r.attributes.group_case_sensitive, true);
is.equal(r.attributes.mailer_id, 'CFNode Mail Test');
is.equal(r.attributes.priority, 'highest');
is.equal(r.attributes.port, 25);
is.equal(r.attributes.remove, true);
is.equal(r.attributes.start_row, 1);
is.equal(r.attributes.subject, 'cfmail test');
is.equal(r.attributes.to, 'me@example.com');
is.equal(r.attributes.type, 'text/html');
is.equal(r.attributes.wrap_text, 30);

r = test.cfparser.parse('<CFMAIL ' +
'DEBUG="yes" ' +
'GROUP="date" ' +
'CC="other@example.com" ' +
'BCC="another@example.com" ' +
'USERNAME="mail_user" ' +
'USESSL="yes" ' +
'FAILTO="none@example.com" ' +
'TO="me@example.com" ' +
'FROM="you@example.com" ' +
'SUBJECT="cfmail test" ' +
'GROUPCASESENSITIVE="yes" ' +
'CHARSET="us-ascii" ' +
'KEYALIAS="ks_alias_name" ' +
'KEYPASSWORD="pk_pass" ' +
'KEYSTORE="/path/to/ks" ' +
'REMOVE="yes" ' +
'SERVER="mail.example.com" ' +
'KEYSTOREPASSWORD="ks_pass" ' +
'MAILERID="CFNode Mail Test2" ' +
'MAXROWS="2" ' +
'MIMEATTACH="/path/to/mime/file" ' +
'PASSWORD="passwd" ' +
'PORT="587" ' +
'QUERY="qry" ' +
'WRAPTEXT="31" ' +
'REPLYTO="me2@example.org" ' +
'PRIORITY="2" ' +
'SIGN="yes" ' +
'TYPE="text/html" ' +
'SPOOLENABLE="yes" ' +
'STARTROW="4" ' +
'TIMEOUT="4" ' +
'USETSL="yes" ' +
">\nStuff" +
'</CFMAIL>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'mail');
is.equal(r.content, "\nStuff");
is.equal(r.attributes.bcc, 'another@example.com');
is.equal(r.attributes.cc, 'other@example.com');
is.equal(r.attributes.charset, 'us-ascii');
is.equal(r.attributes.debug, true);
is.equal(r.attributes.fail_to, 'none@example.com');
is.equal(r.attributes.from, 'you@example.com');
is.equal(r.attributes.group, 'date');
is.equal(r.attributes.group_case_sensitive, true);
is.equal(r.attributes.key_alias, 'ks_alias_name');
is.equal(r.attributes.key_password, 'pk_pass');
is.equal(r.attributes.key_store, '/path/to/ks');
is.equal(r.attributes.key_store_password, 'ks_pass');
is.equal(r.attributes.mailer_id, 'CFNode Mail Test2');
is.equal(r.attributes.max_rows, 2);
is.equal(r.attributes.mime_attach, '/path/to/mime/file');
is.equal(r.attributes.password, 'passwd');
is.equal(r.attributes.port, 587);
is.equal(r.attributes.priority, 'high');
is.equal(r.attributes.query, 'qry');
is.equal(r.attributes.remove, true);
is.equal(r.attributes.reply_to, 'me2@example.org');
is.equal(r.attributes.server, 'mail.example.com');
is.equal(r.attributes.sign, true);
is.equal(r.attributes.spool_enable, true);
is.equal(r.attributes.start_row, 4);
is.equal(r.attributes.subject, 'cfmail test');
is.equal(r.attributes.timeout, 4);
is.equal(r.attributes.to, 'me@example.com');
is.equal(r.attributes.type, 'text/html');
is.equal(r.attributes.username, 'mail_user');
is.equal(r.attributes.use_ssl, true);
is.equal(r.attributes.use_tsl, true);
is.equal(r.attributes.wrap_text, 31);
