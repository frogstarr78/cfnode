{
	var util = require('util'),
		plib = require('./lib/parselib'),
		cftag = require('./lib/cftag'),
		human_date = require('date.js'),
		inspect = console.dir;

}

start 
	= tag_cfabort
	/ tag_cfajaximport
	/ tag_cfajaxproxy
	/ tag_cfapplication
	/ tag_cfassociate
	/ tag_cfbreak
	/ tag_cfcache
	/ tag_cfcase
	/ tag_cfcatch
	/ tag_cfcontent
	/ tag_cfcontinue
	/ tag_cfcookie
	/ tag_cfdbinfo
	/ tag_cfdefaultcase
	/ tag_cfdump
	/ tag_cfelse
	/ tag_cfelseif
	/ tag_cferror
	/ tag_cfexecute
	/ tag_cfexit
	/ tag_cffinally
	/ tag_cfflush
	/ tag_cffunction
	/ tag_cfheader
	/ tag_cfhtmlhead
	/ tag_cfif
	/ tag_cfimport
	/ tag_cfinclude
	/ tag_cfinsert
	/ tag_cflocation
	/ tag_cflock
	/ tag_cflog
	/ tag_cflogin
	/ tag_cfloginuser
	/ tag_cflogout
	/ tag_cfloop
	/ tag_cfobjectcache
	/ tag_cfoutput
	/ tag_cfparam
	/ tag_cfprocessingdirective
	/ tag_cfprocparam
	/ tag_cfprocresult
	/ tag_cfproperty
	/ tag_cfquery
	/ tag_cfqueryparam
	/ tag_cfrethrow
	/ tag_cfreturn
	/ tag_cfsavecontent
	/ tag_cfscript
	/ tag_cfsetting
	/ tag_cfsilent
	/ tag_cfswitch
	/ tag_cfstoredproc
	/ tag_cfthrow
	/ tag_cftimer
	/ tag_cftrace
	/ tag_cftransaction
	/ tag_cftry
	/ tag_cfupdate
//	/ tag_cfNTauthenticate
//	/ tag_cfapplet
//	/ tag_cfcalendar
//	/ tag_cfchart
//	/ tag_cfchartdata
//	/ tag_cfchartseries
//	/ tag_cfcol
//	/ tag_cfcollection
//	/ tag_cfcomponent
//	/ tag_cfdirectory
//	/ tag_cfdiv
//	/ tag_cfdocument
//	/ tag_cfdocumentitem
//	/ tag_cfdocumentsection
//	/ tag_cfexchangecalendar
//	/ tag_cfexchangeconnection
//	/ tag_cfexchangecontact
//	/ tag_cfexchangefilter
//	/ tag_cfexchangemail
//	/ tag_cfexchangetask
//	/ tag_cffeed
//	/ tag_cffile
//	/ tag_cffileupload
//	/ tag_cfform
//	/ tag_cfformgroup
//	/ tag_cfformitem
//	/ tag_cfftp
//	/ tag_cfgrid
//	/ tag_cfgridcolumn
//	/ tag_cfgridrow
//	/ tag_cfgridupdate
//	/ tag_cfhttp
//	/ tag_cfhttpparam
//	/ tag_cfimage
//	/ tag_cfimap
//	/ tag_cfindex
//	/ tag_cfinput
//	/ tag_cfinterface
//	/ tag_cfinvoke
//	/ tag_cfinvokeargument
//	/ tag_cflayout
//	/ tag_cflayoutarea
//	/ tag_cfldap
//	/ tag_cfmail
//	/ tag_cfmailparam
//	/ tag_cfmailpart
//	/ tag_cfmap
//	/ tag_cfmapitem
//	/ tag_cfmediaplayer
//	/ tag_cfmenu
//	/ tag_cfmenuitem
//	/ tag_cfmessagebox
//	/ tag_cfobject
//	/ tag_cfpdf
//	/ tag_cfpdfform
//	/ tag_cfpdfformparam
//	/ tag_cfpdfparam
//	/ tag_cfpdfsubform
//	/ tag_cfpod
//	/ tag_cfpop
//	/ tag_cfpresentation
//	/ tag_cfpresentationslide
//	/ tag_cfpresenter
//	/ tag_cfprint
//	/ tag_cfprogressbar
//	/ tag_cfregistry
//	/ tag_cfreport
//	/ tag_cfreportparam
//	/ tag_cfschedule
//	/ tag_cfsearch
//	/ tag_cfselect
//	/ tag_cfsharepoint
//	/ tag_cfslider
//	/ tag_cfspreadsheet
//	/ tag_cfsprydataset
//	/ tag_cftable
//	/ tag_cftextarea
//	/ tag_cfthread
//	/ tag_cftooltip
//	/ tag_cftree
//	/ tag_cftreeitem
//	/ tag_cfwddx
//	/ tag_cfwindow
//	/ tag_cfxml
//	/ tag_cfzip
//	/ tag_cfzipparam
	/ anychar

// Tag Definitions

tag_cfabort
	= lt t:str_cfabort attr:attr_cfabort_optional* ws* wack? gt {
		return new cftag(t, plib.flatten(attr));
	}

tag_cfajaximport
	= lt t:str_cfajaximport attr:attr_cfajaximport_optional* ws* wack? gt {
		return new cftag(t, plib.flatten(attr));
	}

tag_cfajaxproxy
	= lt t:str_cfajaxproxy attr:( attr_cfajaxproxy_cfc / attr_cfajaxproxy_bind ) ws* wack? gt {
		var me = new cftag(t, plib.flatten(attr));
		if ( me.attributes.has_key('cfc') ) {
			if ( plib.is_empty(me.attributes.cfc) ) {
				throw new Error("Empty cfc attribute value.");
			}

			if ( plib.is_nil(me.attributes.js_class_name) || plib.is_empty(me.attributes.js_class_name) ) {
				me.attributes.js_class_name = me.attributes.cfc;
			}
		}
		if ( me.attributes.has_key('bind') && plib.is_empty(me.attributes.bind) ) {
			throw new Error("Empty bind attribute value.");
		}
		return me;
	}

tag_cfapplication
	= lt t:str_cfapplication attr:( attr_cfapplication_optional* attr_cfapplication_required attr_cfapplication_optional*) ws* wack? gt {
		return new cftag(t, plib.flatten(attr));
	}

tag_cfassociate
	= lt t:str_cfassociate attr:( attr_cfassoc_required attr_cfassoc_optional* / attr_cfassoc_optional* attr_cfassoc_required ) gt {
		return new cftag(t, plib.flatten(attr));
	}

tag_cfbreak
	= lt t:str_cfbreak gt {
		return new cftag(t, []);
	}

//@TODO: Allow this to work without a closing tag. When operating on an object, we don't need a body
tag_cfcache
	= lt t:str_cfcache attr:attr_cfcache_optional* gt
	content:(!(lt wack str_cfcache gt) anychar)*
	lt wack str_cfcache gt {
		var me = new cftag(t, attr, plib.stringify(content));
		switch(me.attributes.action) {
			case 'get':
				if ( plib.is_nil( me.attributes.name ) || plib.is_empty( me.attributes.name ) ) {
					throw new Error("Missing required name attribute for get action.");		
				}
				if ( plib.is_nil( me.attributes.id ) || plib.is_empty( me.attributes.id ) ) {
					throw new Error("Missing required id attribute for get action.");		
				}
				break;
			case 'put':
				if ( plib.is_nil( me.attributes.value ) || plib.is_empty( me.attributes.value ) ) {
					throw new Error("Missing required value attribute for put action.");		
				}
				if ( plib.is_nil( me.attributes.id ) || plib.is_empty( me.attributes.id ) ) {
					throw new Error("Missing required id attribute for put action.");		
				}
				break;
			case 'flush':
				// @TODO Fix this to detect operations on Objects only and not Pages.
				if ( plib.is_nil( me.attributes.id ) || plib.is_empty( me.attributes.id ) ) {
					throw new Error("Missing required id attribute for put action.");		
				}
				break;
		}
		return me;
	}

tag_cfcase
	= lt t:str_cfcase attr:( attr_cfcase_optional? attr_cfcase_required attr_cfcase_optional? ) ws* wack? gt {
		return new cftag(t, plib.flatten(attr));
	}

tag_cfcatch
	= lt t:str_cfcatch attr:attr_cfcatch_optional* gt 
	content:(!(lt wack str_cfcatch gt) anychar)*
	lt wack str_cfcatch gt {
		return new cftag(t, attr, plib.stringify(content));
	}

tag_cfcontent
	= lt t:str_cfcontent attr:attr_cfcontent_optional* ws* wack? gt {
		return new cftag(t,  attr);
	}

tag_cfcontinue
	= lt t:str_cfcontinue ws* wack? gt {
		return new cftag(t,  []);
	}

tag_cfcookie
	= lt t:str_cfcookie attr:(
		attr_cfcookie_optional* attr_cfcookie_required attr_cfcookie_optional*
	) ws* wack? gt {
		var me = new cftag(t, plib.flatten(attr));
		if ( ( me.attributes.path && me.attributes.path !== "" ) && ( ! me.attributes.domain || me.attributes.domain === "" ) ) {
			throw new Error("Missing domain value, required with path attribute.");		
		}
		return me;
	}

tag_cfdbinfo
	= lt t:str_cfdbinfo attr:( 
			attr_cfdbinfo_optional* attr_cfdbinfo_required_name attr_cfdbinfo_optional* attr_cfdbinfo_required_type attr_cfdbinfo_optional*
			/ attr_cfdbinfo_optional* attr_cfdbinfo_required_type attr_cfdbinfo_optional* attr_cfdbinfo_required_name attr_cfdbinfo_optional*
	) ws* wack? gt {
		var me = new cftag(t, plib.flatten(attr));
		types_requiring_table_value = ['columns', 'foreignkeys', 'index'];
		if ( ( me.attributes.type && types_requiring_table_value.indexOf(me.attributes.type) > -1 ) && ( ! me.attributes.table || me.attributes.table === "" ) ) {
			throw new Error(util.format("Missing table value, required with type attribute specified as one of %a.", types_requiring_table_value));		
		}
		return me;
	}

tag_cfdefaultcase
	= lt t:str_cfdefaultcase ws* wack? gt {
		return new cftag(t, []);
	}

tag_cfdump
	= lt t:str_cfdump attr:( attr_cfdump_optional* attr_cfdump_required attr_cfdump_optional* ) ws* wack? gt {
		return new cftag(t, plib.flatten(attr));
	}

tag_cfelse
	= lt t:str_cfelse ws* wack? gt
	content:(!( tag_cfif_close ) anychar)*
	tag_cfif_close {
		return new cftag(t, [], plib.stringify(content));
	}

tag_cfelseif
	= lt t:str_cfelseif v:(!gt anychar)+ gt
	content:(!( tag_cfelseif / tag_cfelse / tag_cfif_close ) anychar)*
	(tag_cfelseif / tag_cfelse / tag_cfif_close ) {
		var me = new cftag(t, [], plib.stringify(content)),
		    val = plib.stringify(v, 'trim');
		if ( val === '' ) {
			throw new Error("Missing required expression.");		
		} else {
			me.expression = val
		}

		return me;
	}

tag_cferror
	= lt t:str_cferror attr:(
			attr_cferr_optional* attr_cferr_required_template attr_cferr_optional* attr_cferr_required_type attr_cferr_optional*
			/ attr_cferr_optional* attr_cferr_required_type attr_cferr_optional* attr_cferr_required_template attr_cferr_optional*
		) gt {
		return new cftag(t, plib.flatten(attr));
	}

tag_cfexecute
	= lt t:str_cfexecute attr:(attr_cfexecute_optional* attr_cfexecute_required attr_cfexecute_optional*) gt
	content:(!(lt wack str_cfexecute gt) anychar)*
	lt wack str_cfexecute gt {
		return new cftag(t, plib.flatten(attr), plib.stringify(content));
	}

tag_cfexit
	= lt t:str_cfexit attr:attr_cfexit_optional* ws* wack? gt {
		return new cftag(t, attr);
	}

tag_cffinally
	= lt t:str_cffinally gt 
	content:(!(lt wack str_cffinally gt) anychar)*
	lt wack str_cffinally gt {
		return new cftag(t, [], plib.stringify(content));
	}

tag_cfflush
	= lt t:str_cfflush attr:attr_cfflush_optional* ws* wack? gt {
		return new cftag(t,  plib.flatten(attr));
	}

tag_cffunction
	= lt t:str_cffunction attr:(attr_cffunction_optional* attr_cffunction_required attr_cffunction_optional* ) gt 
	content:(!(lt wack str_cffunction gt) anychar)*
	lt wack str_cffunction gt {
		return new cftag(t,  plib.flatten(attr), plib.stringify(content));
	}

tag_cflocation
	= lt t:str_cflocation attr:( attr_cflocation_optional* attr_cflocation_required attr_cflocation_optional* ) ws* wack? gt {
		return new cftag(t, plib.flatten(attr));
	}

tag_cflog
	= lt t:str_cflog attr:( attr_cflog_optional* attr_cflog_required attr_cflog_optional* ) ws* wack? gt {
		return new cftag(t, plib.flatten(attr));
	}

tag_cfheader
	= lt t:str_cfheader attr:attr_cfheader_optional* ws* wack? gt {
		var me = new cftag(t, plib.flatten(attr));	
		if ( ( typeof me.attributes.name === 'undefined' || me.attributes.name == '' ) && ( typeof me.attributes.status_code === 'undefined' || me.attributes.status_code == '' ) ) {
			throw new Error("Missing required name or statusCode attribute.");
		}
		return me;
	}

tag_cfhtmlhead
	= lt t:str_cfhtmlhead attr:attr_cfhtmlhead_required ws* wack? gt {
		return new cftag(t, [attr]);
	}

tag_cfif_close = lt wack str_cfif gt
tag_cfif
	= lt t:str_cfif v:(!gt anychar)+ gt 
	content:(!( tag_cfif_close / tag_cfelseif / tag_cfelse ) anychar)*
	( tag_cfif_close / tag_cfelseif / tag_cfelse ) {
		var me = new cftag(t, [], plib.stringify(content)),
		    val = plib.stringify(v, 'trim');
		if ( val === '' ) {
			throw new Error("Missing required expression.");		
		} else {
			me.expression = val
		}

		return me;
	}

tag_cfimport
	= lt t:str_cfimport attr:attr_cfimport_required ws* wack? gt {
		return new cftag(t, attr);
	}

tag_cfinclude
	= lt t:str_cfinclude attr:attr_cfinclude_required ws* wack? gt {
		return new cftag(t, [attr]);
	}

