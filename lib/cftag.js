var util = require('util'),
  	plib = require('./parselib');

class UnexpectedEmptyAttributeError extends Error {
  constructor(attribute, ...params) {
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MissingOneRequiredAttributeError);
    }

    // Custom debugging information
    this.attribute = attribute;
    this.date = new Date();
    this.message = util.format('Empty "%s" attribute.', this.attribute)
  }
}

class MissingOneRequiredAttributeError extends Error {
  constructor(attribute, ...params) {
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MissingOneRequiredAttributeError);
    }

    // Custom debugging information
    this.attribute = attribute;
    this.date = new Date();
    this.message = util.format('Missing required "%s" attribute.', this.attribute)
  }
}

class MissingARequiredAttributeError extends Error {
  constructor(attribute1, attribute2, ...params) {
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MissingARequiredAttributeError);
    }

    // Custom debugging information
    this.attribute1 = attribute1;
    this.attribute2 = attribute2;
    this.date = new Date();
    this.message = util.format('Missing one of required "%s" or "%s" attributes.', this.attribute1, this.attribute2)
  }
}

class InvalidAttributeValueError extends Error {
  constructor(attribute, value, ...params) {
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidAttributeValueError);
    }

    // Custom debugging information
    this.attribute = attribute;
    this.value = value;
    this.date = new Date();
    this.message = util.format('Invalid value "%s" specified for "%s" attribute.', this.value, this.attribute)
  }
}

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
		{ name: 'escape_chars',           value: false },
		{ name: 'ignore_enclosure_error', value: false },
		{ name: 'overwrite',              value: false },
		{ name: 'overwrite_enclosure',    value: false },
		{ name: 'proxy_port',             value: 80 },
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
		{ name: 'action',       value: 'query'           },
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
		{ name: 'action',                    value: 'get_header_only'  },
		{ name: 'debug',                     value: false              },
		{ name: 'generate_unique_filenames', value: false              },
		{ name: 'port',                      value: 110                },
		{ name: 'start_row',                 value: 1                  },
		{ name: 'timeout',                   value: 60                 }
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

