const should = require('should'),
        test = require('./testlib');

describe('Parsing a cffile move tag', function () {

(function () {
	r = test.cfparser.parse('<cffile />');
}).should.throw('Missing required attributes.');

(function () {
	r = test.cfparser.parse('<cffile source="/tmp/sfile" destination="/tmp/dfile" />');
}).should.throw('Missing required action attribute.');

(function () {
	r = test.cfparser.parse('<cffile source="/tmp/sfile" action="move" >');
}).should.throw('Missing required destination attribute.');

(function () {
	r = test.cfparser.parse('<cffile action="move" destination="/tmp/file" >');
}).should.throw('Missing required source attribute.');

r = test.cfparser.parse('<cffile action="move" destination="/tmp/dfile" source="/tmp/sfile">');
r.should.be.instanceof(Object);
.tag.should.eql('file');
.attributes.action.should.eql('move');
.attributes.destination.should.eql('/tmp/dfile');
.attributes.source.should.eql('/tmp/sfile');
.attributes.charset.should.eql('utf-8');

r = test.cfparser.parse('<cffile action="move" destination="/tmp/dfile" source="/tmp/sfile" ' +
'charset="us-ascii" mode="721" attributes="normal">');
r.should.be.instanceof(Object);
.tag.should.eql('file');
.attributes.action.should.eql('move');
.attributes.destination.should.eql('/tmp/dfile');
.attributes.source.should.eql('/tmp/sfile');
.attributes.charset.should.eql('us-ascii');
is.deepEqual(.attributesr.attributes.should.eql(['normal']);
.attributes.mode.should.eql(721);

r = test.cfparser.parse('<CFFILE ' +
'ACTION="move" ' +
'DESTINATION="/tmp/dfile" ' +
'SOURCE="/tmp/sfile" ' +
'CHARSET="us-ascii" ' +
'MODE="721" ' +
'ATTRIBUTES="normal">');
r.should.be.instanceof(Object);
.tag.should.eql('file');
.attributes.action.should.eql('move');
.attributes.destination.should.eql('/tmp/dfile');
.attributes.source.should.eql('/tmp/sfile');
.attributes.charset.should.eql('us-ascii');
is.deepEqual(.attributesr.attributes.should.eql(['normal']);
.attributes.mode.should.eql(721);

