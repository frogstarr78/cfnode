const is = require('assert'), test = require('./testlib');

var r;
is.throws(function () {
	r = test.cfparser.parse('<cfassociate data_collection="this">');
}, Error);

is.throws(function () {
	r = test.cfparser.parse('<cfassociate baseTag="cfnode test">');
}, Error, "Invalid baseTag value.");

r = test.cfparser.parse('<cfassociate baseTag="cfnode_test">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'associate');
is.equal(r.attributes.base_tag, 'cfnode_test');
is.equal(r.attributes.data_collection, 'AssocAttribs');

r = test.cfparser.parse('<cfassociate baseTag="cfnode_test" dataCollection="something">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'associate');
is.equal(r.attributes.base_tag, 'cfnode_test');
is.equal(r.attributes.data_collection, 'something');

r = test.cfparser.parse('<cfassociate dataCollection="somethingelse" baseTag="cfnode_test">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'associate');
is.equal(r.attributes.base_tag, 'cfnode_test');
is.equal(r.attributes.data_collection, 'somethingelse');

r = test.cfparser.parse('<CFASSOCIATE DATACOLLECTION="somethingelse" BASETAG="cfnode_test">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'associate');
is.equal(r.attributes.base_tag, 'cfnode_test');
is.equal(r.attributes.data_collection, 'somethingelse');

test.ok();
