const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cfparam default="abc">');
}, Error, "Missing required name attribute.");

r = test.cfparser.parse('<cfparam name="cfparamtest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'param');
is.equal(r.attributes.name, 'cfparamtest');

r = test.cfparser.parse('<cfparam name="cfparamtest" default="abc">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'param');
is.equal(r.attributes.name, 'cfparamtest');
is.equal(r.attributes.default, 'abc');

r = test.cfparser.parse('<cfparam default="13" name="cfparamtest" min="1" max="20">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'param');
is.equal(r.attributes.name, 'cfparamtest');
is.equal(r.attributes.min, 1);
is.equal(r.attributes.max, 20);
is.equal(r.attributes.default, '13');

r = test.cfparser.parse('<cfparam default="a@b.com" pattern="[^@]+@([^\.]+.)+.+" name="cfparamtest" type="regex" min="1" max="4">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'param');
is.equal(r.attributes.name, 'cfparamtest');
is.equal(r.attributes.default, 'a@b.com');
is.deepEqual(r.attributes.pattern, new RegExp("[^@]+@([^\.]+.)+.+"));
is.equal(r.attributes.type, 'regex');
is.equal(r.attributes.min, 1);
is.equal(r.attributes.max, 4);

r = test.cfparser.parse('<CFPARAM DEFAULT="a@b.com" PATTERN="[^@]+@([^\.]+.)+.+" NAME="cfparamtest" TYPE="regex" MIN="1" MAX="4">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'param');
is.equal(r.attributes.name, 'cfparamtest');
is.equal(r.attributes.default, 'a@b.com');
is.deepEqual(r.attributes.pattern, new RegExp("[^@]+@([^\.]+.)+.+"));
is.equal(r.attributes.type, 'regex');
is.equal(r.attributes.min, 1);
is.equal(r.attributes.max, 4);