function CFTag( tag_name, attrs=[], content='', _modifier=null ) {
	var me = this;
	this.tag = tag_name.replace(/^[cC][fF]/, '').toLowerCase();
	this.content = plib.stringify(content);
	this.attributes = {};
    this._parse_modifier = _modifier;

	if ( tag_defaults[this.tag] ) {
		this._setAttributes(tag_defaults[this.tag]);
	}

    if ( Array.isArray(attrs) ) {
      this._setAttributes(plib.flatten(attrs));
    } else { 
      this._setAttributes(attrs);
    }

	// tag specific default handling
	// for conditional default value assignment
	switch( me.tag ) {
		case 'application':
			if ( plib.is_empty(me.attributes.name) ) {
				throw new MissingOneRequiredAttributeError('name');
			}
			break; // application
		case 'associate':
			if ( plib.is_empty(me.attributes.base_tag) ) {
				throw new MissingOneRequiredAttributeError('base_tag');
			}
			break; // associate
		case 'ajaxproxy':
			if ( plib.is_empty(me.attributes.bind) && plib.is_empty(me.attributes.cfc) ) {
				throw new Error("Missing required bind or cfc attribute.");
			} else if ( !plib.is_empty(me.attributes.bind) && !plib.is_empty(me.attributes.cfc) ) {
				throw new Error("Invalid attributes. Cannot define both bind and cfc attributes simultaneously.");
			} else if ( plib.is_empty(me.attributes.bind) && !plib.is_empty(me.attributes.cfc) ) {
				if ( plib.is_empty(me.attributes.js_class_name) ) {
					me.attributes.js_class_name = me.attributes.cfc;
				}
			} else if ( !plib.is_empty(me.attributes.bind) && plib.is_empty(me.attributes.cfc) ) {
				// nothing yet
			}
			break; // ajaxproxy'
		case 'cache':
			switch(me.attributes.action) {
				case 'get':
					if ( plib.is_empty( me.attributes.name ) ) {
						throw new MissingOneRequiredAttributeError('name');		
					}
					if ( plib.is_empty( me.attributes.id ) ) {
						throw new MissingOneRequiredAttributeError('id');		
					}
					break;
				case 'put':
					if ( plib.is_empty( me.attributes.value ) ) {
						throw new MissingOneRequiredAttributeError('value');		
					}
					if ( plib.is_empty( me.attributes.id ) ) {
						throw new MissingOneRequiredAttributeError('id');		
					}
					break;
				case 'flush':
					// @TODO Fix this to detect operations on Objects only and not Pages.
					if ( plib.is_empty( me.attributes.id ) ) {
						throw new MissingOneRequiredAttributeError('id');		
					}
					break;
			}
			break; // cache
		case 'case':
			if ( plib.is_empty( me.attributes.value ) ) {
				throw new MissingOneRequiredAttributeError('value');		
			}
			break; // case
		case 'cookie':
			if ( plib.is_empty( me.attributes.name ) ) {
				throw new MissingOneRequiredAttributeError('name');		
			}

			if ( !plib.is_empty( me.attributes.path ) && plib.is_empty( me.attributes.domain )) {
				throw new Error("Missing domain value, required with path attribute.");		
			}
			break; // cookie
		case 'dbinfo':
			if ( plib.is_empty( me.attributes.type ) ) {
				throw new MissingOneRequiredAttributeError('type');		
			}

			types_requiring_table_value = ['columns', 'foreignkeys', 'index'];
			if ( types_requiring_table_value.includes(me.attributes.type) && plib.is_empty( me.attributes.table ) ) {
				throw new Error(util.format("Missing table value, required with type attribute specified as one of %s.", types_requiring_table_value));		
			}

			if ( plib.is_empty( me.attributes.name ) ) {
				throw new MissingOneRequiredAttributeError('name');		
			}
			break; // dbinfo
		case 'directory':
			if ( plib.is_empty( me.attributes.directory ) ) {
				throw new Error("Missing required directory attribute.");		
			} else {
				if ( ! require('fs').statSync(me.attributes.directory).isDirectory() ) {
					throw new Error('Invalid directory attribute. Value is not a directory.');	
				}
			}
			break; // directory
		case 'dump':
			if ( plib.is_empty( me.attributes.var ) ) {
				throw new Error("Missing required var attribute.");		
			}
			break; // dump
		case 'error':
			if ( plib.is_empty( me.attributes.template ) ) {
				throw new MissingOneRequiredAttributeError('template');		
			}
			if ( plib.is_empty( me.attributes.type ) ) {
				throw new MissingOneRequiredAttributeError('type');		
			}
			break; // error
		case 'execute':
			if ( plib.is_missing( me.attributes.name ) ) {
				throw new MissingOneRequiredAttributeError('name');		
			}
			if ( plib.is_empty( me.attributes.name ) ) {
				throw new InvalidAttributeValueError('name', me.attributes.name);		
			}
			break; // execute
		case 'feed':
      if ( plib.is_empty(me.attributes.action) ) {
        me.attributes.action = 'create';
      }

      if ( me.attributes.action === 'create' ) {
          if ( plib.is_missing(me.attributes.output_file) && plib.is_missing(me.attributes.xml_var) ) {
            throw new MissingARequiredAttributeError('output_file', 'xml_var');
          }
      }

      if ( me.attributes.action === 'read' ) {
        if ( plib.is_empty(me.attributes.source) ) {
          throw new MissingOneRequiredAttributeError('source');
        }
        if ( plib.is_empty(me.attributes.name) && plib.is_empty(me.attributes.properties) && plib.is_empty(me.attributes.query) && plib.is_empty(me.attributes.output_file) && plib.is_empty(me.attributes.xml_var) ) {
          throw new Error('Missing required one of name, properties, query, output_file, or xml_var attribute.');
        }
      } else { 
        if ( plib.is_empty(me.attributes.query) && plib.is_empty(me.attributes.name) ) {
            throw new MissingARequiredAttributeError('name', 'query');
        } else if ( !plib.is_empty(me.attributes.query) && plib.is_empty(me.attributes.properties) ) {
            throw new MissingOneRequiredAttributeError('properties');
        } else if ( plib.is_empty(me.attributes.query) && !plib.is_empty(me.attributes.properties) ) {
            throw new MissingOneRequiredAttributeError('query');
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
					if ( plib.is_empty( me.attributes.charset ) ) {
						me.attributes.charset = 'utf-8';
					}
					if ( plib.is_empty( me.attributes.fix_newline ) ) {
						me.attributes.fix_newline = false;
					}

					if ( plib.is_empty( me.attributes.output ) ) {
						throw new MissingOneRequiredAttributeError('output');
					} else if ( plib.is_empty( me.attributes.file ) ) {
						throw new MissingOneRequiredAttributeError('file');
					}
					break;

				case 'copy':
					if ( plib.is_empty( me.attributes.destination ) ) {
						throw new MissingOneRequiredAttributeError('destination');
					} else if ( plib.is_empty( me.attributes.source ) ) {
						throw new MissingOneRequiredAttributeError('source');
					}
					break;
				case 'delete':
					if ( plib.is_empty( me.attributes.file ) ) {
						throw new MissingOneRequiredAttributeError('file');
					}
					break;
				case 'move':
					if ( plib.is_empty(me.attributes.destination) ) {
						throw new MissingOneRequiredAttributeError('destination');
					}
					if ( plib.is_empty( me.attributes.source ) ) {
						throw new MissingOneRequiredAttributeError('source');
					}
					if ( plib.is_empty( me.attributes.charset ) ) {
						me.attributes.charset = 'utf-8';
					}
					break;
				case 'read':
				case 'read_binary':
				case 'readBinary':
				case 'readbinary':
					if ( plib.is_empty( me.attributes.charset ) ) {
						me.attributes.charset = 'utf-8';
					}

					if ( plib.is_empty( me.attributes.variable ) ) {
						throw new MissingOneRequiredAttributeError('variable');
					} else if ( plib.is_empty( me.attributes.file ) ) {
						throw new MissingOneRequiredAttributeError('file');
					}
					break;
				case 'rename':
					if ( plib.is_empty( me.attributes.destination ) ) {
						throw new MissingOneRequiredAttributeError('destination');
					} else if ( plib.is_empty( me.attributes.source ) ) {
						throw new MissingOneRequiredAttributeError('source');
					}
					break;
				case 'upload':
					if ( plib.is_empty( me.attributes.name_conflict ) ) {
						me.attributes.name_conflict = 'error';
					}

					if ( plib.is_empty( me.attributes.destination ) ) {
						throw new MissingOneRequiredAttributeError('destination');
					} else if ( plib.is_empty( me.attributes.file_field ) ) {
						throw new MissingOneRequiredAttributeError('file_field');
					}
					break;
				case 'upload_all':
					if ( plib.is_empty( me.attributes.name_conflict ) ) {
						me.attributes.name_conflict = 'error';
					}

					if ( plib.is_empty( me.attributes.destination ) ) {
						throw new MissingOneRequiredAttributeError('destination');
					}
					break;
				default:
					throw new MissingOneRequiredAttributeError('action');
					break
			}
			break; // file
		case 'function':
            if ( plib.is_empty(me.attributes.name) ) { 
              throw new MissingOneRequiredAttributeError('name');		
            }
			break; // function
		case 'ftp':
            if ( plib.is_empty(me.attributes.action) ) { 
                throw new MissingOneRequiredAttributeError('action');		
            } else {
                if ( ['listdir', 'listDir', 'list_dir'].includes(me.attributes.action) ) {
                    if ( plib.is_empty(me.attributes.name) ) {
                        throw new MissingOneRequiredAttributeError('name');
                    } 
                }

                if ( ['createdir', 'createDir', 'create_dir'].includes(me.attributes.action) ) {
                        if ( plib.is_empty(me.attributes.directory) ) {
                            throw new MissingOneRequiredAttributeError('directory');
                        } 
                }

                var action_attribute = [
                    'getfile',
                    'getFile',
                    'get_file',
                    'existsfile',
                    'existsFile',
                    'exists_file',
                    'remotefile',
                    'remoteFile',
                    'remote_file'
                ];
                if ( action_attribute.includes(me.attributes.action) ) {
                    if ( plib.is_empty(me.attributes.remote_file) ) {
                        throw new MissingOneRequiredAttributeError('remote_file');
                    } 
                }

                var action_attribute = [
                    'getfile',
                    'getFile',
                    'get_file',
                    'putfile',
                    'putFile',
                    'put_file'
                ];
                if ( action_attribute.includes(me.attributes.action) ) {
                    if ( plib.is_empty(me.attributes.local_file) ) {
                        throw new MissingOneRequiredAttributeError('local_file');
                    } 
                }
                switch(me.attributes.action) {
                    case 'close':
                        if ( plib.is_empty(me.attributes.connection) ) {
                            throw new MissingOneRequiredAttributeError('connection');
                        } 
                        if ( !plib.is_empty(me.attributes.action_param) ) {
                            throw new Error('Unexpected action_param used with action == "close" attribute.');
                        } 
                        if ( !plib.is_empty(me.attributes.buffer_size) ) {
                            throw new Error('Unexpected buffer_size used with action == "close" attribute.');
                        } 
                        break;
                    case 'quote':
                        if ( !plib.is_empty(me.attributes.secure) ) {
                            throw new Error('Unexpected secure connection used with action == "quote" attribute.');
                        } 
                        break;
                    case 'exists':
                    case 'remove':
                        if ( plib.is_empty(me.attributes.item) ) {
                            throw new MissingOneRequiredAttributeError('item');
                        } 
                        break;
                    case 'open':
                        if ( plib.is_empty(me.attributes.connection) ) {
                            throw new MissingOneRequiredAttributeError('connection');
                        } 
                        if ( plib.is_empty(me.attributes.password) ) {
                            throw new MissingOneRequiredAttributeError('password');
                        } 
                        if ( plib.is_empty(me.attributes.username) ) {
                            throw new MissingOneRequiredAttributeError('username');
                        } 
                        if ( plib.is_empty(me.attributes.server) ) {
                            throw new MissingOneRequiredAttributeError('server');
                        } 
                        if ( !plib.is_empty(me.attributes.passphrase) && plib.is_empty(me.attributes.key) ) {
                            throw new Error('Unexpected passphrase used with no key attribute specified.');
                        } 
                        break;
                    case 'exists_dir':
                        if ( plib.is_empty(me.attributes.directory) ) {
                            throw new MissingOneRequiredAttributeError('directory');
                        } 
                        break;
                    case 'rename':
                        if ( plib.is_empty(me.attributes.new) ) {
                            throw new MissingOneRequiredAttributeError('new');
                        } 
                        if ( plib.is_empty(me.attributes.existing) ) {
                            throw new MissingOneRequiredAttributeError('existing');
                        } 
                        break;
                    case 'changedir':
                    case 'change_dir':
                    case 'list_dir':
                    case 'listDir':
                        if ( plib.is_empty(me.attributes.directory) ) {
                            throw new MissingOneRequiredAttributeError('directory');
                        } 
                        if ( plib.is_empty(me.attributes.ascii_extenstion_list) ) {
                            me.attributes.ascii_extension_list = 'txt;htm;html;cfm;cfml;shtm;shtml;css;asp;asa'.split(';'); 
                        }
                        if ( plib.is_empty(me.attributes.fail_if_exists) ) {
                            me.attributes.fail_if_exists = true; 
                        }
                        if ( plib.is_empty(me.attributes.transfer_mode) ) {
                            me.attributes.transfer_mode = 'auto'; 
                        }
                        break;
                }
            }
            break; // ftp
		case 'header':
			if ( plib.is_empty(me.attributes.name) && plib.is_empty(me.attributes.status_code) ) {
				throw new MissingARequiredAttributeError('name', 'status_code');
			}
			break; // header
		case 'htmlhead':
			if ( plib.is_empty(me.attributes.text) ) {
				throw new MissingOneRequiredAttributeError('text');
			}
			break; // htmlhead
		case 'http':
			if ( plib.is_empty(me.attributes.url) ) {
				throw new MissingOneRequiredAttributeError('url');
			}

			if ( plib.is_empty( me.attributes.port ) ) {
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
						throw new Error("Unknown port");
					}
				}
			}
			break; // http
		case 'httpparam':
			if ( plib.is_empty(me.attributes.type) ) {
				throw new MissingOneRequiredAttributeError('type');
			} 

			if ( me.attributes.type === 'file' && plib.is_empty(me.attributes.file) ) {
				throw new MissingOneRequiredAttributeError('file');
			}

			if ( ['xml', 'body'].indexOf( me.attributes.type ) === -1 && plib.is_empty(me.attributes.name) ) {
				throw new MissingOneRequiredAttributeError('name');
			}

			if ( me.attributes.type !== 'file' && plib.is_empty(me.attributes.value) ) {
				throw new MissingOneRequiredAttributeError('value');
			}

			break; // httpparam
		case 'if':

			break; // if
		case 'insert':
			if ( ! plib.is_missing(me.attributes.datasource) && plib.is_empty(me.attributes.datasource) ) {
				throw new UnexpectedEmptyAttributeError('data_source');
			} else if ( ! plib.is_missing(me.attributes.table_name) && plib.is_empty(me.attributes.table_name) ) {
				throw new UnexpectedEmptyAttributeError('table_name');
			}

			if ( plib.is_missing(me.attributes.datasource) ) {
				throw new MissingOneRequiredAttributeError('data_source');
			} else if ( plib.is_missing(me.attributes.table_name) ) {
				throw new MissingOneRequiredAttributeError('table_name');
			}
			break; // insert
		case 'import':
			if ( plib.is_empty(me.attributes.taglib) ) {
				throw new MissingOneRequiredAttributeError('taglib');
			}
			if ( plib.is_missing(me.attributes.prefix) ) {
				throw new MissingOneRequiredAttributeError('prefix');
			}
			break; // import
		case 'imap':
            switch(me.attributes.action) {
                case 'open':
                    if ( plib.is_empty(me.attributes.connection) ) {
                        throw new MissingOneRequiredAttributeError('connection');
                    }
                    if ( plib.is_empty(me.attributes.username) ) {
                        throw new MissingOneRequiredAttributeError('username');
                    }
                    if ( plib.is_empty(me.attributes.password) ) {
                        throw new MissingOneRequiredAttributeError('password');
                    }
                    if ( plib.is_empty(me.attributes.server) ) {
                        throw new MissingOneRequiredAttributeError('server');
                    }
                    break;
                case 'close':
                    if ( plib.is_empty(me.attributes.connection) ) {
                        throw new MissingOneRequiredAttributeError('connection');
                    }
                    break;
                case 'delete_folder':
                case 'create_folder':
                    if( plib.is_empty(me.attributes.folder) ) {
                        throw new MissingOneRequiredAttributeError('folder');
                    }
                    break;
                case 'get_all':
                case 'get_header_only':
                    if( plib.is_empty(me.attributes.name) ) {
                        throw new MissingOneRequiredAttributeError('name');
                    }
                    break;
                case 'rename_folder':
                    if( plib.is_empty(me.attributes.folder) ) {
                        throw new MissingOneRequiredAttributeError('folder');
                    }
                    if( plib.is_empty(me.attributes.new_folder) ) {
                        throw new MissingOneRequiredAttributeError('new_folder');
                    }
                    break;
                case 'list_all_folders':
                    if( plib.is_empty(me.attributes.name) ) {
                        throw new MissingOneRequiredAttributeError('name');
                    }
                    if( plib.is_empty(me.attributes.folder) ) {
                        me.attributes.folder = 'mailbox';
                    }
                    break;
                case 'move_mail':
                    if( plib.is_empty(me.attributes.new_folder) ) {
                        throw new MissingOneRequiredAttributeError('new_folder');
                    }
                    break;
                case 'get_all':
                case 'get_header_only':
                case 'list_all_folders':
                    if( plib.is_empty(me.attributes.name) ) {
                        throw new MissingOneRequiredAttributeError('name');
                    }
                    break;
            }
            if( plib.is_empty(me.attributes.folder) ) {
                me.attributes.folder = 'INBOX';
            }
            if( plib.is_empty(me.attributes.secure) ) {
                me.attributes.secure = false;
            }
            if( plib.is_empty(me.attributes.port) ) {
                me.attributes.port = me.attributes.secure ? 993 : 143;
            }
            break; // imap
		case 'invokeargument':
			if ( plib.is_empty(me.attributes.value) ) {
				throw new MissingOneRequiredAttributeError('value');
			}

			if ( plib.is_empty(me.attributes.name) ) {
				throw new MissingOneRequiredAttributeError('name');
			}

			break; // invokeargument
		case 'ldap':
            if ( me.attributes.action == 'query' ) {
                var require_attributes = ['server', 'name', 'start', 'password', 'attributes']
                for (var i=0; i < require_attributes.length; i++) {
                    var attr = require_attributes[i];
                    if ( plib.is_empty(me.attributes[attr]) ) {
                        throw new MissingOneRequiredAttributeError(attr);
                    }
                }
            }

			if ( ['add', 'delete', 'modify_dn', 'modify'].includes(me.attributes.action) && plib.is_empty(me.attributes.dn) ) {
				throw new MissingOneRequiredAttributeError('dn');
			}

			if ( ['add', 'modify_dn', 'modify'].includes(me.attributes.action) && plib.is_empty(me.attributes.attributes) ) {
				throw new MissingOneRequiredAttributeError('attributes');
			}

            break; //ldap
		case 'location':
			if ( plib.is_empty(me.attributes.url) ) {
				throw new MissingOneRequiredAttributeError('url');
			}
			break; // location
		case 'lock':
			if ( plib.is_empty(me.attributes.timeout) ) {
				throw new MissingOneRequiredAttributeError('timeout');
			}
			break; // lock
		case 'loginuser':
			if ( plib.is_empty(me.attributes.roles) ) {
				throw new MissingOneRequiredAttributeError('roles');
			}
			if ( plib.is_empty(me.attributes.password) ) {
				throw new MissingOneRequiredAttributeError('password');
			}
			if ( plib.is_empty(me.attributes.name) ) {
				throw new MissingOneRequiredAttributeError('name');
			}
			break; // loginuser
		case 'log':
			if ( plib.is_empty(me.attributes.text) ) {
				throw new MissingOneRequiredAttributeError('text');
			}
			if ( ! plib.is_empty( me.attributes.file ) ) {
				tag_defaults[me.tag].forEach(function (def) {
					if ( def.name == 'log' ) {
						me.attributes[def.name] = def.value;
					}
				});
			}
			break; // log
		case 'loop':
			if ( ! plib.is_empty( me.attributes.query ) ) {
				if ( plib.is_empty( me.attributes.start_row ) ) {
					me.attributes.start_row = 1;
				}
			} else if ( ( me.attributes.from && me.attributes.from instanceof Date ) || ( me.attributes.to && me.attributes.to instanceof Date ) ) {
				me.attributes.step = new Date(Date.now() + 86400000);	
			} else if ( plib.is_empty( me.attributes.step ) && ( ( me.attributes.from && typeof me.attributes.from === 'number' ) || ( me.attributes.to && typeof me.attributes.to === 'number' ) ) ) {
				me.attributes.step = 1;	
			} else if ( !plib.is_empty( me.attributes.list ) && plib.is_empty( me.attributes.delimiter ) ) {
				me.attributes.delimiter = ',';
			}

			if ( me._parse_modifier === 'array') {
				if ( plib.is_empty(me.attributes.array) ) {
					throw new MissingOneRequiredAttributeError('array');
				} else if ( plib.is_empty(me.attributes.index) ) {
					throw new MissingOneRequiredAttributeError('index');
				}
			} else if ( me._parse_modifier === 'conditional' ) {
				if ( plib.is_empty(me.attributes.condition) ) {
					throw new MissingOneRequiredAttributeError('condition');
				}
			} else if ( me._parse_modifier === 'date_range' ) {
				if ( plib.is_empty(me.attributes.to) ) {
					throw new MissingOneRequiredAttributeError('to');
				} else if ( plib.is_empty(me.attributes.from) ) {
					throw new MissingOneRequiredAttributeError('from');
				} else if ( plib.is_empty(me.attributes.index) ) {
					throw new MissingOneRequiredAttributeError('index');
				}
			} else if ( me._parse_modifier === 'file' ) {
				if ( plib.is_empty(me.attributes.index) ) {
					throw new MissingOneRequiredAttributeError('index');
				} else if ( plib.is_empty(me.attributes.file) ) {
					throw new MissingOneRequiredAttributeError('file');
				}
			} else if ( me._parse_modifier === 'index' ) {
				if ( plib.is_empty(me.attributes.to) ) {
					throw new MissingOneRequiredAttributeError('to');
				} else if ( plib.is_empty(me.attributes.from) ) {
					throw new MissingOneRequiredAttributeError('from');
				} else if ( plib.is_empty(me.attributes.index) ) {
					throw new MissingOneRequiredAttributeError('index');
				}
			} else if ( me._parse_modifier === 'list' ) {
				if ( plib.is_empty(me.attributes.index) ) {
					throw new MissingOneRequiredAttributeError('index');
				} else if ( plib.is_empty(me.attributes.list) ) {
					throw new MissingOneRequiredAttributeError('list');
				} 
			} else if ( me._parse_modifier === 'query' ) {
				if ( plib.is_empty(me.attributes.query) ) {
					throw new MissingOneRequiredAttributeError('query');
				}
			} else if ( me._parse_modifier === 'collection' ) {
				if ( plib.is_empty(me.attributes.collection) ) {
					throw new MissingOneRequiredAttributeError('array');
				} else if ( plib.is_empty(me.attributes.index) ) {
					throw new MissingOneRequiredAttributeError('index');
				}
			}
			break; // loop
		case 'mail':
			if ( plib.is_empty( me.attributes.subject ) ) {
				throw new MissingOneRequiredAttributeError('subject');
			}
			if ( plib.is_empty( me.attributes.from ) ) {
				throw new MissingOneRequiredAttributeError('from');
			}
			if ( plib.is_empty( me.attributes.to ) ) {
				throw new MissingOneRequiredAttributeError('to');
			}

			if ( plib.is_empty( me.attributes.charset ) ) {
				me.attributes.charset = 'utf-8';	
			} 
			if ( plib.is_empty( me.attributes.debug ) ) {
				me.attributes.debug = false;	
			} 
			if ( plib.is_empty( me.attributes.group ) ) {
				me.attributes.group = 'CurrentRow';	
			} 
			if ( plib.is_empty( me.attributes.group_case_sensitive ) ) {
				me.attributes.group_case_sensitive = false;	
			} 
			if ( plib.is_empty( me.attributes.mailer_id ) ) {
				me.attributes.mailer_id = 'ColdFusion Application Server';	
			} 
			if ( plib.is_empty( me.attributes.port ) ) {
				me.attributes.port = 25;	
			} 
			if ( plib.is_empty( me.attributes.priority ) ) {
				me.attributes.priority = 'normal';	
			} 
			if ( plib.is_empty( me.attributes.remove ) ) {
				me.attributes.remove = false;	
			} 
			if ( plib.is_empty( me.attributes.start_row ) ) {
				me.attributes.start_row = 1;
			} 
			if ( plib.is_empty( me.attributes.type ) ) {
				me.attributes.type = 'text/plain';
			} 
			if ( plib.is_empty( me.attributes.wrap_text ) ) {
				me.attributes.wrap_text = 80;
			} 
			break; // mail
		case 'mailparam':
			if ( plib.is_empty(me.attributes.file) && plib.is_empty(me.attributes.name) ) {
				throw new Error("Missing required attributes.");
			} else if ( !plib.is_empty(me.attributes.file) && !plib.is_empty(me.attributes.name) ) {
				throw new Error("Unexpectedly defined name and file attributes.");
			}

			if ( plib.is_empty( me.attributes.disposition ) ) {
				me.attributes.disposition = 'attachment';	
			}
			if ( plib.is_empty( me.attributes.remove ) ) {
				me.attributes.remove = false;	
			}
			break; // mailparam
		case 'param':
			if ( plib.is_empty( me.attributes.name ) ) {
				throw new MissingOneRequiredAttributeError('name');
			}
			break; // param
		case 'pop':
      if ( plib.is_empty(me.attributes.server) ) {
        throw new MissingOneRequiredAttributeError('server');		
      }

      if ( plib.is_missing(me.attributes.name) && ['getAll', 'get_all', 'getHeaderOnly', 'get_header_only'].includes(me.attributes.action) ) {
        throw new MissingOneRequiredAttributeError('name');		
      }
      break; // pop
		case 'property':
      if ( plib.is_empty(me.attributes.name) ) {
        throw new Error("Missing required name attribute.");		
      } else {
        if ( !plib.is_empty(me.attributes.default) ) {
          if ( !plib.is_empty(me.attributes.required) || me.attributes.required !== False ) {
            throw new Error("Invalid required attributed while default attribute defined."); 
          }
        }
      }
      break; // property
		case 'procresult':
			if ( plib.is_empty( me.attributes.name ) ) {
				throw new MissingOneRequiredAttributeError('name');
			}
			break; // procresult
		case 'procparam':
			if ( plib.is_empty( me.attributes.cf_sql_type ) ) {
				throw new MissingOneRequiredAttributeError('cf_sql_type');
			}

			if ( me.attributes.type == "in" && plib.is_empty(me.attributes.value) ) {
				throw new MissingOneRequiredAttributeError('value');
			} else if ( ['inout', 'out'].indexOf(me.attributes.type) > -1 && plib.is_empty(me.attributes.variable) ) {
				throw new MissingOneRequiredAttributeError('variable');
			}
			break; // procparam
		case 'property':
			if ( plib.is_empty( me.attributes.name ) ) {
				throw new Error("Missing required name attribute.");
			}
			break; // property
		case 'queryparam':
			if ( plib.is_empty( me.attributes.value ) ) {
				throw new MissingOneRequiredAttributeError('value');
			}
			break; // queryparam
		case 'schedule':
			if ( plib.is_empty( me.attributes.action ) ) {
				throw new MissingOneRequiredAttributeError('action');
			} else if ( plib.is_empty( me.attributes.task ) ) {
				throw new MissingOneRequiredAttributeError('task');
			}

			if ( me.attributes.action === 'update' ) {
				if ( plib.is_empty( me.attributes.interval ) ) {
					throw new MissingOneRequiredAttributeError('interval');
				} else if ( plib.is_empty( me.attributes.operation ) ) {
					throw new MissingOneRequiredAttributeError('operation');
				} else if ( plib.is_empty( me.attributes.start_date ) ) {
					throw new MissingOneRequiredAttributeError('start_date');
				} else if ( plib.is_empty( me.attributes.start_time ) ) {
					throw new MissingOneRequiredAttributeError('start_time');
				} else if ( plib.is_empty( me.attributes.url ) ) {
					throw new MissingOneRequiredAttributeError('url');
				}
			}

			if ( me.attributes.publish === true ) {
				if ( plib.is_empty( me.attributes.file ) ) {
					throw new MissingOneRequiredAttributeError('file');
				} else if ( plib.is_empty( me.attributes.path ) ) {
					throw new MissingOneRequiredAttributeError('path');
				}
			}
			break; // case schedule
		case 'storedproc':
			if ( plib.is_missing(me.attributes.datasource) ) {
				throw new MissingOneRequiredAttributeError('datasource');
			} else if ( plib.is_missing(me.attributes.procedure) ) {
				throw new MissingOneRequiredAttributeError('procedure');
			}
			if ( plib.is_empty(me.attributes.datasource) ) {
				throw new UnexpectedEmptyAttributeError('datasource');
			} else if ( plib.is_empty(me.attributes.procedure) ) {
				throw new UnexpectedEmptyAttributeError('procedure');
			}
			break; // storedproc
		case 'update':
			if ( plib.is_missing(me.attributes.datasource) ) {
				throw new MissingOneRequiredAttributeError('datasource');
			} else if ( plib.is_missing(me.attributes.table_name) ) {
				throw new MissingOneRequiredAttributeError('table_name');
			}

			if ( plib.is_empty(me.attributes.datasource) ) {
				throw new UnexpectedEmptyAttributeError('datasource');
			} else if ( plib.is_empty(me.attributes.table_name) ) {
				throw new UnexpectedEmptyAttributeError('table_name');
			}
			break; // update
		case 'xml':
			if ( plib.is_empty(me.attributes.variable) ) {
				throw new MissingOneRequiredAttributeError('variable');
			}
			break; // xml
		case 'zip':
			if ( plib.is_empty( me.attributes.action ) ) {
				me.attributes.action = 'zip';	
			} 

			if ( ['delete', 'list', 'read', 'read_binary', 'readbinary', 'unzip', 'zip'].includes(me.attributes.action) && plib.is_empty(me.attributes.file) ) {
				throw new MissingOneRequiredAttributeError('file');
			} else if ( ['read', 'read_binary', 'readbinary'].includes( me.attributes.action ) && plib.is_empty(me.attributes.variable) ) {
				throw new MissingOneRequiredAttributeError('variable');
			} else if ( ['read', 'read_binary', 'readbinary'].includes( me.attributes.action ) && plib.is_empty(me.attributes.entry_path) ) {
				throw new MissingOneRequiredAttributeError('entry_path');
			} else if ( me.attributes.action === 'unzip' && plib.is_empty(me.attributes.destination) ) {
				throw new MissingOneRequiredAttributeError('destination');
			} else if ( me.attributes.action === 'list' && plib.is_empty(me.attributes.name) ) {
				throw new MissingOneRequiredAttributeError('name');
			} else if ( me.attributes.action === 'zip' && plib.is_empty(me.attributes.source) ) {
				throw new MissingOneRequiredAttributeError('source');
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

function CFDynamicAttributeTag( tag_name, expression='', content='') {
  CFTag.call(this, tag_name, [], content);
  this.expression = plib.stringify(expression, 'trim');
  if ( plib.is_empty(this.expression) ) {
			throw new Error("Missing required expression.");		
  }
}

CFDynamicAttributeTag.prototype = Object.create(CFTag.prototype);

exports.tag = CFTag;
exports.dynamic_attribute_tag = CFDynamicAttributeTag;
