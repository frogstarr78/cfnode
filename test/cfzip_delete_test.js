const should = require('should'),
        test = require('./testlib');

describe('Parsing a cfzip delete tag', function () {

(function () {
	r = test.cfparser.parse('<cfzip action="delete">');
}).should.throw('Missing required file attribute.');

r = test.cfparser.parse('<cfzip action="delete" file="/tmp/file">');
r.should.be.instanceof(Object);
.tag.should.eql('zip');
.attributes.action.should.eql('delete');
.attributes.file.should.eql('/tmp/file');

r = test.cfparser.parse('<CFZIP ' +
'FILE="/tmp/file" ' +
'ACTION="delete">');
r.should.be.instanceof(Object);
.tag.should.eql('zip');
.attributes.action.should.eql('delete');
.attributes.file.should.eql('/tmp/file');

r = test.cfparser.parse('<cfzip action="delete" file="/tmp/file" entry_path="/tmp/path/to/file" filter="*.cfm" recurse="yes">');
r.should.be.instanceof(Object);
.tag.should.eql('zip');
.attributes.action.should.eql('delete');
.attributes.entry_path.should.eql('/tmp/path/to/file');
.attributes.file.should.eql('/tmp/file');
.attributes.filter.should.eql('*.cfm');
r.attributes.recurse.should.be.true;

r = test.cfparser.parse('<cfzip ' +
'entryPath="/tmp/path/to/file" ' +
'file="/tmp/file" ' +
'filter="*.cfm" ' + 
'action="delete" ' +
'recurse="yes">');
r.should.be.instanceof(Object);
.tag.should.eql('zip');
.attributes.action.should.eql('delete');
.attributes.entry_path.should.eql('/tmp/path/to/file');
.attributes.file.should.eql('/tmp/file');
.attributes.filter.should.eql('*.cfm');
r.attributes.recurse.should.be.true;
