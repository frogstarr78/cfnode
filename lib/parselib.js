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

var tag_defaults = {
	'application': [
		{ name: 'client_variables',            value: false      },
		{ name: 'client_storage',              value: 'registry' },
		{ name: 'login_storage',               value: 'cookie'   },
		{ name: 'server_side_form_validation', value: true       },
		{ name: 'session_management',          value: false      },
		{ name: 'client_cookies',              value: true       },
		{ name: 'domain_cookies',              value: false      }
	],
	'associate': [{ name: 'data_collection', value: "AssocAttribs"}],
	'error': [{ name: 'exception', value: 'any' }],
	'dump': [
		{ name: 'expand',   value: true      },
		{ name: 'format',   value: 'text'    },
		{ name: 'hide',     value: 'all'     },
		{ name: 'keys',     value: Infinity  },
		{ name: 'metainfo', value: true      },
		{ name: 'output',   value: 'browser' },
		{ name: 'show',     value: 'all'     },
		{ name: 'showUDFs', value: true      },
		{ name: 'top',      value: Infinity  },
		{ name: 'abort',    value: false     },
	],
	'cookie': [
		{ name: 'expires', value: 'session' },
		{ name: 'secure', value: false }
	],
	'param': [
		{ name: 'type', value: 'any' }
	],
	'output': [
		{ name: 'group_case_sensitive', value: true },
		{ name: 'max_rows',             value: -1   },
		{ name: 'start_row',            value: 1    }
	],
	'log': [
		{ name: 'application', value: true          },
		{ name: 'log',         value: 'application' },
		{ name: 'type',        value: 'information' }
	],
	'timer': [
		{ name: 'label', value: ' '     },
		{ name: 'type',  value: 'debug' }
	],
	'trace': [
		{ name: 'abort',  value: false },
		{ name: 'inline', value: false },
		{ name: 'type',   value: 'information' }
	],
	'transaction': [
		{ name: 'action',  value: 'begin' },
		{ name: 'nested',  value: true }
	]
};
exports.tag_defaults = tag_defaults;

function apply_attributes (who, arry) {
	arry.forEach(function (nv) {
		if ( Array.isArray(nv)) {
			apply_attributes(who, nv);
		} else {
//			console.log("nv %s, who.attributes %s, who.attributes[nv.name] %s", util.inspect(nv), util.inspect(who.attributes), util.inspect(who.attributes[nv.name]))
			if ( typeof who.attributes[nv.name] === 'undefined') {	
				who.attributes[nv.name] = nv.value;
			}
		}
	});
}
exports.apply_attributes = apply_attributes;

function set_default_attributes(obj) {
	if ( tag_defaults[obj.tag] ) {
		tag_defaults[obj.tag].forEach(function (def) {
			apply_attributes(obj, [def]);
		});
	}
}
exports.set_default_attributes = set_default_attributes;

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
