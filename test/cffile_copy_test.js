const should = require('should'),
        test = require('./testlib');

describe('Parsing a cffile copy tag', function () {

(function () {
	r = test.cfparser.parse('<cffile />');
}).should.throw('Missing required attributes.');

(function () {
	r = test.cfparser.parse('<cffile source="/tmp/sfile" destination="/tmp/dfile" >');
}).should.throw('Missing required action attribute.');

(function () {
	r = test.cfparser.parse('<cffile action="copy" source="/tmp/sfile" >');
}).should.throw('Missing required destination attribute.');

(function () {
	r = test.cfparser.parse('<cffile action="copy" destination="/tmp/dfile" />');
}).should.throw('Missing required source attribute.');

r = test.cfparser.parse('<cffile action="copy" source="/tmp/sfile" destination="/tmp/dfile">');
r.should.be.instanceof(Object);
.tag.should.eql('file');
.attributes.action.should.eql('copy');
.attributes.destination.should.eql('/tmp/dfile');
.attributes.source.should.eql('/tmp/sfile');

r = test.cfparser.parse('<cffile action="copy" mode="721" attributes="normal" destination="/tmp/dfile" source="/tmp/sfile">');
r.should.be.instanceof(Object);
.tag.should.eql('file');
.attributes.action.should.eql('copy');
.attributes.destination.should.eql('/tmp/dfile');
.attributes.source.should.eql('/tmp/sfile');
is.deepEqual(.attributesr.attributes.should.eql(['normal']);
.attributes.mode.should.eql(721);

r = test.cfparser.parse('<CFFILE ' +
'ACTION="copy" ' +
'MODE="721" ' +
'SOURCE="/tmp/sfile" ' +
'ATTRIBUTES="normal,readOnly" ' +
'DESTINATION="/tmp/dfile">');
r.should.be.instanceof(Object);
.tag.should.eql('file');
.attributes.action.should.eql('copy');
.attributes.destination.should.eql('/tmp/dfile');
.attributes.source.should.eql('/tmp/sfile');
is.deepEqual(.attributesr.attributes.should.eql(['nomal'.should.eql('readOnly']);
.attributes.mode.should.eql(721);

