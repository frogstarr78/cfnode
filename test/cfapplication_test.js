const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cfapplication datasource="something">');
}, Error, "Missing required name attribute.");

r = test.cfparser.parse('<cfapplication name="cfapplication_test1" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'application');
is.equal(r.attributes.name, 'cfapplication_test1');
is.equal(r.attributes.datasource, undefined);
is.equal(r.attributes.timeout, undefined);

r = test.cfparser.parse('<cfapplication name="cfapplication-test2" datasource="abc">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'application');
is.equal(r.attributes.name, 'cfapplication-test2');
is.equal(r.attributes.datasource, 'abc');
is.equal(r.attributes.timeout, undefined);

r = test.cfparser.parse('<cfapplication name="cfapplicationtest" datasource="abc" applicationTimeout="">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'application');
is.equal(r.attributes.name, 'cfapplicationtest');
is.equal(r.attributes.datasource, 'abc');
is(r.attributes.timeout instanceof Date);

r = test.cfparser.parse('<cfapplication name="cfapplication_test" setclientcookies="no">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'application');
is.equal(r.attributes.name, 'cfapplication_test');
is.equal(r.attributes.client_variables, false);
is.equal(r.attributes.client_storage, 'registry');
is.equal(r.attributes.login_storage, 'cookie');
is.equal(r.attributes.server_side_form_validation, true);
is.equal(r.attributes.session_management, false);
is.equal(r.attributes.client_cookies, false);
is.equal(r.attributes.domain_cookies, false);

r = test.cfparser.parse('<cfapplication name="cfapplication_test" applicationTimeout="" datasource="abc">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'application');
is.equal(r.attributes.name, 'cfapplication_test');
is.equal(r.attributes.datasource, 'abc');
is(r.attributes.timeout instanceof Date);

r = test.cfparser.parse("<cfapplication\n" +
"name=\"cfapplication_test\"\n" +
"applicationTimeout=\"\"\n" + 
"datasource=\"abc\"\n" + 
">");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'application');
is.equal(r.attributes.name, 'cfapplication_test');
is.equal(r.attributes.datasource, 'abc');
is(r.attributes.timeout instanceof Date);

r = test.cfparser.parse("<cfapplication\n" +
"name=\"cfapplication_test\"\n" +
"applicationTimeout=\"\"\n" + 
"datasource=\"abc\"\n" + 
"clientManagement=\"yes\"\n" +
"clientStorage=\"Cookie\"\n" +
"loginStorage=\"cookie\"\n" +
"googleMapKey=\"any\"\n" +
"scriptProtect=\"all\"\n" +
"serverSideFormValidation=\"yes\"\n" +
"sessionManagement=\"yes\"\n" +
"sessionTimeout=\"\"\n" +
"secureJSON=\"yes\"\n" +
"setClientCookies=\"no\"\n" +
"secureJSONPrefix=\"//\"\n" +
"setDomainCookies=\"yes\"\n" +
">");
is(r instanceof Object);
is.equal(r.tag, 'application');
is.equal(r.attributes.name, 'cfapplication_test');
is.equal(r.attributes.datasource, 'abc');
is(r.attributes.timeout instanceof Date);
is.equal(r.attributes.client_variables, true);
is.equal(r.attributes.login_storage, 'cookie');
is.equal(r.attributes.google_map_key, 'any');
is.equal(r.attributes.script_protection, 'all');
is.equal(r.attributes.server_side_form_validation, true);
is.equal(r.attributes.session_management, true);
is(r.attributes.session_timeout instanceof Date);
is.equal(r.attributes.client_cookies, false);
is.equal(r.attributes.domain_cookies, true);
is.equal(r.attributes.secure_json, true);
is.equal(r.attributes.secure_json_prefix, "//");

r = test.cfparser.parse("<cfapplication\n" +
"applicationTimeout=\"\"\n" + 
"datasource=\"abc\"\n" + 
"clientManagement=\"yes\"\n" +
"secureJSON=\"no\"\n" +
"name=\"cfapplication-test\"\n" +
"serverSideFormValidation=\"no\"\n" +
"loginStorage=\"cookie\"\n" +
"googleMapKey=\"any\"\n" +
"clientStorage=\"Cookie\"\n" +
"scriptProtect=\"all\"\n" +
"setClientCookies=\"no\"\n" +
"secureJSONPrefix=\"#\"\n" +
"sessionManagement=\"yes\"\n" +
"sessionTimeout=\"\"\n" +
">");
is(r instanceof Object);
is.equal(r.tag, 'application');
is.equal(r.attributes.name, 'cfapplication-test');
is.equal(r.attributes.datasource, 'abc');
is(r.attributes.timeout instanceof Date);
is.equal(r.attributes.client_variables, true);
is.equal(r.attributes.login_storage, 'cookie');
is.equal(r.attributes.google_map_key, 'any');
is.equal(r.attributes.script_protection, 'all');
is.equal(r.attributes.server_side_form_validation, false);
is.equal(r.attributes.secure_json, false);
is.equal(r.attributes.secure_json_prefix, "#");
is.equal(r.attributes.session_management, true);
is(r.attributes.session_timeout instanceof Date);
is.equal(r.attributes.client_cookies, false);
is.equal(r.attributes.domain_cookies, false);

r = test.cfparser.parse("<CFAPPLICATION\n" +
"APPLICATIONTIMEOUT=\"\"\n" + 
"DATASOURCE=\"abc\"\n" + 
"CLIENTMANAGEMENT=\"yes\"\n" +
"SECUREJSON=\"no\"\n" +
"NAME=\"cfapplication-test\"\n" +
"SERVERSIDEFORMVALIDATION=\"no\"\n" +
"LOGINSTORAGE=\"cookie\"\n" +
"GOOGLEMAPKEY=\"any\"\n" +
"CLIENTSTORAGE=\"Cookie\"\n" +
"SCRIPTPROTECT=\"all\"\n" +
"SETCLIENTCOOKIES=\"no\"\n" +
"SECUREJSONPREFIX=\"#\"\n" +
"SESSIONMANAGEMENT=\"yes\"\n" +
"SESSIONTIMEOUT=\"\"\n" +
">");
is(r instanceof Object);
is.equal(r.tag, 'application');
is.equal(r.attributes.name, 'cfapplication-test');
is.equal(r.attributes.datasource, 'abc');
is(r.attributes.timeout instanceof Date);
is.equal(r.attributes.client_variables, true);
is.equal(r.attributes.login_storage, 'cookie');
is.equal(r.attributes.google_map_key, 'any');
is.equal(r.attributes.script_protection, 'all');
is.equal(r.attributes.server_side_form_validation, false);
is.equal(r.attributes.secure_json, false);
is.equal(r.attributes.secure_json_prefix, "#");
is.equal(r.attributes.session_management, true);
is(r.attributes.session_timeout instanceof Date);
is.equal(r.attributes.client_cookies, false);
is.equal(r.attributes.domain_cookies, false);

