var is = require('assert'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;
is.throws(function () {
	r = cf.parse('<cfassociate>');
}, Error);

is.throws(function () {
	r = cf.parse('<cfassociate baseTag="cfnode test">');
}, Error);

r = cf.parse('<cfassociate baseTag="cfnode_test">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'associate');
is.equal(r.attributes.base_tag, 'cfnode_test');
is.equal(r.attributes.data_collection, 'AssocAttribs');

r = cf.parse('<cfassociate baseTag="cfnode_test" dataCollection="something">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'associate');
is.equal(r.attributes.base_tag, 'cfnode_test');
is.equal(r.attributes.data_collection, 'something');

r = cf.parse('<cfassociate dataCollection="somethingelse" baseTag="cfnode_test">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'associate');
is.equal(r.attributes.base_tag, 'cfnode_test');
is.equal(r.attributes.data_collection, 'somethingelse');

r = cf.parse('<CFASSOCIATE DATACOLLECTION="somethingelse" BASETAG="cfnode_test">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'associate');
is.equal(r.attributes.base_tag, 'cfnode_test');
is.equal(r.attributes.data_collection, 'somethingelse');

test.ok();