tag_cfinsert
	= lt t:str_cfinsert attr:(
		attr_cfinsert_optional* attr_cfinsert_required_datasource attr_cfinsert_optional* attr_cfinsert_required_table_name attr_cfinsert_optional*
		/ attr_cfinsert_optional* attr_cfinsert_required_table_name attr_cfinsert_optional* attr_cfinsert_required_datasource attr_cfinsert_optional*
	) ws* wack? gt {
		return new cftag(t, plib.flatten(attr));
	}

tag_cflock
	= lt t:str_cflock attr:(attr_cflock_optional* attr_cflock_required attr_cflock_optional* ) gt
	content:(!(lt wack str_cflock gt) anychar)*
	lt wack str_cflock gt {
		return new cftag(t, plib.flatten(attr), plib.stringify(content));
	}

tag_cflogin
	= lt t:str_cflogin attr:attr_cflogin_optional* gt
	content:(!(lt wack str_cflogin gt) anychar)*
	lt wack str_cflogin gt {
		return new cftag(t, attr, plib.stringify(content));
	}

tag_cfloginuser
	= lt t:str_cfloginuser attr:attr_cfloginuser_required+ ws* wack? gt {
		return new cftag(t, plib.flatten(attr));
	}

tag_cflogout
	= lt t:str_cflogout ws* wack? gt {
		return new cftag(t, []);
	}

tag_cfloop_close = lt wack str_cfloop gt
tag_cfloop
	= tag_cfloop_array
	/ tag_cfloop_conditional
	/ tag_cfloop_date_range
	/ tag_cfloop_file
	/ tag_cfloop_index
	/ tag_cfloop_list
	/ tag_cfloop_query
	/ tag_cfloop_collection

tag_cfloop_array
	= lt t:str_cfloop attr:attr_cfloop_array_required+ gt
	content:(!tag_cfloop_close anychar)*
	tag_cfloop_close {
		var me = new cftag(t, plib.flatten(attr), plib.stringify(content));
		if ( typeof me.attributes.array === 'undefined' || me.attributes.array == '' ) {
			throw new Error("Missing required array attribute.");
		} else if ( typeof me.attributes.index === 'undefined' || me.attributes.index == '' ) {
			throw new Error("Missing required index attribute.");
		}
		return me;
	}

tag_cfloop_conditional
	= lt t:str_cfloop attr:attr_cfloop_conditional_required gt
	content:(!tag_cfloop_close anychar)*
	tag_cfloop_close {
		var me = new cftag(t, attr, plib.stringify(content));
		if ( ( typeof me.attributes.condition === 'undefined' || me.attributes.condition == '' ) ) {
			throw new Error("Missing required condition attribute.");
		}
		return me;
	}

tag_cfloop_date_range
	= lt t:str_cfloop attr:(
			attr_cfloop_date_range_required+ attr_cfloop_date_range_optional*
			/ attr_cfloop_date_range_optional* attr_cfloop_date_range_required+
			/ attr_cfloop_date_range_required attr_cfloop_date_range_optional* attr_cfloop_date_range_required attr_cfloop_date_range_optional* attr_cfloop_date_range_required
			/ attr_cfloop_date_range_optional* attr_cfloop_date_range_required+ attr_cfloop_date_range_optional* attr_cfloop_date_range_required+ attr_cfloop_date_range_optional*
	) gt
	content:(!tag_cfloop_close anychar)*
	tag_cfloop_close {
		var me = new cftag(t, plib.flatten(attr), plib.stringify(content));
		if ( typeof me.attributes.to === 'undefined' || me.attributes.to == '' ) {
			throw new Error("Missing required to attribute.");
		} else if ( typeof me.attributes.from === 'undefined' || me.attributes.from == '' ) {
			throw new Error("Missing required from attribute.");
		} else if ( typeof me.attributes.index === 'undefined' || me.attributes.index == '' ) {
			throw new Error("Missing required index attribute.");
		}
		return me;
	}

tag_cfloop_file
	= lt t:str_cfloop attr:(
			attr_index attr_cfloop_file_optional+ attr_file
			/ attr_file attr_cfloop_file_optional+ attr_index
			/ attr_cfloop_file_required+ attr_cfloop_file_optional*
			/ attr_cfloop_file_optional* attr_cfloop_file_required+
	) gt
	content:(!tag_cfloop_close anychar)*
	tag_cfloop_close {
		var me = new cftag(t, plib.flatten(attr), plib.stringify(content));
		if ( typeof me.attributes.index === 'undefined' || me.attributes.index == '' ) {
			throw new Error("Missing required index attribute.");
		} else if ( typeof me.attributes.file === 'undefined' || me.attributes.file == '' ) {
			throw new Error("Missing required file attribute.");
		}
		return me;
	}

tag_cfloop_index
	= lt t:str_cfloop attr:(
			attr_cfloop_index_required+ attr_cfloop_index_optional*
			/ attr_cfloop_index_optional* attr_cfloop_index_required+
			/ attr_cfloop_index_required attr_cfloop_index_optional* attr_cfloop_index_required attr_cfloop_index_optional* attr_cfloop_index_required
			/ attr_cfloop_index_optional* attr_cfloop_index_required+ attr_cfloop_index_optional* attr_cfloop_index_required+ attr_cfloop_index_optional*
	) gt
	content:(!tag_cfloop_close anychar)*
	tag_cfloop_close {
		var me = new cftag(t, plib.flatten(attr), plib.stringify(content));
		if ( typeof me.attributes.to === 'undefined' || me.attributes.to == '' ) {
			throw new Error("Missing required to attribute.");
		} else if ( typeof me.attributes.from === 'undefined' || me.attributes.from == '' ) {
			throw new Error("Missing required from attribute.");
		} else if ( typeof me.attributes.index === 'undefined' || me.attributes.index == '' ) {
			throw new Error("Missing required index attribute.");
		}
		return me;
	}

tag_cfloop_list
	= lt t:str_cfloop attr:(
			attr_index attr_cfloop_list_optional+ attr_list_list
			/ attr_list_list attr_cfloop_list_optional+ attr_index
			/ attr_cfloop_list_required+ attr_cfloop_list_optional*
			/ attr_cfloop_list_optional* attr_cfloop_list_required+
	) gt
	content:(!tag_cfloop_close anychar)*
	tag_cfloop_close {
		var me = new cftag(t, plib.flatten(attr), plib.stringify(content));
		if ( typeof me.attributes.index === 'undefined' || me.attributes.index == '' ) {
			throw new Error("Missing required index attribute.");
		} else if ( typeof me.attributes.list === 'undefined' || me.attributes.list == '' ) {
			throw new Error("Missing required list attribute.");
		} 
		return me;
	}

tag_cfloop_query
	= lt t:str_cfloop attr:( attr_cfloop_query_optional* attr_cfloop_query_required+ attr_cfloop_query_optional* ) gt
	content:(!tag_cfloop_close anychar)*
	tag_cfloop_close {
		var me = new cftag(t, plib.flatten(attr), plib.stringify(content));
		return me;
	}

tag_cfloop_collection
	= lt t:str_cfloop attr:attr_cfloop_collection_required+ gt
	content:(!tag_cfloop_close anychar)*
	tag_cfloop_close {
		var me = new cftag(t, plib.flatten(attr), plib.stringify(content));
		if ( typeof me.attributes.collection === 'undefined' || me.attributes.collection == '' ) {
			throw new Error("Missing required array attribute.");
		} else if ( typeof me.attributes.index === 'undefined' || me.attributes.index == '' ) {
			throw new Error("Missing required index attribute.");
		}
		return me;
	}


tag_cfobjectcache
	= lt t:str_cfobjectcache attr:attr_cfobjectcache_required ws* wack? gt {
		return new cftag(t, attr);
	}

tag_cfoutput
	= lt t:str_cfoutput attr:attr_cfoutput_optional* gt
	content:(!(lt wack str_cfoutput gt) anychar)*
	lt wack str_cfoutput gt {
		return new cftag(t, attr, plib.stringify(content));
	}

tag_cfparam
	= lt t:str_cfparam attr:(
			attr_cfparam_optional* attr_cfparam_required attr_cfparam_optional*
		) ws* wack? gt {
		return new cftag(t, plib.flatten(attr));
	}

tag_cfprocessingdirective
	= lt t:str_cfprocessingdirective attr:attr_cfprocessingdirective_optional* gt
		content:(!(lt wack str_cfprocessingdirective gt) anychar)*
		lt wack str_cfprocessingdirective gt {
		return new cftag(t, attr, plib.stringify(content));
	}
	/ lt t:str_cfprocessingdirective attr:attr_cfprocessingdirective_optional* ws* wack? gt {
		return new cftag(t, attr);
	}

tag_cfprocparam
	= lt t:str_cfprocparam attr:(attr_cfprocparam_optional* attr_cfprocparam_required attr_cfprocparam_optional* ) ws* wack? gt {
		var me = new cftag(t, plib.flatten(attr));
		if ( me.attributes.type == "in" && ( typeof me.attributes.value === 'undefined' || me.attributes.value == "" ) ) {
			throw new Error("Missing required value attribute.");
		} else if ( ['inout', 'out'].indexOf(me.attributes.type) > -1 && ( typeof me.attributes.variable === 'undefined' || me.attributes.variable == "" ) ) {
			throw new Error("Missing required variable attribute.");
		}
		return me; 
	}

tag_cfprocresult
	= lt t:str_cfprocresult attr:(attr_cfprocresult_optional* attr_cfprocresult_required attr_cfprocresult_optional* ) ws* wack? gt {
		return new cftag(t, plib.flatten(attr));
	}

tag_cfproperty
	= lt t:str_cfproperty attr:(attr_cfproperty_optional* attr_cfproperty_required attr_cfproperty_optional* ) ws* wack? gt {
		return new cftag(t, plib.flatten(attr));
	}

tag_cfquery
	= lt t:str_cfquery attr:(attr_cfquery_optional* attr_cfquery_required attr_cfquery_optional* ) gt
	content:(!(lt wack str_cfquery gt) anychar)*
	lt wack str_cfquery gt {
		return new cftag(t, plib.flatten(attr), plib.stringify(content));
	}

tag_cfqueryparam
	= lt t:str_cfqueryparam attr:( attr_cfqueryparam_optional* attr_cfqueryparam_required attr_cfqueryparam_optional* ) ws* wack? gt {
		return new cftag(t, plib.flatten(attr));
	}

tag_cfrethrow
	= lt t:str_cfrethrow ws* wack? gt {
		return new cftag(t, []);
	}

tag_cfreturn
	= lt t:str_cfreturn v:(!gt anychar)+ gt {
		var me = new cftag(t, []),
		    val = plib.stringify(v, 'trim');
		if ( val === '' ) {
			throw new Error("Missing required expression.");		
		} else {
			me.expression = val
		}

		return me;
	}

tag_cfsavecontent
	= lt t:str_cfsavecontent attr:attr_cfsavecontent_required gt
	content:(!(lt wack str_cfsavecontent gt) anychar)*
	lt wack str_cfsavecontent gt {
		return new cftag(t, [attr], plib.stringify(content));
	}

tag_cfscript
	= lt t:str_cfscript gt
	content:(!(lt wack str_cfscript gt) anychar)*
	lt wack str_cfscript gt {
		return new cftag(t, [], plib.stringify(content));
	}

tag_cfsetting
	= lt t:str_cfsetting attr:attr_cfsetting_optional* ws* wack? gt {
		return new cftag(t, attr);
	}

tag_cfsilent
	= lt t:str_cfsilent gt
	content:(!(lt wack str_cfsilent gt) anychar)*
	lt wack str_cfsilent gt {
		return new cftag(t, [], plib.stringify(content));
	}

tag_cfstoredproc
	= lt t:str_cfstoredproc attr:(
		attr_cfstoredproc_optional* attr_datasource attr_cfstoredproc_optional* attr_cfstoredproc_required_procedure attr_cfstoredproc_optional*
		/ attr_cfstoredproc_optional* attr_cfstoredproc_required_procedure attr_cfstoredproc_optional* attr_datasource attr_cfstoredproc_optional*
	) ws* wack? gt {
		return new cftag(t, plib.flatten(attr));
	}

tag_cfswitch
	= lt t:str_cfswitch attr:attr_cfswitch_required gt
	content:(!(lt wack str_cfswitch gt) anychar)*
	lt wack str_cfswitch gt {
		return new cftag(t, [attr]);
	}

tag_cfthrow
	= lt t:str_cfthrow ws* wack? gt {
		return new cftag(t, []);
	}

tag_cftimer
	= lt t:str_cftimer attr:attr_cftimer_optional* gt
	content:(!(lt wack str_cftimer gt) anychar)*
	lt wack str_cftimer gt {
		return new cftag(t, attr, plib.stringify(content));
	}

tag_cftrace
	= lt t:str_cftrace attr:attr_cftrace_optional* gt
	content:(!(lt wack str_cftrace gt) anychar)*
	lt wack str_cftrace gt {
		return new cftag(t, attr, plib.stringify(content));
	}

tag_cftransaction
	= lt t:str_cftransaction attr:attr_cftransaction_optional* gt
	content:(!(lt wack str_cftransaction gt) anychar)*
	lt wack str_cftransaction gt {
		return new cftag(t, attr, plib.stringify(content));
	}

tag_cftry
	= lt t:str_cftry gt
	content:(!(lt wack str_cftry gt) anychar)*
	lt wack str_cftry gt {
		return new cftag(t, [], plib.stringify(content));
	}

tag_cfupdate
	= lt t:str_cfupdate attr:(
		attr_cfupdate_optional* attr_datasource attr_cfupdate_optional* attr_cfupdate_required_table_name attr_cfupdate_optional*
		/ attr_cfupdate_optional* attr_cfupdate_required_table_name attr_cfupdate_optional* attr_datasource attr_cfupdate_optional*
	) ws* wack? gt {
		return new cftag(t, plib.flatten(attr));
	}

//End Tags

