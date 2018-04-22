const should = require('should'),
        test = require('./testlib');

describe("Parser parsing a cfajaximport tag", function () {
    it('works as expected', function () {
        r = test.cfparser.parse('<cfajaximport />');
        r.should.be.instanceof(Object);
        r.tag.should.eql('ajaximport');
        r.attributes.css_src.should.eql('/css/');
        r.attributes.script_src.should.eql('/scripts/');

        r = test.cfparser.parse('<CFAJAXIMPORT>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('ajaximport');
        r.attributes.css_src.should.eql('/css/');
        r.attributes.script_src.should.eql('/scripts/');

        r = test.cfparser.parse("<cfajaximport cssSrc='/scripts/' scriptSrc='/javascript/' tags='CFFORM,CFDIV' params='#{googlemapkey=\"thekey\"}#'>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('ajaximport');
        r.attributes.css_src.should.eql('/scripts/');
        r.attributes.script_src.should.eql('/javascript/');
        r.attributes.tags.should.eql(['CFFORM', 'CFDIV']);
        r.attributes.params.should.eql('#{googlemapkey="thekey"}#');

        r = test.cfparser.parse("<CFAJAXIMPORT CSSSRC='/scripts/' SCRIPTSRC='/javascript/' TAGS='CFFORM,CFDIV' PARAMS='#{googlemapkey=\"thekey\"}#' />");
        r.should.be.instanceof(Object);
        r.tag.should.eql('ajaximport');
        r.attributes.css_src.should.eql('/scripts/');
        r.attributes.script_src.should.eql('/javascript/');
        r.attributes.tags.should.eql(['CFFORM', 'CFDIV']);
        r.attributes.params.should.eql('#{googlemapkey="thekey"}#');
    });
});
