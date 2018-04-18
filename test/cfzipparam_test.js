const is = require('assert'),
  should = require('should'),
    test = require('./testlib');

describe('Parsing the cfzipparam tag', function() {
    it('should work as expected', function () {
		r = test.cfparser.parse('<cfzipparam />');
		is.equal(r instanceof Object, true);
		is.equal(r.tag, 'zipparam');
		is.equal(r.attributes.charset, 'utf-8');
		is.equal(r.attributes.recurse, false);

		r = test.cfparser.parse('<cfzipparam ' +
		'charset="us-ascii" ' +
		'content="content written" ' +
		'recurse="yes" ' +
		'entry_path="/tmp/dpath" ' +
		'filter="*.txt" ' +
		'prefix="/tmp/prefix_path" ' +
		'source="/tmp/spath" ' +
		'/>');
		is.equal(r instanceof Object, true);
		is.equal(r.tag, 'zipparam');
		is.equal(r.attributes.charset, 'us-ascii');
		is.equal(r.attributes.recurse, true);
		is.equal(r.attributes.content, 'content written');
		is.equal(r.attributes.entry_path, '/tmp/dpath');
		is.equal(r.attributes.filter, '*.txt');
		is.equal(r.attributes.prefix, '/tmp/prefix_path');
		is.equal(r.attributes.source, '/tmp/spath');

		r = test.cfparser.parse('<CFZIPPARAM '+
		'CHARSET="us-ascii" ' +
		'CONTENT="content written" ' +
		'RECURSE="yes" ' +
		'ENTRYPATH="/tmp/dpath" ' +
		'FILTER="*.txt" ' +
		'PREFIX="/tmp/prefix_path" ' +
		'SOURCE="/tmp/spath" ' +
		'/>');
		is.equal(r instanceof Object, true);
		is.equal(r.tag, 'zipparam');
		is.equal(r.attributes.charset, 'us-ascii');
		is.equal(r.attributes.recurse, true);
		is.equal(r.attributes.content, 'content written');
		is.equal(r.attributes.entry_path, '/tmp/dpath');
		is.equal(r.attributes.filter, '*.txt');
		is.equal(r.attributes.prefix, '/tmp/prefix_path');
		is.equal(r.attributes.source, '/tmp/spath');
	});
});
