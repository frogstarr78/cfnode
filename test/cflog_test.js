var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;


is.throws(function () {
	r = cf.parse('<cflog>');
}, Error);

r = cf.parse('<cflog text="cflog test">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'log');
is.equal(r.attributes.text, 'cflog test');
is.equal(r.attributes.application, true);
is.equal(r.attributes.log,         'application');
is.equal(r.attributes.type,        'information');

r = cf.parse('<cflog text="cflog test" file="where">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'log');
is.equal(r.attributes.text, 'cflog test');
is.equal(r.attributes.application, true);
is.equal(r.attributes.log,         'application');
is.equal(r.attributes.type,        'information');
is.equal(r.attributes.file,        'where');

r = cf.parse('<cflog text="cflog test" application="true" file="log" type="fatal" log="scheduler">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'log');
is.equal(r.attributes.text, 'cflog test');
is.equal(r.attributes.application, true);
is.equal(r.attributes.file, 'log');
is.equal(r.attributes.log,  'application');
is.equal(r.attributes.type, 'fatal');

r = cf.parse('<CFLOG TEXT="cflog test" APPLICATION="true" FILE="log" TYPE="fatal" LOG="scheduler">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'log');
is.equal(r.attributes.text, 'cflog test');
is.equal(r.attributes.application, true);
is.equal(r.attributes.file, 'log');
is.equal(r.attributes.log,  'application');
is.equal(r.attributes.type, 'fatal');

r = cf.parse('<cflog text="cflog test" application="true" type="fatal" log="scheduler">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'log');
is.equal(r.attributes.text, 'cflog test');
is.equal(r.attributes.application, true);
is.equal(r.attributes.file, undefined);
is.equal(r.attributes.log,  'scheduler');
is.equal(r.attributes.type, 'fatal');

r = cf.parse('<CFLOG TEXT="cflog test" APPLICATION="true" TYPE="fatal" LOG="Scheduler">');
is.equal(r instanceof Object, true);
is.equal(r.attributes.application, true);
is.equal(r.attributes.file, undefined);
is.equal(r.attributes.log,  'scheduler');
is.equal(r.attributes.type, 'fatal');

test.ok();
