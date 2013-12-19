var is = require('assert'),
	PEG= require('pegjs'),
	cf = require(__dirname + '/../cf'),
	cftaglib = require(__dirname + '/../lib/cftag'),
	cftag = cftaglib.cftag,
	testlib = require('./testlib');

var r = new cftag('cftest', [], '');
is(r instanceof cftag);
is.equal('test', r.tag);
is.equal('', r.content);
is.equal(0, Object.keys(r.attributes).length);
is(r.is_empty());

r = new cftag('cftest', [], 'content here');
is(r instanceof cftag);
is.equal('test', r.tag);
is.equal('content here', r.content);
is.equal(0, Object.keys(r.attributes).length);
is(!r.is_empty());

r = new cftag('cftest', [{ name: 'name', value: 'attr1'}, { name: 'name', value: 'attr2'}, { name: 'value', value: 'attr3'}], 'content here');
is(r instanceof cftag);
is.equal('test', r.tag);
is.equal('content here', r.content);
is.deepEqual({name: 'attr2', value: 'attr3'}, r.attributes);
is(!r.is_empty());

cftaglib.tag_defaults['test'] = [{name: 'type', value: 'atype'}];
r = new cftag('cftest', [{ name: 'name', value: 'attr1'}, { name: 'name', value: 'attr2'}, { name: 'value', value: 'attr3'}, { name: 'value2', value: 'attr4'}], 'content here');
is(r instanceof cftag);
is.equal('test', r.tag);
is.equal('content here', r.content);
is.deepEqual({name: 'attr2', value: 'attr3', type: 'atype', value2: 'attr4'}, r.attributes);
is(!r.is_empty());

testlib.die('Success!', 0);
