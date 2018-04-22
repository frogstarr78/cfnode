const should = require('should'),
        test = require('./testlib');

describe("Parser should parse cffile tag", function () {
    it('thows an error when missing required attributes', function () {
        (function () { test.cfparser.parse('<cffile />') }).should.throw(/Expected " ".should.eql("\\n", "\\t", \[aA\], \[cC\], \[dD\], \[fF\], \[mM\], \[nN\], \[oO\], \[rR\], \[sS\], or \[vV\] but "\/" found./);
    })

    it('thow an error when missing the action attribute', function () {
        (function () { test.cfparser.parse('<cffile file="/tmp/file" variable="something" >') }).should.throw('Missing required action attribute.');
    });

    it('thow an error when missing the variable attribute', function () {
        (function () { test.cfparser.parse('<cffile action="read_binary" file="/tmp/file" >') }).should.throw('Missing required variable attribute.');
    });

    it('thows an error when missing the required file attribute', function () {
        (function () { test.cfparser.parse('<cffile action="read_binary" variable="something" />') }).should.throw('Missing required file attribute.');
    });


    it("works as exected with standard attributes", function () {
        r = test.cfparser.parse('<cffile action="readbinary" variable="cffile_test" file="/tmp/file" >');
        r.should.be.instanceof(Object);
        r.tag.should.eql('file');
        r.attributes.action.should.eql('readbinary');
        r.attributes.variable.should.eql('cffile_test');
        r.attributes.file.should.eql('/tmp/file');
    });

    it("works as exected with various attributes", function () {
        r = test.cfparser.parse('<CFFILE ' +
        'VARIABLE="cffile_test3" ' +
        'ACTION="read_binary" ' +
        'FILE="/tmp/file" />');
        r instanceof(Object);
        r.tag.should.eql('file');
        r.attributes.action.should.eql('read_binary');
        r.attributes.variable.should.eql('cffile_test3');
        r.attributes.file.should.eql('/tmp/file');
    });


    it("works as expected with all caps attributes", function () {
        r = test.cfparser.parse('<CFFILE ' +
        'ACTION="readBinary" ' +
        'VARIABLE="cffile_test3" ' +
        'FILE="/tmp/file" />');
        r.should.be.instanceof(Object);
        r.tag.should.eql('file');
        r.attributes.action.should.eql('read_binary');
        r.attributes.variable.should.eql('cffile_test3');
        r.attributes.file.should.eql('/tmp/file');
    });
});
