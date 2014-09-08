var is = require('assert'),
	PEG= require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cfajaxproxy >');
}, Error, "Missing required bind or cfc attribute");

is.throws(function () {
	r = cf.parse('<cfajaxproxy on_success="ajaxproxy_success" on_error="ajaxProxy_error" />');
}, Error, "Invalid attributes. Cannot define both bind and cfc attributes simultaneously.");

is.throws(function () {
	r = cf.parse('<cfajaxproxy bind="ajaxproxybind" cfc="ajaxproxycfc">');
}, Error);

is.throws(function () {
	r = cf.parse('<cfajaxproxy bind="">');
}, Error, "Empty bind attribute value.");

is.throws(function () {
	r = cf.parse('<cfajaxproxy cfc="">');
}, Error, "Empty cfc attribute value");

r = cf.parse("<cfajaxproxy cfc='ajaxproxy_cfc' />");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'ajaxproxy');
is.equal(r.attributes.cfc, 'ajaxproxy_cfc');
is.strictEqual(r.attributes.bind, undefined);
is.equal(r.attributes.js_class_name, 'ajaxproxy_cfc');

r = cf.parse("<cfajaxproxy cfc='ajaxproxy_cfc' jsClassName='ajaxproxy_js_class' />");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'ajaxproxy');
is.equal(r.attributes.cfc, 'ajaxproxy_cfc');
is.strictEqual(r.attributes.bind, undefined);
is.equal(r.attributes.js_class_name, 'ajaxproxy_js_class');

r = cf.parse("<CFAJAXPROXY CFC='ajaxproxy_cfc2' JSCLASSNAME='ajaxproxy_js_class2'>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'ajaxproxy');
is.equal(r.attributes.cfc, 'ajaxproxy_cfc2');
is.strictEqual(r.attributes.bind, undefined);
is.equal(r.attributes.js_class_name, 'ajaxproxy_js_class2');

r = cf.parse("<cfajaxproxy bind='ajaxproxy_bind' />");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'ajaxproxy');
is.strictEqual(r.attributes.cfc, undefined);
is.equal(r.attributes.bind, 'ajaxproxy_bind');

r = cf.parse("<cfajaxproxy bind='ajaxproxy_bind' onError='showError' />");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'ajaxproxy');
is.strictEqual(r.attributes.cfc, undefined);
is.equal(r.attributes.bind, 'ajaxproxy_bind');
is.equal(r.attributes.on_error, 'showError');

r = cf.parse('<cfajaxproxy bind="ajaxproxy_bind" onError="showError" onSuccess="successFunc" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'ajaxproxy');
is.strictEqual(r.attributes.cfc, undefined);
is.equal(r.attributes.bind, 'ajaxproxy_bind');
is.equal(r.attributes.on_error, 'showError');
is.equal(r.attributes.on_success, 'successFunc');

r = cf.parse("<CFAJAXPROXY BIND='ajaxproxy_bind2' ONERROR='showError2' ONSUCCESS='successFunc2' />");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'ajaxproxy');
is.strictEqual(r.attributes.cfc, undefined);
is.equal(r.attributes.bind, 'ajaxproxy_bind2');
is.equal(r.attributes.on_error, 'showError2');
is.equal(r.attributes.on_success, 'successFunc2');

test.neut();
//@TODO Fix this code. It should work.
//r = cf.parse("<cfajaxproxy bind='ajaxproxy_bind' onError='showError' onSuccess='function (rval) { console.log(rval); }` />");
//test.ok();
