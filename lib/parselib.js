function flatten(v) {
	return v.map(function(x) { 
		return Array.isArray(x) ? flatten(x) : x;
	}).join('');
}

exports.flatten = flatten;

function underbar_name(n) {
	return n.replace(/([A-Z])/g, function(v) {
		return '_' + v.toLowerCase();
	});
};
exports.underbar_name = underbar_name;

function mkDate(v) {
	return new Date(Date.parse(v == '' ? Date() : v));
}
exports.mkDate = mkDate;
