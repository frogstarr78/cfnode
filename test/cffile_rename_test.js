const should = require('should'),
        test = require('./testlib');

describe('Parsing a cffile rename tag', function () {

(function () {
	r = test.cfparser.parse('<cffile />');
}).should.throw('Missing required attributes.');

(function () {
	r = test.cfparser.parse('<cffile source="/tmp/sfile" destination="/tmp/dfile" />');
}).should.throw('Missing required action attribute.');

(function () {
	r = test.cfparser.parse('<cffile source="/tmp/sfile" action="rename" >');
}).should.throw('Missing required destination attribute.');

(function () {
	r = test.cfparser.parse('<cffile action="rename" destination="/tmp/file" >');
}).should.throw('Missing required source attribute.');

r = test.cfparser.parse('<cffile action="rename" destination="/tmp/dfile" source="/tmp/sfile">');
r.should.be.instanceof(Object);
.tag.should.eql('file');
.attributes.action.should.eql('rename');
.attributes.destination.should.eql('/tmp/dfile');
.attributes.source.should.eql('/tmp/sfile');

r = test.cfparser.parse('<cffile action="rename" destination="/tmp/dfile" source="/tmp/sfile" ' +
'mode="721" attributes="normal">');
r.should.be.instanceof(Object);
.tag.should.eql('file');
.attributes.action.should.eql('rename');
.attributes.destination.should.eql('/tmp/dfile');
.attributes.source.should.eql('/tmp/sfile');
is.deepEqual(.attributesr.attributes.should.eql(['normal']);
.attributes.mode.should.eql(721);

r = test.cfparser.parse('<CFFILE ' +
'ACTION="rename" ' +
'DESTINATION="/tmp/dfile" ' +
'SOURCE="/tmp/sfile" ' +
'MODE="721" ' +
'ATTRIBUTES="normal">');
r.should.be.instanceof(Object);
.tag.should.eql('file');
.attributes.action.should.eql('rename');
.attributes.destination.should.eql('/tmp/dfile');
.attributes.source.should.eql('/tmp/sfile');
is.deepEqual(.attributesr.attributes.should.eql(['normal']);
.attributes.mode.should.eql(721);

