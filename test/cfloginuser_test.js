var is = require('assert'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	ins = console.dir,
	test = require('./testlib');

var r;
is.throws(function () {
	r = cf.parse('<cfloginuser>');
}, Error, "Missing required attributes");

is.throws(function () {
	r = cf.parse('<cfloginuser name="who" password="pass">');
}, Error, "Missing required roles attributes");

is.throws(function () {
	r = cf.parse('<cfloginuser roles="a,b" password="pass" >');
}, Error, "Missing required name attributes");

is.throws(function () {
	r = cf.parse('<cfloginuser roles="a,b,c" password="pass">');
}, Error, "Missing required name attributes");


is.throws(function () {
	r = cf.parse('<cfloginuser name="who2" password="pass2">');
}, Error, "Missing required roles attribute");

is.throws(function () {
	r = cf.parse('<cfloginuser roles="a,b" password="pass3">');
}, Error, "Missing required name attribute");

is.throws(function () {
	r = cf.parse('<cfloginuser name="who3" roles="a2,b2">');
}, Error, "Missing required password attributes");


r = cf.parse('<cfloginuser name="who4" password="pass4" roles="n,p,r">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loginuser');
is.equal(r.attributes.name, 'who4');
is.equal(r.attributes.password, 'pass4');
is.deepEqual(r.attributes.roles, ['n', 'p', 'r']);

r = cf.parse('<cfloginuser name="who5" roles="n,r,p" password="pass5" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loginuser');
is.equal(r.attributes.name, 'who5');
is.equal(r.attributes.password, 'pass5');
is.deepEqual(r.attributes.roles, ['n', 'r', 'p']);

r = cf.parse('<cfloginuser password="pass6" roles="p,r,n" name="who6"/>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loginuser');
is.equal(r.attributes.name, 'who6');
is.equal(r.attributes.password, 'pass6');
is.deepEqual(r.attributes.roles, ['p', 'r', 'n']);

r = cf.parse('<cfloginuser password="pass7" name="who7" roles="p,n,r">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loginuser');
is.equal(r.attributes.name, 'who7');
is.equal(r.attributes.password, 'pass7');
is.deepEqual(r.attributes.roles, ['p', 'n', 'r']);

r = cf.parse('<cfloginuser roles="r,n,p" name="who8" password="pass8">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loginuser');
is.equal(r.attributes.name, 'who8');
is.equal(r.attributes.password, 'pass8');
is.deepEqual(r.attributes.roles, ['r', 'n', 'p']);

r = cf.parse('<cfloginuser roles="r,p,n" password="pass9" name="who9">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loginuser');
is.equal(r.attributes.name, 'who9');
is.equal(r.attributes.password, 'pass9');
is.deepEqual(r.attributes.roles, ['r', 'p', 'n']);

r = cf.parse('<CFLOGINUSER ROLES="a3,b3" PASSWORD="pass10" NAME="who10">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'loginuser');
is.equal(r.attributes.name, 'who10');
is.equal(r.attributes.password, 'pass10');
is.deepEqual(r.attributes.roles, ['a3', 'b3']);

test.ok();
