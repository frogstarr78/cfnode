var util = require('util'),
	colors = require('colors');

function inspect(o) {
	console.log(util.inspect(o, { colors: true, depth: null}));
}
exports.inspect = inspect;

function die(content, exitStatus) { 
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

exports.die = die;

