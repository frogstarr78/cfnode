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
    { name: 'escape_chars',           value: false },
    { name: 'ignore_enclosure_error', value: false },
    { name: 'overwrite',              value: false },
    { name: 'overwrite_enclosure',    value: false },
    { name: 'proxy_port',             value: 80 },
    { name: 'user_agent',             value: 'Cold Fusion' }
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
	'mailpart': [{ name: 'wrap_text', value: 80 }],
	'output': [
		{ name: 'group_case_sensitive', value: true },
		{ name: 'max_rows',             value: -1   },
		{ name: 'start_row',            value: 1    }
	],
	'param': [{ name: 'type', value: 'any' }],
	'pop': [
    { name: 'action',               value: 'get_headers_only' },
    { name: 'debug',                value: false              },
    { name: 'get_unique_filenames', value: false              },
    { name: 'port',                 value: 110                },
    { name: 'start_row',            value: 1                  },
    { name: 'timeout',              value: 60                 }
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
		{ name: 'store_path',     value: true    },
		{ name: 'show_directory', value: false   },
		{ name: 'recurse',        value: true    },
		{ name: 'overwrite',      value: false   }
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
				throw new Error("Missing required name attribute.");
			}
			break; // application
		case 'associate':
			if ( plib.is_empty(me.attributes.base_tag) ) {
				throw new Error("Missing required base_tag attribute.");
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
						throw new Error("Missing required name attribute for get action.");		
					}
					if ( plib.is_empty( me.attributes.id ) ) {
						throw new Error("Missing required id attribute for get action.");		
					}
					break;
				case 'put':
					if ( plib.is_empty( me.attributes.value ) ) {
						throw new Error("Missing required value attribute for put action.");		
					}
					if ( plib.is_empty( me.attributes.id ) ) {
						throw new Error("Missing required id attribute for put action.");		
					}
					break;
				case 'flush':
					// @TODO Fix this to detect operations on Objects only and not Pages.
					if ( plib.is_empty( me.attributes.id ) ) {
						throw new Error("Missing required id attribute for put action.");		
					}
					break;
			}
			break; // cache
		case 'case':
			if ( plib.is_empty( me.attributes.value ) ) {
				throw new Error("Missing required value attribute.");		
			}
			break; // case
		case 'cookie':
			if ( plib.is_empty( me.attributes.name ) ) {
				throw new Error("Missing required name attribute.");		
			}

			if ( !plib.is_empty( me.attributes.path ) && plib.is_empty( me.attributes.domain )) {
				throw new Error("Missing domain value, required with path attribute.");		
			}
			break; // cookie
		case 'dbinfo':
			if ( plib.is_empty( me.attributes.type ) ) {
				throw new Error("Missing required type attribute.");		
			}

			types_requiring_table_value = ['columns', 'foreignkeys', 'index'];
			if ( ( me.attributes.type && types_requiring_table_value.indexOf(me.attributes.type) > -1 ) && ( plib.is_empty( me.attributes.table ) ) ) {
				throw new Error(util.format("Missing table value, required with type attribute specified as one of %a.", types_requiring_table_value));		
			}

			if ( plib.is_empty( me.attributes.name ) ) {
				throw new Error("Missing required name attribute.");		
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
				throw new Error("Missing required template attribute.");		
			}
			if ( plib.is_empty( me.attributes.type ) ) {
				throw new Error("Missing required type attribute.");		
			}
			break; // error
		case 'execute':
			if ( plib.is_empty( me.attributes.name ) ) {
				throw new Error("Missing required name attribute.");		
			}
			break; // execute
		case 'feed':
      if ( plib.is_empty(me.attributes.action) ) {
        me.attributes.action = 'create';
      }

      if ( me.attributes.action === 'create' && plib.is_empty(me.attributes.output_file) && plib.is_empty(me.attributes.xml_var) ) {
        throw new Error("Missing required output_file or xml_var attribute.");
      }

      if ( me.attributes.action === 'read' ) {
        if ( plib.is_empty(me.attributes.source) ) {
          throw new Error("Missing required source attribute.");
        }
        if ( plib.is_empty(me.attributes.name) && plib.is_empty(me.attributes.properties) && plib.is_empty(me.attributes.query) && plib.is_empty(me.attributes.output_file) && plib.is_empty(me.attributes.xml_var) ) {
          throw new Error('Missing required one of name, properties, query, output_file, or xml_var attribute.');
        }
      } else { 
        if ( plib.is_empty(me.attributes.query) && plib.is_empty(me.attributes.name) ) {
            throw new Error("Missing required query or name attribute.");
        } else if ( !plib.is_empty(me.attributes.query) && plib.is_empty(me.attributes.properties) ) {
            throw new Error("Missing required properties attribute.");
        } else if ( plib.is_empty(me.attributes.query) && !plib.is_empty(me.attributes.properties) ) {
            throw new Error("Missing required query attribute.");
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
						throw new Error("Missing required output attribute.");
					} else if ( plib.is_empty( me.attributes.file ) ) {
						throw new Error("Missing required file attribute.");
					}
					break;

				case 'copy':
					if ( plib.is_empty( me.attributes.destination ) ) {
						throw new Error("Missing required destination attribute.");
					} else if ( plib.is_empty( me.attributes.source ) ) {
						throw new Error("Missing required source attribute.");
					}
					break;
				case 'delete':
					if ( plib.is_empty( me.attributes.file ) ) {
						throw new Error("Missing required file attribute.");
					}
					break;
				case 'move':
					if ( plib.is_empty(me.attributes.destination) ) {
						throw new Error("Missing required destination attribute.");
					}
					if ( plib.is_empty( me.attributes.source ) ) {
						throw new Error("Missing required source attribute.");
					}
					if ( plib.is_empty( me.attributes.charset ) ) {
						me.attributes.charset = 'utf-8';
					}
					break;
				case 'read':
					if ( plib.is_empty( me.attributes.charset ) ) {
						me.attributes.charset = 'utf-8';
					}

					if ( plib.is_empty( me.attributes.variable ) ) {
						throw new Error("Missing required variable attribute.");
					} else if ( plib.is_empty( me.attributes.file ) ) {
						throw new Error("Missing required file attribute.");
					}
					break;
				case 'rename':
					if ( plib.is_empty( me.attributes.destination ) ) {
						throw new Error("Missing required destination attribute.");
					} else if ( plib.is_empty( me.attributes.source ) ) {
						throw new Error("Missing required source attribute.");
					}
					break;
				case 'upload':
					if ( plib.is_empty( me.attributes.name_conflict ) ) {
						me.attributes.name_conflict = 'error';
					}

					if ( plib.is_empty( me.attributes.destination ) ) {
						throw new Error("Missing required destination attribute.");
					} else if ( plib.is_empty( me.attributes.file_field ) ) {
						throw new Error("Missing required file_field attribute.");
					}
					break;
				case 'upload_all':
					if ( plib.is_empty( me.attributes.name_conflict ) ) {
						me.attributes.name_conflict = 'error';
					}

					if ( plib.is_empty( me.attributes.destination ) ) {
						throw new Error("Missing required destination attribute.");
					}
					break;
				default:
					throw new Error("Missing required action attribute.");
					break
			}
			break; // file
		case 'function':
        if ( plib.is_empty(me.attributes.name) ) { 
          throw new Error("Missing required name attribute.");		
        }
			break; // function
		case 'header':
			if ( plib.is_empty(me.attributes.name) && plib.is_empty(me.attributes.status_code) ) {
				throw new Error("Missing required name or statusCode attribute.");
			}
			break; // header
		case 'htmlhead':
			if ( plib.is_empty(me.attributes.text) ) {
				throw new Error("Missing required text attribute.");
			}
			break; // htmlhead
		case 'http':
			if ( plib.is_empty(me.attributes.url) ) {
				throw new Error("Missing required url attribute.");
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
				throw new Error("Missing required type attribute.");
			} 

			if ( me.attributes.type === 'file' && plib.is_empty(me.attributes.file) ) {
				throw new Error("Missing required file attribute.");
			}

			if ( ['xml', 'body'].indexOf( me.attributes.type ) === -1 && plib.is_empty(me.attributes.name) ) {
				throw new Error("Missing required name attribute.");
			}

			if ( me.attributes.type !== 'file' && plib.is_empty(me.attributes.value) ) {
				throw new Error("Missing required value attribute.");
			}

			break; // httpparam
		case 'if':

			break; // if
		case 'insert':
			if ( plib.is_empty(me.attributes.table_name) ) {
				throw new Error("Missing required table_name attribute.");
			} else if ( plib.is_empty(me.attributes.datasource) ) {
				throw new Error("Missing required datasource attribute.");
			}
			break; // insert
		case 'import':
			if ( plib.is_empty(me.attributes.taglib) ) {
				throw new Error("Missing required taglib attribute.");
			}
			if ( plib.is_nil(me.attributes.prefix) ) {
				throw new Error("Missing required prefix attribute.");
			}
			break; // import
		case 'invokeargument':
			if ( plib.is_empty(me.attributes.value) ) {
				throw new Error("Missing required value attribute.");
			}

			if ( plib.is_empty(me.attributes.name) ) {
				throw new Error("Missing required name attribute.");
			}

			break; // invokeargument
		case 'location':
			if ( plib.is_empty(me.attributes.url) ) {
				throw new Error("Missing required url attribute.");
			}
			break; // location
		case 'lock':
			if ( plib.is_empty(me.attributes.timeout) ) {
				throw new Error("Missing required timeout attribute.");
			}
			break; // lock
		case 'loginuser':
			if ( plib.is_empty(me.attributes.roles) ) {
				throw new Error("Missing required roles attribute.");
			}
			if ( plib.is_empty(me.attributes.password) ) {
				throw new Error("Missing required password attribute.");
			}
			if ( plib.is_empty(me.attributes.name) ) {
				throw new Error("Missing required name attribute.");
			}
			break; // loginuser
		case 'log':
			if ( plib.is_empty(me.attributes.text) ) {
				throw new Error("Missing required text attribute.");
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
          throw new Error("Missing required array attribute.");
        } else if ( plib.is_empty(me.attributes.index) ) {
          throw new Error("Missing required index attribute.");
        }
      } else if ( me._parse_modifier === 'conditional' ) {
        if ( plib.is_empty(me.attributes.condition) ) {
          throw new Error("Missing required condition attribute.");
        }
      } else if ( me._parse_modifier === 'date_range' ) {
        if ( plib.is_empty(me.attributes.to) ) {
          throw new Error("Missing required to attribute.");
        } else if ( plib.is_empty(me.attributes.from) ) {
          throw new Error("Missing required from attribute.");
        } else if ( plib.is_empty(me.attributes.index) ) {
          throw new Error("Missing required index attribute.");
        }
      } else if ( me._parse_modifier === 'file' ) {
        if ( plib.is_empty(me.attributes.index) ) {
          throw new Error("Missing required index attribute.");
        } else if ( plib.is_empty(me.attributes.file) ) {
          throw new Error("Missing required file attribute.");
        }
      } else if ( me._parse_modifier === 'index' ) {
        if ( plib.is_empty(me.attributes.to) ) {
          throw new Error("Missing required to attribute.");
        } else if ( plib.is_empty(me.attributes.from) ) {
          throw new Error("Missing required from attribute.");
        } else if ( plib.is_empty(me.attributes.index) ) {
          throw new Error("Missing required index attribute.");
        }
      } else if ( me._parse_modifier === 'list' ) {
        if ( plib.is_empty(me.attributes.index) ) {
          throw new Error("Missing required index attribute.");
        } else if ( plib.is_empty(me.attributes.list) ) {
          throw new Error("Missing required list attribute.");
        } 
      } else if ( me._parse_modifier === 'query' ) {
        if ( plib.is_empty(me.attributes.query) ) {
          throw new Error("Missing required query attribute.");
        }
      } else if ( me._parse_modifier === 'collection' ) {
        if ( plib.is_empty(me.attributes.collection) ) {
          throw new Error("Missing required array attribute.");
        } else if ( plib.is_empty(me.attributes.index) ) {
          throw new Error("Missing required index attribute.");
        }
      }
			break; // loop
		case 'mail':
			if ( plib.is_empty( me.attributes.subject ) ) {
				throw new Error("Missing required subject attribute.");
			}
			if ( plib.is_empty( me.attributes.from ) ) {
				throw new Error("Missing required from attribute.");
			}
			if ( plib.is_empty( me.attributes.to ) ) {
				throw new Error("Missing required to attribute.");
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
				throw new Error("Missing required name attribute.");
			}
			break; // param
		case 'pop':
      if ( plib.is_empty(me.attributes.server) ) {
        throw new Error("Missing required server attribute.");		
      }

      if ( plib.is_empty(me.attributes.name) && ( me.attributes.action === 'getAll' || me.attributes.action === 'get_all' || me.attributes.action === 'getHeadersOnly' || me.attributes.action === 'get_headers_only' ) ) {
        throw new Error("Missing required name attribute with specified action.");		
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
				throw new Error("Missing required name attribute.");
			}
			break; // procresult
		case 'procparam':
			if ( plib.is_empty( me.attributes.cf_sql_type ) ) {
				throw new Error("Missing required cf_sql_type attribute.");
			}

			if ( me.attributes.type == "in" && plib.is_empty(me.attributes.value) ) {
				throw new Error("Missing required value attribute.");
			} else if ( ['inout', 'out'].indexOf(me.attributes.type) > -1 && plib.is_empty(me.attributes.variable) ) {
				throw new Error("Missing required variable attribute.");
			}
			break; // procparam
		case 'property':
			if ( plib.is_empty( me.attributes.name ) ) {
				throw new Error("Missing required name attribute.");
			}
			break; // property
		case 'queryparam':
			if ( plib.is_empty( me.attributes.value ) ) {
				throw new Error("Missing required value attribute.");
			}
			break; // queryparam
		case 'schedule':
			if ( plib.is_empty( me.attributes.action ) ) {
				throw new Error("Missing required action attribute.");
			} else if ( plib.is_empty( me.attributes.task ) ) {
				throw new Error("Missing required task attribute.");
			}

			if ( me.attributes.action === 'update' ) {
				if ( plib.is_empty( me.attributes.interval ) ) {
					throw new Error("Missing required interval attribute.");
				} else if ( plib.is_empty( me.attributes.operation ) ) {
					throw new Error("Missing required operation attribute.");
				} else if ( plib.is_empty( me.attributes.start_date ) ) {
					throw new Error("Missing required start_date attribute.");
				} else if ( plib.is_empty( me.attributes.start_time ) ) {
					throw new Error("Missing required start_time attribute.");
				} else if ( plib.is_empty( me.attributes.url ) ) {
					throw new Error("Missing required url attribute.");
				}
			}

			if ( me.attributes.publish === true ) {
				if ( plib.is_empty( me.attributes.file ) ) {
					throw new Error("Missing required file attribute.");
				} else if ( plib.is_empty( me.attributes.path ) ) {
					throw new Error("Missing required path attribute.");
				}
			}
			break; // case schedule
		case 'storedproc':
			if ( plib.is_empty(me.attributes.datasource) ) {
				throw new Error("Missing required datasource attribute.");
			} else if ( plib.is_empty(me.attributes.procedure) ) {
				throw new Error("Missing required procedure attribute.");
			}
			break; // storedproc
		case 'update':
			if ( plib.is_empty(me.attributes.table_name) ) {
				throw new Error("Missing required table_name attribute.");
			} else if ( plib.is_empty(me.attributes.datasource) ) {
				throw new Error("Missing required datasource attribute.");
			}
			break; // update
		case 'xml':
			if ( plib.is_empty(me.attributes.variable) ) {
				throw new Error("Missing required variable attribute.");
			}
			break; // xml
		case 'zip':
			if ( plib.is_empty( me.attributes.action ) ) {
				me.attributes.action = 'zip';	
			} 

			if ( ['delete', 'list', 'read', 'read_binary', 'unzip', 'zip'].includes(me.attributes.action) && plib.is_empty(me.attributes.file) ) {
				throw new Error("Missing required file attribute.");
			} else if ( ['read', 'read_binary', 'readbinary'].includes( me.attributes.action ) && plib.is_empty(me.attributes.variable) ) {
				throw new Error("Missing required variable attribute.");
			} else if ( ['read', 'read_binary', 'readbinary'].includes( me.attributes.action ) && plib.is_empty(me.attributes.entry_path) ) {
				throw new Error("Missing required entry_path attribute.");
			} else if ( me.attributes.action === 'unzip' && plib.is_empty(me.attributes.destination) ) {
				throw new Error("Missing required destination attribute.");
			} else if ( me.attributes.action === 'list' && plib.is_empty(me.attributes.name) ) {
				throw new Error("Missing required name attribute.");
			} else if ( me.attributes.action === 'zip' && plib.is_empty(me.attributes.source) ) {
				throw new Error("Missing required source attribute.");
			}
			break; // case zip
		case 'zipparam':
			if ( plib.is_empty( me.attributes.charset ) ) {
				me.attributes.charset = 'utf-8';	
			} 
			if ( plib.is_empty( me.attributes.recurse ) ) {
				me.attributes.recurse = false;	
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