// Tag Specific Value Defs
attr_abort                       = ws+ n:str_abort                       eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
attr_access                      = ws+ n:str_access                      eql v:value_cffunction_access                                 { return { name: n,                             value: v                            }; }
attr_action                      = ws+ n:str_action                      eql v:value_cftransaction_action                              { return { name: n,                             value: v                            }; }
attr_add_token                   = ws+ n:str_add_token                   eql v:value_boolean                                           { return { name: 'add_token',                   value: v                            }; }
attr_ajax_params                 = ws+ n:str_params                      eql v:value_cfajaximport_params_googlemapkey                  { return { name: n,                             value: plib.stringify(v)            }; }
attr_application                 = ws+ n:str_application                 eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
attr_application_timeout         = ws+ n:str_application_timeout         eql v:value_create_time_span_func                             { return { name: 'timeout',                     value: v                            }; }
attr_application_token           = ws+ n:str_application_token           eql v:value_any_non_whitespace                                { return { name: 'application_token',           value: v                            }; }
attr_arguments                   = ws+ n:str_arguments                   eql v:value_any_non_whitespace                                { return { name: plib.stringify(n, 'lower'),    value: v                            }; }
attr_array                       = ws+ n:str_array                       eql v:value_cfval                                             { return { name: n,                             value: v                            }; }
attr_base_tag                    = ws+ n:str_base_tag                    eql v:value_any_non_whitespace                                { return { name: 'base_tag',                    value: v                            }; }
//attr_batch_size                  = ws+ n:str_batch_size                  eql v:value_                                                  { return { name: n,                             value: v                            }; }
attr_block_factor                = ws+ n:str_block_factor                eql v:value_integer                                           { return { name: 'block_factor',                value: v                            }; }
attr_boolean_output              = ws+ n:str_output                      eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
attr_cache_action                = ws+ n:str_action                      eql v:value_cfcache_action                                    { return { name: n,                             value: v                            }; }
attr_cached_after                = ws+ n:str_cached_after                eql v:value_create_time_span_func                             { return { name: 'cached_after',                value: v                            }; }
attr_cached_after_date           = ws+ n:str_cached_after                eql quote_char v:date quote_char                              { return { name: 'cached_after',                value: v                            }; }
attr_cached_within               = ws+ n:str_cached_within               eql v:value_create_time_span_func                             { return { name: 'cached_within',               value: v                            }; }
//attr_cascade                     = ws+ n:str_cascade                     eql v:value_                                                  { return { name: n,                             value: v                            }; }
//attr_catalog                     = ws+ n:str_catalog                     eql v:value_                                                  { return { name: n,                             value: v                            }; }
attr_catch_type                  = ws+ n:str_type                        eql v:value_cferr_exception                                   { return { name: n,                             value: v                            }; }
attr_category                    = ws+ n:str_category                    eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_cfc                         = ws+ n:str_cfc                         eql v:value_any_non_whitespace                                { return { name: n,                             value: v                            }; }
attr_charset                     = ws+ n:str_charset                     eql v:value_charset                                           { return { name: n,                             value: v                            }; }
attr_characters                  = ws+ n:str_characters                  eql v:value_integer                                           { return { name: n,                             value: v                            }; }
attr_client_management           = ws+ n:str_client_management           eql v:value_boolean                                           { return { name: 'client_variables',            value: v                            }; }
attr_client_storage              = ws+ n:str_client_storage              eql v:value_cfapplication_client_storage                      { return { name: 'client_storage',              value: v                            }; }
attr_collection                  = ws+ n:str_collection                  eql v:value_cfval                                             { return { name: n,                             value: v                            }; }
//attr_collection_type             = ws+ n:str_collection_type             eql v:value_                                                  { return { name: n,                             value: v                            }; }
//attr_column                      = ws+ n:str_column                      eql v:value_                                                  { return { name: n,                             value: v                            }; }
attr_constrained                 = ws+ n:str_constrained                 eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
attr_condition                   = ws+ n:str_condition                   eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_cookie_domain               = ws+ n:str_cookie_domain               eql v:value_domain                                            { return { name: 'cookie_domain',               value: v                            }; }
attr_css_src                     = ws+ n:str_css_src                     eql v:value_file_path                                         { return { name: 'css_src',                     value: v                            }; }
attr_data_collection             = ws+ n:str_data_collection             eql v:value_any_non_whitespace                                { return { name: 'data_collection',             value: v == "" ? "AssocAttribs" : v }; }
//attr_data_type                   = ws+ n:str_data_type                   eql v:value_                                                  { return { name: n,                             value: v                            }; }
attr_datasource                  = ws+ n:str_datasource                  eql v:value_any_non_whitespace                                { return { name: 'datasource',                  value: v                            }; }
attr_dbinfo_type                 = ws+ n:str_type                        eql v:value_cfdbinfo_type                                     { return { name: n,                             value: v                            }; }
attr_dbname                      = ws+ n:str_dbname                      eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_dbtype                      = ws+ n:str_dbtype                      eql quote_char v:(h q l) quote_char                           { return { name: n,                             value: plib.stringify(v, 'lower')   }; }
attr_debug                       = ws+ n:str_debug                       eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
attr_default                     = ws+ n:str_default                     eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_delete_file                 = ws+ n:str_delete_file                 eql v:value_boolean                                           { return { name: 'delete_file',                 value: v                            }; }
attr_delimiter                   = ws+ n:str_delimiter                   eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_depends_on                  = ws+ n:str_depends_on                  eql v:value_list                                              { return { name: 'depends_on',                  value: v                            }; }
attr_description                 = ws+ n:str_description                 eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_directory                   = ws+ n:str_directory                   eql v:value_file_path                                         { return { name: n,                             value: v                            }; }
attr_disk_persistent             = ws+ n:str_disk_persistent             eql v:value_boolean                                           { return { name: 'disk_persistent',             value: v                            }; }
attr_display_name                = ws+ n:str_display_name                eql v:value_any                                               { return { name: 'display_name',                value: v                            }; }
attr_domain                      = ws+ n:str_domain                      eql v:value_domain                                            { return { name: n,                             value: v                            }; }
attr_dynamic_insert              = ws+ n:str_dynamic_insert              eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
attr_dynamic_update              = ws+ n:str_dynamic_update              eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
//attr_element_column              = ws+ n:str_element_column              eql v:value_any                                               { return { name: n,                             value: v                            }; }
//attr_element_type                = ws+ n:str_element_type                eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_enable_cfouput_only         = ws+ n:str_enable_cfouput_only         eql v:value_boolean                                           { return { name: 'enable_cfoutput_only',        value: v                            }; }
attr_encoding_type               = ws+ n:str_type                        eql v:value_encoding                                          { return { name: n,                             value: v                            }; }
attr_end_row                     = ws+ n:str_end_row                     eql v:value_integer                                           { return { name: 'end_row',                     value: v                            }; }
//attr_entity_name                 = ws+ n:str_entity_name                 eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_err_type                    = ws+ n:str_type                        eql v:value_cferr_type                                        { return { name: n,                             value: v                            }; }
attr_exception                   = ws+ n:str_exception                   eql v:value_cferr_exception                                   { return { name: n,                             value: v                            }; }
attr_expand                      = ws+ n:str_expand                      eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
attr_expire_url                  = ws+ n:str_expire_url                  eql v:value_url                                               { return { name: 'expire_url',                  value: v                            }; }
attr_expires                     = ws+ n:str_expires                     eql v:value_cfcookie_expires                                  { return { name: n,                             value: v                            }; }
attr_expression                  = ws+ n:str_expression                  eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_fetch                       = ws+ n:str_fetch                       eql quote_char v:( str_select / str_join ) quote_char         { return { name: n,                             value: v                            }; }
//attr_fetch_batch_size            = ws+ n:str_fetch_batch_size            eql v:value_any                                               { return { name: n,                             value: v                            }; }
//attr_field_type                  = ws+ n:str_field_type                  eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_file                        = ws+ n:str_file                        eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_file_path                   = ws+ n:str_file                        eql v:value_file_path                                         { return { name: n,                             value: v                            }; }
//attr_fkcolumn                    = ws+ n:str_fkcolumn                    eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_form_fields                 = ws+ n:str_form_fields                 eql v:value_list                                              { return { name: 'form_fields',                 value: v                            }; }
attr_format                      = ws+ n:str_format                      eql v:value_cfdump_format                                     { return { name: n,                             value: v                            }; }
//attr_formula                     = ws+ n:str_formula                     eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_function_type               = ws+ n:str_type                        eql v:value_cffunction_return_type                            { return { name: n,                             value: v                            }; }
attr_generated                   = ws+ n:str_generated                   eql v:value_cfproperty_generated                              { return { name: n,                             value: v                            }; }
//attr_generator                   = ws+ n:str_generator                   eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_getter                      = ws+ n:str_getter                      eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
attr_google_map_key              = ws+ n:str_google_map_key              eql v:value_any                                               { return { name: 'google_map_key',              value: v                            }; }
attr_group                       = ws+ n:str_group                       eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_group_case_sensitive        = ws+ n:str_group_case_sensitive        eql v:value_boolean                                           { return { name: 'group_case_sensitive',        value: v                            }; }
attr_hide                        = ws+ n:str_hide                        eql v:( value_list / value_any_non_whitespace )               { return { name: n,                             value: v                            }; }
attr_hint                        = ws+ n:str_hint                        eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_http_only                   = ws+ n:str_http_only                   eql v:value_boolean                                           { return { name: 'http_only',                   value: v                            }; }
attr_from                        = ws+ n:str_from                        eql v:value_integer                                           { return { name: n,                             value: v                            }; }
attr_from_date_time              = ws+ n:str_from                        eql v:value_date_time                                         { return { name: n,                             value: v                            }; }
attr_id                          = ws+ n:str_id                          eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_idle_time                   = ws+ n:str_idle_time                   eql v:value_float                                             { return { name: 'idle_time',                   value: v                            }; }
attr_idle_timeout                = ws+ n:str_idle_timeout                eql v:value_integer                                           { return { name: 'idle_timeout',                value: v                            }; }
attr_index                       = ws+ n:str_index                       eql v:value_any_non_whitespace                                { return { name: n,                             value: v                            }; }
attr_inline                      = ws+ n:str_inline                      eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
attr_insert                      = ws+ n:str_insert                      eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
attr_interval                    = ws+ n:str_interval                    eql v:value_integer                                           { return { name: n,                             value: v                            }; }
attr_inverse                     = ws+ n:str_inverse                     eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
//attr_inverse_join_column         = ws+ n:str_inverse_join_column         eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_isolation                   = ws+ n:str_isolation                   eql v:value_cftransaction_isolation                           { return { name: n,                             value: v                            }; }
//attr_join_column                 = ws+ n:str_join_column                 eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_key                         = ws+ n:str_key                         eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_keys                        = ws+ n:str_keys                        eql v:value_integer                                           { return { name: n,                             value: v                            }; }
attr_label                       = ws+ n:str_label                       eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_lazy                        = ws+ n:str_lazy                        eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
attr_length                      = ws+ n:str_length                      eql v:value_integer                                           { return { name: n,                             value: v                            }; }
//attr_link_catalog                = ws+ n:str_link_catalog                eql v:value_any                                               { return { name: n,                             value: v                            }; }
//attr_link_schema                 = ws+ n:str_link_schema                 eql v:value_any                                               { return { name: n,                             value: v                            }; }
//attr_link_table                  = ws+ n:str_link_table                  eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_list                        = ws+ n:str_list                        eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
attr_list_list                   = ws+ n:str_list                        eql v:value_list                                              { return { name: n,                             value: v                            }; }
attr_lock_type                   = ws+ n:str_type                        eql quote_char v:( str_read_only / str_exclusive ) quote_char { return { name: n,                             value: v                            }; }
attr_log                         = ws+ n:str_log                         eql v:value_cflog_log                                         { return { name: n,                             value: v                            }; }
attr_log_type                    = ws+ n:str_type                        eql v:value_cflog_type                                        { return { name: n,                             value: v                            }; }
attr_login_storage               = ws+ n:str_login_storage               eql v:value_cfapplication_login_storage                               { return { name: 'login_storage',               value: v                            }; }
attr_mail_to                     = ws+ n:str_mail_to                     eql v:value_email_address                                     { return { name:'mail_to',                      value: v                            }; }
attr_missing_row_ignored         = ws+ n:str_missing_row_ignored         eql v:value_boolean                                           { return { name: 'missing_row_ignored',         value: v                            }; }
attr_max                         = ws+ n:str_max                         eql v:value_integer                                           { return { name: n,                             value: v                            }; }
attr_max_length                  = ws+ n:str_max_length                  eql v:value_integer                                           { return { name: 'max_length',                  value: v                            }; }
attr_max_rows                    = ws+ n:str_max_rows                    eql v:value_integer                                           { return { name: 'max_rows',                    value: v                            }; }
attr_meta_info                   = ws+ n:str_meta_info                   eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
attr_metadata                    = ws+ n:str_metadata                    eql v:value_cfval                                             { return { name: n,                             value: v                            }; }
attr_method                      = ws+ n:str_method                      eql v:value_exit_method                                       { return { name: n,                             value: v                            }; }
attr_min                         = ws+ n:str_min                         eql v:value_integer                                           { return { name: n,                             value: v                            }; }
attr_name                        = ws+ n:str_name                        eql v:value_any_non_whitespace                                { return { name: n,                             value: v                            }; }
attr_nested                      = ws+ n:str_nested                      eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
attr_non_ws_label                = ws+ n:str_label                       eql v:value_any_non_whitespace                                { return { name: n,                             value: v                            }; }
attr_non_ws_value                = ws+ n:str_value                       eql v:value_any_non_whitespace                                { return { name: n,                             value: v                            }; } 
attr_not_null                    = ws+ n:str_not_null                    eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
attr_null                        = ws+ n:str_null                        eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
attr_objectcache_action          = ws+ n:str_action                      eql quote_char v:str_clear quote_char                         { return { name: n,                             value: v                            }; }
attr_on_error                    = ws+ n:str_on_error                    eql v:value_any                                               { return { name: 'on_error',                    value: v                            }; }
attr_on_success                  = ws+ n:str_on_success                  eql v:value_any                                               { return { name: 'on_success',                  value: v                            }; }
attr_optimistic_lock             = ws+ n:str_optimistic_lock             eql v:value_boolean                                           { return { name: 'optimistic_lock',             value: v                            }; }
//attr_optimistic_lock_generated   = ws+ n:str_optimistic_lock_generated   eql v:value_any                                               { return { name: n,                             value: v                            }; }
//attr_order_by                    = ws+ n:str_order_by                    eql v:value_any                                               { return { name: n,                             value: v                            }; }
//attr_order_by_read_only          = ws+ n:str_order_by_read_only          eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_orm_options                 = ws+ n:str_orm_options                 eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_orm_type                    = ws+ n:str_orm_type                    eql v:value_orm_type                                          { return { name: 'orm_type',                    value: v                            }; }
attr_output                      = ws+ n:str_output                      eql v:value_cfdump_output                                     { return { name: n,                             value: v                            }; }
attr_output_file                 = ws+ n:str_output_file                 eql v:value_file_path                                         { return { name: 'output_file',                 value: v                            }; }
attr_overflow_to_disk            = ws+ n:str_overflow_to_disk            eql v:value_boolean                                           { return { name: 'overflow_to_disk',            value: v                            }; }
attr_page_encoding               = ws+ n:str_page_encoding               eql v:value_encoding                                          { return { name: 'page_encoding',               value: v                            }; }
attr_param_type                  = ws+ n:str_type                        eql v:value_cfparam_type                                      { return { name: n,                             value: v                            }; } 
//attr_params                      = ws+ n:str_params                      eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_password                    = ws+ n:str_password                    eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_path                        = ws+ n:str_path                        eql v:value_file_path                                         { return { name: n,                             value: v                            }; }
attr_pattern                     = ws+ n:str_pattern                     eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_persistent                  = ws+ n:str_persistent                  eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
attr_port                        = ws+ n:str_port                        eql v:value_integer                                           { return { name: n,                             value: v                            }; }
attr_precision                   = ws+ n:str_precision                   eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
attr_prefix                      = ws+ n:str_prefix                      eql v:(value_any_non_whitespace / value_empty_quote )         { return { name: n,                             value: v                            }; }
attr_procedure                   = ws+ n:str_procedure                   eql v:value_any_non_whitespace                                { return { name: n,                             value: plib.stringify(v)            }; }
attr_procparam_type              = ws+ n:str_type                        eql v:value_cfprocparam_type                                  { return { name: n,                             value: v                            }; }
attr_protocol                    = ws+ n:str_protocol                    eql v:value_cfcache_protocol                                  { return { name: n,                             value: v                            }; }
attr_query                       = ws+ n:str_query                       eql v:value_any                                               { return { name: n.toLowerCase(),               value: v                            }; }
attr_read_only                   = ws+ n:str_read_only                   eql v:value_boolean                                           { return { name: 'read_only',                   value: v                            }; }
attr_regex_pattern               = ws+ n:str_pattern                     eql v:value_regex                                             { return { name: n,                             value: v                            }; }
attr_request_timeout             = ws+ n:str_request_timeout             eql v:value_integer                                           { return { name: 'request_timeout',             value: v                            }; }
attr_required                    = ws+ n:str_required                    eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
attr_reset                       = ws+ n:str_reset                       eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
attr_result                      = ws+ n:str_result                      eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_result_set                  = ws+ n:str_result_set                  eql v:value_integer                                           { return { name: 'result_set',                  value: v                            }; }
attr_return_code                 = ws+ n:str_return_code                 eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
attr_return_format               = ws+ n:str_return_format               eql v:value_cffunction_return_format                          { return { name: 'return_format',               value: v                            }; }
attr_return_type                 = ws+ n:str_return_type                 eql v:value_cffunction_return_type                            { return { name: 'return_type',                 value: v                            }; }
attr_roles                       = ws+ n:str_roles                       eql v:value_list                                              { return { name: n,                             value: v                            }; }
//attr_row_id                      = ws+ n:str_row_id                      eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_savepoint                   = ws+ n:str_savepoint                   eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_scale                       = ws+ n:str_scale                       eql v:value_integer                                           { return { name: n,                             value: v                            }; }
//attr_schema                      = ws+ n:str_schema                      eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_scope                       = ws+ n:str_scope                       eql v:value_cflock_scope                                      { return { name: n,                             value: v                            }; }
attr_script_protect              = ws+ n:str_script_protect              eql v:value_cfapplication_script_protect                              { return { name: 'script_protection',           value: v                            }; }
attr_script_src                  = ws+ n:str_script_src                  eql v:value_file_path                                         { return { name: 'script_src',                  value: v                            }; }
attr_secure                      = ws+ n:str_secure                      eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
attr_secure_json                 = ws+ n:str_secure_json                 eql v:value_boolean                                           { return { name: 'secure_json',                 value: v                            }; }
attr_secure_json_prefix          = ws+ n:str_secure_json_prefix           eql v:value_any                                               { return { name: 'secure_json_prefix',          value: v == "" ? "//" : v           }; }
attr_select_before_update        = ws+ n:str_select_before_update        eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
//attr_select_key                  = ws+ n:str_select_key                  eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_separator                   = ws+ n:str_separator                   eql v:value_any                                               { return { name: n,                             value: v                            }; }
//attr_sequence                    = ws+ n:str_sequence                    eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_serializable                = ws+ n:str_serializable                eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
attr_server_side_form_validation = ws+ n:str_server_side_form_validation eql v:value_boolean                                           { return { name: 'server_side_form_validation', value: v                            }; }
attr_session_management          = ws+ n:str_session_management          eql v:value_boolean                                           { return { name: 'session_management',          value: v                            }; }
attr_session_timeout             = ws+ n:str_session_timeout             eql v:value_create_time_span_func                             { return { name: 'session_timeout',             value: v                            }; }
attr_set_client_cookies          = ws+ n:str_set_client_cookies          eql v:value_boolean                                           { return { name: 'client_cookies',              value: v                            }; }
attr_set_domain_cookies          = ws+ n:str_set_domain_cookies          eql v:value_boolean                                           { return { name: 'domain_cookies',              value: v                            }; }
attr_setter                      = ws+ n:str_setter                      eql v:value_boolean                                           { return { name: n,                             value: v                            }; }
attr_show                        = ws+ n:str_show                        eql v:( value_list / value_any_non_whitespace )               { return { name: n,                             value: v                            }; }
attr_show_debug_output           = ws+ n:str_show_debug_output           eql v:value_boolean                                           { return { name: 'show_debug_output',           value: v                            }; }
attr_show_error                  = ws+ n:str_show_error                  eql v:value_any                                               { return { name: 'show_error',                  value: v                            }; }
attr_show_udfs                   = ws+ n:str_show_udfs                   eql v:value_boolean                                           { return { name: 'show_udfs',                   value: v                            }; }
attr_source                      = ws+ n:str_source                      eql quote_char v:( d b / v m ) quote_char                     { return { name: n,                             value: plib.stringify(v, 'lower')   }; }
attr_sql_type                    = ws+ n:str_cfsql_type                  eql v:value_sql_type                                          { return { name: 'cf_sql_type',                 value: v                            }; }
attr_start_row                   = ws+ n:str_start_row                   eql v:value_integer                                           { return { name: 'start_row',                   value: v                            }; }
attr_status_code                 = ws+ n:str_status_code                 eql quote_char v:("30" [0-7]) quote_char                      { return { name: 'status_code',                 value: plib.stringify(v,  'int')    }; }
attr_status_text                 = ws+ n:str_status_text                 eql v:value_any                                               { return { name: 'status_text',                 value: plib.stringify(v)            }; }
attr_step_integer                = ws+ n:str_step                        eql v:value_integer                                           { return { name: n,                             value: v                            }; }
attr_step_date_time              = ws+ n:str_step                        eql v:value_create_time_span_func                             { return { name: n,                             value: v                            }; }
attr_strip_whitespace            = ws+ n:str_strip_whitespace            eql v:value_boolean                                           { return { name: 'strip_whitespace',            value: v                            }; }
//attr_struct_key_column           = ws+ n:str_struct_key_column           eql v:value_any                                               { return { name: n,                             value: v                            }; }
//attr_struct_key_data_type        = ws+ n:str_struct_key_data_type        eql v:value_any                                               { return { name: n,                             value: v                            }; }
//attr_struct_key_type             = ws+ n:str_struct_key_type             eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_suppress_whitespace         = ws+ n:str_suppress_whitespace         eql v:value_boolean                                           { return { name: 'suppress_whitespace',         value: v                            }; }
attr_table                       = ws+ n:str_table                       eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_table_name                  = ws+ n:str_table_name                  eql v:value_any                                               { return { name: 'table_name',                  value: v                            }; }
attr_table_owner                 = ws+ n:str_table_owner                 eql v:value_any                                               { return { name: 'table_owner',                 value: v                            }; }
attr_table_qualifier             = ws+ n:str_table_qualifier             eql v:value_any                                               { return { name: 'table_qualifier',             value: v                            }; }
attr_tag_lib                     = ws+ n:str_tag_lib                     eql v:value_file_path                                         { return { name: n,                             value: v                            }; }
attr_tags                        = ws+ n:str_tags                        eql v:value_list                                              { return { name: n,                             value: v                            }; }
attr_template                    = ws+ n:str_template                    eql v:value_file_path                                         { return { name: n,                             value: v                            }; }
attr_text                        = ws+ n:str_text                        eql v:value_any                                               { return { name: n,                             value: v                            }; }
attr_throw_on_error              = ws+ n:str_throw_on_error              eql v:value_boolean                                           { return { name: 'throw_on_error',              value: v                            }; }
attr_throw_on_timeout            = ws+ n:str_throw_on_timeout            eql v:value_boolean                                           { return { name: 'throw_on_timeout',            value: v                            }; }
attr_timeout                     = ws+ n:str_timeout                     eql v:value_integer                                           { return { name: n,                             value: v                            }; }
attr_timespan                    = ws+ n:str_timespan                    eql v:( value_float / value_create_time_span_func )           { return { name: n,                             value: v                            }; }
attr_timer_type                  = ws+ n:str_type                        eql v:value_cftimer_type                                      { return { name: n,                             value: v                            }; } 
attr_to                          = ws+ n:str_to                          eql v:value_integer                                           { return { name: n,                             value: v                            }; }
attr_to_date_time                = ws+ n:str_to                          eql v:value_date_time                                         { return { name: n,                             value: v                            }; }
attr_top                         = ws+ n:str_top                         eql v:value_integer                                           { return { name: n,                             value: v                            }; }
attr_trace_type                  = ws+ n:str_type                        eql v:value_cftrace_type                                      { return { name: n,                             value: v                            }; }
attr_unique                      = ws+ n:str_unique                      eql v:value_boolean                                           { return { name: n,                             value: v                            }; } 
//attr_unique_key                  = ws+ n:str_unique_key                  eql v:value_any                                               { return { name: n,                             value: v                            }; } 
attr_update                      = ws+ n:str_update                      eql v:value_boolean                                           { return { name: n,                             value: v                            }; } 
attr_url                         = ws+ n:str_url                         eql v:value_url                                               { return { name: n,                             value: v                            }; }
attr_use_cache                   = ws+ n:str_use_cache                   eql v:value_boolean                                           { return { name: 'use_cache',                   value: v                            }; } 
attr_use_query_string            = ws+ n:str_use_query_string            eql v:value_boolean                                           { return { name: 'use_query_string',            value: v                            }; } 
attr_username                    = ws+ n:str_username                    eql v:value_any_non_whitespace                                { return { name: n,                             value: v                            }; }
attr_validate                    = ws+ n:str_validate                    eql v:value_any                                               { return { name: n,                             value: v                            }; } 
attr_validate_param              = ws+ n:str_validate_param              eql v:value_any                                               { return { name: n,                             value: v                            }; } 
attr_value                       = ws+ n:str_value                       eql v:value_any                                               { return { name: n,                             value: v                            }; } 
attr_var                         = ws+ n:str_var                         eql v:value_any                                               { return { name: n,                             value: v                            }; } 
attr_variable					 = ws+ n:str_variable                    eql v:value_any_non_whitespace                                { return { name: n,                             value: v                            }; }
attr_verify_client               = ws+ n:str_verify_client               eql v:value_boolean                                           { return { name: 'verify_client',               value: v                            }; } 
//attr_where                       = ws+ n:str_where                       eql v:value_any                                               { return { name: n,                             value: v                            }; }

