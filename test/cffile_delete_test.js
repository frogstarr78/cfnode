const should = require('should'),
        test = require('./testlib');

describe('Parsing a cffile delete tag', function () {

(function () {
	r = test.cfparser.parse('<cffile />');
}).should.throw('Missing required attributes.');

(function () {
	r = test.cfparser.parse('<cffile file="/tmp/sfile">');
}).should.throw('Missing required action attribute.');

(function () {
	r = test.cfparser.parse('<cffile action="delete">');
}).should.throw('Missing required file attribute.');

r = test.cfparser.parse('<cffile action="delete" file="/tmp/file">');
r.should.be.instanceof(Object);
.tag.should.eql('file');
.attributes.action.should.eql('delete');
.attributes.file.should.eql('/tmp/file');

r = test.cfparser.parse('<CFFILE ' +
'FILE="/tmp/file" ' +
'ACTION="delete">');
r.should.be.instanceof(Object);
.tag.should.eql('file');
.attributes.action.should.eql('delete');
.attributes.file.should.eql('/tmp/file');

