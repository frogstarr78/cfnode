var is = require('assert'),
	util = require('util'),
	human_date = require('date.js'),
	x = process.exit,
	d = console.dir,
	dd = function () { d('Failed!'); x(); },
	cf = require(__dirname + '/../cf');

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
		is.fail(rec, exp, message, 'equalDate', is.equalDate);
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
}, Error);
r = cf.parse('<cfcookie path="/path/here" domain=".example.com" value="hello test" name="cfcookietest">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'cookie');
is.equal(r.attributes.name, 'cfcookietest');
is.equal(r.attributes.path, '/path/here');
is.equal(r.attributes.domain, '.example.com');
is.equal(r.attributes.value, 'hello test');

console.log('Test @expires');
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
dd();

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

console.log("Success!");
