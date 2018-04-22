const should = require('should'),
        test = require('./testlib');

describe('Parsing a cffile read tag', function () {

(function () {
	r = test.cfparser.parse('<cffile />');
}).should.throw('Missing required attributes.');

(function () {
	r = test.cfparser.parse('<cffile file="/tmp/file" variable="something" >');
}).should.throw('Missing required action attribute.');

(function () {
	r = test.cfparser.parse('<cffile action="read" file="/tmp/file" >');
}).should.throw('Missing required variable attribute.');

(function () {
	r = test.cfparser.parse('<cffile action="read" variable="something" />');
}).should.throw('Missing required file attribute.');

r = test.cfparser.parse('<cffile action="read" variable="cffile_test" file="/tmp/file" >');
r.should.be.instanceof(Object);
.tag.should.eql('file');
.attributes.action.should.eql('read');
.attributes.variable.should.eql('cffile_test');
.attributes.file.should.eql('/tmp/file');
.attributes.charset.should.eql('utf-8');

r = test.cfparser.parse('<cffile action="read" charset="us-ascii" variable="cffile_test2" file="/tmp/file">');
r.should.be.instanceof(Object);
.tag.should.eql('file');
.attributes.action.should.eql('read');
.attributes.variable.should.eql('cffile_test2');
.attributes.file.should.eql('/tmp/file');
.attributes.charset.should.eql('us-ascii');

r = test.cfparser.parse('<CFFILE ' +
'ACTION="read" ' +
'VARIABLE="cffile_test3" ' +
'FILE="/tmp/file" ' +
'CHARSET="us-ascii" />');
r.should.be.instanceof(Object);
.tag.should.eql('file');
.attributes.action.should.eql('read');
.attributes.variable.should.eql('cffile_test3');
.attributes.file.should.eql('/tmp/file');
.attributes.charset.should.eql('us-ascii');

