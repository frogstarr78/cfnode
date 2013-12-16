var is = require('assert'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	testlib = require('./testlib');

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

r = cf.parse('<cfdump' +
		' abort="true"' +
		' keys="4"' +
		' metainfo="no"' +
		' top="10"' +
		' var="#var#"' +
	    ' expand="1"' +
	    ' format="text"' +
	    ' hide="password"' +
	    ' label="lbl"' +
	    ' output="browser"' +
	    ' show="name,address,email,username"' +
	    ' showUDFs="yes"' +
'>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'dump');
is.equal(r.attributes.abort, true);
is.equal(r.attributes.expand, true);
is.equal(r.attributes.format, "text");
is.equal(r.attributes.hide, "password");
is.equal(r.attributes.keys, 4);
is.equal(r.attributes.label, "lbl");
is.equal(r.attributes.metainfo, false);
is.equal(r.attributes.output, "browser");
is.deepEqual(r.attributes.show, ['name', 'address', 'email', 'username']);
is.equal(r.attributes.showUDFs, true);
is.equal(r.attributes.top, 10);
is.equal(r.attributes.variable, "var");

testlib.die("Success!", 0);
