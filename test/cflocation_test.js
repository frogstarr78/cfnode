const is = require('assert'), test = require('./testlib');

var r;


is.throws(function () {
	r = test.cfparser.parse('<cflocation add_token="yes" >');
}, Error, 'Missing required url attribute');

r = test.cfparser.parse('<cflocation url="/cflocation" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'location');
is.equal(r.attributes.url, '/cflocation');
is.equal(r.attributes.add_token, false);
is.equal(r.attributes.status_code, 301);

r = test.cfparser.parse('<cflocation url="http://www.google.com?q=here" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'location');
is.equal(r.attributes.url, 'http://www.google.com/?q=here');
is.equal(r.attributes.add_token, false);
is.equal(r.attributes.status_code, 301);

r = test.cfparser.parse('<cflocation url="/cflocation test" addToken="yes" statusCode="302">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'location');
is.equal(r.attributes.url, '/cflocation%20test');
is.equal(r.attributes.add_token, true);
is.equal(r.attributes.status_code, 302);

r = test.cfparser.parse('<CFLOCATION URL="/cflocation_test?q=a" ADDTOKEN="yes" STATUSCODE="303">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'location');
is.equal(r.attributes.url, '/cflocation_test?q=a');
is.equal(r.attributes.add_token, true);
is.equal(r.attributes.status_code, 303);

