var is = require('assert'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cffunction>');
}, Error);

is.throws(function () {
	r = cf.parse('<cffunction></cffunction>');
}, Error, "Missing required name attribute.");

r = cf.parse('<cffunction name="cffunction_test1"></cffunction>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'function');
is.equal(r.content, '');
is.equal(r.attributes.name, 'cffunction_test1');
is.equal(r.attributes.access, 'public');
is.equal(r.attributes.output, true);
is.equal(r.attributes.return_format, 'xml');
is.equal(r.attributes.return_type, 'any');
is.equal(r.attributes.roles, '');
is.equal(r.attributes.secure_json, false);
is.equal(r.attributes.verify_client, false);

r = cf.parse('<cffunction ' +
'return_type="string" name="cffunction-test2" access="private" ' +
'output="no" returnFormat="json" ' +
'roles="admin,user" secure_json="true" verify_client="yes" ' +
'description="Simple Test Function" displayname="function_test2" ' +
'hint="Test function2">' +
"\nHello World!" +
'</cffunction>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'function');
is.equal(r.content, "\nHello World!");
is.equal(r.attributes.name, 'cffunction-test2');
is.equal(r.attributes.access, 'private');
is.equal(r.attributes.output, false);
is.equal(r.attributes.return_format, 'json');
is.equal(r.attributes.return_type, 'string');
is.deepEqual(r.attributes.roles, ['admin', 'user']);
is.equal(r.attributes.secure_json, true);
is.equal(r.attributes.verify_client, true);
is.equal(r.attributes.description, 'Simple Test Function');
is.equal(r.attributes.display_name, 'function_test2');
is.equal(r.attributes.hint, 'Test function2');

r = cf.parse('<CFFUNCTION ' +
"\nreturnType='numeric' " +
"\nname='cffunction-test3' " +
"\naccess='package' " +
"\noutput='no' " +
"\nreturnFormat='plain' " +
"\nroles='admin,user,web' " +
"\nsecure_json='true' " +
"\nverify_client='yes' " +
"\ndescription='Simple Test Function' " +
"\ndisplayname='function_test3' " +
"\nhint='Test function3'>" +
"\n<cfreturn 1 />" +
'</CFFUNCTION>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'function');
is.equal(r.content, "\n<cfreturn 1 />");
is.equal(r.attributes.name, 'cffunction-test3');
is.equal(r.attributes.access, 'package');
is.equal(r.attributes.output, false);
is.equal(r.attributes.return_format, 'plain');
is.equal(r.attributes.return_type, 'numeric');
is.deepEqual(r.attributes.roles, ['admin', 'user', 'web']);
is.equal(r.attributes.secure_json, true);
is.equal(r.attributes.verify_client, true);
is.equal(r.attributes.description, 'Simple Test Function');
is.equal(r.attributes.display_name, 'function_test3');
is.equal(r.attributes.hint, 'Test function3');

test.ok();
