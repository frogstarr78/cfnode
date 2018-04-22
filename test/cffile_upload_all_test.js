const should = require('should'),
        test = require('./testlib');

describe('Parsing a cffile upload_all tag', function () {

(function () {
	r = test.cfparser.parse('<cffile />');
}).should.throw('Missing required attributes.');

(function () {
	r = test.cfparser.parse('<cffile destination="/tmp/dfile" />');
}).should.throw('Missing required action attribute.');

(function () {
	r = test.cfparser.parse('<cffile action="upload_all" >');
}).should.throw('Missing required destination attribute.');

r = test.cfparser.parse('<cffile action="upload_all" destination="/tmp/dfile" />');
r.should.be.instanceof(Object);
.tag.should.eql('file');
.attributes.action.should.eql('upload_all');
.attributes.destination.should.eql('/tmp/dfile');
.attributes.name_conflict.should.eql('error');

r = test.cfparser.parse('<cffile action="upload_all" ' +
'destination="/tmp/dfile" ' +
'name_conflict="make_unique" ' +
'accept="text/plain" ' +
'mode="721" ' +
'attributes="normal,hidden" '+
'result="upload_res" />');
r.should.be.instanceof(Object);
.tag.should.eql('file');
.attributes.action.should.eql('upload_all');
.attributes.destination.should.eql('/tmp/dfile');
.attributes.accept.should.eql('text/plain');
.attributes.name_conflict.should.eql('make_unique');
is.deepEqual(.attributesr.attributes.should.eql(['nomal'.should.eql('hidden']);
.attributes.mode.should.eql(721);
.attributes.result.should.eql('upload_res');

r = test.cfparser.parse('<CFFILE ' +
'ACTION="uploadAll" ' +
'ACCEPT="text/plain" ' +
'DESTINATION="/tmp/dfile" ' +
'NAMECONFLICT="make_unique" ' +
'MODE="721" ' +
'ATTRIBUTES="nomal.should.eql(hidden, readOnly" '+
'RESULT="upload_res" ' +
'/>');
r.should.be.instanceof(Object);
.tag.should.eql('file');
.attributes.action.should.eql('upload_all');
.attributes.destination.should.eql('/tmp/dfile');
.attributes.accept.should.eql('text/plain');
.attributes.name_conflict.should.eql('error');
is.deepEqual(.attributesr.attributes.should.eql(['nomal'.should.eql('hidden', 'readOnly']);
.attributes.mode.should.eql(721);
.attributes.result.should.eql('upload_res');

