const should = require('should'),
        test = require('./testlib');

describe('Parsing the cfinclude tag', function () {
    it('should throw an error when missing the required template attribute', function () {
        (function () { test.cfparser.parse('<cfinclude >'); }).should.throw('Expected " ", "\\n", "\\t", or [tT] but ">" found.');
        (function () { test.cfparser.parse('<cfinclude>'); }).should.throw('Expected " ", "\\n", or "\\t" but ">" found.');
        (function () { test.cfparser.parse('<CFINCLUDE >'); }).should.throw('Expected " ", "\\n", "\\t", or [tT] but ">" found.');
        (function () { test.cfparser.parse('<CFINCLUDE>'); }).should.throw('Expected " ", "\\n", or "\\t" but ">" found.');
    });

    it('should work as expected', function () {
        r = test.cfparser.parse('<cfinclude template="/path/to/taglib.jsp">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('include');
        r.attributes.template.should.eql('/path/to/taglib.jsp');

        r = test.cfparser.parse('<CFINCLUDE TEMPLATE="/path/to/taglib.cfc">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('include');
        r.attributes.template.should.eql('/path/to/taglib.cfc');
    });
});