//attr_cfabort_required
attr_cfabort_optional = attr_show_error

//attr_cfajaximport_required
attr_cfajaximport_optional = attr_css_src / attr_ajax_params / attr_script_src / attr_tags

value_cfajaximport_params_googlemapkey = quote_char v:(pound '{googlemapkey="' (!quote_char anychar)+ '"}' pound) quote_char { return plib.stringify(v); }

attr_cfajaxproxy_cfc = attr_cfajaxproxy_cfc_optional* attr_cfajaxproxy_cfc_required attr_cfajaxproxy_cfc_optional*
attr_cfajaxproxy_cfc_required = attr_cfc
attr_cfajaxproxy_cfc_optional = ws+ n:str_js_class_name eql v:value_any_non_whitespace { return { name: 'js_class_name', value: v }; }
    
attr_cfajaxproxy_bind = attr_cfajaxproxy_bind_optional* attr_cfajaxproxy_bind_required attr_cfajaxproxy_bind_optional*
attr_cfajaxproxy_bind_required = ws+ n:str_bind eql v:value_any_non_whitespace { return { name: 'bind',    value: v }; }
attr_cfajaxproxy_bind_optional = attr_on_error / attr_on_success

attr_cfapplication_required = attr_name
//@todo change to allow usage of plain timeout attribute
attr_cfapplication_optional = attr_datasource / attr_application_timeout / attr_client_management / attr_client_storage / attr_set_client_cookies / attr_set_domain_cookies / attr_login_storage / attr_google_map_key / attr_script_protect / attr_server_side_form_validation / attr_session_management / attr_session_timeout / attr_secure_json / attr_secure_json_prefix

value_cfapplication_login_storage  = quote_char  v:( str_cookie / str_session )   quote_char  {  return  v.toLowerCase();  }
value_cfapplication_script_protect = quote_char  v:( str_none / str_all / str_list )  quote_char  {  return  v.toLowerCase();  }
value_cfapplication_client_storage = value_any /  quote_char  v:( str_registry  / str_cookie ) quote_char  {  return  v.toLowerCase();  }

attr_cfassoc_required = attr_base_tag
attr_cfassoc_optional = attr_data_collection

attr_cferr_required_type     = attr_err_type
attr_cferr_required_template = attr_template
attr_cferr_optional = attr_mail_to / attr_exception

attr_cfimport_required = attr_cfimport_required_taglib attr_cfimport_required_prefix / attr_cfimport_required_prefix attr_cfimport_required_taglib

attr_cfimport_required_taglib = attr_tag_lib
attr_cfimport_required_prefix = attr_prefix
//attr_cfimport_optional

//attr_cfcontent_required
attr_cfcontent_optional = attr_delete_file / attr_file_path / attr_reset / attr_encoding_type / attr_variable

//attr_cfheader_required
//@todo: enable this to allow for plain "statu" attribute
attr_cfheader_optional = attr_charset / attr_name / attr_status_code / attr_status_text / attr_value

value_charset = value_any_non_whitespace
//value_charset = quote_char &{ 
//	var fs = require('fs'),
//	    charset_contents = fs.readFileSync('./character-sets-1.csv');
//
//	console.dir(this);
////	charset_lines = charset_contents.split(/\r/);
////	for( var i=0; i < charset_lines.length; i++ ) {
////			
////	}
//	return true;
////	return false;
//} v:value_any_non_whitespace quote_char { return plib.stringify(v, 'lower'); }

attr_cfhtmlhead_required = attr_text
//attr_cfhtmlhead_optional

attr_cfinclude_required = attr_template
//attr_cfinclude_optional

