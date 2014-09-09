var util = require('util');

var tag_defaults = {
	'ajaximport': [
		{ name: 'css_src',    value: '/css/'     },
		{ name: 'script_src', value: '/scripts/' },
	],
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
	'cache': [
		{ name: 'action',           value: "serverCache"},
		{ name: 'disk_persistent',  value: false        },
		{ name: 'overflow_to_disk', value: false        },
		{ name: 'strip_whitespace', value: false        },
		{ name: 'throw_on_error',   value: false        },
		{ name: 'use_cache',        value: true         },
		{ name: 'use_query_string', value: false        }
	],
	'case': [{ name: 'delimiter', value: ","}],
	'component': [
		{ name: 'accessors',          value: false       },
		{ name: 'extends',            value: 'component' },
		{ name: 'mapped_super_class', value: false       },
		{ name: 'output',             value: false       },
		{ name: 'serializable',       value: true        },
		{ name: 'style',              value: 'rpc'       },
	],
	'content': [
		{ name: 'delete_file', value: false },
		{ name: 'reset',       value: true  }
	],
	'cookie': [
		{ name: 'expires', value: 'session' },
		{ name: 'secure',  value: false     }
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
	'directory': [
		{ name: 'action',         value: 'list' },
		{ name: 'list_info',      value: 'all'  },
		{ name: 'recurse',        value: false  },
		{ name: 'sort',           value: 'ASC'  },
		{ name: 'store_location', value: 'US'   },
		{ name: 'type',           value: 'all'  }
	],
	'error':    [{ name: 'exception', value: 'any'     }],
	'exit':     [{ name: 'method',    value: 'exitTag' }],
	'execute':  [{ name: 'timeout',   value: 0         }],
	'function': [
		{ name: 'access',        value: 'public' },
		{ name: 'output',        value: true     },
		{ name: 'return_format', value: 'xml'    },
		{ name: 'return_type',   value: 'any'    },
		{ name: 'roles',         value: []       },
		{ name: 'secure_json',   value: false    },
		{ name: 'verify_client', value: false    },
	],
	'header':         [{ name: 'charset', value: 'UTF-8' }],
	'invokeargument': [{ name: 'omit', value: false      }],
	'location': [
		{ name: 'add_token',   value: false },
		{ name: 'status_code', value: 301   }
	],
	'lock': [
		{ name: 'throw_on_timeout', value: true        },
		{ name: 'type',             value: 'exclusive' }
	],
	'log': [
		{ name: 'application', value: true          },
		{ name: 'log',         value: 'application' },
		{ name: 'type',        value: 'information' }
	],
	'login': [
		{ name: 'application_token', value: 'CFAUTHORIZATION_' },
		{ name: 'idle_timeout',      value: 1800               }
	],
	'output': [
		{ name: 'group_case_sensitive', value: true },
		{ name: 'max_rows',             value: -1   },
		{ name: 'start_row',            value: 1    }
	],
	'param': [{ name: 'type', value: 'any' }],
	'processingdirective': [{ name: 'suppress_whitespace', value: false }],
	'procparam': [
		{ name: 'max_length', value: 0     },
		{ name: 'null',       value: false },
		{ name: 'scale',      value: 0     },
		{ name: 'type',       value: 'in'  }
	],
	'procresult': [
		{ name: 'max_rows',   value: -1 },
		{ name: 'result_set', value: 1  }
	],
	'property': [
		{ name: 'constrained',         value: false    },
		{ name: 'generated',           value: 'never'  },
		{ name: 'missing_row_ignored', value: false    },
		{ name: 'optimistic_lock',     value: true     },
		{ name: 'orm_type',            value: 'string' },
		{ name: 'persistent',          value: false    },
		{ name: 'required' ,           value: false    },
		{ name: 'read_only' ,          value: false    },
		{ name: 'source' ,             value: 'vm'     },
		{ name: 'type',                value: 'any'    },
		{ name: 'unique',              value: false    },
		{ name: 'update',              value: true     },
		{ name: 'lazy',                value: true     },
		{ name: 'fetch',               value: 'select' },
		{ name: 'index',               value: false    },
		{ name: 'insert',              value: true     },
		{ name: 'inverse',             value: false    },
		{ name: 'not_null',            value: false    },
		{ name: 'serializable',        value: true     }
	],
	'query': [
		{ name: 'debug',        value: false    },
		{ name: 'block_factor', value: 1        },
		{ name: 'max_rows',     value: Infinity }
	],
	'queryparam': [
		{ name: 'list',        value: false         },
		{ name: 'null',        value: false         },
		{ name: 'scale',       value: 0             },
		{ name: 'separator',   value: ','           },
		{ name: 'cf_sql_type', value: 'CF_SQL_CHAR' }
	],
	'schedule': [
		{ name: 'port',        value: 80    },
		{ name: 'proxy_port',  value: 80    },
		{ name: 'publish',     value: false },
		{ name: 'resolve_url', value: false }
	],
	'storedproc': [
		{ name: 'block_factor', value: 1     },
		{ name: 'debug',        value: false },
		{ name: 'return_code',  value: false }
	],
	'timer': [
		{ name: 'label', value: ' '     },
		{ name: 'type',  value: 'debug' }
	],
	'trace': [
		{ name: 'abort',  value: false         },
		{ name: 'inline', value: false         },
		{ name: 'type',   value: 'information' }
	],
	'transaction': [
		{ name: 'action',  value: 'begin' },
		{ name: 'nested',  value: true    }
	],
	'xml': [ { name: 'case_sensitive',  value: false } ]
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
	// for conditional default value assignment
	switch( this.tag ) {
		case 'file':
			switch( this.attributes.action ) {
				case 'append':
				case 'write':
					if ( typeof me.attributes.add_newline === 'undefined' || me.attributes.add_newline === '' ) {
						me.attributes.add_newline = true;
					}
					if ( typeof me.attributes.charset === 'undefined' || me.attributes.charset === '' ) {
						me.attributes.charset = 'utf-8';
					}
					if ( typeof me.attributes.fix_newline === 'undefined' || me.attributes.fix_newline === '' ) {
						me.attributes.fix_newline = false;
					}

					if ( typeof me.attributes.output === 'undefined' || me.attributes.output === '' ) {
						throw new Error("Missing required output attribute.");
					} else if ( typeof me.attributes.file === 'undefined' || me.attributes.file === '' ) {
						throw new Error("Missing required file attribute.");
					}
					break;

				case 'copy':
					if ( typeof me.attributes.destination === 'undefined' || me.attributes.destination === '' ) {
						throw new Error("Missing required destination attribute.");
					} else if ( typeof me.attributes.source === 'undefined' || me.attributes.source === '' ) {
						throw new Error("Missing required source attribute.");
					}
					break;
				case 'delete':
					if ( typeof me.attributes.file === 'undefined' || me.attributes.file === '' ) {
						throw new Error("Missing required file attribute.");
					}
					break;
				case 'move':
					if ( typeof me.attributes.charset === 'undefined' || me.attributes.charset === '' ) {
						me.attributes.charset = 'utf-8';
					}
					break;
				case 'read':
					if ( typeof me.attributes.charset === 'undefined' || me.attributes.charset === '' ) {
						me.attributes.charset = 'utf-8';
					}

					if ( typeof me.attributes.variable === 'undefined' || me.attributes.variable === '' ) {
						throw new Error("Missing required variable attribute.");
					} else if ( typeof me.attributes.file === 'undefined' || me.attributes.file === '' ) {
						throw new Error("Missing required file attribute.");
					}
					break;
				case 'rename':
					if ( typeof me.attributes.destination === 'undefined' || me.attributes.destination === '' ) {
						throw new Error("Missing required destination attribute.");
					} else if ( typeof me.attributes.source === 'undefined' || me.attributes.source === '' ) {
						throw new Error("Missing required source attribute.");
					}
					break;
				case 'upload':
					if ( typeof me.attributes.name_conflict === 'undefined' || me.attributes.name_conflict === '' ) {
						me.attributes.name_conflict = 'error';
					}

					if ( typeof me.attributes.destination === 'undefined' || me.attributes.destination === '' ) {
						throw new Error("Missing required destination attribute.");
					} else if ( typeof me.attributes.file_field === 'undefined' || me.attributes.file_field === '' ) {
						throw new Error("Missing required file_field attribute.");
					}
					break;
				case 'upload_all':
					if ( typeof me.attributes.name_conflict === 'undefined' || me.attributes.name_conflict === '' ) {
						me.attributes.name_conflict = 'error';
					}

					if ( typeof me.attributes.destination === 'undefined' || me.attributes.destination === '' ) {
						throw new Error("Missing required destination attribute.");
					}
					break;
				default:
					throw new Error("Missing required action attribute.");
					break
			}
			break; // switch file
		case 'log':
			if ( this.attributes.file && this.attributes.file !== "" ) {
				tag_defaults[this.tag].forEach(function (def) {
					if ( def.name == 'log' ) {
						me.attributes[def.name] = def.value;
					}
				});
			}
			break; // case log
		case 'loop':
			if ( this.attributes.query && this.attributes.query !== "" ) {
				if ( typeof this.attributes.start_row === 'undefined' || this.attributes.start_row === '' ) {
					this.attributes.start_row = 1;
				}
			} else if ( ( this.attributes.from && this.attributes.from instanceof Date ) || ( this.attributes.to && this.attributes.to instanceof Date ) ) {
				this.attributes.step = new Date(Date.now() + 86400000);	
			} else if ( ( typeof this.attributes.step === 'undefined' || this.attributes.step === '' ) && ( ( this.attributes.from && typeof this.attributes.from === 'number' ) || ( this.attributes.to && typeof this.attributes.to === 'number' ) ) ) {
				this.attributes.step = 1;	
			} else if ( this.attributes.list && this.attributes.list !== "" && ( typeof this.attributes.delimiter === 'undefined' || this.attributes.delimiter === '' ) ) {
				this.attributes.delimiter = ',';
			}
			break; // case loop
		case 'schedule':
			if ( typeof me.attributes.action === 'undefined' || me.attributes.action === '' ) {
				throw new Error("Missing required action attribute.");
			} else if ( typeof this.attributes.task === 'undefined' || this.attributes.task === '' ) {
				throw new Error("Missing required task attribute.");
			}

			if ( me.attributes.action === 'update' ) {
				if ( typeof me.attributes.interval === 'undefined' || me.attributes.interval === '' ) {
					throw new Error("Missing required interval attribute.");
				} else if ( typeof this.attributes.operation === 'undefined' || this.attributes.operation === '' ) {
					throw new Error("Missing required operation attribute.");
				} else if ( typeof this.attributes.start_date === 'undefined' || this.attributes.start_date === '' ) {
					throw new Error("Missing required start_date attribute.");
				} else if ( typeof this.attributes.start_time === 'undefined' || this.attributes.start_time === '' ) {
					throw new Error("Missing required start_time attribute.");
				} else if ( typeof this.attributes.url === 'undefined' || this.attributes.url === '' ) {
					throw new Error("Missing required url attribute.");
				}
			}

			if ( me.attributes.publish === true ) {
				if ( typeof this.attributes.file === 'undefined' || this.attributes.file === '' ) {
					throw new Error("Missing required file attribute.");
				} else if ( typeof this.attributes.path === 'undefined' || this.attributes.path === '' ) {
					throw new Error("Missing required path attribute.");
				}
			}
			break; // case schedule
		case 'zipparam':
			if ( typeof this.attributes.charset === 'undefined' || this.attributes.charset === '' ) {
				this.attributes.charset = 'utf-8';	
			} 
			if ( typeof this.attributes.recurse === 'undefined' || this.attributes.recurse === '' ) {
				this.attributes.recurse = false;	
			}
			break; // case zipparam
	}
	// end tag specific default handling
}

CFTag.prototype._setAttributes = function (fromArray) {
//	console.dir({fromArray: fromArray, typeof_fromArray: typeof fromArray, isArray: Array.isArray(fromArray), length: fromArray.length, has_name: fromArray.name, has_value: fromArray.value });
	if ( Array.isArray(fromArray) ) {
		for(i=0; i < fromArray.length; i++) {
			this.attributes[fromArray[i].name] = fromArray[i].value;
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
