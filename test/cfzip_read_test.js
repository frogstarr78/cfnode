const should = require('should'),
        test = require('./testlib');

describe('Parsing a cfzip read tag', function () {

(function () {
	r = test.cfparser.parse('<cfzip action="read" file="/tmp/file.zip" entrypath="/tmp/files" >');
}).should.throw('Missing required variable attribute.');

(function () {
	r = test.cfparser.parse('<cfzip action="read" variable="something" entrypath="/tmp/files" />');
}).should.throw('Missing required file attribute.');

r = test.cfparser.parse('<cfzip action="read" variable="cffile_test" file="/tmp/file.zip" entrypath="/tmp/files" >');
r.should.be.instanceof(Object);
.tag.should.eql('zip');
.attributes.action.should.eql('read');
.attributes.entry_path.should.eql('/tmp/files');
.attributes.file.should.eql('/tmp/file.zip');
.attributes.variable.should.eql('cffile_test');

r = test.cfparser.parse('<cfzip ' +
'entrypath="/tmp/files" ' +
'charset="us-ascii" ' +
'variable="cffile_test2" ' +
'action="read" ' +
'file="/tmp/file.zip">');
r.should.be.instanceof(Object);
.tag.should.eql('zip');
.attributes.action.should.eql('read');
.attributes.charset.should.eql('us-ascii');
.attributes.entry_path.should.eql('/tmp/files');
.attributes.file.should.eql('/tmp/file.zip');
.attributes.variable.should.eql('cffile_test2');

r = test.cfparser.parse('<cfzip ' +
'entry_path="/tmp/files2" ' +
'charset="us-ascii" ' +
'variable="cffile_test2" ' +
'action="read" ' +
'file="/tmp/file.zip"' +
'>');
r.should.be.instanceof(Object);
.tag.should.eql('zip');
.attributes.action.should.eql('read');
.attributes.charset.should.eql('us-ascii');
.attributes.entry_path.should.eql('/tmp/files2');
.attributes.file.should.eql('/tmp/file.zip');
.attributes.variable.should.eql('cffile_test2');

r = test.cfparser.parse('<CFZIP ' +
'VARIABLE="cffile_test3" ' +
'FILE="/tmp/file3.zip" ' +
'ENTRYPATH="/tmp/files" ' +
'ACTION="read" ' +
'CHARSET="us-ascii" />');
r.should.be.instanceof(Object);
.tag.should.eql('zip');
.attributes.action.should.eql('read');
.attributes.variable.should.eql('cffile_test3');
.attributes.file.should.eql('/tmp/file3.zip');
.attributes.entry_path.should.eql('/tmp/files');
.attributes.charset.should.eql('us-ascii');

r = test.cfparser.parse('<cfzip ' +
'action="read" ' +
'variable="cffile_test2" ' +
'file="/tmp/file.zip" ' +
'entry_path="/tmp/files2" ' +
'/>');
r.should.be.instanceof(Object);
.tag.should.eql('zip');
.attributes.action.should.eql('read');
.attributes.charset.should.eql('utf-8');
.attributes.entry_path.should.eql('/tmp/files2');
.attributes.file.should.eql('/tmp/file.zip');
.attributes.variable.should.eql('cffile_test2');

r = test.cfparser.parse('<cfzip ' +
'charset="utf-8" ' +
'action="read" ' +
'variable="cffile_test2" ' +
'file="/tmp/file.zip" ' +
'charset="us-ascii" ' +
'entry_path="/tmp/files2" ' +
'charset="iso-8859-1" ' +
'/>');
r.should.be.instanceof(Object);
.tag.should.eql('zip');
.attributes.action.should.eql('read');
.attributes.charset.should.eql('iso-8859-1');
.attributes.entry_path.should.eql('/tmp/files2');
.attributes.file.should.eql('/tmp/file.zip');
.attributes.variable.should.eql('cffile_test2');
