var util = require('util');

Object.prototype.extend = function (oo) {
	for( m in oo ) {
		this[m] = oo[m];
	}
}

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
	'cookie': [
		{ name: 'expires', value: Date() },
		{ name: 'secure', value: false }
	],
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
	'error': [{ name: 'exception', value: 'any' }],
	'log': [
		{ name: 'application', value: true          },
		{ name: 'log',         value: 'application' },
		{ name: 'type',        value: 'information' }
	],
	'output': [
		{ name: 'group_case_sensitive', value: true },
		{ name: 'max_rows',             value: -1   },
		{ name: 'start_row',            value: 1    }
	],
	'param': [
		{ name: 'type', value: 'any' }
	],
	'queryparam': [
		{ name: 'list',        value: false },
		{ name: 'null',        value: false },
		{ name: 'scale',       value: 0 },
		{ name: 'separator',   value: ',' },
		{ name: 'cf_sql_type', value: 'CF_SQL_CHAR' },
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

function get_tag_attribute_default(tag, attr) {
	var r;
	if ( tag_defaults[tag] ) {
		tag_defaults[tag].forEach(function (def) {
			if ( def.name == attr ) {
				r = def.value;
			}
		});	
	}
	return r;
}

function _set_attribs(obj, attrs) {
	for(i=0; i <= attrs.length; i++) {
		attr = attrs[i];
		if ( typeof attr !== 'undefined') {
			if ( typeof attr.name !== 'undefined' && typeof attr.value !== 'undefined' ) {
				obj.attributes[attr.name] = attr.value;
			} else {
				obj.attributes[attr.name] = get_tag_attribute_default(obj.tag, attr.name);
			}
		}
	}
}

function CFTag( tag_name, attrs, content ) {
	var me = this;
	this.tag = tag_name.replace(/^[cC][fF]/, '').toLowerCase();
	this.content = content||'';
	this.attributes = {};

	if ( tag_defaults[this.tag] ) {
		_set_attribs(this, tag_defaults[this.tag]);
	}
	_set_attribs(this, attrs);

	// tag specific default handling
	switch (this.tag) {
		case 'cookie':
			if ( ( this.attributes.path && this.attributes.path !== "" ) && ( ! this.attributes.domain || this.attributes.domain === "" ) ) {
				throw new Error("Missing domain value, required with path attribute.");		
			}
		break;

		case 'dbinfo':
			types_requiring_table_value = ['columns', 'foreignkeys', 'index'];
			if ( ( this.attributes.type && types_requiring_table_value.indexOf(this.attributes.type) > -1 ) && ( ! this.attributes.table || this.attributes.table === "" ) ) {
				throw new Error(util.format("Missing table value, required with type attribute specified as one of %a.", types_requiring_table_value));		
			}
		break;

		case 'log':
		if ( this.attributes.file && this.attributes.file.length > 0 ) {
			this.attributes.log = get_tag_attribute_default(this.tag, 'log');
		}
		break;
	}
	// end tag specific default handling
	
	return me;
}

CFTag.prototype.is_empty = function () {
	return this.content === '';
}

exports.cftag = CFTag;
