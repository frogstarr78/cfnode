const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cflogin>');
}, Error, "Missing closing tag");

r = test.cfparser.parse('<cflogin ></cflogin>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'login');
is.equal(r.attributes.application_token, 'CFAUTHORIZATION_');
is.equal(r.attributes.idle_timeout, 1800);

r = test.cfparser.parse('<cflogin applicationToken="CFAUTHORIZATION_cflogin" cookie_domain=".example.com" idle_timeout="180">' +
"\n</cflogin>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'login');
is.equal(r.content, "\n");
is.equal(r.attributes.application_token, 'CFAUTHORIZATION_cflogin');
is.equal(r.attributes.idle_timeout, 180);
is.equal(r.attributes.cookie_domain, '.example.com');

r = test.cfparser.parse('<CFLOGIN APPLICATIONTOKEN="CFAUTHORIZATION_cflogin" cookie_domain=".example.com" idle_timeout="180">' + 
"\nSome stuff here" + 
"\n</CFLOGIN>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'login');
is.equal(r.content, "\nSome stuff here\n");
is.equal(r.attributes.application_token, 'CFAUTHORIZATION_cflogin');
is.equal(r.attributes.idle_timeout, 180);
is.equal(r.attributes.cookie_domain, '.example.com');

test.ok();
