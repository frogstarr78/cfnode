var is = require('assert'),
	util = require('util'),
	path = require('path'),
	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	testlib = require('./testlib');

var r;

function _equalDateLike(received, expected, comparisons) {

	if ( received instanceof Date && expected instanceof Date ) {
		comparisons.forEach(function (func) {
			rec = received[func]();
			exp = expected[func]();
			if ( rec != exp ) { return false; }
		});
		return true;
	} else if ( Number.isNaN(received) || Number.isNaN(expected) ) {
		return false;
	} else if ( typeof received === 'number' ) {
		return _equalDateLike( new Date(received), expected, comparisons );
	} else if ( typeof expected === 'number' ) {
		return _equalDateLike( received, new Date(expected), comparisons );
	} else {
		return false;
	}
}
is.equalDate = function (received, expected, message) {
	var comparisons = ['getFullYear', 'getMonth', 'getDate', 'getDay'];
	if ( !_equalDateLike(received, expected, comparisons) ) {
		is.fail(received, expected, message, 'equalDate', is.equalDate);
	}
}

is.equalTime = function (received, expected, message) {
	var comparisons = ['getHours', 'getMinutes', 'getSeconds'];
	if ( !_equalDateLike(received, expected, comparisons) ) {
		is.fail(rec, exp, message, func, is.equalDate);
	}
}

is.throws(function () {
	r = cf.parse('<cfcookie>');
}, Error);

r = cf.parse('<cfcookie name="cfcookietest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');

r = cf.parse('<cfcookie name="cfcookietest" domain=".example.com">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
is.equal(r.attributes.domain, '.example.com');

r = cf.parse('<cfcookie domain=".example.com" name="cfcookietest" secure="no">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
is.equal(r.attributes.domain, '.example.com');
is.equal(r.attributes.secure, false);
is.equal(r.attributes.expires, 'session');

is.throws(function () {
	r = cf.parse('<cfcookie path="/path/here" name="cfcookietest">');
}, Error, "Expecting error when path with no domain was specified.");
r = cf.parse('<cfcookie path="/path/here" domain=".example.com" value="hello test" name="cfcookietest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
is.equal(r.attributes.path, '/path/here');
is.equal(r.attributes.domain, '.example.com');
is.equal(r.attributes.value, 'hello test');

r = cf.parse('<cfcookie expires="now" name="cfcookietest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
is.equalDate(r.attributes.expires, new Date());

r = cf.parse('<cfcookie expires="never" name="cfcookietest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
is.equalDate(r.attributes.expires, human_date('in 30 years'));

r = cf.parse('<cfcookie expires="2013-01-01" name="cfcookietest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
is.deepEqual(r.attributes.expires, new Date(2013, 0, 01));
//is.equalDate(r.attributes.expires, new Date(2013, 0, 01));

r = cf.parse('<cfcookie expires="2013-01-01 12:34:56" name="cfcookietest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
is.equalTime(r.attributes.expires, new Date(2013, 01, 01, 12, 34, 56));

r = cf.parse('<cfcookie expires="5" name="cfcookietest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
is.equalDate(r.attributes.expires, human_date('in 5 days'));

r = cf.parse('<cfcookie name="cfcookietest" domain=".example.com" expires="now" httponly="yes" path="/" secure="no" value="abc">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
is.equal(r.attributes.domain, '.example.com');
is.equalDate(r.attributes.expires, new Date());
is.equal(r.attributes.http_only, true);
is.equal(r.attributes.path, '/');
is.equal(r.attributes.secure, false);
is.equal(r.attributes.value, 'abc');

r = cf.parse('<CFCOOKIE NAME="cfcookietest2" DOMAIN=".example.com" EXPIRES="now" HTTPONLY="yes" PATH="/" SECURE="no" VALUE="abc">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest2');
is.equal(r.attributes.domain, '.example.com');
is.equalDate(r.attributes.expires, new Date());
is.equal(r.attributes.http_only, true);
is.equal(r.attributes.path, '/');
is.equal(r.attributes.secure, false);
is.equal(r.attributes.value, 'abc');

testlib.die("Success!", 0);