//attr_cfcache_required
attr_cfcache_optional = attr_cache_action / attr_depends_on / attr_directory / attr_disk_persistent / attr_expire_url / attr_id / attr_idle_time / attr_key / attr_metadata / attr_name / attr_overflow_to_disk / attr_password / attr_port / attr_protocol / attr_strip_whitespace / attr_throw_on_error / attr_timespan / attr_use_cache / attr_use_query_string / attr_username / attr_value

value_cfcache_action = quote_char v:( str_client_cache / str_server_cache / str_cache / str_flush / str_get / str_optimal / str_put ) quote_char { return plib.stringify(v, 'lower'); }
value_cfcache_protocol = quote_char v:( ( str_https / str_http ) ':' wack wack ) quote_char { return plib.stringify(v, 'lower'); }

attr_cfcase_required = attr_value
attr_cfcase_optional = attr_delimiter

//attr_cfcatch_required
attr_cfcatch_optional = attr_catch_type

attr_cfcookie_required = attr_name
attr_cfcookie_optional = attr_domain / attr_expires / attr_http_only / attr_path / attr_secure / attr_value

attr_cfdump_required = attr_var
attr_cfdump_optional = attr_abort / attr_expand / attr_format / attr_hide / attr_keys / attr_non_ws_label / attr_meta_info / attr_output / attr_show / attr_show_udfs / attr_top

attr_cfparam_required = attr_name
attr_cfparam_optional = attr_default / attr_max / attr_min / attr_regex_pattern / attr_param_type / attr_value

attr_cfprocparam_required = attr_sql_type
attr_cfprocparam_optional = attr_max_length / attr_null / attr_scale / attr_procparam_type / attr_variable / attr_non_ws_value
value_cfprocparam_type = quote_char v:( str_inout / str_out / str_in ) quote_char { return plib.stringify(v, 'lower'); }
value_cfproperty_generated = quote_char v:( str_always / str_never ) quote_char { return plib.stringify(v, 'lower'); }

attr_cfproperty_required = attr_name
attr_cfproperty_optional
//    = ws+ n:str_batch_size                 eql v:value_                       { return { name: n,              value: v  }; }
//    / ws+ n:str_cascade                   eql v:value_                       { return { name: n,              value: v  }; }
//    / ws+ n:str_catalog                   eql v:value_                       { return { name: n,              value: v  }; }
    = attr_cfc
//    / ws+ n:str_collection_type           eql v:value_                       { return { name: n,              value: v  }; }
//    / ws+ n:str_column                    eql v:value_                       { return { name: n,              value: v  }; }
    / attr_constrained
//    / ws+ n:str_data_type                 eql v:value_                       { return { name: n,              value: v  }; }
	/ attr_default
	/ attr_display_name
    / attr_dynamic_insert
    / attr_dynamic_update
//    / ws+ n:str_element_column            eql v:value_any                    { return { name: n,              value: v  }; }
//    / ws+ n:str_element_type              eql v:value_any                    { return { name: n,              value: v  }; }
//    / ws+ n:str_entity_name               eql v:value_any                    { return { name: n,              value: v  }; }
    / attr_fetch
//    / ws+ n:str_field_type                eql v:value_any                    { return { name: n,              value: v  }; }
//    / ws+ n:str_fkcolumn                  eql v:value_any                    { return { name: n,              value: v  }; }
//    / ws+ n:str_formula                   eql v:value_any                    { return { name: n,              value: v  }; }
    / attr_generated
//    / ws+ n:str_generator                 eql v:value_any                    { return { name: n,              value: v  }; }
    / attr_getter
	/ attr_hint
//    / ws+ n:str_index                     eql v:value_any                    { return { name: n,              value: v  }; }
    / attr_insert
    / attr_inverse
//    / ws+ n:str_inverse_join_column       eql v:value_any                    { return { name: n,              value: v  }; }
//    / ws+ n:str_join_column               eql v:value_any                    { return { name: n,              value: v  }; }
    / attr_lazy
    / attr_length
//    / ws+ n:str_link_catalog              eql v:value_any                    { return { name: n,              value: v  }; }
//    / ws+ n:str_link_schema               eql v:value_any                    { return { name: n,              value: v  }; }
//    / ws+ n:str_link_table                eql v:value_any                    { return { name: n,              value: v  }; }
//    / ws+ n:str_mapped_by                 eql v:value_any                    { return { name: n,              value: v  }; }
    / attr_missing_row_ignored
    / attr_not_null
    / attr_optimistic_lock
//    / ws+ n:str_optimistic_lock_generated eql v:value_any                    { return { name: n,              value: v  }; }
//    / ws+ n:str_order_by                  eql v:value_any                    { return { name: n,              value: v  }; }
//    / ws+ n:str_order_by_read_only        eql v:value_any                    { return { name: n,              value: v  }; }
    / attr_orm_type
//    / ws+ n:str_params                    eql v:value_any                    { return { name: n,              value: v  }; }
    / attr_persistent
    / attr_precision
	/ attr_read_only
	/ attr_required
//    / ws+ n:str_row_id                    eql v:value_any                    { return { name: n,              value: v  }; }
    / attr_scale
    / attr_setter
//    / ws+ n:str_schema                    eql v:value_any                    { return { name: n,              value: v  }; }
    / attr_select_before_update
//    / ws+ n:str_select_key                eql v:value_any                    { return { name: n,              value: v  }; }
//    / ws+ n:str_sequence                  eql v:value_any                    { return { name: n,              value: v  }; }
	/ attr_serializable
    / attr_source
//    / ws+ n:str_struct_key_column         eql v:value_any                    { return { name: n,              value: v  }; }
//    / ws+ n:str_struct_key_data_type      eql v:value_any                    { return { name: n,              value: v  }; }
//    / ws+ n:str_struct_key_type           eql v:value_any                    { return { name: n,              value: v  }; }
    / attr_table
	/ attr_function_type
    / attr_unique
//    / ws+ n:str_unique_key                eql v:value_any                    { return { name: n,              value: v  }; }
    / attr_update
//    / ws+ n:str_where                     eql v:value_any                    { return { name: n,              value: v  }; }
    / attr_validate
    / attr_validate_param

value_orm_type = quote_char v:(
	str_string     / str_character    / str_char    / str_short       /
	str_integer    / str_int          / str_long    / str_big_decimal /
	str_float      / str_double       / str_boolean / str_yes_no      /
	str_true_false / str_text         / str_date    / str_timestamp   /
	str_binary     / str_serializable / str_blob    / str_clob ) quote_char { return plib.stringify(v); }

attr_cfprocresult_required = attr_name
attr_cfprocresult_optional = attr_max_rows / attr_result_set

//attr_cfprocessingdirective_required
attr_cfprocessingdirective_optional = attr_page_encoding / attr_suppress_whitespace

attr_cfsavecontent_required = attr_variable
//attr_cfsavecontent_optional

//attr_cfsetting_required
//@todo change to accept "timeout" attribute.
attr_cfsetting_optional = attr_enable_cfouput_only / attr_request_timeout / attr_show_debug_output

attr_cfstoredproc_required_procedure = attr_procedure
attr_cfstoredproc_optional = attr_block_factor / attr_cached_after_date / attr_cached_within / attr_debug / attr_password / attr_result / attr_return_code / attr_username

attr_cfswitch_required = attr_expression
//attr_cfswitch_optional

attr_cflocation_required = attr_url
value_url = quote_char v:(!quote_char anychar)+ quote_char { return plib.stringify(v, 'uri'); }

attr_cflocation_optional = attr_add_token / attr_status_code

attr_cflock_required = attr_timeout
attr_cflock_optional = attr_name / attr_scope / attr_throw_on_timeout / attr_lock_type

value_cflock_scope = quote_char v:( str_application ) quote_char { return plib.stringify(v, 'lower'); }
//value_cflock_scope = quote_char v:( str_application / str_request / str_server / str_session ) quote_char { return plib.stringify(v, 'lower'); }

attr_cflog_required = attr_text
attr_cflog_optional = attr_application / attr_file / attr_log / attr_log_type

value_cflog_log  = quote_char v:( str_application / str_scheduler ) quote_char { return v.toLowerCase(); }
value_cflog_type = quote_char v:( str_information / str_warning / str_error / str_fatal) quote_char { return v.toLowerCase(); }

//attr_cflogin_required
attr_cflogin_optional = attr_application_token / attr_cookie_domain / attr_idle_timeout

attr_cfloginuser_required = attr_name attr_password attr_roles
	/ attr_name attr_roles attr_password

	/ attr_password attr_roles attr_name
	/ attr_password attr_name attr_roles

	/ attr_roles attr_name attr_password
	/ attr_roles attr_password attr_name

//attr_cfloginuser_optional

attr_cfexecute_required = attr_name
attr_cfexecute_optional = attr_arguments / attr_output_file / attr_timeout / attr_variable

//attr_cfexit_required
attr_cfexit_optional = attr_method

value_exit_method = quote_char v:( str_exit_tag / str_exit_template / str_loop ) quote_char { return v; }

//attr_cfflush_required
attr_cfflush_optional = attr_interval

attr_cffunction_required = attr_name
attr_cffunction_optional = attr_access / attr_description / attr_display_name / attr_hint / attr_boolean_output / attr_return_format / attr_return_type / attr_roles / attr_secure_json / attr_verify_client

value_cffunction_access        = quote_char v:( str_package / str_private / str_public / str_remote ) quote_char { return v; }
value_cffunction_return_format = quote_char v:( str_json    / str_wddx    / str_plain  / str_xml    ) quote_char { return v; }
value_cffunction_return_type   = quote_char v:(
	str_any           / str_array     / str_binary /
	str_boolean       / str_component / str_date   /
	str_guid          / str_numeric   / str_query  /
	str_string        / str_struct    / str_uuid   /
	str_variable_name / str_void      / str_xml    /
	anychar+ ) quote_char { return v; }

attr_cfloop_array_required = attr_index / attr_array
//attr_cfloop_array_optional

attr_cfloop_collection_required = attr_index / attr_collection
//attr_cfloop_collection_optional

attr_cfloop_conditional_required = attr_condition
//attr_cfloop_conditional_optional

attr_cfloop_date_range_required = attr_index / attr_from_date_time / attr_to_date_time
attr_cfloop_date_range_optional = attr_step_date_time

attr_cfloop_file_required = attr_index / attr_file_path
attr_cfloop_file_optional = attr_delimiter / attr_characters

attr_cfloop_index_required = attr_index / attr_from / attr_to
attr_cfloop_index_optional = attr_step_integer / attr_charset

attr_cfloop_list_required = attr_index / attr_list_list
attr_cfloop_list_optional = attr_delimiter

attr_cfloop_query_required = attr_query
attr_cfloop_query_optional = attr_start_row / attr_end_row

attr_cfobjectcache_required = attr_objectcache_action
//attr_cfobjectcache_optional

attr_cfinsert_required_datasource = attr_datasource
//@todo: change to allow "table" attribute
attr_cfinsert_required_table_name = attr_table_name
attr_cfinsert_optional = attr_form_fields / attr_password / attr_table_owner / attr_table_qualifier / attr_username

//attr_cfoutput_required
attr_cfoutput_optional = attr_group_case_sensitive / attr_group / attr_max_rows / attr_query / attr_start_row

//attr_cftimer_required
attr_cftimer_optional = attr_label / attr_timer_type

value_cftimer_type = quote_char v:( str_inline / str_outline / str_comment / str_debug ) quote_char { return v; }
	
//attr_cftrace_required
attr_cftrace_optional = attr_abort / attr_category / attr_inline / attr_text / attr_var / attr_trace_type

value_cftrace_type = quote_char v:( str_information / str_warning / str_error / str_fatal_information ) quote_char { return v; }

attr_cfdbinfo_required_name = attr_name
attr_cfdbinfo_required_type = attr_dbinfo_type
value_cfdbinfo_type = quote_char v:( str_dbnames / str_tables / str_columns / str_procedures / str_foreign_keys / str_index ) quote_char  { return v; }
attr_cfdbinfo_optional = attr_datasource / attr_dbname / attr_password / attr_pattern / attr_username / attr_table

//attr_cftransaction_required
attr_cftransaction_optional = attr_action / attr_isolation / attr_savepoint / attr_nested
value_cftransaction_action = quote_char v:( str_begin / str_commit / str_rollback / str_set_save_point ) quote_char { return v; }
value_cftransaction_isolation = quote_char v:( str_read_uncommited / str_read_commited / str_repeatable_read / str_serializable ) quote_char { return v; }
	
//@todo: change to also allow "table" attribute
attr_cfupdate_required_table_name = attr_table_name
attr_cfupdate_optional = attr_form_fields / attr_password / attr_table_owner / attr_table_qualifier / attr_username

attr_cfquery_required = attr_name
attr_cfquery_optional = attr_block_factor / attr_cached_after / attr_cached_within / attr_datasource / attr_dbtype / attr_debug / attr_max_rows / attr_orm_options / attr_password / attr_result / attr_timeout / attr_username

attr_cfqueryparam_required = attr_value
attr_cfqueryparam_optional = attr_sql_type / attr_list / attr_max_length / attr_null / attr_scale / attr_separator

value_sql_type = quote_char v:(
	c f __ s q l __ (
			str_char / 
			str_bigint / 
			str_bit /
			
			str_blob / 
			str_clob / 
			str_date /
			
			str_decimal / 
			str_double / 
			str_float /
			
			str_idstamp / 
			str_integer / 
			str_longvarchar /
			
			str_money / 
			str_money4 / 
			str_numeric /
			
			str_real / 
			str_refcursor / 
			str_smallint /
			
			str_timestamp / 
			str_time / 
			str_tinyint /
			
			str_varchar 
		) 
	) quote_char { return plib.stringify(v, 'upper') }
// value definitions

value_regex = quote_char v:str_any_non_quote+ quote_char { return new RegExp(plib.stringify(v)); }

value_cfparam_type = quote_char v:(
		str_any / str_array / str_binary / str_boolean /
		str_country_code / str_credit_card / str_date /
		str_email / str_float / str_guid / str_integer /
		str_ip / str_json / str_numeric / str_range /
		str_regex / str_regular_expression / str_social_security_number /
		str_ssn / str_string / str_struct / str_telephone /
		str_time / str_url / str_uuid / str_variable_name /
		str_xml / str_zip / str_zipcode
	) quote_char { return v; }

//attr_cfimp_optional
value_cfcookie_expires
	= quote_char v:str_never quote_char   {
		return new Date();
		//human_date('30 years');
	}
	/ quote_char v:str_now quote_char     { return new Date(); }
	/ quote_char v:date_time quote_char { return v; }
	/ quote_char v:date quote_char      { return v; }
	/ v:value_integer                   { return v; }

