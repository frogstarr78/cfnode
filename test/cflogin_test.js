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
	r = cf.parse('<cflogin>');
}, Error, "Missing closing tag");

r = cf.parse('<cflogin></cflogin>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'login');
is.equal(r.attributes.application_token, 'CFAUTHORIZATION_');
is.equal(r.attributes.idle_timeout, 1800);

r = cf.parse('<cflogin applicationToken="CFAUTHORIZATION_cflogin" cookie_domain=".example.com" idle_timeout="180">' +
"\n</cflogin>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'login');
is.equal(r.content, "\n");
is.equal(r.attributes.application_token, 'CFAUTHORIZATION_cflogin');
is.equal(r.attributes.idle_timeout, 180);
is.equal(r.attributes.cookie_domain, '.example.com');

r = cf.parse('<CFLOGIN APPLICATIONTOKEN="CFAUTHORIZATION_cflogin" cookie_domain=".example.com" idle_timeout="180">' + 
"\nSome stuff here" + 
"\n</CFLOGIN>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'login');
is.equal(r.content, "\nSome stuff here\n");
is.equal(r.attributes.application_token, 'CFAUTHORIZATION_cflogin');
is.equal(r.attributes.idle_timeout, 180);
is.equal(r.attributes.cookie_domain, '.example.com');

testlib.die("Success!", 0);
