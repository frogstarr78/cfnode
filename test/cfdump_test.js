var is = require('assert'),
	cf = require(__dirname + '/../cf');

var r;
is.throws(function () {
	r = cf.parse('<cfdump>');
}, Error);

is.throws(function () {
	r = cf.parse('<cfdump showUDFs="true">');
}, Error);

r = cf.parse('<cfdump var="#cfnode_test#">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'dump');
is.equal(r.attributes.variable, 'cfnode_test');

r = cf.parse('<cfdump output="console" var="#something#">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'dump');
is.equal(r.attributes.variable, 'something');
is.equal(r.attributes.output, 'console');

r = cf.parse('<cfdump label="somethingelse" hide="password" show="username,email" var="#query#" expand="true">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'dump');
is.equal(r.attributes.label, 'somethingelse');
is.equal(r.attributes.hide, 'password');
is.deepEqual(r.attributes.show, ['username', 'email']);
is.equal(r.attributes.variable, 'query');
is.equal(r.attributes.expand, true);

console.log("Success!");
