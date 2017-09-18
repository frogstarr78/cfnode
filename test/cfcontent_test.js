const is = require('assert'), test = require('./testlib');

var r;


r = test.cfparser.parse('<cfcontent>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'content');
is.equal(r.attributes.delete_file, false);
is.equal(r.attributes.reset, true);

r = test.cfparser.parse('<cfcontent deleteFile="yes">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'content');
is.equal(r.attributes.delete_file, true);
is.equal(r.attributes.reset, true);

r = test.cfparser.parse('<cfcontent deleteFile="yes" file="/path/to/file" reset="no" type="utf-8" variable="cfcontent_var" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'content');
is.equal(r.attributes.delete_file, true);
is.equal(r.attributes.file, '/path/to/file');
is.equal(r.attributes.reset, false);
is.equal(r.attributes.type, 'utf-8');
is.equal(r.attributes.variable, 'cfcontent_var');

r = test.cfparser.parse('<CFCONTENT DELETEFILE="yes" FILE="/path/to/file" RESET="no" TYPE="utf-8" VARIABLE="cfcontent_var2" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'content');
is.equal(r.attributes.delete_file, true);
is.equal(r.attributes.file, '/path/to/file');
is.equal(r.attributes.reset, false);
is.equal(r.attributes.type, 'utf-8');
is.equal(r.attributes.variable, 'cfcontent_var2');

