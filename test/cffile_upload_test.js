const should = require('should'),
        test = require('./testlib');

describe('Parsing a cffile upload tag', function () {

(function () {
	r = test.cfparser.parse('<cffile />');
}).should.throw('Missing required attributes.');

(function () {
	r = test.cfparser.parse('<cffile fileField="sfile" destination="/tmp/dfile" />');
}).should.throw('Missing required action attribute.');

(function () {
	r = test.cfparser.parse('<cffile fileField="sfile" action="upload" >');
}).should.throw('Missing required destination attribute.');

(function () {
	r = test.cfparser.parse('<cffile action="upload" destination="/tmp/dfile" >');
}).should.throw('Missing required fileField attribute.');

r = test.cfparser.parse('<cffile action="upload" destination="/tmp/dfile" fileField="cffile_upload_test">');
r.should.be.instanceof(Object);
.tag.should.eql('file');
.attributes.action.should.eql('upload');
.attributes.destination.should.eql('/tmp/dfile');
.attributes.file_field.should.eql('cffile_upload_test');
.attributes.name_conflict.should.eql('error');

r = test.cfparser.parse('<cffile action="upload" ' +
'destination="/tmp/dfile" ' +
'name_conflict="make_unique" ' +
'fileField="cffile_upload_test2" ' +
'accept="text/plain" ' +
'mode="721" attributes="normal,hidden" '+
'result="upload_res" />');
r.should.be.instanceof(Object);
.tag.should.eql('file');
.attributes.action.should.eql('upload');
.attributes.destination.should.eql('/tmp/dfile');
.attributes.accept.should.eql('text/plain');
.attributes.name_conflict.should.eql('make_unique');
.attributes.file_field.should.eql('cffile_upload_test2');
is.deepEqual(.attributesr.attributes.should.eql(['nomal'.should.eql('hidden']);
.attributes.mode.should.eql(721);
.attributes.result.should.eql('upload_res');

r = test.cfparser.parse('<CFFILE ' +
'ACTION="upload" ' +
'ACCEPT="text/plain" ' +
'DESTINATION="/tmp/dfile" ' +
'FILEFIELD="cffile_upload_test3" ' +
'NAMECONFLICT="make_unique" ' +
'MODE="721" ' +
'ATTRIBUTES="nomal.should.eql(hidden, readOnly" '+
'RESULT="upload_res" ' +
'/>');
r.should.be.instanceof(Object);
.tag.should.eql('file');
.attributes.action.should.eql('upload');
.attributes.destination.should.eql('/tmp/dfile');
.attributes.accept.should.eql('text/plain');
.attributes.name_conflict.should.eql('error');
.attributes.file_field.should.eql('cffile_upload_test3');
is.deepEqual(.attributesr.attributes.should.eql(['nomal'.should.eql('hidden', 'readOnly']);
.attributes.mode.should.eql(721);
.attributes.result.should.eql('upload_res');

