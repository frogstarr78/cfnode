const is = require('assert'), test = require('./testlib');

r = test.cfparser.parse('<cfajaximport />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'ajaximport');
is.equal(r.attributes.css_src, '/css/');
is.equal(r.attributes.script_src, '/scripts/');

r = test.cfparser.parse('<CFAJAXIMPORT>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'ajaximport');
is.equal(r.attributes.css_src, '/css/');
is.equal(r.attributes.script_src, '/scripts/');

r = test.cfparser.parse("<cfajaximport cssSrc='/scripts/' scriptSrc='/javascript/' tags='CFFORM,CFDIV' params='#{googlemapkey=\"thekey\"}#'>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'ajaximport');
is.equal(r.attributes.css_src, '/scripts/');
is.equal(r.attributes.script_src, '/javascript/');
is.deepEqual(r.attributes.tags, ['CFFORM', 'CFDIV']);
is.equal(r.attributes.params, '#{googlemapkey="thekey"}#');

r = test.cfparser.parse("<CFAJAXIMPORT CSSSRC='/scripts/' SCRIPTSRC='/javascript/' TAGS='CFFORM,CFDIV' PARAMS='#{googlemapkey=\"thekey\"}#' />");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'ajaximport');
is.equal(r.attributes.css_src, '/scripts/');
is.equal(r.attributes.script_src, '/javascript/');
is.deepEqual(r.attributes.tags, ['CFFORM', 'CFDIV']);
is.equal(r.attributes.params, '#{googlemapkey="thekey"}#');

