var is = require('assert'),
	PEG= require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;
r = cf.parse('<cfajaximport />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'ajaximport');
is.equal(r.attributes.css_src, '/css/');
is.equal(r.attributes.script_src, '/scripts/');

r = cf.parse('<CFAJAXIMPORT>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'ajaximport');
is.equal(r.attributes.css_src, '/css/');
is.equal(r.attributes.script_src, '/scripts/');

r = cf.parse("<cfajaximport cssSrc='/scripts/' scriptSrc='/javascript/' tags='CFFORM,CFDIV' params='#{googlemapkey=\"thekey\"}#'>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'ajaximport');
is.equal(r.attributes.css_src, '/scripts/');
is.equal(r.attributes.script_src, '/javascript/');
is.deepEqual(r.attributes.tags, ['CFFORM', 'CFDIV']);
is.equal(r.attributes.params, '#{googlemapkey="thekey"}#');

r = cf.parse("<CFAJAXIMPORT CSSSRC='/scripts/' SCRIPTSRC='/javascript/' TAGS='CFFORM,CFDIV' PARAMS='#{googlemapkey=\"thekey\"}#' />");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'ajaximport');
is.equal(r.attributes.css_src, '/scripts/');
is.equal(r.attributes.script_src, '/javascript/');
is.deepEqual(r.attributes.tags, ['CFFORM', 'CFDIV']);
is.equal(r.attributes.params, '#{googlemapkey="thekey"}#');

test.ok();
