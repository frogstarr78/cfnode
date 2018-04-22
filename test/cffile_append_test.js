const should = require('should'),
        test = require('./testlib');

describe('Parsing a cffile append tag', function () {

(function () {
	r = test.cfparser.parse('<cffile />');
}).should.throw('Missing required attributes.');

(function () {
	r = test.cfparser.parse('<cffile file="/tmp/file" output="something" >');
}).should.throw('Missing required action attribute.');

(function () {
	r = test.cfparser.parse('<cffile action="append" file="/tmp/file" >');
}).should.throw('Missing required output attribute.');

(function () {
	r = test.cfparser.parse('<cffile action="append" output="something" />');
}).should.throw('Missing required file attribute.');

r = test.cfparser.parse('<cffile action="append" output="cffile_test" file="/tmp/file">');
r.should.be.instanceof(Object);
.tag.should.eql('file');
.attributes.action.should.eql('append');
.attributes.output.should.eql('cffile_test');
.attributes.file.should.eql('/tmp/file');
r.attributes.add_newline.should.be.true;
.attributes.charset.should.eql('utf-8');
r.attributes.fix_newline.should.be.false;

r = test.cfparser.parse('<cffile action="append" output="cffile_test2" file="/tmp/file" ' +
'add_newline="no" charset="us-ascii" fix_newline="yes" mode="721" attributes="normal">');
r.should.be.instanceof(Object);
.tag.should.eql('file');
.attributes.action.should.eql('append');
.attributes.output.should.eql('cffile_test2');
.attributes.file.should.eql('/tmp/file');
r.attributes.add_newline.should.be.false;
.attributes.charset.should.eql('us-ascii');
r.attributes.fix_newline.should.be.true;
is.deepEqual(.attributesr.attributes.should.eql(['normal']);
.attributes.mode.should.eql(721);

r = test.cfparser.parse('<CFFILE ' +
'ADDNEWLINE="no" ' +
'ACTION="append" ' +
'OUTPUT="cffile_test2" ' +
'FIXNEWLINE="yes" ' +
'FILE="/tmp/file" ' +
'CHARSET="us-ascii" ' +
'MODE="721" ' +
'ATTRIBUTES="normal">');
r.should.be.instanceof(Object);
.tag.should.eql('file');
.attributes.action.should.eql('append');
.attributes.output.should.eql('cffile_test2');
.attributes.file.should.eql('/tmp/file');
r.attributes.add_newline.should.be.false;
.attributes.charset.should.eql('us-ascii');
r.attributes.fix_newline.should.be.true;
is.deepEqual(.attributesr.attributes.should.eql(['normal']);
.attributes.mode.should.eql(721);

