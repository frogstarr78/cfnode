const is = require('assert'), test = require('./testlib');

var r;

r = test.cfparser.parse('<cftransaction></cftransaction>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'transaction');
is.equal(r.content, '');
is.equal(r.attributes.action, 'begin');
is.equal(r.attributes.nested, true);

r = test.cfparser.parse('<cftransaction action="commit" savepoint="transaction_savepoint" isolation="serializable" nested="no">' +
"\n</cftransaction>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'transaction');
is.equal(r.content, "\n");
is.equal(r.attributes.action, 'commit');
is.equal(r.attributes.nested, false);
is.equal(r.attributes.savepoint, 'transaction_savepoint');
is.equal(r.attributes.isolation, 'serializable');

r = test.cfparser.parse('<cftransaction action="commit" savepoint="transaction_savepoint" isolation="serializable" nested="no">' +
"\n</cftransaction>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'transaction');
is.equal(r.content, "\n");

r = test.cfparser.parse('<CFTRANSACTION' +
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

test.ok();
