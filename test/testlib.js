const path = require('path'),
	fs   = require('fs'),
	join = path.join,
	util = require('util'),
	colors = require('colors');

exports.cfparser = require(path.join(__dirname, '..', 'lib', 'cf.js'))
exports.exit = process.exit;
exports.fail = function () { console.log('X'.red); process.exit(1); };
exports.neut = function () { console.log('-'.yellow); };
exports.ok = function () { console.log('√'.green); };
exports.inspect = function (s) {
	console.log(util.inspect(s, { depth: null} ));
};

exports.log = util.log;
exports.dir = util.inspect;
exports.error = function (m, nl) { 
	var nl = nl || false;
	var fmt = nl ? "\n - %s " : " - %s ";
	util.print(util.format(fmt, m)); 
};

exports.die = function (content, exitStatus) { 
	var xs = typeof exitStatus === 'undefined' ? 1 : exitStatus;
	if( typeof content === 'undefined' ) {
		console.log('X'.red)
	} else if ( typeof content === 'string' && content != 'Success!' ) {
		console.log(content)
	} else {
		inspect(content);
	}
	process.exit(exitStatus||1);
}

function root() { 
	var r = path.resolve(__dirname, '..'),
		sp = '';
	for(var i=0; i < arguments.length; i++) {
		sp += path.join( '/', arguments[i] );
	}
	return path.join(r,  sp);
} 
exports.root = root;
//exports.you = function () { return require(join(root(), 'you')); };

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
exports.equalDate = function (received, expected, message) {
	var comparisons = ['getFullYear', 'getMonth', 'getDate', 'getDay'];
	if ( !_equalDateLike(received, expected, comparisons) ) {
		is.fail(received, expected, message, 'equalDate', is.equalDate);
	}
}

exports.equalTime = function (received, expected, message) {
	var comparisons = ['getHours', 'getMinutes', 'getSeconds'];
	if ( !_equalDateLike(received, expected, comparisons) ) {
		is.fail(rec, exp, message, func, is.equalDate);
	}
}