value_cfdump_output = quote_char v:( str_browser / str_console / str_file ) quote_char { return v; }
value_cfdump_format = quote_char v:( str_text / str_html ) quote_char { return v; }

value_cferr_type = quote_char v:( str_exception / str_validation / str_request ) quote_char { return v.toLowerCase(); }
value_cferr_exception = quote_char n:(
		str_application / str_database / str_template /
		str_security / str_object / str_missing_include /
		str_expression / str_lock / str_custom_type / str_any
	) quote_char { return n.toLowerCase(); }

// any case strings
str_abort                       = v:(a b o r t)                                                    { return plib.stringify(v, 'lower'); }
str_access                      = v:(a c c e s s)                                                  { return plib.stringify(v, 'lower'); }
str_action                      = v:(a c t i o n)                                                  { return plib.stringify(v, 'lower'); }
str_add_token                   = v:(a d d __ t o k e n)                                           { return plib.stringify(v); }
str_all                         = v:(a l l)                                                        { return plib.stringify(v); }
str_always                      = v:(a l w a y s)                                                  { return plib.stringify(v, 'lower'); }
str_any                         = v:(a n y)                                                        { return plib.stringify(v); }
str_application                 = v:(a p p l i c a t i o n)                                        { return plib.stringify(v); }
str_application_timeout         = v:(a p p l i c a t i o n __ t i m e o u t)                       { return plib.stringify(v, 'lower'); }
str_application_token           = v:(a p p l i c a t i o n __ t o k e n)                           { return plib.stringify(v, 'lower'); }
str_arguments                   = v:(a r g u m e n t s)                                            { return plib.stringify(v); }
str_array                       = v:(a r r a y)                                                    { return plib.stringify(v, 'lower'); }
str_base_tag                    = v:(b a s e t a g)                                                { return plib.stringify(v, 'under'); }
str_batch_size                  = v:(b a t c h __ s i z e)                                         { return plib.stringify(v, 'under'); }
str_begin                       = v:(b e g i n)                                                    { return plib.stringify(v, 'under'); }
str_big_decimal                 = v:(b i g __ d e c i m a l)                                       { return plib.stringify(v); }
str_bigint                      = v:(b i g i n t)                                                  { return plib.stringify(v); }
str_binary                      = v:(b i n a r y)                                                  { return plib.stringify(v); }
str_bind                        = v:(b i n d)                                                      { return plib.stringify(v); }
str_bit                         = v:(b i t)                                                        { return plib.stringify(v); }
str_blob                        = v:(b l o b)                                                      { return plib.stringify(v); }
str_block_factor                = v:(b l o c k __ f a c t o r)                                     { return plib.stringify(v); }
str_boolean                     = v:(b o o l e a n)                                                { return plib.stringify(v); }
str_browser                     = v:(b r o w s e r)                                                { return plib.stringify(v); }
str_cache                       = v:(c a c h e)                                                    { return plib.stringify(v, 'lower'); }
str_cached_after                = v:(c a c h e d __ a f t e r)                                     { return plib.stringify(v, 'lower'); }
str_cached_within               = v:(c a c h e d __ w i t h i n)                                   { return plib.stringify(v, 'lower'); }
str_category                    = v:(c a t e g o r y)                                              { return plib.stringify(v, 'lower'); }
str_cfabort                     = v:(c f a b o r t)                                                { return plib.stringify(v, 'lower'); }
str_cfajaximport                = v:(c f a j a x i m p o r t)                                      { return plib.stringify(v, 'lower'); }
str_cfajaxproxy                 = v:(c f a j a x p r o x y)                                        { return plib.stringify(v, 'lower'); }
str_cfapplication               = v:(c f a p p l i c a t i o n)                                    { return plib.stringify(v, 'lower'); }
str_cfassociate                 = v:(c f a s s o c i a t e)                                        { return plib.stringify(v, 'lower'); }
str_cfbreak                     = v:(c f b r e a k)                                                { return plib.stringify(v, 'lower'); }
str_cfc                         = v:(c f c)                                                        { return plib.stringify(v, 'lower'); }
str_cfcache                     = v:(c f c a c h e)                                                { return plib.stringify(v, 'lower'); }
str_cfcase                      = v:(c f c a s e)                                                  { return plib.stringify(v, 'lower'); }
str_cfcatch                     = v:(c f c a t c h)                                                { return plib.stringify(v, 'lower'); }
str_cfcontent                   = v:(c f c o n t e n t)                                            { return plib.stringify(v, 'lower'); }
str_cfcontinue                  = v:(c f c o n t i n u e)                                          { return plib.stringify(v, 'lower'); }
str_cfcookie                    = v:(c f c o o k i e)                                              { return plib.stringify(v, 'lower'); }
str_cfdbinfo                    = v:(c f d b i n f o)                                              { return plib.stringify(v, 'lower'); }
str_cfdefaultcase               = v:(c f d e f a u l t c a s e)                                    { return plib.stringify(v, 'lower'); }
str_cfdump                      = v:(c f d u m p)                                                  { return plib.stringify(v, 'lower'); }
str_cfelse                      = v:(c f e l s e)                                                  { return plib.stringify(v, 'lower'); }
str_cfelseif                    = v:(c f e l s e i f)                                              { return plib.stringify(v, 'lower'); }
str_cferror                     = v:(c f e r r o r)                                                { return plib.stringify(v, 'lower'); }
str_cfexecute                   = v:(c f e x e c u t e)                                            { return plib.stringify(v, 'lower'); }
str_cfexit                      = v:(c f e x i t)                                                  { return plib.stringify(v, 'lower'); }
str_cffinally                   = v:(c f f i n a l l y)                                            { return plib.stringify(v, 'lower'); }
str_cfflush                     = v:(c f f l u s h)                                                { return plib.stringify(v, 'lower'); }
str_cffunction                  = v:(c f f u n c t i o n)                                          { return plib.stringify(v, 'lower'); }
str_cfheader                    = v:(c f h e a d e r)                                              { return plib.stringify(v, 'lower'); }
str_cfhtmlhead                  = v:(c f h t m l h e a d)                                          { return plib.stringify(v, 'lower'); }
str_cfif                        = v:(c f i f)                                                      { return plib.stringify(v, 'lower'); }
str_cfimport                    = v:(c f i m p o r t)                                              { return plib.stringify(v, 'lower'); }
str_cfinclude                   = v:(c f i n c l u d e)                                            { return plib.stringify(v, 'lower'); }
str_cfinsert                    = v:(c f i n s e r t)                                              { return plib.stringify(v, 'lower'); }
str_cflocation                  = v:(c f l o c a t i o n)                                          { return plib.stringify(v, 'lower'); }
str_cflock                      = v:(c f l o c k)                                                  { return plib.stringify(v, 'lower'); }
str_cflog                       = v:(c f l o g)                                                    { return plib.stringify(v, 'lower'); }
str_cflogin                     = v:(c f l o g i n)                                                { return plib.stringify(v, 'lower'); }
str_cfloginuser                 = v:(c f l o g i n u s e r)                                        { return plib.stringify(v, 'lower'); }
str_cflogout                    = v:(c f l o g o u t)                                              { return plib.stringify(v, 'lower'); }
str_cfloop                      = v:(c f l o o p)                                                  { return plib.stringify(v, 'lower'); }
str_cfobjectcache               = v:(c f o b j e c t c a c h e)                                    { return plib.stringify(v, 'lower'); }
str_cfoutput                    = v:(c f o u t p u t)                                              { return plib.stringify(v, 'lower'); }
str_cfparam                     = v:(c f p a r a m)                                                { return plib.stringify(v, 'lower'); }
str_cfprocessingdirective       = v:(c f p r o c e s s i n g d i r e c t i v e)                    { return plib.stringify(v, 'lower'); }
str_cfprocparam                 = v:(c f p r o c p a r a m)                                        { return plib.stringify(v, 'lower'); }
str_cfprocresult                = v:(c f p r o c r e s u l t)                                      { return plib.stringify(v, 'lower'); }
str_cfproperty                  = v:(c f p r o p e r t y)                                          { return plib.stringify(v, 'lower'); }
str_cfquery                     = v:(c f q u e r y)                                                { return plib.stringify(v, 'lower'); }
str_cfqueryparam                = v:(c f q u e r y p a r a m)                                      { return plib.stringify(v, 'lower'); }
str_cfrethrow                   = v:(c f r e t h r o w)                                            { return plib.stringify(v, 'lower'); }
str_cfreturn                    = v:(c f r e t u r n)                                              { return plib.stringify(v, 'lower'); }
str_cfsavecontent               = v:(c f s a v e c o n t e n t)                                    { return plib.stringify(v, 'lower'); }
str_cfscript                    = v:(c f s c r i p t)                                              { return plib.stringify(v, 'lower'); }
str_cfsetting                   = v:(c f s e t t i n g)                                            { return plib.stringify(v, 'lower'); }
str_cfsilent                    = v:(c f s i l e n t)                                              { return plib.stringify(v, 'lower'); }
str_cfsql_type                  = v:(c f s q l __ t y p e)                                         { return plib.stringify(v, 'lower'); }
str_cfstoredproc                = v:(c f s t o r e d p r o c)                                      { return plib.stringify(v, 'lower'); }
str_cfswitch                    = v:(c f s w i t c h)                                              { return plib.stringify(v, 'lower'); }
str_cfthrow                     = v:(c f t h r o w)                                                { return plib.stringify(v, 'lower'); }
str_cftimer                     = v:(c f t i m e r)                                                { return plib.stringify(v, 'lower'); }
str_cftrace                     = v:(c f t r a c e)                                                { return plib.stringify(v, 'lower'); }
str_cftransaction               = v:(c f t r a n s a c t i o n)                                    { return plib.stringify(v, 'lower'); }
str_cftry                       = v:(c f t r y)                                                    { return plib.stringify(v, 'lower'); }
str_cfupdate                    = v:(c f u p d a t e)                                              { return plib.stringify(v, 'lower'); }
str_char                        = v:(c h a r)                                                      { return plib.stringify(v, 'lower'); }
str_character                   = v:(c h a r a c t e r)                                            { return plib.stringify(v, 'lower'); }
str_characters                  = v:(c h a r a c t e r s)                                          { return plib.stringify(v, 'lower'); }
str_charset                     = v:(c h a r s e t)                                                { return plib.stringify(v, 'lower'); }
str_clear                       = v:(c l e a r)                                                    { return plib.stringify(v, 'lower'); }
str_client_cache                = v:(c l i e n t __ c a c h e)                                     { return plib.stringify(v, 'lower'); }
str_client_management           = v:(c l i e n t __ m a n a g e m e n t)                           { return plib.stringify(v, 'lower'); }
str_client_storage              = v:(c l i e n t __ s t o r a g e)                                 { return plib.stringify(v, 'lower'); }
str_clob                        = v:(c l o b)                                                      { return plib.stringify(v); }
str_columns                     = v:(c o l u m n s)                                                { return plib.stringify(v, 'lower'); }
str_collection                  = v:(c o l l e c t i o n)                                          { return plib.stringify(v, 'lower'); }
str_comment                     = v:(c o m m e n t)                                                { return plib.stringify(v, 'lower'); }
str_commit                      = v:(c o m m i t)                                                  { return plib.stringify(v, 'lower'); }
str_component                   = v:(c o m p o n e n t)                                            { return plib.stringify(v, 'lower'); }
str_console                     = v:(c o n s o l e)                                                { return plib.stringify(v, 'lower'); }
str_constrained                 = v:(c o n s t r a i n e d)                                        { return plib.stringify(v, 'lower'); }
str_condition                   = v:(c o n d i t i o n)                                            { return plib.stringify(v, 'lower'); }
str_cookie                      = v:(c o o k i e)                                                  { return plib.stringify(v); }
str_cookie_domain               = v:(c o o k i e __ d o m a i n)                                   { return plib.stringify(v); }
str_country_code                = v:(c o u n t r y __ c o d e)                                     { return plib.stringify(v); }
str_credit_card                 = v:(c r e d i t __ c a r d)                                       { return plib.stringify(v); }
str_css_src                     = v:(c s s __ s r c)                                               { return plib.stringify(v); }
str_custom_type                 = v:(c u s t o m __ t y p e)                                       { return plib.stringify(v, 'lower'); }
str_data_collection             = v:(d a t a __ c o l l e c t i o n)                               { return plib.stringify(v, 'lower'); }
str_database                    = v:(d a t a b a s e)                                              { return plib.stringify(v, 'lower'); }
str_datasource                  = v:(d a t a s o u r c e)                                          { return plib.stringify(v, 'lower'); }
str_date                        = v:(d a t e)                                                      { return plib.stringify(v); }
str_dbname                      = v:(d b n a m e)                                                  { return plib.stringify(v, 'lower'); }
str_dbnames                     = v:(d b n a m e s)                                                { return plib.stringify(v, 'lower'); }
str_dbtype                      = v:(d b t y p e)                                                  { return plib.stringify(v, 'lower'); }
str_debug                       = v:(d e b u g)                                                    { return plib.stringify(v, 'lower'); }
str_decimal                     = v:(d e c i m a l)                                                { return plib.stringify(v, 'lower'); }
str_default                     = v:(d e f a u l t)                                                { return plib.stringify(v, 'lower'); }
str_delete_file                 = v:(d e l e t e __ f i l e)                                       { return plib.stringify(v, 'lower'); }
str_delimiter                   = v:(d e l i m i t e r)                                            { return plib.stringify(v, 'lower'); }
str_depends_on                  = v:(d e p e n d s __ o n)                                         { return plib.stringify(v, 'lower'); }
str_description                 = v:(d e s c r i p t i o n)                                        { return plib.stringify(v, 'lower'); }
str_directory                   = v:(d i r e c t o r y)                                            { return plib.stringify(v, 'lower'); }
str_disk_persistent             = v:(d i s k __ p e r s i s t e n t)                               { return plib.stringify(v, 'lower'); }
str_display_name                = v:(d i s p l a y __ n a m e)                                     { return plib.stringify(v, 'lower'); }
str_domain                      = v:(d o m a i n)                                                  { return plib.stringify(v, 'lower'); }
str_double                      = v:(d o u b l e)                                                  { return plib.stringify(v, 'lower'); }
str_dynamic_insert              = v:(d y n a m i c __ i n s e r t)                                 { return plib.stringify(v, 'lower'); }
str_dynamic_update              = v:(d y n a m i c __ u p d a t e)                                 { return plib.stringify(v, 'lower'); }
str_element_column              = v:(e l e m e n t __ c o l u m n)                                 { return plib.stringify(v); }
str_element_type                = v:(e l e m e n t __ t y p e)                                     { return plib.stringify(v); }
str_email                       = v:(e m a i l)                                                    { return plib.stringify(v); }
str_enable_cfouput_only         = v:(e n a b l e __ c f o u t p u t __ o n l y)                    { return plib.stringify(v, 'lower'); }
str_end_row                     = v:(e n d __ r o w)                                               { return plib.stringify(v, 'under'); }
str_entity_name                 = v:(e n t i t y __ n a m e)                                       { return plib.stringify(v, 'lower'); }
str_error                       = v:(e r r o r)                                                    { return plib.stringify(v, 'lower'); }
str_exception                   = v:(e x c e p t i o n)                                            { return plib.stringify(v, 'lower'); }
str_exclusive                   = v:(e x c l u s i v e)                                            { return plib.stringify(v, 'lower'); }
str_exit_tag                    = v:(e x i t __ t a g)                                             { return plib.stringify(v); }
str_exit_template               = v:(e x i t __ t e m p l a t e)                                   { return plib.stringify(v); }
str_expand                      = v:(e x p a n d)                                                  { return plib.stringify(v, 'lower'); }
str_expire_url                  = v:(e x p i r e __ u r l)                                         { return plib.stringify(v, 'lower'); }
str_expires                     = v:(e x p i r e s)                                                { return plib.stringify(v, 'lower'); }
str_expression                  = v:(e x p r e s s i o n)                                          { return plib.stringify(v, 'lower'); }
str_fatal                       = v:(f a t a l)                                                    { return plib.stringify(v, 'lower'); }
str_fatal_information           = v:(f a t a l __ i n f o r m a t i o n)                           { return plib.stringify(v, 'lower'); }
str_fetch                       = v:(f e t c h)                                                    { return plib.stringify(v, 'lower'); }
str_fetch_batch_size            = v:(f e t c h __ b a t c h __ s i z e)                            { return plib.stringify(v); }
str_field_type                  = v:(f i e l d __ t y p e)                                         { return plib.stringify(v); }
str_file                        = v:(f i l e)                                                      { return plib.stringify(v, 'lower'); }
str_fkcolumn                    = v:(f k c o l u m n)                                              { return plib.stringify(v); }
str_float                       = v:(f l o a t)                                                    { return plib.stringify(v); }
str_flush                       = v:(f l u s h)                                                    { return plib.stringify(v); }
str_foreign_keys                = v:(f o r e i g n __ k e y s)                                     { return plib.stringify(v); }
str_form_fields                 = v:(f o r m __ f i e l d s)                                       { return plib.stringify(v); }
str_format                      = v:(f o r m a t)                                                  { return plib.stringify(v, 'lower'); }
str_formula                     = v:(f o r m u l a)                                                { return plib.stringify(v); }
str_generated                   = v:(g e n e r a t e d)                                            { return plib.stringify(v, 'lower'); }
str_generator                   = v:(g e n e r a t o r)                                            { return plib.stringify(v); }
str_get                         = v:(g e t)                                                        { return plib.stringify(v); }
str_getter                      = v:(g e t t e r)                                                  { return plib.stringify(v); }
str_google_map_key              = v:(g o o g l e __ m a p __ k e y)                                { return plib.stringify(v, 'lower'); }
str_group                       = v:(g r o u p)                                                    { return plib.stringify(v, 'lower'); }
str_group_case_sensitive        = v:(g r o u p __ c a s e __ s e n s i t i v e)                    { return plib.stringify(v, 'lower'); }
str_guid                        = v:(g u i d)                                                      { return plib.stringify(v); }
str_hide                        = v:(h i d e)                                                      { return plib.stringify(v, 'lower'); }
str_hint                        = v:(h i n t)                                                      { return plib.stringify(v, 'lower'); }
str_html                        = v:(h t m l)                                                      { return plib.stringify(v); }
str_http                        = v:(h t t p)                                                      { return plib.stringify(v, 'lower'); }
str_http_only                   = v:(h t t p __ o n l y)                                           { return plib.stringify(v, 'lower'); }
str_https                       = v:(h t t p s)                                                    { return plib.stringify(v, 'lower'); }
str_from                        = v:(f r o m)                                                      { return plib.stringify(v, 'lower'); }
str_id                          = v:(i d)                                                          { return plib.stringify(v, 'lower'); }
str_idstamp                     = v:(i d s t a m p)                                                { return plib.stringify(v, 'lower'); }
str_idle_time                   = v:(i d l e __ t i m e)                                           { return plib.stringify(v, 'lower'); }
str_idle_timeout                = v:(i d l e __ t i m e o u t)                                     { return plib.stringify(v, 'lower'); }
str_in                          = v:(i n)                                                          { return plib.stringify(v); }
str_index                       = v:(i n d e x)                                                    { return plib.stringify(v, 'lower'); }
str_information                 = v:(i n f o r m a t i o n)                                        { return plib.stringify(v, 'lower'); }
str_inline                      = v:(i n l i n e)                                                  { return plib.stringify(v, 'lower'); }
str_inout                       = v:(i n o u t)                                                    { return plib.stringify(v); }
str_insert                      = v:(i n s e r t)                                                  { return plib.stringify(v); }
str_int                         = v:(i n t)                                                        { return plib.stringify(v); }
str_integer                     = v:(i n t e g e r)                                                { return plib.stringify(v); }
str_interval                    = v:(i n t e r v a l)                                              { return plib.stringify(v, 'lower'); }
str_inverse                     = v:(i n v e r s e)                                                { return plib.stringify(v); }
str_inverse_join_column         = v:(i n v e r s e __ j o i n __ c o l u m n)                      { return plib.stringify(v); }
str_ip                          = v:(i p)                                                          { return plib.stringify(v); }
str_isolation                   = v:(i s o l a t i o n)                                            { return plib.stringify(v, 'lower'); }
str_join                        = v:(j o i n)                                                      { return plib.stringify(v); }
str_join_column                 = v:(j o i n __ c o l u m n)                                       { return plib.stringify(v); }
str_js_class_name               = v:(j s __ c l a s s __ n a m e)                                  { return plib.stringify(v); }
str_json                        = v:(j s o n)                                                      { return plib.stringify(v); }
str_key                         = v:(k e y)                                                        { return plib.stringify(v, 'lower'); }
str_keys                        = v:(k e y s)                                                      { return plib.stringify(v, 'lower'); }
str_label                       = v:(l a b e l)                                                    { return plib.stringify(v, 'lower'); }
str_lazy                        = v:(l a z y)                                                      { return plib.stringify(v); }
str_length                      = v:(l e n g t h)                                                  { return plib.stringify(v); }
str_link_catalog                = v:(l i n k __ c a t a l o g)                                     { return plib.stringify(v); }
str_link_schema                 = v:(l i n k __ s c h e m a)                                       { return plib.stringify(v); }
str_link_table                  = v:(l i n k __ t a b l e)                                         { return plib.stringify(v); }
str_list                        = v:(l i s t)                                                      { return plib.stringify(v, 'lower'); }
str_lock                        = v:(l o c k)                                                      { return plib.stringify(v, 'lower'); }
str_log                         = v:(l o g)                                                        { return plib.stringify(v, 'lower'); }
str_login_storage               = v:(l o g i n __ s t o r a g e)                                   { return plib.stringify(v, 'lower'); }
str_long                        = v:(l o n g)                                                      { return plib.stringify(v, 'lower'); }
str_longvarchar                 = v:(l o n g v a r c h a r)                                        { return plib.stringify(v, 'lower'); }
str_loop                        = v:(l o o p)                                                      { return plib.stringify(v, 'lower'); }
str_mail_to                     = v:(m a i l __ t o)                                               { return plib.stringify(v, 'lower'); }
str_mapped_by                   = v:(m a p p e d __ b y)                                           { return plib.stringify(v); }
str_max                         = v:(m a x)                                                        { return plib.stringify(v, 'lower'); }
str_max_length                  = v:(m a x __ l e n g t h)                                         { return plib.stringify(v, 'lower'); }
str_max_rows                    = v:(m a x __ r o w s)                                             { return plib.stringify(v, 'lower'); }
str_meta_info                   = v:(m e t a __ i n f o)                                           { return plib.stringify(v, 'lower'); }
str_metadata                    = v:(m e t a d a t a)                                              { return plib.stringify(v, 'lower'); }
str_method                      = v:(m e t h o d)                                                  { return plib.stringify(v, 'lower'); }
str_money                       = v:(m o n e y)                                                    { return plib.stringify(v, 'lower'); }
str_money4                      = v:(m o n e y '4')                                                { return plib.stringify(v, 'lower'); }
str_min                         = v:(m i n)                                                        { return plib.stringify(v, 'lower'); }
str_missing_include             = v:(m i s s i n g __ i n c l u d e)                               { return plib.stringify(v); }
str_missing_row_ignored         = v:(m i s s i n g __ r o w __ i g n o r e d)                      { return plib.stringify(v); }
str_name                        = v:(n a m e)                                                      { return plib.stringify(v, 'lower'); }
str_nested                      = v:(n e s t e d)                                                  { return plib.stringify(v, 'lower'); }
str_never                       = v:(n e v e r)                                                    { return plib.stringify(v); }
str_none                        = v:(n o n e)                                                      { return plib.stringify(v); }
str_not_null                    = v:(n o t __ n u l l)                                             { return plib.stringify(v); }
str_now                         = v:(n o w)                                                        { return plib.stringify(v); }
str_null                        = v:(n u l l)                                                      { return plib.stringify(v, 'lower'); }
str_numeric                     = v:(n u m e r i c)                                                { return plib.stringify(v); }
str_object                      = v:(o b j e c t)                                                  { return plib.stringify(v, 'lower'); }
str_on_error                    = v:(o n __ e r r o r)                                             { return plib.stringify(v, 'lower'); }
str_on_success                  = v:(o n __ s u c c e s s)                                         { return plib.stringify(v, 'lower'); }
str_optimal                     = v:(o p t i m a l)                                                { return plib.stringify(v, 'lower'); }
str_optimistic_lock             = v:(o p t i m i s t i c __ l o c k)                               { return plib.stringify(v, 'lower'); }
str_optimistic_lock_generated   = v:(o p t i m i s t i c __ l o c k __ g e n e r a t e d)          { return plib.stringify(v); }
str_order_by                    = v:(o r d e r __ b y)                                             { return plib.stringify(v); }
str_order_by_read_only          = v:(o r d e r __ b y __ r e a d __ o n l y)                       { return plib.stringify(v); }
str_orm_options                 = v:(o r m __ o p t i o n s)                                       { return plib.stringify(v, 'lower'); }
str_orm_type                    = v:(o r m __ t y p e)                                             { return plib.stringify(v); }
str_out                         = v:(o u t)                                                        { return plib.stringify(v); }
str_outline                     = v:(o u t l i n e)                                                { return plib.stringify(v, 'lower'); }
str_output                      = v:(o u t p u t)                                                  { return plib.stringify(v, 'lower'); }
str_output_file                 = v:(o u t p u t __ f i l e)                                       { return plib.stringify(v, 'lower'); }
str_overflow_to_disk            = v:(o v e r f l o w __ t o __ d i s k)                            { return plib.stringify(v, 'lower'); }
str_package                     = v:(p a c k a g e)                                                { return plib.stringify(v, 'lower'); }
str_page_encoding               = v:(p a g e __ e n c o d i n g)                                   { return plib.stringify(v, 'lower'); }
str_params                      = v:(p a r a m s)                                                  { return plib.stringify(v, 'lower'); }
str_password                    = v:(p a s s w o r d)                                              { return plib.stringify(v, 'lower'); }
str_path                        = v:(p a t h)                                                      { return plib.stringify(v, 'lower'); }
str_pattern                     = v:(p a t t e r n)                                                { return plib.stringify(v, 'lower'); }
str_persistent                  = v:(p e r s i s t e n t)                                          { return plib.stringify(v, 'lower'); }
str_plain                       = v:(p l a i n)                                                    { return plib.stringify(v, 'lower'); }
str_port                        = v:(p o r t)                                                      { return plib.stringify(v, 'lower'); }
str_precision                   = v:(p r e c i s i o n)                                            { return plib.stringify(v); }
str_prefix                      = v:(p r e f i x)                                                  { return plib.stringify(v, 'lower'); }
str_private                     = v:(p r i v a t e)                                                { return plib.stringify(v, 'lower'); }
str_procedure                   = v:(p r o c e d u r e)                                            { return plib.stringify(v, 'lower'); }
str_procedures                  = v:(p r o c e d u r e s)                                          { return plib.stringify(v, 'lower'); }
str_protocol                    = v:(p r o t o c o l)                                              { return plib.stringify(v, 'lower'); }
str_public                      = v:(p u b l i c)                                                  { return plib.stringify(v, 'lower'); }
str_put                         = v:(p u t)                                                        { return plib.stringify(v, 'lower'); }
str_query                       = v:(q u e r y)                                                    { return plib.stringify(v); }
str_range                       = v:(r a n g e s)                                                  { return plib.stringify(v); }
str_real                        = v:(r e a l)                                                      { return plib.stringify(v, 'lower'); }
str_read_commited               = v:(r e a d __ c o m m i t e d)                                   { return plib.stringify(v, 'lower'); }
str_read_only                   = v:(r e a d __ o n l y)                                           { return plib.stringify(v); }
str_read_uncommited             = v:(r e a d __ u n c o m m i t e d)                               { return plib.stringify(v, 'lower'); }
str_regex                       = v:(r e g e x)                                                    { return plib.stringify(v); }
str_registry                    = v:(r e g i s t r y)                                              { return plib.stringify(v); }
str_regular_expression          = v:(r e g u l a r __ e x p r e s s i o n)                         { return plib.stringify(v); }
str_refcursor                   = v:(r e f c u r s o r)                                            { return plib.stringify(v); }
str_remote                      = v:(r e m o t e)                                                  { return plib.stringify(v, 'lower'); }
str_repeatable_read             = v:(r e p e a t a b l e __ r e a d)                               { return plib.stringify(v, 'lower'); }
str_request                     = v:(r e q u e s t)                                                { return plib.stringify(v, 'lower'); }
str_request_timeout             = v:(r e q u e s t __ t i m e o u t)                               { return plib.stringify(v, 'lower'); }
str_required                    = v:(r e q u i r e d)                                              { return plib.stringify(v, 'lower'); }
str_reset                       = v:(r e s e t)                                                    { return plib.stringify(v, 'lower'); }
str_result                      = v:(r e s u l t)                                                  { return plib.stringify(v, 'lower'); }
str_result_set                  = v:(r e s u l t __ s e t)                                         { return plib.stringify(v, 'lower'); }
str_return_code                 = v:(r e t u r n __ c o d e)                                       { return plib.stringify(v, 'lower'); }
str_return_format               = v:(r e t u r n __ f o r m a t)                                   { return plib.stringify(v, 'lower'); }
str_return_type                 = v:(r e t u r n __ t y p e)                                       { return plib.stringify(v, 'lower'); }
str_roles                       = v:(r o l e s)                                                    { return plib.stringify(v, 'lower'); }
str_rollback                    = v:(r o l l __ b a c k)                                           { return plib.stringify(v, 'lower'); }
str_row_id                      = v:(r o w __ i d)                                                 { return plib.stringify(v); }
str_savepoint                   = v:(s a v e p o i n t)                                            { return plib.stringify(v, 'lower'); }
str_scale                       = v:(s c a l e)                                                    { return plib.stringify(v, 'lower'); }
str_scheduler                   = v:(s c h e d u l e r)                                            { return plib.stringify(v, 'lower'); }
str_schema                      = v:(s c h e m a)                                                  { return plib.stringify(v); }
str_scope                       = v:(s c o p e)                                                    { return plib.stringify(v, 'lower'); }
str_script_protect              = v:(s c r i p t __ p r o t e c t)                                 { return plib.stringify(v, 'lower'); }
str_script_src                  = v:(s c r i p t __ s r c)                                         { return plib.stringify(v); }
str_secure                      = v:(s e c u r e)                                                  { return plib.stringify(v, 'lower'); }
str_security                    = v:(s e c u r i t y)                                              { return plib.stringify(v, 'lower'); }
str_secure_json                 = v:(s e c u r e __ j s o n)                                       { return plib.stringify(v, 'lower'); }
str_secure_json_prefix          = v:(s e c u r e __ j s o n __ p r e f i x)                        { return plib.stringify(v, 'lower'); }
str_select                      = v:(s e l e c t)                                                  { return plib.stringify(v, 'lower'); }
str_select_before_update        = v:(s e l e c t __ b e f o r e __ u p d a t e)                    { return plib.stringify(v); }
str_select_key                  = v:(s e l e c t __ k e y)                                         { return plib.stringify(v); }
str_separator                   = v:(s e p a r a t o r)                                            { return plib.stringify(v, 'lower'); }
str_sequence                    = v:(s e q u e n c e)                                              { return plib.stringify(v); }
str_serializable                = v:(s e r i a l i z a b l e)                                      { return plib.stringify(v, 'lower'); }
str_server                      = v:(s e r v e r)                                                  { return plib.stringify(v, 'lower'); }
str_server_cache                = v:(s e r v e r __ c a c h e)                                     { return plib.stringify(v, 'lower'); }
str_server_side_form_validation = v:(s e r v e r __ s i d e __ f o r m __ v a l i d a t i o n)     { return plib.stringify(v, 'lower'); }
str_session                     = v:(s e s s i o n)                                                { return plib.stringify(v); }
str_session_management          = v:(s e s s i o n __ m a n a g e m e n t)                         { return plib.stringify(v, 'lower'); }
str_session_timeout             = v:(s e s s i o n __ t i m e o u t)                               { return plib.stringify(v, 'lower'); }
str_set_client_cookies          = v:(s e t __ c l i e n t __ c o o k i e s)                        { return plib.stringify(v, 'lower'); }
str_set_domain_cookies          = v:(s e t __ d o m a i n __ c o o k i e s)                        { return plib.stringify(v, 'lower'); }
str_set_save_point              = v:(s e t __ s a v e __ p o i n t)                                { return plib.stringify(v, 'lower'); }
str_setter                      = v:(s e t t e r)                                                  { return plib.stringify(v); }
str_short                       = v:(s h o r t)                                                    { return plib.stringify(v, 'lower'); }
str_show                        = v:(s h o w)                                                      { return plib.stringify(v, 'lower'); }
str_show_debug_output           = v:(s h o w __ d e b u g __ o u t p u t)                          { return plib.stringify(v, 'lower'); }
str_show_error                  = v:(s h o w __ e r r o r)                                         { return plib.stringify(v, 'lower'); }
str_show_udfs                   = v:(s h o w __ u d f s)                                           { return plib.stringify(v, 'lower'); }
str_smallint                    = v:(s m a l l i n t)                                              { return plib.stringify(v); }
str_social_security_number      = v:(s o c i a l __ s e c u r i t y __ n u m b e r)                { return plib.stringify(v); }
str_source                      = v:(s o u r c e)                                                  { return plib.stringify(v, 'lower'); }
str_ssn                         = v:(s s n)                                                        { return plib.stringify(v); }
str_start_row                   = v:(s t a r t __ r o w)                                           { return plib.stringify(v, 'under'); }
str_status_code                 = v:(s t a t u s __ c o d e)                                       { return plib.stringify(v, 'under'); }
str_status_text                 = v:(s t a t u s __ t e x t)                                       { return plib.stringify(v, 'under'); }
str_step                        = v:(s t e p)                                                      { return plib.stringify(v, 'lower'); }
str_string                      = v:(s t r i n g)                                                  { return plib.stringify(v); }
str_strip_whitespace            = v:(s t r i p __ w h i t e s p a c e)                             { return plib.stringify(v); }
str_struct                      = v:(s t r u c t)                                                  { return plib.stringify(v); }
str_struct_key_column           = v:(s t r u c t __ k e y __ c o l u m n)                          { return plib.stringify(v); }
str_struct_key_data_type        = v:(s t r u c t __ k e y __ d a t a __ t y p e)                   { return plib.stringify(v); }
str_struct_key_type             = v:(s t r u c t __ k e y __ t y p e)                              { return plib.stringify(v); }
str_suppress_whitespace         = v:(s u p p r e s s __ w h i t e s p a c e)                       { return plib.stringify(v, 'lower'); }
str_table                       = v:(t a b l e)                                                    { return plib.stringify(v, 'lower'); }
str_table_name                  = v:(t a b l e __ n a m e)                                         { return plib.stringify(v, 'lower'); }
str_table_owner                 = v:(t a b l e __ o w n e r)                                       { return plib.stringify(v, 'under'); }
str_table_qualifier             = v:(t a b l e __ q u a l i f i e r)                               { return plib.stringify(v, 'under'); }
str_tables                      = v:(t a b l e s)                                                  { return plib.stringify(v, 'lower'); }
str_tag_lib                     = v:(t a g __ l i b)                                               { return plib.stringify(v, 'lower'); }
str_tags                        = v:(t a g s)                                                      { return plib.stringify(v, 'lower'); }
str_telephone                   = v:(t e l e p h o n e)                                            { return plib.stringify(v); }
str_template                    = v:(t e m p l a t e)                                              { return plib.stringify(v, 'lower'); }
str_text                        = v:(t e x t)                                                      { return plib.stringify(v, 'lower'); }
str_throw_on_error              = v:(t h r o w __ o n __ e r r o r)                                { return plib.stringify(v, 'lower'); }
str_throw_on_timeout            = v:(t h r o w __ o n __ t i m e o u t)                            { return plib.stringify(v, 'lower'); }
str_time                        = v:(t i m e)                                                      { return plib.stringify(v); }
str_timeout                     = v:(t i m e o u t)                                                { return plib.stringify(v, 'lower'); }
str_timespan                    = v:(t i m e s p a n)                                              { return plib.stringify(v, 'lower'); }
str_timestamp                   = v:(t i m e s t a m p)                                            { return plib.stringify(v); }
str_tinyint                     = v:(t i n y i n t)                                                { return plib.stringify(v); }
str_to                          = v:(t o)                                                          { return plib.stringify(v, 'lower'); }
str_top                         = v:(t o p)                                                        { return plib.stringify(v, 'lower'); }
str_true_false                  = v:(t r u e __ f a l s e)                                         { return plib.stringify(v, 'lower'); }
str_type                        = v:(t y p e)                                                      { return plib.stringify(v, 'lower'); }
str_unique                      = v:(u n i q u e)                                                  { return plib.stringify(v, 'lower'); }
str_unique_key                  = v:(u n i q u e __ k e y)                                         { return plib.stringify(v); }
str_update                      = v:(u p d a t e)                                                  { return plib.stringify(v, 'lower'); }
str_url                         = v:(u r l)                                                        { return plib.stringify(v, 'lower'); }
str_use_cache                   = v:(u s e __ c a c h e)                                           { return plib.stringify(v, 'lower'); }
str_use_query_string            = v:(u s e __ q u e r y __ s t r i n g)                            { return plib.stringify(v, 'lower'); }
str_username                    = v:(u s e r n a m e)                                              { return plib.stringify(v, 'lower'); }
str_uuid                        = v:(u u i d)                                                      { return plib.stringify(v); }
str_validate                    = v:(v a l i d a t e)                                              { return plib.stringify(v, 'lower'); }
str_validation                  = v:(v a l i d a t i o n)                                          { return plib.stringify(v, 'lower'); }
str_validate_param              = v:(v a l i d a t e __ p a r a m)                                 { return plib.stringify(v, 'lower'); }
str_value                       = v:(v a l u e)                                                    { return plib.stringify(v, 'lower'); }
str_var                         = v:(v a r)                                                        { return plib.stringify(v, 'lower'); }
str_varchar                     = v:(v a r c h a r)                                                { return plib.stringify(v, 'lower'); }
str_variable                    = v:(v a r i a b l e)                                              { return plib.stringify(v, 'lower'); }
str_variable_name               = v:(v a r i a b l e __ n a m e)                                   { return plib.stringify(v); }
str_verify_client               = v:(v e r i f y __ c l i e n t)                                   { return plib.stringify(v, 'lower'); }
str_void                        = v:(v o i d)                                                      { return plib.stringify(v, 'lower'); }
str_warning                     = v:(w a r n i n g)                                                { return plib.stringify(v); }
str_wddx                        = v:(w d d x)                                                      { return plib.stringify(v); }
str_where                       = v:(w h e r e)                                                    { return plib.stringify(v); }
str_xml                         = v:(x m l)                                                        { return plib.stringify(v); }
str_yes_no                      = v:(y e s n o)                                                    { return plib.stringify(v); }
str_zip                         = v:(z i p)                                                        { return plib.stringify(v); }
str_zipcode                     = v:(z i p __ c o d e)                                             { return plib.stringify(v); }
// end any case strings

