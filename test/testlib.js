var util = require('util');

function inspect(o) {
	console.log(util.inspect(o, { colors: true, depth: null}));
}
exports.inspect = inspect;

function die(content, exitStatus) { 
	inspect(content||'Failed!');
	process.exit(exitStatus||1);
}

exports.die = die;

function dir(label, o) {
	console.log(util.format("%s: <%s> %s", label||'', typeof o, util.inspect(o)));
}

exports.dir = dir;
