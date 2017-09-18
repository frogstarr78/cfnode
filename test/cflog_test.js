const is = require('assert'), test = require('./testlib');

var r;


is.throws(function () {
	r = test.cfparser.parse('<cflog file="/path">');
}, Error, "Missing required text attributes");

r = test.cfparser.parse('<cflog text="cflog test">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'log');
is.equal(r.attributes.text, 'cflog test');
is.equal(r.attributes.application, true);
is.equal(r.attributes.log,         'application');
is.equal(r.attributes.type,        'information');

r = test.cfparser.parse('<cflog text="cflog test" file="where">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'log');
is.equal(r.attributes.text, 'cflog test');
is.equal(r.attributes.application, true);
is.equal(r.attributes.log,         'application');
is.equal(r.attributes.type,        'information');
is.equal(r.attributes.file,        'where');

r = test.cfparser.parse('<cflog text="cflog test" application="true" file="log" type="fatal" log="scheduler">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'log');
is.equal(r.attributes.text, 'cflog test');
is.equal(r.attributes.application, true);
is.equal(r.attributes.file, 'log');
is.equal(r.attributes.log,  'application');
is.equal(r.attributes.type, 'fatal');

r = test.cfparser.parse('<CFLOG TEXT="cflog test" APPLICATION="true" FILE="log" TYPE="fatal" LOG="scheduler">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'log');
is.equal(r.attributes.text, 'cflog test');
is.equal(r.attributes.application, true);
is.equal(r.attributes.file, 'log');
is.equal(r.attributes.log,  'application');
is.equal(r.attributes.type, 'fatal');

r = test.cfparser.parse('<cflog text="cflog test" application="true" type="fatal" log="scheduler">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'log');
is.equal(r.attributes.text, 'cflog test');
is.equal(r.attributes.application, true);
is.equal(r.attributes.file, undefined);
is.equal(r.attributes.log,  'scheduler');
is.equal(r.attributes.type, 'fatal');

r = test.cfparser.parse('<CFLOG TEXT="cflog test" APPLICATION="true" TYPE="fatal" LOG="Scheduler">');
is.equal(r instanceof Object, true);
is.equal(r.attributes.application, true);
is.equal(r.attributes.file, undefined);
is.equal(r.attributes.log,  'scheduler');
is.equal(r.attributes.type, 'fatal');

