function flatten(v) {
	return v.map(function(x) { 
		return Array.isArray(x) ? flatten(x) : x;
	}).join('');
}

exports.flatten = flatten;

function tag_name(v){
	return v.replace(/^[cC][fF]/, '').toLowerCase();
}
exports.tag_name = tag_name;
