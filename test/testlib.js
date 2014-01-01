function inspect(o) {
	console.log(require('util').inspect(o, { colors: true, depth: null}));
}
exports.inspect = inspect;

function die(content, exitStatus) { 
	inspect(content||'Failed!');
	process.exit(exitStatus||1);
}

exports.die = die;

