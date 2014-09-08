var path = require('path'),
	fs   = require('fs'),
	join = path.join,
	util = require('util'),
	colors = require('colors');

exports.exit = process.exit;
exports.fail = function () { console.log('X'.red); };
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
		console.log('Aborted!'.red)
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