// Common Generic Value Definitions
value_file_path     = quote_char v:(wack (value_dir wack)* value_dir) quote_char { return plib.stringify(v); }
value_dir           = v:(!(wack / ws / quote_char) .)*                           { return plib.stringify(v); }
value_email_address = quote_char e:email quote_char                              { return e; }
email               = n:(!(quote_char / ws / at) anychar)+ at:at d:domain        { return plib.stringify(n) + at + d; }

date_time
	= v:now_func 
	/ v:(date space time ) { return new Date(v); }
date 
	= v:now_func
	/ v:(integer integer integer integer '-' integer integer? '-' integer integer? ) { return new Date(plib.stringify(v) + ' 00:00:00'); }
now_func = str_now lparen rparen { return new Date(); }
time 
	= hr:([01] integer / '2' [0123] ) ':' 
	min:( [0-5] integer ) ':' 
	sec:( [0-5] integer )
	mill:( period integer integer integer integer )? { return new Date(hr + min + sec + mill); }

//value_date = quote_char v:date quote_char { return v; }
//value_time = quote_char v:time quote_char { return v; }
value_date_time = quote_char v:( now_func / create_time_span_func / date_time ) quote_char { return v; }

value_boolean = quote_char v:boolean quote_char { return v; }
boolean
	= y e s      { return true; }
	/ t r u e    { return true; }
	/ "1"        { return true; }
	/ n o        { return false; }
	/ f a l s e  { return false; }
	/ "0"        { return false; }
