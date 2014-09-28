var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cfparam default="abc">');
}, Error, "Missing required name attribute.");

r = cf.parse('<cfparam name="cfparamtest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'param');
is.equal(r.attributes.name, 'cfparamtest');

r = cf.parse('<cfparam name="cfparamtest" default="abc">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'param');
is.equal(r.attributes.name, 'cfparamtest');
is.equal(r.attributes.default, 'abc');

r = cf.parse('<cfparam default="13" name="cfparamtest" min="1" max="20">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'param');
is.equal(r.attributes.name, 'cfparamtest');
is.equal(r.attributes.min, 1);
is.equal(r.attributes.max, 20);
is.equal(r.attributes.default, '13');

r = cf.parse('<cfparam default="a@b.com" pattern="[^@]+@([^\.]+.)+.+" name="cfparamtest" type="regex" min="1" max="4">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'param');
is.equal(r.attributes.name, 'cfparamtest');
is.equal(r.attributes.default, 'a@b.com');
is.deepEqual(r.attributes.pattern, new RegExp("[^@]+@([^\.]+.)+.+"));
is.equal(r.attributes.type, 'regex');
is.equal(r.attributes.min, 1);
is.equal(r.attributes.max, 4);

r = cf.parse('<CFPARAM DEFAULT="a@b.com" PATTERN="[^@]+@([^\.]+.)+.+" NAME="cfparamtest" TYPE="regex" MIN="1" MAX="4">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'param');
is.equal(r.attributes.name, 'cfparamtest');
is.equal(r.attributes.default, 'a@b.com');
is.deepEqual(r.attributes.pattern, new RegExp("[^@]+@([^\.]+.)+.+"));
is.equal(r.attributes.type, 'regex');
is.equal(r.attributes.min, 1);
is.equal(r.attributes.max, 4);

test.ok();
