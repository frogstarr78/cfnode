var util = require('util'),
	plib = require('./parselib');

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
	'feed': [
		{ name: 'action',                 value: 'read'                 },
		{ name: 'escape_chars',           value: false                  },
		{ name: 'ignore_enclosure_error', value: false                  },
		{ name: 'overwrite',              value: false                  },
		{ name: 'overwrite_enclosure',    value: false                  },
		{ name: 'proxy_port',             value: 80                     },
		// @TODO extract from administrator settings
		{ name: 'timeout',                value: 60                     },
		{ name: 'user_agent',             value: 'ColdFusion (cfNode)' }
	],
	'function': [
		{ name: 'access',        value: 'public' },
		{ name: 'output',        value: true     },
		{ name: 'return_format', value: 'xml'    },
		{ name: 'return_type',   value: 'any'    },
		{ name: 'roles',         value: []       },
		{ name: 'secure_json',   value: false    },
		{ name: 'verify_client', value: false    },
	],
	'ftp': [
		{  name:  'passive',        value:  false  },
		{  name:  'port',           value:  21     },
		{  name:  'retry_count',    value:  1      },
		{  name:  'stop_on_error',  value:  true   },
		{  name:  'timeout',        value:  30     }
	],
	'header':         [{ name: 'charset', value: 'UTF-8' }],
	'http': [
		//@TODO detect proxy_port value based on the port attribute.
		{ name: 'charset',        value: 'utf-8'      },
		{ name: 'get_as_binary',  value: false        },
		{ name: 'method',         value: 'GET'        },
		{ name: 'multipart',      value: false        },
		{ name: 'multipart_type', value: 'form-data'  },
		{ name: 'proxy_port',     value: 80           },
		{ name: 'redirect',       value: true         },
		{ name: 'resolve_url',    value: false        },
		{ name: 'throw_on_error', value: false        },
		{ name: 'user_agent',     value: 'ColdFusion' }
	],
	'httpparam':      [{ name: 'encoded', value: true    }],
	'imap': [
		{ name: 'action',                    value: 'get_header_only' },
		{ name: 'recurse',                   value: false             },
		{ name: 'secure',                    value: false             },
		{ name: 'stop_on_error',             value: true              },
		{ name: 'timeout',                   value: 60                }
	],
	'invokeargument': [{ name: 'omit', value: false      }],
	'ldap': [
		{ name: 'delimiter',    value: ';'               },
		{ name: 'filter',       value: 'objectclass = *' },
		{ name: 'modify_type',  value: 'replace'         },
		{ name: 'port',         value: 389               },
		{ name: 'rebind',       value: false             },
		{ name: 'scope',        value: 'one_level'       },
		{ name: 'separator',    value: ','               },
		{ name: 'sort_control', value: 'asc'             },
		{ name: 'start_row',    value: 1                 },
		{ name: 'timeout',      value: 60000             },
		{ name: 'username',     value: 'anonymous'       }
	],
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
	'mail': [
		{ name: 'charset',              value: 'utf-8'                         },
		{ name: 'debug',                value: false                           },
		{ name: 'group',                value: 'CurrentRow'                    },
		{ name: 'group_case_sensitive', value: false                           },
		{ name: 'mailer_id',            value: 'ColdFusion Application Server' },
		{ name: 'port',                 value: 25                              },
		{ name: 'priority',             value: 'normal'                        },
		{ name: 'remove',               value: false                           },
		{ name: 'start_row',            value: 1                               },
		{ name: 'type',                 value: 'text/plain'                    },
		{ name: 'wrap_text',            value: 80                              }
	],
	'mailparam': [
		{ name: 'disposition', value: 'attachment'	},
		{ name: 'remove',      value: false       	}
	],
	'mailpart': [{ name: 'wrap_text', value: 80 }],
	'output': [
		{ name: 'group_case_sensitive', value: true },
		{ name: 'max_rows',             value: -1   },
		{ name: 'start_row',            value: 1    }
	],
	'param': [{ name: 'type', value: 'any' }],
	'pop': [
		{ name: 'action',                    value: 'get_header_only' },
		{ name: 'debug',                     value: false             },
		{ name: 'generate_unique_filenames', value: false             },
		{ name: 'port',                      value: 110               },
		{ name: 'start_row',                 value: 1                 },
		{ name: 'timeout',                   value: 60                }
	],
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
	'xml': [ { name: 'case_sensitive',  value: false } ],
	'zip': [
		{ name: 'action',         value: 'zip'   },
		{ name: 'charset',        value: 'utf-8' },
		{ name: 'overwrite',      value: false   },
		{ name: 'recurse',        value: false   },
		{ name: 'show_directory', value: false   },
		{ name: 'store_path',     value: true    }
	],
	'zipparam': [
		{ name: 'charset', value: 'utf-8' },
		{ name: 'recurse', value: false	  }
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
	// for conditional default value assignment
	switch( me.tag ) {
		case 'ajaxproxy':
			if ( me.attributes.has_key('cfc') ) {
				if ( plib.is_empty(me.attributes.cfc) ) {
					throw new Error('Empty cfc attribute value.');
				}

				if ( util.isNullOrUndefined(me.attributes.js_class_name) || plib.is_empty(me.attributes.js_class_name) ) {
					me.attributes.js_class_name = me.attributes.cfc;
				}
			}
			if ( me.attributes.has_key('bind') && plib.is_empty(me.attributes.bind) ) {
				throw new Error('Empty bind attribute value.');
			}
			break; // ajaxproxy'
		case 'cache':
			switch(me.attributes.action) {
				case 'get':
					if ( util.isNullOrUndefined( me.attributes.name ) || plib.is_empty( me.attributes.name ) ) {
						throw new Error('Missing required name attribute for get action.');		
					}
					if ( util.isNullOrUndefined( me.attributes.id ) || plib.is_empty( me.attributes.id ) ) {
						throw new Error('Missing required id attribute for get action.');		
					}
					break;
				case 'put':
					if ( util.isNullOrUndefined( me.attributes.value ) || plib.is_empty( me.attributes.value ) ) {
						throw new Error('Missing required value attribute for put action.');		
					}
					if ( util.isNullOrUndefined( me.attributes.id ) || plib.is_empty( me.attributes.id ) ) {
						throw new Error('Missing required id attribute for put action.');		
					}
					break;
				case 'flush':
					// @TODO Fix this to detect operations on Objects only and not Pages.
					if ( util.isNullOrUndefined( me.attributes.id ) || plib.is_empty( me.attributes.id ) ) {
						throw new Error('Missing required id attribute for put action.');		
					}
					break;
			}
			break; // cache
		case 'cookie':
			if ( ( me.attributes.path && !plib.is_empty(me.attributes.path) ) && ( ! me.attributes.domain || plib.is_empty(me.attributes.domain) ) ) {
				throw new Error('Missing domain value, required with path attribute.');		
			}
			break; // cookie
		case 'dbinfo':
			types_requiring_table_value = ['columns', 'foreignkeys', 'index'];
			if ( ( me.attributes.type && types_requiring_table_value.indexOf(me.attributes.type) > -1 ) && ( ! me.attributes.table || me.attributes.table === "" ) ) {
				throw new Error(util.format("Missing table value, required with type attribute specified as one of %a.", types_requiring_table_value));		
			}
			break; // dbinfo
		case 'directory':
			if ( ! require('fs').statSync(me.attributes.directory).isDirectory() ) {
				throw new Error('Invalid directory attribute. Value is not a directory.');	
			}
			break; // directory
		case 'feed':
			if ( me.attributes.action === 'create' ) {
				if ( util.isNullOrUndefined(me.attributes.output_file) && util.isNullOrUndefined(me.attributes.xml_var) ) {
					throw new Error('Missing required output_file or xml_var attribute.');
				} else if ( util.isNullOrUndefined(me.attributes.output_file) && !util.isNullOrUndefined(me.attributes.xml_var) ) {
					// it's cool, just some nice condionally required arguments going on here
				} else if ( !util.isNullOrUndefined(me.attributes.output_file) && util.isNullOrUndefined(me.attributes.xml_var) ) {
					// it's cool, just some nice condionally required arguments going on here
				}

				if (        util.isNullOrUndefined(me.attributes.name)  && ( util.isNullOrUndefined(me.attributes.properties)  || util.isNullOrUndefined(me.attributes.query)  ) ) {
					throw new Error('Missing required name, or properties and query attribute.');
				} else if ( !util.isNullOrUndefined(me.attributes.name) && ( util.isNullOrUndefined(me.attributes.properties)  || util.isNullOrUndefined(me.attributes.query)  ) ) {
					// cffeed query create type
				} else if ( !util.isNullOrUndefined(me.attributes.name) && ( !util.isNullOrUndefined(me.attributes.properties) || util.isNullOrUndefined(me.attributes.query)  ) ) {
					// cffeed query create type
					throw new Error('Missing required properties attribute.');
				} else if ( !util.isNullOrUndefined(me.attributes.name) && ( util.isNullOrUndefined(me.attributes.properties)  || !util.isNullOrUndefined(me.attributes.query) ) ) {
					// cffeed query create type
					throw new Error('Missing required query attribute.');
				} else if ( util.isNullOrUndefined(me.attributes.name)  && ( !util.isNullOrUndefined(me.attributes.properties) || !util.isNullOrUndefined(me.attributes.query) ) ) {
					// cffeed basic create type
				} else if ( util.isNullOrUndefined(me.attributes.name)  && ( !util.isNullOrUndefined(me.attributes.properties) || util.isNullOrUndefined(me.attributes.query)  ) ) {
					// cffeed mix of basic and query create type
				} else if ( util.isNullOrUndefined(me.attributes.name)  && ( util.isNullOrUndefined(me.attributes.properties)  || !util.isNullOrUndefined(me.attributes.query) ) ) {
					// cffeed mix of basic and query create type
//				} else {
				}
			} else if ( me.attributes.action === 'read' || util.isNullOrUndefined(me.attributes.action) ) {
				if ( util.isNullOrUndefined(me.attributes.source) ) {
					throw new Error('Missing required source attribute.');
				} 
				if ( util.isNullOrUndefined(me.attributes.name) && util.isNullOrUndefined(me.attributes.properties) && util.isNullOrUndefined(me.attributes.query) && util.isNullOrUndefined(me.attributes.output_file) && util.isNullOrUndefined(me.attributes.xml_var) ) {
					throw new Error('Missing required supplimental attributes.');
				}
			}
			break; // feed
		case 'file':
			switch( me.attributes.action ) {
				case 'append':
				case 'write':
					if ( plib.is_empty(me.attributes.add_newline) ) {
						me.attributes.add_newline = true;
					}
					if ( util.isNullOrUndefined(me.attributes.charset) ) {
						me.attributes.charset = 'utf-8';
					}
					if ( util.isNullOrUndefined(me.attributes.fix_newline) ) {
						me.attributes.fix_newline = false;
					}

					if ( util.isNullOrUndefined(me.attributes.output) ) {
						throw new Error('Missing required output attribute.');
					} else if ( util.isNullOrUndefined(me.attributes.file) ) {
						throw new Error('Missing required file attribute.');
					}
					break;

				case 'copy':
					if ( util.isNullOrUndefined(me.attributes.destination) ) {
						throw new Error('Missing required destination attribute.');
					} else if ( util.isNullOrUndefined(me.attributes.source) ) {
						throw new Error('Missing required source attribute.');
					}
					break;
				case 'delete':
					if ( util.isNullOrUndefined(me.attributes.file) ) {
						throw new Error('Missing required file attribute.');
					}
					break;
				case 'move':
					if ( util.isNullOrUndefined(me.attributes.charset) ) {
						me.attributes.charset = 'utf-8';
					}
					if ( util.isNullOrUndefined(me.attributes.source) ) {
						throw new Error('Missing required source attribute.');
					}
					break;
				case 'read':
					if ( util.isNullOrUndefined(me.attributes.charset) ) {
						me.attributes.charset = 'utf-8';
					}

					if ( util.isNullOrUndefined(me.attributes.variable) ) {
						throw new Error('Missing required variable attribute.');
					} else if ( util.isNullOrUndefined(me.attributes.file) ) {
						throw new Error('Missing required file attribute.');
					}
					break;
				case 'readbinary':
				case 'read_binary':
					if ( util.isNullOrUndefined(me.attributes.variable) ) {
						throw new Error('Missing required variable attribute.');
					} else if ( util.isNullOrUndefined(me.attributes.file) ) {
						throw new Error('Missing required file attribute.');
					}
					break;
				case 'rename':
					if ( util.isNullOrUndefined(me.attributes.destination) ) {
						throw new Error('Missing required destination attribute.');
					} else if ( util.isNullOrUndefined(me.attributes.source) ) {
						throw new Error('Missing required source attribute.');
					}
					break;
				case 'upload':
					if ( util.isNullOrUndefined(me.attributes.name_conflict) ) {
						me.attributes.name_conflict = 'error';
					}

					if ( util.isNullOrUndefined(me.attributes.destination) ) {
						throw new Error('Missing required destination attribute.');
					} else if ( util.isNullOrUndefined(me.attributes.file_field) ) {
						throw new Error('Missing required file_field attribute.');
					}
					break;
				case 'upload_all':
					if ( util.isNullOrUndefined(me.attributes.name_conflict) ) {
						me.attributes.name_conflict = 'error';
					}

					if ( util.isNullOrUndefined(me.attributes.destination) ) {
						throw new Error('Missing required destination attribute.');
					}
					break;
				default:
					throw new Error('Missing required action "' + me.attributes.action + '" attribute.');
					break
			}
			break; // file
		case 'ftp':
			if ( plib.is_empty(me.attributes.action) ) {
				throw new Error('Missing required action attribute.');
			}

			switch (me.attributes.action) {
				case 'allo':
					if ( me.attributes.secure === true ) {
						throw new Error('Unexpected secure connection used with action == "' + me.attributes.action + '" attribute.');
					}
					if ( !plib.is_empty(me.attributes.action_param) ) {
						throw new Error('Unexpected action_param used with action == "close" attribute.');
					}
					break;
				case 'acct':
					if ( me.attributes.secure === true ) {
						throw new Error('Unexpected secure connection used with action == "' + me.attributes.action + '" attribute.');
					}
					break;
				case 'change_dir':
				case 'CHANGE_DIR':
				case 'changedir':
				case 'changeDir':
				case 'CHANGEDIR':
					if ( plib.is_empty(me.attributes.directory) ) {
						throw new Error('Missing required directory attribute.');
					}
					if ( plib.is_empty(me.attributes.ascii_extension_list) ) {
						me.attributes.ascii_extension_list = 'txt;htm;html;cfm;cfml;shtm;shtml;css;asp;asa'.split(';');
					}
					if ( plib.is_empty(me.attributes.fail_if_exists) ) {
						me.attributes.fail_if_exists = true;
					}
					if ( plib.is_empty(me.attributes.transfer_mode) ) {
						me.attributes.transfer_mode = 'auto';
					}
					break;
				case 'create_dir':
				case 'CREATE_DIR':
				case 'createdir':
				case 'createDir':
				case 'CREATEDIR':
					if ( plib.is_empty(me.attributes.directory) ) {
						throw new Error('Missing required directory attribute.');
					}
					if ( plib.is_empty(me.attributes.ascii_extension_list) ) {
						me.attributes.ascii_extension_list = 'txt;htm;html;cfm;cfml;shtm;shtml;css;asp;asa'.split(';');
					}
					if ( plib.is_empty(me.attributes.fail_if_exists) ) {
						me.attributes.fail_if_exists = true;
					}
					if ( plib.is_empty(me.attributes.transfer_mode) ) {
						me.attributes.transfer_mode = 'auto';
					}
					break;
				case 'close':
					if ( !plib.is_empty(me.attributes.buffer_size) ) {
						throw new Error('Unexpected buffer_size used with action == "close" attribute.');
					}
					if ( plib.is_empty(me.attributes.connection) ) {
						throw new Error('Missing required connection attribute.');
					}
					if ( !plib.is_empty(me.attributes.action_param) ) {
						throw new Error('Unexpected action_param used with action == "close" attribute.');
					}
					break;
				case 'exists':
					if ( plib.is_empty(me.attributes.item) ) {
						throw new Error('Missing required item attribute.');
					}
					if ( plib.is_empty(me.attributes.ascii_extension_list) ) {
						me.attributes.ascii_extension_list = 'txt;htm;html;cfm;cfml;shtm;shtml;css;asp;asa'.split(';');
					}
					if ( plib.is_empty(me.attributes.fail_if_exists) ) {
						me.attributes.fail_if_exists = true;
					}
					if ( plib.is_empty(me.attributes.transfer_mode) ) {
						me.attributes.transfer_mode = 'auto';
					}
					break;
				case 'exists_dir':
				case 'EXISTS_DIR':
				case 'existsdir':
				case 'existsDir':
				case 'EXISTSDIR':
					if ( plib.is_empty(me.attributes.directory) ) {
						throw new Error('Missing required directory attribute.');
					}
					if ( plib.is_empty(me.attributes.ascii_extension_list) ) {
						me.attributes.ascii_extension_list = 'txt;htm;html;cfm;cfml;shtm;shtml;css;asp;asa'.split(';');
					}
					if ( plib.is_empty(me.attributes.fail_if_exists) ) {
						me.attributes.fail_if_exists = true;
					}
					if ( plib.is_empty(me.attributes.transfer_mode) ) {
						me.attributes.transfer_mode = 'auto';
					}
					break;
				case 'exists_file':
				case 'EXISTS_FILE':
				case 'existsfile':
				case 'existsFile':
				case 'EXISTSFILE':
					if ( plib.is_empty(me.attributes.remote_file) ) {
						throw new Error('Missing required remote_file attribute.');
					}
					if ( plib.is_empty(me.attributes.ascii_extension_list) ) {
						me.attributes.ascii_extension_list = 'txt;htm;html;cfm;cfml;shtm;shtml;css;asp;asa'.split(';');
					}
					if ( plib.is_empty(me.attributes.fail_if_exists) ) {
						me.attributes.fail_if_exists = true;
					}
					if ( plib.is_empty(me.attributes.transfer_mode) ) {
						me.attributes.transfer_mode = 'auto';
					}
					break;
				case 'get_file':
				case 'GET_FILE':
				case 'getfile':
				case 'getFile':
				case 'GETFILE':
					if ( plib.is_empty(me.attributes.local_file) ) {
						throw new Error('Missing required local_file attribute.');
					}
					if ( plib.is_empty(me.attributes.remote_file) ) {
						throw new Error('Missing required remote_file attribute.');
					}
					if ( plib.is_empty(me.attributes.ascii_extension_list) ) {
						me.attributes.ascii_extension_list = 'txt;htm;html;cfm;cfml;shtm;shtml;css;asp;asa'.split(';');
					}
					if ( plib.is_empty(me.attributes.fail_if_exists) ) {
						me.attributes.fail_if_exists = true;
					}
					if ( plib.is_empty(me.attributes.transfer_mode) ) {
						me.attributes.transfer_mode = 'auto';
					}
					break;
				case 'list_dir':
				case 'LIST_DIR':
				case 'listdir':
				case 'listDir':
				case 'LISTDIR':
					if ( plib.is_empty(me.attributes.directory) ) {
						throw new Error('Missing required directory attribute.');
					}
					if ( plib.is_empty(me.attributes.name) ) {
						throw new Error('Missing required name attribute.');
					}
					if ( plib.is_empty(me.attributes.ascii_extension_list) ) {
						me.attributes.ascii_extension_list = 'txt;htm;html;cfm;cfml;shtm;shtml;css;asp;asa'.split(';');
					}
					if ( plib.is_empty(me.attributes.fail_if_exists) ) {
						me.attributes.fail_if_exists = true;
					}
					if ( plib.is_empty(me.attributes.transfer_mode) ) {
						me.attributes.transfer_mode = 'auto';
					}
					break;
				case 'open':
					if ( plib.is_empty(me.attributes.connection) ) {
						throw new Error('Missing required connection attribute.');
					}
					if ( plib.is_empty(me.attributes.server) ) {
						throw new Error('Missing required server attribute.');
					}
					if ( plib.is_empty(me.attributes.username) ) {
						throw new Error('Missing required username attribute.');
					}
					if ( !util.isNullOrUndefined(me.attributes.passphrase) && util.isNullOrUndefined(me.attributes.key) ) {
						throw new Error('Unexpected passphrase used with no key attribute specified.');
					}

					if ( me.attributes.secure && me.attributes.secure === true ) {
						if ( plib.is_empty(me.attributes.key) && plib.is_empty(me.attributes.password) ) {
							throw new Error('Missing required key or password attribute.');
						}
					} else {
						if ( plib.is_empty(me.attributes.password) ) {
							throw new Error('Missing required password attribute.');
						}
					}
					
					if ( !plib.is_empty(me.attributes.action_param) ) {
						throw new Error('Unexpected action_param used with action == "close" attribute.');
					}
					break;
				case 'put_file':
				case 'PUT_FILE':
				case 'putfile':
				case 'putFile':
				case 'PUTFILE':
					if ( plib.is_empty(me.attributes.local_file) ) {
						throw new Error('Missing required local_file attribute.');
					}
					if ( plib.is_empty(me.attributes.remote_file) ) {
						throw new Error('Missing required remote_file attribute.');
					}
					if ( plib.is_empty(me.attributes.ascii_extension_list) ) {
						me.attributes.ascii_extension_list = 'txt;htm;html;cfm;cfml;shtm;shtml;css;asp;asa'.split(';');
					}
					if ( plib.is_empty(me.attributes.fail_if_exists) ) {
						me.attributes.fail_if_exists = true;
					}
					if ( util.isNullOrUndefined(me.attributes.transfer_mode) ) {
						me.attributes.transfer_mode = 'auto';
					}
					break;
				case 'quote':
					if ( me.attributes.secure === true ) {
						throw new Error('Unexpected secure connection used with action == "' + me.attributes.action + '" attribute.');
					}
					break;
				case 'rename':
					if ( plib.is_empty(me.attributes.new) ) {
						throw new Error('Missing required new attribute.');
					}
					if ( plib.is_empty(me.attributes.existing) ) {
						throw new Error('Missing required existing attribute.');
					}
					break;
				case 'remove':
					if ( plib.is_empty(me.attributes.item) ) {
						throw new Error('Missing required item attribute.');
					}
					break;
				case 'site':
					if ( me.attributes.secure === true ) {
						throw new Error('Unexpected secure connection used with action == "' + me.attributes.action + '" attribute.');
					}
					break;
				default:
					break;
			}

			break;
		case 'header':
			if ( util.isNullOrUndefined(me.attributes.name) && util.isNullOrUndefined(me.attributes.status_code) ) {
				throw new Error('Missing required name or statusCode attribute.');
			}
			break; // header
		case 'htmlhead':
			if ( plib.is_empty(me.attributes.text) ) {
				throw new Error('Missing required text attribute.');
			}
			break; // htmlhead
		case 'http':
			if ( util.isNullOrUndefined(me.attributes.port) ) {
				var tmpurl = require('url').parse(me.attributes.url);

				if ( tmpurl.port ) {
					me.attributes.port = tmpurl.port;
				} else {
					if ( tmpurl.protocol === 'http:' ) {
						me.attributes.port = 80;
					} else if ( tmpurl.protocol === 'https:' ) {
						me.attributes.port = 443;
					} else {
						//@TODO Make this detect port using /etc/services file or IANA Service Port assignments
						throw new Error('Unknown port');
					}
				}
			}
			break; // http
		case 'httpparam':
			if ( util.isNullOrUndefined(me.attributes.type) ) {
				throw new Error('Missing required type attribute.');
			} 

			if ( me.attributes.type === 'file' && util.isNullOrUndefined(me.attributes.file) ) {
				throw new Error('Missing required file attribute.');
			}

			if ( ['xml', 'body'].indexOf( me.attributes.type ) === -1 && util.isNullOrUndefined(me.attributes.name) ) {
				throw new Error('Missing required name attribute.');
			}

			if ( me.attributes.type !== 'file' && util.isNullOrUndefined(me.attributes.value) ) {
				throw new Error('Missing required value attribute.');
			}

			break; // httpparam
		case 'imap':
			switch(me.attributes.action) {
				case 'create_folder':
					if ( util.isNullOrUndefined(me.attributes.folder) ) {
						throw new Error('Missing required folder attribute.');
					}
					break;
				case 'close':
					if ( util.isNullOrUndefined(me.attributes.connection) ) {
						throw new Error('Missing required connection attribute.');
					}
					break;
				case 'delete_folder':
					if ( util.isNullOrUndefined(me.attributes.folder) ) {
						throw new Error('Missing required folder attribute.');
					}
					break;
				case 'get_all':
					if ( util.isNullOrUndefined(me.attributes.name) ) {
						throw new Error('Missing required name attribute.');
					}
					break;
				case 'get_header_only':
					if ( util.isNullOrUndefined(me.attributes.name) ) {
						throw new Error('Missing required name attribute.');
					}
					break;
				case 'list_all_folders':
					if ( util.isNullOrUndefined(me.attributes.name) ) {
						throw new Error('Missing required name attribute.');
					}
					if ( util.isNullOrUndefined(me.attributes.folder) ) {
						me.attributes.folder = 'mailbox';
					}
					break;
				case 'move_mail':
					if ( util.isNullOrUndefined(me.attributes.new_folder) ) {
						throw new Error('Missing required new_folder attribute.');
					}
					break;
				case 'open':
					if ( util.isNullOrUndefined(me.attributes.connection) ) {
						throw new Error('Missing required connection attribute.');
					}
					if ( util.isNullOrUndefined(me.attributes.username) ) {
						throw new Error('Missing required username attribute.');
					}
					if ( util.isNullOrUndefined(me.attributes.password) ) {
						throw new Error('Missing required password attribute.');
					}
					if ( util.isNullOrUndefined(me.attributes.server) ) {
						throw new Error('Missing required server attribute.');
					}
					break;
				case 'rename_folder':
					if ( util.isNullOrUndefined(me.attributes.folder) ) {
						throw new Error('Missing required folder attribute.');
					}
					if ( util.isNullOrUndefined(me.attributes.new_folder) ) {
						throw new Error('Missing required new_folder attribute.');
					}
					break;
				default:
					break;
			}
			if ( util.isNullOrUndefined(me.attributes.folder) ) {
				me.attributes.folder = 'INBOX';
			}
			if ( me.attributes.secure === false && util.isNullOrUndefined(me.attributes.port) ) {
				me.attributes.port = 143;
			} else if ( me.attributes.secure === true && util.isNullOrUndefined(me.attributes.port) ) {
				me.attributes.port = 993;
			}
			break;
		case 'invokeargument':
			if ( plib.is_empty(me.attributes.value) ) {
				throw new Error('Missing required value attribute.');
			}

			if ( plib.is_empty(me.attributes.name) ) {
				throw new Error('Missing required name attribute.');
			}

			break; // invokeargument
		case 'ldap':
			if ( util.isNullOrUndefined(me.attributes.action) ) {
				me.attributes.action = 'query';
			}
			switch(me.attributes.action) {
				case 'add':
					if ( util.isNullOrUndefined(me.attributes.dn) ) {
						throw new Error('Missing required dn attribute.');
					}
					if ( util.isNullOrUndefined(me.attributes.attributes) ) {
						throw new Error('Missing required attributes attribute.');
					}
					break; //add
				case 'delete':
					if ( util.isNullOrUndefined(me.attributes.dn) ) {
						throw new Error('Missing required dn attribute.');
					}
					break; //delete
				case 'modify':
					if ( util.isNullOrUndefined(me.attributes.dn) ) {
						throw new Error('Missing required dn attribute.');
					}
					if ( util.isNullOrUndefined(me.attributes.attributes) ) {
						throw new Error('Missing required attributes attribute.');
					}
					break; //modify
				case 'modify_dn':
					if ( util.isNullOrUndefined(me.attributes.dn) ) {
						throw new Error('Missing required dn attribute.');
					}
					if ( util.isNullOrUndefined(me.attributes.attributes) ) {
						throw new Error('Missing required attributes attribute.');
					}
					break; //modify_dn
				case 'query':
					if ( util.isNullOrUndefined(me.attributes.name) ) {
						throw new Error('Missing required name attribute.');
					}
					if ( util.isNullOrUndefined(me.attributes.start) ) {
						throw new Error('Missing required start attribute.');
					}
					if ( util.isNullOrUndefined(me.attributes.attributes) ) {
						throw new Error('Missing required attributes attribute.');
					}
					break; //query
			}
			if ( me.attributes.secure === 'CFSSL_BASIC' && ( util.isNullOrUndefined(me.attributes.username) || me.attributes.username === 'anonymous' ) ) {
				throw new Error('Missing required username attribute.');
			}
			if ( me.attributes.secure === 'CFSSL_BASIC' && util.isNullOrUndefined(me.attributes.password) ) {
				throw new Error('Missing required password attribute.');
			}
			break; // ldap
		case 'log':
			if ( me.attributes.file && me.attributes.file !== "" ) {
				tag_defaults[me.tag].forEach(function (def) {
					if ( def.name == 'log' ) {
						me.attributes[def.name] = def.value;
					}
				});
			}
			break; // case log
		case 'loop':
			if ( me.attributes.query && me.attributes.query !== "" ) {
				if ( util.isNullOrUndefined(me.attributes.start_row) ) {
					me.attributes.start_row = 1;
				}
			} else if ( ( me.attributes.from && me.attributes.from instanceof Date ) || ( me.attributes.to && me.attributes.to instanceof Date ) ) {
				me.attributes.step = new Date(Date.now() + 86400000);	
			} else if ( util.isNullOrUndefined(me.attributes.step) && ( ( me.attributes.from && typeof me.attributes.from === 'number' ) || ( me.attributes.to && typeof me.attributes.to === 'number' ) ) ) {
				me.attributes.step = 1;	
			} else if ( me.attributes.list && me.attributes.list !== "" && util.isNullOrUndefined(me.attributes.delimiter) ) {
				me.attributes.delimiter = ',';
			}
			break; // case loop
		case 'mail':
			if ( util.isNullOrUndefined(me.attributes.subject) ) {
				throw new Error('Missing required subject attribute.');
			}
			if ( util.isNullOrUndefined(me.attributes.from) ) {
				throw new Error('Missing required from attribute.');
			}
			if ( util.isNullOrUndefined(me.attributes.to) ) {
				throw new Error('Missing required to attribute.');
			}

			break; // mail
		case 'mailparam':
			break; // mailparam
		case 'pop':
			if ( util.isNullOrUndefined(me.attributes.server) ) {
				throw new Error('Missing required server attribute.');
			}
			if ( ( me.attributes.action == 'get_all' || me.attributes.action == 'get_header_only' ) && plib.is_empty(me.attributes.name) ) {
				throw new Error('Missing required name attribute.');
			}

			break; // pop
		case 'procparam':
			if ( me.attributes.type == "in" && util.isNullOrUndefined(me.attributes.value) ) {
				throw new Error('Missing required value attribute.');
			} else if ( ['inout', 'out'].indexOf(me.attributes.type) > -1 && util.isNullOrUndefined(me.attributes.variable) ) {
				throw new Error('Missing required variable attribute.');
			}
			break; // procparam
		case 'schedule':
			if ( util.isNullOrUndefined(me.attributes.action) ) {
				throw new Error('Missing required action attribute.');
			} else if ( util.isNullOrUndefined(me.attributes.task) ) {
				throw new Error('Missing required task attribute.');
			}

			if ( me.attributes.action === 'update' ) {
				if ( util.isNullOrUndefined(me.attributes.interval) ) {
					throw new Error('Missing required interval attribute.');
				} else if ( util.isNullOrUndefined(me.attributes.operation) ) {
					throw new Error('Missing required operation attribute.');
				} else if ( util.isNullOrUndefined(me.attributes.start_date) ) {
					throw new Error('Missing required start_date attribute.');
				} else if ( util.isNullOrUndefined(me.attributes.start_time) ) {
					throw new Error('Missing required start_time attribute.');
				} else if ( util.isNullOrUndefined(me.attributes.url) ) {
					throw new Error('Missing required url attribute.');
				}
			}

			if ( me.attributes.publish === true ) {
				if ( util.isNullOrUndefined(me.attributes.file) ) {
					throw new Error('Missing required file attribute.');
				} else if ( util.isNullOrUndefined(me.attributes.path) ) {
					throw new Error('Missing required path attribute.');
				}
			}
			break; // case schedule
		case 'zip':
//			console.dir(me.attributes)
			switch( me.attributes.action ) {
				case 'delete':
					if ( util.isNullOrUndefined(me.attributes.file) ) {
						throw new Error('Missing required file attribute.');
					}
					break; // case delete
				case 'list':
					if ( util.isNullOrUndefined(me.attributes.entry_path) ) {
						throw new Error('Missing required entry_path attribute.');
					} else if ( util.isNullOrUndefined(me.attributes.file) ) {
						throw new Error('Missing required file attribute.');
					} else if ( util.isNullOrUndefined(me.attributes.variable) ) {
						throw new Error('Missing required variable attribute.');
					}

					break; // case list
				case 'read':
					if ( util.isNullOrUndefined(me.attributes.variable) ) {
						throw new Error('Missing required variable attribute.');
					} else if ( util.isNullOrUndefined(me.attributes.file) ) {
						throw new Error('Missing required file attribute.');
					} else if ( util.isNullOrUndefined(me.attributes.entry_path) ) {
						throw new Error('Missing required entry_path attribute.');
					}
					break; // case read
				case 'readbinary':
				case 'read_binary':
					if ( util.isNullOrUndefined(me.attributes.variable) ) {
						throw new Error('Missing required variable attribute.');
					} else if ( util.isNullOrUndefined(me.attributes.file) ) {
						throw new Error('Missing required file attribute.');
					} else if ( util.isNullOrUndefined(me.attributes.entry_path) ) {
						throw new Error('Missing required entry_path attribute.');
					}
					break; // case read_binary
				case 'unzip':
					if ( util.isNullOrUndefined(me.attributes.file) ) {
						throw new Error('Missing required file attribute.');
					}
					if ( util.isNullOrUndefined(me.attributes.destination) ) {
						throw new Error('Missing required destination attribute.');
					}

					break;
				case 'zip':
					if ( util.isNullOrUndefined(me.attributes.file) ) {
						throw new Error('Missing required file attribute.');
					}
					if ( util.isNullOrUndefined(me.attributes.source) ) {
						throw new Error('Missing required source attribute.');
					}
					break;
				default:
					throw new Error('Unrecognized value "' + me.attributes.action + '" defined for action attribute.');
					break
			}
			break; // case zip
		case 'zipparam':
			break; // case zipparam
	}
	// end tag specific default handling
}

CFTag.prototype._setAttributes = function (fromArray) {
//	console.dir({fromArray: fromArray, typeof_fromArray: typeof fromArray, isArray: Array.isArray(fromArray), length: fromArray.length, has_name: fromArray.name, has_value: fromArray.value });
	if ( Array.isArray(fromArray) ) {
		for(i=0; i < fromArray.length; i++) {
			if ( !util.isObject(fromArray[i]) ) {
				continue;
			} 
			this.attributes[fromArray[i].name] = fromArray[i].value;
		}
	} else if ( typeof fromArray !== 'undefined' && fromArray.name && fromArray.value ) { 
		this.attributes[fromArray.name] = fromArray.value;
	} else {
		throw new Error(util.format('Unknown type [%s] passed to _setAttribute.', typeof fromArray));
	}
}

CFTag.prototype.is_empty = function () {
	return this.content === '';
}

module.exports = CFTag;
