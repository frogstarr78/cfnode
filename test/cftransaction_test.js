var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	testlib = require('./testlib');

var r;

r = cf.parse('<cftransaction></cftransaction>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'transaction');
is.equal(r.content, '');
is.equal(r.attributes.action, 'begin');
is.equal(r.attributes.nested, true);

r = cf.parse('<cftransaction action="commit" savepoint="transaction_savepoint" isolation="serializable" nested="no">' +
"\n</cftransaction>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'transaction');
is.equal(r.content, "\n");
is.equal(r.attributes.action, 'commit');
is.equal(r.attributes.nested, false);
is.equal(r.attributes.savepoint, 'transaction_savepoint');
is.equal(r.attributes.isolation, 'serializable');

r = cf.parse('<cftransaction action="commit" savepoint="transaction_savepoint" isolation="serializable" nested="no">' +
"\n</cftransaction>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'transaction');
is.equal(r.content, "\n");

r = cf.parse('<CFTRANSACTION' +
		' ACTION="commit"' +
		' SAVEPOINT="transaction_savepoint"' + 
		' NESTED="no"' + 
		' ISOLATION="serializable"' + 
'>' + 
"\nThis is the content that is saved #NOW()#" +
"\n</CFTRANSACTION>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'transaction');
is.equal(r.content, "\nThis is the content that is saved #NOW()#\n");
is.equal(r.attributes.action, 'commit');
is.equal(r.attributes.nested, false);
is.equal(r.attributes.savepoint, 'transaction_savepoint');
is.equal(r.attributes.isolation, 'serializable');

testlib.die("Success!", 0);
