const should = require('should'),
        test = require('./testlib');

describe('Parsing the cfzipparam tag', function() {
    it('should work as expected', function () {
		r = test.cfparser.parse('<cfzipparam />');
		r.should.be.instanceof(Object);
		r.tag.should.eql('zipparam');
		r.attributes.charset.should.eql('utf-8');
		r.attributes.recurse.should.be.false;

		r = test.cfparser.parse('<cfzipparam ' +
		'charset="us-ascii" ' +
		'content="content written" ' +
		'recurse="yes" ' +
		'entry_path="/tmp/dpath" ' +
		'filter="*.txt" ' +
		'prefix="/tmp/prefix_path" ' +
		'source="/tmp/spath" ' +
		'/>');
		r.should.be.instanceof(Object);
		r.tag.should.eql('zipparam');
		r.attributes.charset.should.eql('us-ascii');
		r.attributes.recurse.should.be.true;
		r.attributes.content.should.eql('content written');
		r.attributes.entry_path.should.eql('/tmp/dpath');
		r.attributes.filter.should.eql('*.txt');
		r.attributes.prefix.should.eql('/tmp/prefix_path');
		r.attributes.source.should.eql('/tmp/spath');

		r = test.cfparser.parse('<CFZIPPARAM '+
		'CHARSET="us-ascii" ' +
		'CONTENT="content written" ' +
		'RECURSE="yes" ' +
		'ENTRYPATH="/tmp/dpath" ' +
		'FILTER="*.txt" ' +
		'PREFIX="/tmp/prefix_path" ' +
		'SOURCE="/tmp/spath" ' +
		'/>');
		r.should.be.instanceof(Object);
		r.tag.should.eql('zipparam');
		r.attributes.charset.should.eql('us-ascii');
		r.attributes.recurse.should.be.true;
		r.attributes.content.should.eql('content written');
		r.attributes.entry_path.should.eql('/tmp/dpath');
		r.attributes.filter.should.eql('*.txt');
		r.attributes.prefix.should.eql('/tmp/prefix_path');
		r.attributes.source.should.eql('/tmp/spath');
	});
});
