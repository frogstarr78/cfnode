var util = require('util');

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
	],
	'queryparam': [
		{ name: 'debug',        value: false },
		{ name: 'block_factor', value: 1 },
		{ name: 'max_rows',     value: Infinity }
	],
	'queryparam': [
		{ name: 'list',        value: false },
		{ name: 'null',        value: false },
		{ name: 'scale',       value: 0 },
		{ name: 'separator',   value: ',' },
		{ name: 'cf_sql_type', value: 'CF_SQL_CHAR' },
	]
};
exports.tag_defaults = tag_defaults;

function CFTag( tag_name, attrs, content ) {
	var me = this;
	this.tag = tag_name.replace(/^[cC][fF]/, '').toLowerCase();
	this.content = content||'';
	this.attributes = {};

	if ( tag_defaults[this.tag] ) {
		this._setAttributes(tag_defaults[this.tag]);
	}

	this._setAttributes(attrs);

	// tag specific default handling
	if ( this.tag == 'log' && this.attributes.file && this.attributes.file !== "" ) {
		tag_defaults[this.tag].forEach(function (def) {
			if ( def.name == 'log' ) {
				me.attributes[def.name] = def.value;
			}
		});
	}
	// end tag specific default handling
}

CFTag.prototype._setAttributes = function (fromArray) {
	if ( Array.isArray(fromArray) ) {
		for(i=0; i < fromArray.length; i++) {
			if ( Array.isArray(fromArray[i]) ) {
				this._setAttributes.call(this, fromArray[i]);
			} else {
				this.attributes[fromArray[i].name] = fromArray[i].value;
			}
		}
	} else if ( typeof fromArray !== 'undefined' && fromArray.name && fromArray.value ) { 
		this.attributes[fromArray.name] = fromArray.value;
	} else {
		throw new Error(util.format("Unknown type [%s] passed to _setAttribute.", typeof fromArray));
	}
}

CFTag.prototype.is_empty = function () {
	return this.content === '';
}

module.exports = CFTag;
