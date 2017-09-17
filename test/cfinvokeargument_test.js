const is = require('assert'), test = require('./testlib');

var r;

is.throws(function () {
	r = test.cfparser.parse('<cfinvokeargument >');
}, Error, 'Missing required attributes.');

is.throws(function () {
	r = test.cfparser.parse('<cfinvokeargument name="cfinvarg">');
}, Error, 'Missing required value attributes.');

is.throws(function () {
	r = test.cfparser.parse('<cfinvokeargument value="cfinvarg">');
}, Error, 'Missing required name attributes.');

r = test.cfparser.parse('<cfinvokeargument name="cfinvokeargument_test2" value="cfinvarg2" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'invokeargument');
is.equal(r.attributes.name, 'cfinvokeargument_test2');
is.equal(r.attributes.value, 'cfinvarg2');
is.equal(r.attributes.omit, false);

r = test.cfparser.parse('<cfinvokeargument name="cfinvokeargument_test3" value="cfinvarg3" omit="yes" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'invokeargument');
is.equal(r.attributes.name, 'cfinvokeargument_test3');
is.equal(r.attributes.value, 'cfinvarg3');
is.equal(r.attributes.omit, true);

r = test.cfparser.parse('<CFINVOKEARGUMENT OMIT="yes" NAME="cfinvokeargument_test4" VALUE="cfinvarg4" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'invokeargument');
is.equal(r.attributes.name, 'cfinvokeargument_test4');
is.equal(r.attributes.value, 'cfinvarg4');
is.equal(r.attributes.omit, true);

test.ok();