value_cfval = quote_char v:cfval quote_char { return v; }
cfval = pound v:(!pound anychar)+ pound { return plib.stringify(v); }

value_list = quote_char v:( ((!(comma / quote_char) anychar)+ comma )+ (!(comma / quote_char) anychar)+ ) quote_char { return plib.stringify(v).split(','); }
value_domain = quote_char v:( period domain ) quote_char { return plib.stringify(v); }
domain = v:( ( dom_part+ period )+ dom_part+ ) { return plib.stringify(v); }
dom_part = ( lcchars / ub lcchars )+ ( '-' lcchars / lcchars )*

// Generic Generic Value Defs
value_any_non_whitespace = quote_char v:( chars / [-_] )+ quote_char { return plib.stringify(v); }
// @TODO: Fix value_encoding from: http://www.iana.org/assignments/character-sets/character-sets.xhtml
value_encoding = value_any_non_whitespace

// @TODO: allow escaped quotes inside quoted strings
value_any = quote_char v:(!quote_char anychar)+ quote_char { return plib.stringify(v); }
//value_any 
//	= quote_char v:( ( '\\' quote_char ) /  anychar )+ quote_char { return plib.stringify(v); }
str_any_non_quote = v:(!quote_char anychar)+ { return plib.stringify(v); }
value_empty_quote = quote_char quote_char { return ""; }
value_float       = quote_char v:( integer+ period integer+ ) quote_char { return plib.stringify(v, 'float'); }
value_integer     = quote_char v:integer+ quote_char { return plib.stringify(v, 'int'); }

ops = e q / n e q / l t /  l e / g t / g e / i s / n o t

value_create_time_span_func
	= value_empty_quote { return new Date(); }
	/ quote_char? v:create_time_span_func quote_char? { return plib.mkDate(v); }

// Functions
create_time_span_func
	= pound "CreateTimeSpan(" space* days:integer space* "," space* hours:integer space* "," space* minutes:integer space* "," space* seconds:integer space* ")" pound {
		calc = Date.now() +
			( parseInt(days) * 86400000 ) + // days
			( parseInt(hours) * 3600000 ) + // hours
			( parseInt(minutes) * 60000 ) + // minutes
			( parseInt(seconds) * 1000 );   // seconds
		return new Date(calc);
	}

chars = ucchars / lcchars / integer
ucchars = [A-Z]
lcchars = [a-z]
ub = '_'
__ = ub?
at = '@'
pound = '#'
ws = space / "\t" / "\n"
lparen = '('
rparen = ')'
lt = '<'
gt = '>'
wack = '/'
eql = '='
period = '.'
comma = ','
quote_char = '"' / "'"
escaped_quote_chars = '\"' / "\\'"
integer = [0-9]
space = ' '
anychar = .


attrib_eql = ws* eql ws*

a = [aA]
b = [bB]
c = [cC]
d = [dD]
e = [eE]
f = [fF]
g = [gG]
h = [hH]
i = [iI]
j = [jJ]
k = [kK]
l = [lL]
m = [mM]
n = [nN]
o = [oO]
p = [pP]
q = [qQ]
r = [rR]
s = [sS]
t = [tT]
u = [uU]
v = [vV]
w = [wW]
x = [xX]
y = [yY]
z = [zZ]

