{
	var util = require('util'),
		plib = require('./lib/parselib'),
		cftag = require('./lib/cftag'),
		human_date = require('date.js'),
		inspect = console.dir;
}

start 
	= ApplicationFrameworkTags
//	/ CommunicationsTag
	/ DatabaseManipulationTag
	/ DataOutputTag
	/ DebuggingTag
//	/ DisplayManagementTag
	/ ExceptionHandlingTag
//	/ ExtensibilityTag
//	/ FileManagementTag
//	/ FlowControlTag
//	/ FormTag
//	/ InternetProtocolTag
//	/ PageProcessingTag
//	/ SecurityTag
	/ VariableManipulationTags
//	/ OtherTag
	/ anychar

ApplicationFrameworkTags 
	= tag_cfapplication
	/ tag_cfassociate
	/ tag_cferror
	/ tag_cfimport
//	/ tag_cfinterface
//	/ tag_cflock
//	/ tag_cfscript
//	/ tag_cfthread


// Tag Definitions
tag_cfapplication
	= gt t:str_cfapplication attr:( attr_cfapplication_optional* attr_cfapplication_required attr_cfapplication_optional* ) ws* lt {
//		console.dir({attr: attr, flattattr: plib.flatten(attr)});
		return new cftag(t, plib.flatten(attr), '');
	}

tag_cfassociate
	= gt t:str_cfassociate attr:( attr_cfassoc_required attr_cfassoc_optional* / attr_cfassoc_optional* attr_cfassoc_required ) lt {
		return new cftag(t, plib.flatten(attr), '');
	}

tag_cferror
	= gt t:str_cferror attr:(
			attr_cferr_optional* attr_cferr_required_template attr_cferr_optional* attr_cferr_required_type attr_cferr_optional*
			/ attr_cferr_optional* attr_cferr_required_type attr_cferr_optional* attr_cferr_required_template attr_cferr_optional*
		) lt {
		return new cftag(t, plib.flatten(attr), '');
	}

tag_cfimport
	= gt t:str_cfimport attr:attr_cfimport_required lt {
		return new cftag(t, attr, '');
	}

//CommunicationsTag
//	= tag_cfexchangecalendar
//	/ tag_cfexchangeconnection
//	/ tag_cfexchangecontact
//	/ tag_cfexchangefilter
//	/ tag_cfexchangemail
//	/ tag_cfexchangetask
//	/ tag_cffeed
//	/ tag_cfmail
//	/ tag_cfmailparam
//	/ tag_cfmailpart
//	/ tag_cfpop
//	/ tag_cfimap

DatabaseManipulationTag
	= tag_cfdbinfo
	/ tag_cfinsert
	/ tag_cfobjectcache
//	/ tag_cfprocparam
//	/ tag_cfprocresult
	/ tag_cfquery
	/ tag_cfqueryparam
//	/ tag_cfstoredproc
	/ tag_cftransaction
	/ tag_cfupdate

tag_cfdbinfo
	= gt t:str_cfdbinfo attr:( 
			attr_cfdbinfo_optional* attr_cfdbinfo_required_name attr_cfdbinfo_optional* attr_cfdbinfo_required_type attr_cfdbinfo_optional*
			/ attr_cfdbinfo_optional* attr_cfdbinfo_required_type attr_cfdbinfo_optional* attr_cfdbinfo_required_name attr_cfdbinfo_optional*
	) lt {
		var me = new cftag(t, plib.flatten(attr), '');
		types_requiring_table_value = ['columns', 'foreignkeys', 'index'];
		if ( ( me.attributes.type && types_requiring_table_value.indexOf(me.attributes.type) > -1 ) && ( ! me.attributes.table || me.attributes.table === "" ) ) {
			throw new Error(util.format("Missing table value, required with type attribute specified as one of %a.", types_requiring_table_value));		
		}
		return me;
	}

tag_cfinsert
	= gt t:str_cfinsert attr:(
		attr_cfinsert_optional* attr_cfinsert_required_datasource attr_cfinsert_optional* attr_cfinsert_required_table_name attr_cfinsert_optional*
		/ attr_cfinsert_optional* attr_cfinsert_required_table_name attr_cfinsert_optional* attr_cfinsert_required_datasource attr_cfinsert_optional*
	) ws* wack? lt {
		return new cftag(t, plib.flatten(attr), '');
	}

tag_cfobjectcache
	= gt t:str_cfobjectcache attr:attr_cfobjectcache_required lt {
		return new cftag(t, attr, '');
	}

tag_cfquery
	= gt t:str_cfquery attr:(attr_cfquery_optional* attr_cfquery_required attr_cfquery_optional* ) lt
	content:(!(gt wack str_cfquery lt) anychar)*
	gt wack str_cfquery lt {
		return new cftag(t, plib.flatten(attr), plib.stringify(content));
	}

tag_cfqueryparam
	= gt t:str_cfqueryparam attr:(
		attr_cfqueryparam_optional* attr_cfqueryparam_required attr_cfqueryparam_optional* 
	) lt {
		return new cftag(t, plib.flatten(attr), '');
	}

tag_cftransaction
	= gt t:str_cftransaction attr:attr_cftransaction_optional* lt
	content:(!(gt wack str_cftransaction lt) anychar)*
	gt wack str_cftransaction lt {
		return new cftag(t, attr, plib.stringify(content));
	}

tag_cfupdate
	= gt t:str_cfupdate attr:(
		attr_cfupdate_optional* attr_cfupdate_required_datasource attr_cfupdate_optional* attr_cfupdate_required_table_name attr_cfupdate_optional*
		/ attr_cfupdate_optional* attr_cfupdate_required_table_name attr_cfupdate_optional* attr_cfupdate_required_datasource attr_cfupdate_optional*
	) ws* wack? lt {
		return new cftag(t, plib.flatten(attr), '');
	}

DataOutputTag
//	= tag_cfchart
//	/ tag_cfchartdata
//	/ tag_cfchartseries
//	/ tag_cfcol
//	/ tag_cfcontent
//	/ tag_cfdocument
//	/ tag_cfdocumentitem
//	/ tag_cfdocumentsection
	= tag_cfflush
//	/ tag_cfheader
	/ tag_cflog
	/ tag_cfoutput
//	/ tag_cfpresentation
//	/ tag_cfpresentationslide
//	/ tag_cfpresenter
//	/ tag_cfprint
//	/ tag_cfprocessingdirective
//	/ tag_cfreport
//	/ tag_cfreportparam
//	/ tag_cfsilent
//	/ tag_cftable

tag_cfflush
	= gt t:str_cfflush attr:attr_cfflush_optional* lt {
		return new cftag(t,  attr, '');
	}

tag_cflog
	= gt t:str_cflog attr:(
		attr_cflog_optional*
		attr_cflog_required
		attr_cflog_optional*
	) lt {
		return new cftag(t, plib.flatten(attr), '');
	}

tag_cfoutput
	= gt t:str_cfoutput attr:attr_cfoutput_optional* lt
	content:(!(gt wack str_cfoutput lt) anychar)*
	gt wack str_cfoutput lt {
		return new cftag(t, attr, plib.stringify(content));
	}

DebuggingTag
	= tag_cfdump
	/ tag_cftimer
	/ tag_cftrace

tag_cftimer
	= gt t:str_cftimer attr:attr_cftimer_optional* lt
	content:(!(gt wack str_cftimer lt) anychar)*
	gt wack str_cftimer lt {
		return new cftag(t, attr, plib.stringify(content));
	}

tag_cftrace
	= gt t:str_cftrace attr:attr_cftrace_optional* lt
	content:(!(gt wack str_cftrace lt) anychar)*
	gt wack str_cftrace lt {
		return new cftag(t, attr, plib.stringify(content));
	}

//DisplayManagementTag
//	= tag_cfdiv
//	/ tag_cflayout
//	/ tag_cflayoutarea
//	/ tag_cfmap
//	/ tag_cfmapitem
//	/ tag_cfmediaplayer
//	/ tag_cfmenu
//	/ tag_cfmenuitem
//	/ tag_cfmessagebox
//	/ tag_cfpod
//	/ tag_cfprogressbar
//	/ tag_cftooltip
//	/ tag_cfwindow

ExceptionHandlingTag
	= tag_cfcatch
	/ tag_cferror
	/ tag_cffinally
	/ tag_cfrethrow
	/ tag_cfthrow
	/ tag_cftry

tag_cfcatch
	= gt t:str_cfcatch attr:attr_cfcatch_optional* lt 
	content:(!(gt wack str_cfcatch lt) anychar)*
	gt wack str_cfcatch lt {
		return new cftag(t, attr, plib.stringify(content));
	}

tag_cffinally
	= gt t:str_cffinally lt 
	content:(!(gt wack str_cffinally lt) anychar)*
	gt wack str_cffinally lt {
		return new cftag(t, [], plib.stringify(content));
	}

tag_cfrethrow
	= gt t:str_cfrethrow lt {
		return new cftag(t, [], '');
	}

tag_cfthrow
	= gt t:str_cfthrow lt {
		return new cftag(t, [], '');
	}

tag_cftry
	= gt t:str_cftry lt
	content:(!(gt wack str_cftry lt) anychar)*
	gt wack str_cftry lt {
		return new cftag(t, [], plib.stringify(content));
	}

//ExtensibilityTag
//	= tag_cfchart
//	/ tag_cfchartdata
//	/ tag_cfchartseries
//	/ tag_cfcollection
//	/ tag_cfcomponent
//	/ tag_cfexecute
//	/ tag_cfftp
//	/ tag_cffunction
//	/ tag_cfindex
//	/ tag_cfinterface
//	/ tag_cfinvoke
//	/ tag_cfinvokeargument
//	/ tag_cfobject
//	/ tag_cfproperty
//	/ tag_cfreport
//	/ tag_cfreportparam
//	/ tag_cfreturn
//	/ tag_cfsearch
//	/ tag_cfsharepoint
//	/ tag_cfspreadsheet
//	/ tag_cfwddx
//	/ tag_cfxml

//FileManagementTag
//	= tag_cfdirectory
//	/ tag_cffile
//	/ tag_cffileupload
//	/ tag_cfftp
//	/ tag_cfzip
//	/ tag_cfzipparam

//FlowControlTag
//	= tag_cfabort
//	/ tag_cfbreak
//	/ tag_cfcase
//	/ tag_cfcontinue
//	/ tag_cfdefaultcase
//	/ tag_cfelse
//	/ tag_cfelseif
//	/ tag_cfexecute
//	/ tag_cfexit
//	/ tag_cfif
//	/ tag_cfinclude
//	/ tag_cflocation
//	/ tag_cfloop
//	/ tag_cfrethrow
//	/ tag_cfswitch
//	/ tag_cfthrow
//	/ tag_cftry

//FormTag
//	= tag_cfapplet
//	/ tag_cfcalendar
//	/ tag_cffileupload
//	/ tag_cfform
//	/ tag_cfformgroup
//	/ tag_cfformitem
//	/ tag_cfgrid
//	/ tag_cfgridcolumn
//	/ tag_cfgridrow
//	/ tag_cfgridupdate
//	/ tag_cfinput
//	/ tag_cfpdf
//	/ tag_cfpdfform
//	/ tag_cfpdfformparam
//	/ tag_cfpdfparam
//	/ tag_cfpdfsubform
//	/ tag_cfselect
//	/ tag_cfslider
//	/ tag_cftextarea
//	/ tag_cftree
//	/ tag_cftreeitem

//InternetProtocolTag
//	= tag_cfajaximport
//	/ tag_cfajaxproxy
//	/ tag_cfftp
//	/ tag_cffeed
//	/ tag_cfimap
//	/ tag_cfhttp
//	/ tag_cfhttpparam
//	/ tag_cfldap
//	/ tag_cfmail
//	/ tag_cfmailparam
//	/ tag_cfmailpart
//	/ tag_cfpop
//	/ tag_cfsprydataset

//PageProcessingTag
//	= tag_cfcache
//	/ tag_cfcontent
//	/ tag_cfflush
//	/ tag_cfheader
//	/ tag_cfhtmlhead
//	/ tag_cfinclude
//	/ tag_cfprocessingdirective
//	/ tag_cfsetting
//	/ tag_cfsilent

//SecurityTag
//	= tag_cflogin
//	/ tag_cfloginuser
//	/ tag_cflogout
//	/ tag_cfNTauthenticate

VariableManipulationTags
	= tag_cfdump
	/ tag_cfcookie
	/ tag_cfparam
//	/ tag_cfregistry
	/ tag_cfsavecontent
//	/ tag_cfschedule
	/ tag_cfsetting

tag_cfdump
	= gt t:str_cfdump attr:(
		attr_cfdump_optional* attr_cfdump_required attr_cfdump_optional*
	) ws* wack? lt {
		return new cftag(t, plib.flatten(attr), '');
	}

tag_cfcookie
	= gt t:str_cfcookie attr:(
		attr_cfcookie_optional* attr_cfcookie_required attr_cfcookie_optional*
	) lt {
		var me = new cftag(t, plib.flatten(attr), '');
		if ( ( me.attributes.path && me.attributes.path !== "" ) && ( ! me.attributes.domain || me.attributes.domain === "" ) ) {
			throw new Error("Missing domain value, required with path attribute.");		
		}
		return me;
	}

tag_cfparam
	= gt t:str_cfparam attr:(
		attr_cfparam_optional* attr_cfparam_required attr_cfparam_optional*
	) lt {
		return new cftag(t, plib.flatten(attr), '');
	}

tag_cfsetting
	= gt t:str_cfsetting attr:attr_cfsetting_optional* lt {
		return new cftag(t, attr, '');
	}

tag_cfsavecontent
	= gt t:str_cfsavecontent attr:attr_cfsavecontent_required lt
	content:(!(gt wack str_cfsavecontent lt) anychar)*
	gt wack str_cfsavecontent lt {
		return new cftag(t, [attr], plib.stringify(content));
	}

//OtherTag
//	= tag_cfimage
//	/ tag_cflog
//	/ tag_cfregistry

// Tag Specific Value Defs
attr_name_required = ws+ n:str_name       eql v:value_any_non_whitespace { return { name: n, value: v }; }
attr_password      = ws+ n:str_password   eql v:value_any                { return { name: n, value: v }; }
attr_username      = ws+ n:str_username   eql v:value_any_non_whitespace { return { name: n, value: v }; }
attr_datasource    = ws+ n:str_datasource eql v:value_any_non_whitespace { return { name: n, value: v }; }
attr_var           = ws+ n:str_var eql v:value_cfval { return { name: n, value: v }; }

attr_cfapplication_required = attr_name_required
attr_cfapplication_optional
	= attr_datasource
	/ ws+ n:str_applicationtimeout       eql v:func_create_time_span      { return { name: 'timeout',                     value: plib.mkDate(v)     }; }
	/ ws+ n:str_clientmanagement         eql v:value_boolean              { return { name: 'client_variables',            value: v                  }; }
	/ ws+ n:str_clientstorage            eql v:value_cfapp_client_storage { return { name: 'client_storage',              value: v                  }; }
	/ ws+ n:str_setclientcookies         eql v:value_boolean              { return { name: 'client_cookies',              value: v                  }; }
	/ ws+ n:str_setdomaincookies         eql v:value_boolean              { return { name: 'domain_cookies',              value: v                  }; }
	/ ws+ n:str_loginstorage             eql v:value_cfapp_login_storage  { return { name: 'login_storage',               value: v                  }; }
	/ ws+ n:str_googlemapkey             eql v:value_any                  { return { name: 'google_map_key',              value: v                  }; }
	/ ws+ n:str_scriptprotect            eql v:value_cfapp_script_protect { return { name: 'script_protection',           value: v                  }; }
	/ ws+ n:str_serversideformvalidation eql v:value_boolean              { return { name: 'server_side_form_validation', value: v                  }; }
	/ ws+ n:str_sessionmanagement        eql v:value_boolean              { return { name: 'session_management',          value: v                  }; }
	/ ws+ n:str_sessiontimeout           eql v:func_create_time_span      { return { name: 'session_timeout',             value: plib.mkDate(v)     }; }
	/ ws+ n:str_securejson               eql v:value_boolean              { return { name: 'secure_json',                 value: v                  }; }
	/ ws+ n:str_securejsonprefix         eql v:value_any                  { return { name: 'secure_json_prefix',          value: v == "" ? "//" : v }; }

value_cfapp_login_storage
	=  quote_char  v:str_cookie   quote_char  {  return  v.toLowerCase();  }
	/  quote_char  v:str_session  quote_char  {  return  v.toLowerCase();  }
value_cfapp_script_protect 
	=  quote_char  v:str_none  quote_char  {  return  v.toLowerCase();  }
	/  quote_char  v:str_all   quote_char  {  return  v.toLowerCase();  }
	/  quote_char  v:str_list  quote_char  {  return  v.toLowerCase();  }
value_cfapp_client_storage 
	=  value_any
	/  quote_char  v:str_registry  quote_char  {  return  v.toLowerCase();  }
	/  quote_char  v:str_cookie    quote_char  {  return  v.toLowerCase();  }

attr_cfassoc_required = ws+ n:str_basetag        eql v:value_any_non_whitespace { return { name: 'base_tag', value: v }; }
attr_cfassoc_optional = ws+ n:str_datacollection eql v:value_any_non_whitespace { return { name: 'data_collection', value: v == "" ? "AssocAttribs" : v }; }

attr_cferr_required_type     = ws+ n:str_type eql v:value_cferr_type { return { name: n, value: v }; }
attr_cferr_required_template = ws+ n:str_template eql v:value_file_path { return { name: n, value: v }; }

attr_cferr_optional
	=  ws+  n:str_mail_to   eql v:value_email_address   { return { name:'mail_to',  value: v }; }
	/  ws+  n:str_exception eql v:value_cferr_exception { return { name: n,         value: v }; }

attr_cfimport_required
	= attr_cfimport_required_taglib attr_cfimport_required_prefix
	/ attr_cfimport_required_prefix attr_cfimport_required_taglib

attr_cfimport_required_taglib = ws+ n:str_taglib eql v:value_file_path { return { name: n, value: v }; }
attr_cfimport_required_prefix = ws+ n:str_prefix eql v:(value_any_non_whitespace / value_empty_quote ) { return { name: n, value: v }; }
//attr_cfimport_optional

//attr_cfcatch_required
attr_cfcatch_optional = ws+ n:str_type eql v:value_cferr_exception { return { name: n, value: v }; }

attr_cfcookie_required = attr_name_required
attr_cfcookie_optional
	= ws+ n:str_domain   eql quote_char v:( period domain ) quote_char {  return { name: n,           value: plib.stringify(v) }; }
	/ ws+ n:str_expires  eql v:value_cfcookie_expires                  {  return { name: n,           value: v                 }; }
	/ ws+ n:str_httponly eql v:value_boolean                           {  return { name: 'http_only', value: v                 }; }
	/ ws+ n:str_path     eql v:value_file_path                         {  return { name: n,           value: v                 }; }
	/ ws+ n:str_secure   eql v:value_boolean                           {  return { name: n,           value: v                 }; }
	/ ws+ n:str_value    eql v:value_any                               {  return { name: n,           value: v                 }; }

attr_cfdump_required = ws+ n:str_var eql v:value_cfval { return { name: n, value: v }; }
attr_cfdump_optional
	= ws+ n:str_abort    eql v:value_boolean                             { return { name: n, value: v }; }
	/ ws+ n:str_expand   eql v:value_boolean                             { return { name: n, value: v }; }
	/ ws+ n:str_format   eql v:value_cfdump_format                       { return { name: n, value: v }; }
	/ ws+ n:str_hide     eql v:( value_list / value_any_non_whitespace ) { return { name: n, value: v }; }
	/ ws+ n:str_keys     eql v:value_integer                             { return { name: n, value: v }; }
	/ ws+ n:str_label    eql v:value_any_non_whitespace                  { return { name: n, value: v }; }
	/ ws+ n:str_metainfo eql v:value_boolean                             { return { name: n, value: v }; }
	/ ws+ n:str_output   eql v:value_cfdump_output                       { return { name: n, value: v }; }
	/ ws+ n:str_show     eql v:( value_list / value_any_non_whitespace ) { return { name: n, value: v }; }
	/ ws+ n:str_showudfs eql v:value_boolean                             { return { name: 'show_udfs', value: v }; }
	/ ws+ n:str_top      eql v:value_integer                             { return { name: n, value: v }; }

attr_cfparam_required = attr_name_required
attr_cfparam_optional
	= ws+ n:str_default eql v:value_any          { return { name: n, value: v }; }
	/ ws+ n:str_max     eql v:value_integer      { return { name: n, value: v }; }
	/ ws+ n:str_min     eql v:value_integer      { return { name: n, value: v }; }
	/ ws+ n:str_pattern eql v:value_regex        { return { name: n, value: v }; }
	/ ws+ n:str_type    eql v:value_cfparam_type { return { name: n, value: v }; }

//attr_cfsetting_required
attr_cfsetting_optional
	= ws+ n:str_enable_cfouput_only eql v:value_boolean { return { name: 'enable_cfoutput_only', value: v }; }
	/ ws+ n:str_request_timeout     eql v:value_integer { return { name: 'request_timeout',      value: v }; }
	/ ws+ n:str_show_debug_output   eql v:value_boolean { return { name: 'show_debug_output',    value: v }; }

attr_cfsavecontent_required = ws+ n:str_variable eql v:value_any_non_whitespace { return { name: n, value: v }; }
//attr_cfsavecontent_optional

attr_cflog_required
	= ws+ n:str_text eql v:value_any { return { name: n, value: v}; }

attr_cflog_optional
	= ws+ n:str_application eql v:value_boolean    { return { name: n, value: v }; }
	/ ws+ n:str_file        eql v:value_any        { return { name: n, value: v }; }
	/ ws+ n:str_log         eql v:value_cflog_log  { return { name: n, value: v }; }
	/ ws+ n:str_type        eql v:value_cflog_type { return { name: n, value: v }; }

value_cflog_log
	= quote_char v:str_application quote_char { return v.toLowerCase(); }
	/ quote_char v:str_scheduler   quote_char { return v.toLowerCase(); }

value_cflog_type
	= quote_char v:"information" quote_char { return v.toLowerCase(); }
	/ quote_char v:"warning" quote_char     { return v.toLowerCase(); }
	/ quote_char v:"error" quote_char       { return v.toLowerCase(); }
	/ quote_char v:"fatal" quote_char       { return v.toLowerCase(); }

attr_cfflush_optional
	= ws+ n:str_interval eql v:value_integer { return { name: n, value: v }; }

attr_cfobjectcache_required = ws+ n:str_action eql quote_char v:"clear" quote_char { return { name: n, value: v }; }
//attr_cfobjectcache_optional

attr_cfinsert_required_datasource = attr_datasource
attr_cfinsert_required_table_name = ws+ n:str_table_name eql v:value_any { return { name: 'table_name', value: v }; }

attr_cfinsert_optional
	= ws+ n:str_form_fields     eql v:value_list { return { name: 'form_fields', value: v }; }
	/ attr_password
	/ ws+ n:str_table_owner     eql v:value_any  { return { name: 'table_owner', value: v }; }
	/ ws+ n:str_table_qualifier eql v:value_any  { return { name: 'table_qualifier', value: v }; }
	/ attr_username

attr_cfoutput_optional
	= ws+ n:str_group_case_sensitive eql v:value_boolean { return { name: 'group_case_sensitive', value: v }; }
	/ ws+ n:str_group                eql v:value_any     { return { name: n,                      value: v }; }
	/ ws+ n:str_maxrows              eql v:value_integer { return { name: 'max_rows',             value: v }; }
	/ ws+ n:str_query                eql v:value_any     { return { name: n.toLowerCase(),        value: v }; }
	/ ws+ n:str_startrow             eql v:value_integer { return { name: 'start_row',            value: v }; }

//attr_cftimer_required
attr_cftimer_optional
	= ws+ n:str_label eql v:value_any           { return { name: n, value: v }; }
	/ ws+ n:str_type  eql v:value_cftimer_type  { return { name: n, value: v }; }

value_cftimer_type
	= quote_char v:"inline"  quote_char { return v.toLowerCase(); }
	/ quote_char v:"outline" quote_char { return v.toLowerCase(); }
	/ quote_char v:"comment" quote_char { return v.toLowerCase(); }
	/ quote_char v:"debug"   quote_char { return v.toLowerCase(); }
	
//attr_cftrace_required
attr_cftrace_optional
	= ws+ n:str_abort    eql v:value_boolean      { return { name: n, value: v }; }
	/ ws+ n:str_category eql v:value_any          { return { name: n, value: v }; }
	/ ws+ n:str_inline   eql v:value_boolean      { return { name: n, value: v }; }
	/ ws+ n:str_text     eql v:value_any          { return { name: n, value: v }; }
	/ ws+ n:str_var      eql v:value_any          { return { name: n, value: v }; }
	/ ws+ n:str_type     eql v:value_cftrace_type { return { name: n, value: v }; }

value_cftrace_type
	= quote_char v:"information"       quote_char { return v.toLowerCase(); }
	/ quote_char v:"warning"           quote_char { return v.toLowerCase(); }
	/ quote_char v:"error"             quote_char { return v.toLowerCase(); }
	/ quote_char v:"fatal information" quote_char { return v.toLowerCase(); }

attr_cfdbinfo_required_name = attr_name_required
attr_cfdbinfo_required_type = ws+ n:str_type     eql v:value_cfdbinfo_type { return { name: n, value: v }; }
value_cfdbinfo_type
	= quote_char v:"dbnames"     quote_char  { return v.toLowerCase(); }
	/ quote_char v:"tables"      quote_char  { return v.toLowerCase(); }
	/ quote_char v:"columns"     quote_char  { return v.toLowerCase(); }
	/ quote_char v:"procedures"  quote_char  { return v.toLowerCase(); }
	/ quote_char v:"foreignkeys" quote_char  { return v.toLowerCase(); }
	/ quote_char v:"index"       quote_char  { return v.toLowerCase(); }

attr_cfdbinfo_optional
	= attr_datasource
	/ ws+ n:str_dbname     eql v:value_any { return { name: n, value: v }; }
	/ ws+ n:str_password   eql v:value_any { return { name: n, value: v }; }
	/ ws+ n:str_pattern    eql v:value_any { return { name: n, value: v }; }
	/ attr_username
	/ ws+ n:str_table      eql v:value_any { return { name: n, value: v }; }

//attr_cftransaction_required
attr_cftransaction_optional
	= ws+ n:str_action    eql v:value_cftransaction_action    { return { name: n, value: v }; }
	/ ws+ n:str_isolation eql v:value_cftransaction_isolation { return { name: n, value: v }; }
	/ ws+ n:str_savepoint eql v:value_any                     { return { name: n, value: v }; }
	/ ws+ n:str_nested    eql v:value_boolean                 { return { name: n, value: v }; }

value_cftransaction_action
	= quote_char v:"begin"        quote_char { return v; }
	/ quote_char v:"commit"       quote_char { return v; }
	/ quote_char v:"rollback"     quote_char { return v; }
	/ quote_char v:"setsavepoint" quote_char { return v; }
	
value_cftransaction_isolation
	= quote_char v:"read_uncommited" quote_char { return v; }
	/ quote_char v:"read_commited"   quote_char { return v; }
	/ quote_char v:"repeatable_read" quote_char { return v; }
	/ quote_char v:"serializable"    quote_char { return v; }
	
attr_cfupdate_required_datasource = attr_datasource
attr_cfupdate_required_table_name = ws+ n:str_table_name eql v:value_any { return { name: 'table_name', value: v }; }

attr_cfupdate_optional
	= ws+ n:str_form_fields     eql v:value_list { return { name: 'form_fields', value: v }; }
	/ attr_password
	/ ws+ n:str_table_owner     eql v:value_any  { return { name: 'table_owner', value: v }; }
	/ ws+ n:str_table_qualifier eql v:value_any  { return { name: 'table_qualifier', value: v }; }
	/ attr_username

attr_cfquery_required = attr_name_required
attr_cfquery_optional
	= ws+ n:str_blockfactor   eql v:value_integer               { return { name: 'block_factor',  value: v }; }
	/ ws+ n:str_cachedafter   eql v:func_create_time_span       { return { name: 'cached_after',  value: v }; }
	/ ws+ n:str_cachedwithin  eql v:func_create_time_span       { return { name: 'cached_within', value: v }; }
	/ attr_datasource
	/ ws+ n:str_dbtype        eql quote_char v:"hql" quote_char { return { name: n,               value: v }; }
	/ ws+ n:str_debug         eql v:value_boolean               { return { name: n,               value: v }; }
	/ ws+ n:str_maxrows       eql v:value_integer               { return { name: 'max_rows',      value: v }; }
	/ ws+ n:str_ormoptions    eql v:value_any                   { return { name: n,               value: v }; }
	/ attr_password
	/ ws+ n:str_result        eql v:value_any                   { return { name: n,               value: v }; }
	/ ws+ n:str_timeout       eql v:value_integer               { return { name: n,               value: v }; }
	/ attr_username

attr_cfqueryparam_required
	= ws+ n:str_value eql v:value_cfval { return { name: n, value: v }; }
attr_cfqueryparam_optional
	= ws+ n:str_cfsql_type eql v:value_cfqueryparam_type { return { name: 'cf_sql_type', value: v }; }
	/ ws+ n:str_list       eql v:value_boolean           { return { name: n, value: v }; }
	/ ws+ n:str_maxlength  eql v:value_integer           { return { name: 'max_length', value: v }; }
	/ ws+ n:str_null       eql v:value_boolean           { return { name: n, value: v }; }
	/ ws+ n:str_scale      eql v:value_integer           { return { name: n, value: v }; }
	/ ws+ n:str_separator  eql v:value_any               { return { name: n, value: v }; }

value_cfqueryparam_type
	= quote_char v:"CF_SQL_CHAR"        quote_char { return v; }
	/ quote_char v:"CF_SQL_BIGINT"      quote_char { return v; }
    / quote_char v:"CF_SQL_BIT"         quote_char { return v; }
    / quote_char v:"CF_SQL_CHAR"        quote_char { return v; }
    / quote_char v:"CF_SQL_BLOB"        quote_char { return v; }
    / quote_char v:"CF_SQL_CLOB"        quote_char { return v; }
    / quote_char v:"CF_SQL_DATE"        quote_char { return v; }
    / quote_char v:"CF_SQL_DECIMAL"     quote_char { return v; }
    / quote_char v:"CF_SQL_DOUBLE"      quote_char { return v; }
    / quote_char v:"CF_SQL_FLOAT"       quote_char { return v; }
    / quote_char v:"CF_SQL_IDSTAMP"     quote_char { return v; }
    / quote_char v:"CF_SQL_INTEGER"     quote_char { return v; }
    / quote_char v:"CF_SQL_LONGVARCHAR" quote_char { return v; }
    / quote_char v:"CF_SQL_MONEY"       quote_char { return v; }
    / quote_char v:"CF_SQL_MONEY4"      quote_char { return v; }
    / quote_char v:"CF_SQL_NUMERIC"     quote_char { return v; }
    / quote_char v:"CF_SQL_REAL"        quote_char { return v; }
    / quote_char v:"CF_SQL_REFCURSOR"   quote_char { return v; }
    / quote_char v:"CF_SQL_SMALLINT"    quote_char { return v; }
    / quote_char v:"CF_SQL_TIME"        quote_char { return v; }
    / quote_char v:"CF_SQL_TIMESTAMP"   quote_char { return v; }
    / quote_char v:"CF_SQL_TINYINT"     quote_char { return v; }
    / quote_char v:"CF_SQL_VARCHAR"     quote_char { return v; }
// Value Definitions

value_regex
	= quote_char v:str_any_non_quote+ quote_char { return new RegExp(plib.stringify(v)); }

value_cfparam_type
	= quote_char v:str_any quote_char                    { return v.toLowerCase(); }
	/ quote_char v:str_array quote_char                  { return v.toLowerCase(); }
	/ quote_char v:str_binary quote_char                 { return v.toLowerCase(); }
	/ quote_char v:str_boolean quote_char                { return v.toLowerCase(); }
    / quote_char v:str_country_code quote_char           { return v.toLowerCase(); }
	/ quote_char v:str_creditcard quote_char             { return v.toLowerCase(); }
	/ quote_char v:str_date quote_char                   { return v.toLowerCase(); }
	/ quote_char v:str_email quote_char                  { return v.toLowerCase(); }
	/ quote_char v:str_float quote_char                  { return v.toLowerCase(); }
	/ quote_char v:str_guid quote_char                   { return v.toLowerCase(); }
	/ quote_char v:str_integer quote_char                { return v.toLowerCase(); }
    / quote_char v:str_ip quote_char                     { return v.toLowerCase(); }
    / quote_char v:str_json quote_char                   { return v.toLowerCase(); }
	/ quote_char v:str_numeric quote_char                { return v.toLowerCase(); }
	/ quote_char v:str_query quote_char                  { return v.toLowerCase(); }
	/ quote_char v:str_range quote_char                  { return v.toLowerCase(); }
	/ quote_char v:str_regex quote_char                  { return v.toLowerCase(); }
	/ quote_char v:str_regular_expression quote_char     { return v.toLowerCase(); }
	/ quote_char v:str_social_security_number quote_char { return v.toLowerCase(); }
	/ quote_char v:str_ssn quote_char                    { return v.toLowerCase(); }
	/ quote_char v:str_string quote_char                 { return v.toLowerCase(); }
	/ quote_char v:str_struct quote_char                 { return v.toLowerCase(); }
	/ quote_char v:str_telephone quote_char              { return v.toLowerCase(); }
	/ quote_char v:str_time quote_char                   { return v.toLowerCase(); }
	/ quote_char v:str_url quote_char                    { return v.toLowerCase(); }
	/ quote_char v:str_uuid quote_char                   { return v.toLowerCase(); }
	/ quote_char v:str_variable_name quote_char          { return v.toLowerCase(); }
	/ quote_char v:str_xml quote_char                    { return v.toLowerCase(); }
	/ quote_char v:str_zip quote_char                    { return v.toLowerCase(); }
	/ quote_char v:str_zipcode quote_char                { return v.toLowerCase(); }

//attr_cfimp_optional
value_cfcookie_expires
	= quote_char v:'never' quote_char   {
		return new Date();
		//human_date('30 years');
	}
	/ quote_char v:'now' quote_char     { return new Date(); }
	/ quote_char v:date_time quote_char { return v; }
	/ quote_char v:date quote_char      { return v; }
	/ v:value_integer                   { return v; }

value_cfdump_output
	= quote_char v:"browser" quote_char { return v; }
	/ quote_char v:"console" quote_char { return v; }
	/ quote_char v:str_file    quote_char { return v; }
value_cfdump_format
	= quote_char v:str_text quote_char { return v; }
	/ quote_char v:str_html quote_char { return v; }

value_cferr_type
	= quote_char v:"exception"  quote_char { return v.toLowerCase(); }
	/ quote_char v:"validation" quote_char { return v.toLowerCase(); }
	/ quote_char v:"request"    quote_char { return v.toLowerCase(); }
value_cferr_exception
	= quote_char n:str_application  quote_char { return n.toLowerCase(); }
	/ quote_char n:"database"       quote_char { return n.toLowerCase(); }
	/ quote_char n:"template"       quote_char { return n.toLowerCase(); }
	/ quote_char n:"security"       quote_char { return n.toLowerCase(); }
	/ quote_char n:"object"         quote_char { return n.toLowerCase(); }
	/ quote_char n:"missingInclude" quote_char { return n.toLowerCase(); }
	/ quote_char n:"expression"     quote_char { return n.toLowerCase(); }
	/ quote_char n:"lock"           quote_char { return n.toLowerCase(); }
	/ quote_char n:"custom_type"    quote_char { return n.toLowerCase(); }
	/ quote_char n:str_any          quote_char { return n.toLowerCase(); }

// any case strings
str_abort                    = v:(a b o r t)                                         { return plib.stringify(v, 'lower'); }
str_action                   = v:(a c t i o n)                                       { return plib.stringify(v, 'lower'); }
str_all                      = v:(a l l)                                             { return plib.stringify(v); }
str_any                      = v:(a n y)                                             { return plib.stringify(v); }
str_application              = v:(a p p l i c a t i o n)                             { return plib.stringify(v); }
str_applicationtimeout       = v:(a p p l i c a t i o n t i m e o u t)               { return plib.stringify(v, 'lower'); }
str_array                    = v:(a r r a y)                                         { return plib.stringify(v); }
str_basetag                  = v:(b a s e t a g)                                     { return plib.stringify(v, 'under'); }
str_binary                   = v:(b i n a r y)                                       { return plib.stringify(v); }
str_blockfactor              = v:(b l o c k f a c t o r)                             { return plib.stringify(v); }
str_boolean                  = v:(b o o l e a n)                                     { return plib.stringify(v); }
str_cachedafter              = v:(c a c h e d a f t e r)                             { return plib.stringify(v, 'lower'); }
str_cachedwithin             = v:(c a c h e d w i t h i n)                           { return plib.stringify(v, 'lower'); }
str_category                 = v:(c a t e g o r y)                                   { return plib.stringify(v, 'lower'); }

str_cfapplication            = v:(c f a p p l i c a t i o n)                         { return plib.stringify(v, 'lower'); }
str_cfassociate              = v:(c f a s s o c i a t e)                             { return plib.stringify(v, 'lower'); }
str_cfcatch                  = v:(c f c a t c h)                                     { return plib.stringify(v, 'lower'); }
str_cfcookie                 = v:(c f c o o k i e)                                   { return plib.stringify(v, 'lower'); }
str_cfdbinfo                 = v:(c f d b i n f o)                                   { return plib.stringify(v, 'lower'); }
str_cfdump                   = v:(c f d u m p)                                       { return plib.stringify(v, 'lower'); }
str_cferror                  = v:(c f e r r o r)                                     { return plib.stringify(v, 'lower'); }
str_cffinally                = v:(c f f i n a l l y)                                 { return plib.stringify(v, 'lower'); }
str_cfflush                  = v:(c f f l u s h)                                     { return plib.stringify(v, 'lower'); }
str_cfinsert                 = v:(c f i n s e r t)                                   { return plib.stringify(v, 'lower'); }
str_cfimport                 = v:(c f i m p o r t)                                   { return plib.stringify(v, 'lower'); }
str_cflog                    = v:(c f l o g)                                         { return plib.stringify(v, 'lower'); }
str_cfoutput                 = v:(c f o u t p u t)                                   { return plib.stringify(v, 'lower'); }
str_cfobjectcache            = v:(c f o b j e c t c a c h e)                         { return plib.stringify(v, 'lower'); }
str_cfparam                  = v:(c f p a r a m)                                     { return plib.stringify(v, 'lower'); }
str_cfquery                  = v:(c f q u e r y)                                     { return plib.stringify(v, 'lower'); }
str_cfqueryparam             = v:(c f q u e r y p a r a m)                           { return plib.stringify(v, 'lower'); }
str_cfrethrow                = v:(c f r e t h r o w)                                 { return plib.stringify(v, 'lower'); }
str_cfsavecontent            = v:(c f s a v e c o n t e n t)                         { return plib.stringify(v, 'lower'); }
str_cfsetting                = v:(c f s e t t i n g)                                 { return plib.stringify(v, 'lower'); }
str_cfsql_type               = v:(c f s q l t y p e)                                 { return plib.stringify(v, 'lower'); }
str_cftimer                  = v:(c f t i m e r)                                     { return plib.stringify(v, 'lower'); }
str_cftrace                  = v:(c f t r a c e)                                     { return plib.stringify(v, 'lower'); }
str_cftransaction            = v:(c f t r a n s a c t i o n)                         { return plib.stringify(v, 'lower'); }
str_cfthrow                  = v:(c f t h r o w)                                     { return plib.stringify(v, 'lower'); }
str_cftry                    = v:(c f t r y)                                         { return plib.stringify(v, 'lower'); }
str_cfupdate                 = v:(c f u p d a t e)                                   { return plib.stringify(v, 'lower'); }

str_clientmanagement         = v:(c l i e n t m a n a g e m e n t)                   { return plib.stringify(v, 'lower'); }
str_clientstorage            = v:(c l i e n t s t o r a g e)                         { return plib.stringify(v, 'lower'); }
str_cookie                   = v:(c o o k i e)                                       { return plib.stringify(v); }
str_country_code             = v:(c o u n t r y ub? c o d e)                         { return plib.stringify(v); }
str_creditcard               = v:(c r e d i t ub? c a r d)                           { return plib.stringify(v); }
str_datacollection           = v:(d a t a c o l l e c t i o n)                       { return plib.stringify(v, 'lower'); }
str_datasource               = v:(d a t a s o u r c e)                               { return plib.stringify(v, 'lower'); }
str_date                     = v:(d a t e)                                           { return plib.stringify(v); }
str_debug                    = v:(d e b u g)                                         { return plib.stringify(v, 'lower'); }
str_default                  = v:(d e f a u l t)                                     { return plib.stringify(v, 'lower'); }
str_dbname                   = v:(d b n a m e)                                       { return plib.stringify(v, 'lower'); }
str_dbtype                   = v:(d b t y p e)                                       { return plib.stringify(v, 'lower'); }
str_domain                   = v:(d o m a i n)                                       { return plib.stringify(v, 'lower'); }
str_email                    = v:(e m a i l)                                         { return plib.stringify(v); }
str_enable_cfouput_only      = v:(e n a b l e ub? c f o u t p u t ub? o n l y)       { return plib.stringify(v, 'lower'); }
str_exception                = v:(e x c e p t i o n)                                 { return plib.stringify(v, 'lower'); }
str_expand                   = v:(e x p a n d)                                       { return plib.stringify(v, 'lower'); }
str_expires                  = v:(e x p i r e s)                                     { return plib.stringify(v, 'lower'); }
str_file                     = v:(f i l e)                                           { return plib.stringify(v, 'lower'); }
str_float                    = v:(f l o a t)                                         { return plib.stringify(v); }
str_form_fields              = v:(f o r m f i e l d s)                               { return plib.stringify(v); }
str_format                   = v:(f o r m a t)                                       { return plib.stringify(v, 'lower'); }
str_group                    = v:(g r o u p)                                         { return plib.stringify(v, 'lower'); }
str_group_case_sensitive     = v:(g r o u p c a s e s e n s i t i v e)               { return plib.stringify(v, 'lower'); }
str_googlemapkey             = v:(g o o g l e m a p k e y)                           { return plib.stringify(v, 'lower'); }
str_guid                     = v:(g u i d)                                           { return plib.stringify(v); }
str_hide                     = v:(h i d e)                                           { return plib.stringify(v, 'lower'); }
str_html                     = v:(h t m l)                                           { return plib.stringify(v); }
str_httponly                 = v:(h t t p o n l y)                                   { return plib.stringify(v, 'lower'); }
str_inline                   = v:(i n l i n e)                                       { return plib.stringify(v, 'lower'); }
str_integer                  = v:(i n t e g e r)                                     { return plib.stringify(v); }
str_interval                 = v:(i n t e r v a l)                                   { return plib.stringify(v, 'lower'); }
str_ip                       = v:(i p)                                               { return plib.stringify(v); }
str_keys                     = v:(k e y s)                                           { return plib.stringify(v, 'lower'); }
str_isolation                = v:(i s o l a t i o n)                                 { return plib.stringify(v, 'lower'); }
str_json                     = v:(j s o n)                                           { return plib.stringify(v); }
str_label                    = v:(l a b e l)                                         { return plib.stringify(v, 'lower'); }
str_list                     = v:(l i s t)                                           { return plib.stringify(v, 'lower'); }
str_log                      = v:(l o g)                                             { return plib.stringify(v, 'lower'); }
str_loginstorage             = v:(l o g i n s t o r a g e)                           { return plib.stringify(v, 'lower'); }
str_mail_to                  = v:(m a i l ub? t o)                                   { return plib.stringify(v, 'lower'); }
str_maxlength                = v:(m a x l e n g t h)                                 { return plib.stringify(v, 'lower'); }
str_maxrows                  = v:(m a x r o w s)                                     { return plib.stringify(v, 'lower'); }
str_max                      = v:(m a x)                                             { return plib.stringify(v, 'lower'); }
str_metainfo                 = v:(m e t a i n f o)                                   { return plib.stringify(v, 'lower'); }
str_min                      = v:(m i n)                                             { return plib.stringify(v, 'lower'); }
str_name                     = v:(n a m e)                                           { return plib.stringify(v, 'lower'); }
str_nested                   = v:(n e s t e d)                                       { return plib.stringify(v, 'lower'); }
str_none                     = v:(n o n e)                                           { return plib.stringify(v); }
str_null                     = v:(n u l l)                                           { return plib.stringify(v, 'lower'); }
str_numeric                  = v:(n u m e r i c)                                     { return plib.stringify(v); }
str_ormoptions               = v:(o r m o p t i o n s)                               { return plib.stringify(v, 'lower'); }
str_output                   = v:(o u t p u t)                                       { return plib.stringify(v, 'lower'); }
str_password                 = v:(p a s s w o r d)                                   { return plib.stringify(v, 'lower'); }
str_path                     = v:(p a t h)                                           { return plib.stringify(v, 'lower'); }
str_pattern                  = v:(p a t t e r n)                                     { return plib.stringify(v, 'lower'); }
str_prefix                   = v:(p r e f i x)                                       { return plib.stringify(v, 'lower'); }
str_query                    = v:(q u e r y)                                         { return plib.stringify(v); }
str_range                    = v:(r a n g e s)                                       { return plib.stringify(v); }
str_result                   = v:(r e s u l t)                                       { return plib.stringify(v, 'lower'); }
str_regex                    = v:(r e g e x)                                         { return plib.stringify(v); }
str_registry                 = v:(r e g i s t r y)                                   { return plib.stringify(v); }
str_regular_expression       = v:(r e g u l a r ub? e x p r e s s i o n)             { return plib.stringify(v); }
str_request_timeout          = v:(r e q u e s t ub? t i m e o u t)                   { return plib.stringify(v, 'lower'); }
str_savepoint                = v:(s a v e p o i n t)                                 { return plib.stringify(v, 'lower'); }
str_scale                    = v:(s c a l e)                                         { return plib.stringify(v, 'lower'); }
str_scheduler                = v:(s c h e d u l e r)                                 { return plib.stringify(v, 'lower'); }
str_scriptprotect            = v:(s c r i p t p r o t e c t)                         { return plib.stringify(v, 'lower'); }
str_securejson               = v:(s e c u r e j s o n)                               { return plib.stringify(v, 'lower'); }
str_securejsonprefix         = v:(s e c u r e j s o n p r e f i x)                   { return plib.stringify(v, 'lower'); }
str_secure                   = v:(s e c u r e)                                       { return plib.stringify(v, 'lower'); }
str_serversideformvalidation = v:(s e r v e r s i d e f o r m v a l i d a t i o n)   { return plib.stringify(v, 'lower'); }
str_separator                = v:(s e p a r a t o r)                                 { return plib.stringify(v, 'lower'); }
str_session                  = v:(s e s s i o n)                                     { return plib.stringify(v); }
str_sessionmanagement        = v:(s e s s i o n m a n a g e m e n t)                 { return plib.stringify(v, 'lower'); }
str_sessiontimeout           = v:(s e s s i o n t i m e o u t)                       { return plib.stringify(v, 'lower'); }
str_setclientcookies         = v:(s e t c l i e n t c o o k i e s)                   { return plib.stringify(v, 'lower'); }
str_setdomaincookies         = v:(s e t d o m a i n c o o k i e s)                   { return plib.stringify(v, 'lower'); }
str_show_debug_output        = v:(s h o w ub? d e b u g ub? o u t p u t)             { return plib.stringify(v, 'lower'); }
str_showudfs                 = v:(s h o w u d f s)                                   { return plib.stringify(v, 'lower'); }
str_show                     = v:(s h o w)                                           { return plib.stringify(v, 'lower'); }
str_social_security_number   = v:(s o c i a l ub? s e c u r i t y ub? n u m b e r)   { return plib.stringify(v); }
str_ssn                      = v:(s s n)                                             { return plib.stringify(v); }
str_startrow                 = v:(s t a r t r o w)                                   { return plib.stringify(v, 'under'); }
str_string                   = v:(s t r i n g)                                       { return plib.stringify(v); }
str_struct                   = v:(s t r u c t)                                       { return plib.stringify(v); }
str_table                    = v:(t a b l e)                                         { return plib.stringify(v, 'lower'); }
str_table_name               = v:(t a b l e n a m e)                                 { return plib.stringify(v, 'lower'); }
str_table_owner              = v:(t a b l e o w n e r)                               { return plib.stringify(v, 'under'); }
str_table_qualifier          = v:(t a b l e q u a l i f i e r)                       { return plib.stringify(v, 'under'); }
str_taglib                   = v:(t a g l i b)                                       { return plib.stringify(v, 'lower'); }
str_telephone                = v:(t e l e p h o n e)                                 { return plib.stringify(v); }
str_template                 = v:(t e m p l a t e)                                   { return plib.stringify(v, 'lower'); }
str_text                     = v:(t e x t)                                           { return plib.stringify(v, 'lower'); }
str_time                     = v:(t i m e)                                           { return plib.stringify(v); }
str_timeout                  = v:(t i m e o u t)                                     { return plib.stringify(v, 'lower'); }
str_top                      = v:(t o p)                                             { return plib.stringify(v, 'lower'); }
str_type                     = v:(t y p e)                                           { return plib.stringify(v, 'lower'); }
str_url                      = v:(u r l)                                             { return plib.stringify(v); }
str_username                 = v:(u s e r n a m e)                                   { return plib.stringify(v, 'lower'); }
str_uuid                     = v:(u u i d)                                           { return plib.stringify(v); }
str_value                    = v:(v a l u e)                                         { return plib.stringify(v, 'lower'); }
str_var                      = v:(v a r)                                             { return plib.stringify(v, 'lower'); }
str_variable_name            = v:(v a r i a b l e ub? n a m e)                       { return plib.stringify(v); }
str_variable                 = v:(v a r i a b l e)                                   { return plib.stringify(v, 'lower'); }
str_xml                      = v:(x m l)                                             { return plib.stringify(v); }
str_zip                      = v:(z i p)                                             { return plib.stringify(v); }
str_zipcode                  = v:(z i p ub? c o d e)                                 { return plib.stringify(v); }
// end any case strings

// Common Generic Value Definitions
value_file_path     = quote_char v:(wack (value_dir wack)* value_dir) quote_char { return plib.stringify(v); }
value_dir           = v:(!(wack / ws / quote_char) .)*                           { return plib.stringify(v); }
value_email_address = quote_char e:email quote_char                              { return e; }
email               = n:(!(quote_char / ws / at) anychar)+ at:at d:domain        { return plib.stringify(n) + at + d; }

date_time = v:( date space time ) { return new Date(v); }
date = v:(integer integer integer integer '-' integer integer? '-' integer integer? ) { return new Date(plib.stringify(v) + ' 00:00:00'); }
time 
	= hr:([01] integer / '2' [0123] ) ':' 
	min:( [0-5] integer ) ':' 
	sec:( [0-5] integer )
	mill:( period integer integer integer integer )? { return new Date(hr + min + sec + mill); }

value_boolean
	= quote_char v:boolean quote_char { return v; }
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
value_domain = quote_char v:domain quote_char { return v; }
domain = v:( ( dom_part+ period )+ dom_part+ ) { return plib.stringify(v); }
dom_part = ( lcchars / ub lcchars )+ ( '-' lcchars / lcchars )*

// Generic Generic Value Defs
value_any_non_whitespace = quote_char v:( ( chars+ [\-_] )* chars )* quote_char { return plib.stringify(v); }

// @TODO: allow escaped quotes inside quoted strings
value_any 
	= quote_char v:(!quote_char anychar)+ quote_char { return plib.stringify(v); }
//value_any 
//	= quote_char v:( ( '\\' quote_char ) /  anychar )+ quote_char { return plib.stringify(v); }
str_any_non_quote 
	= v:(!quote_char anychar)+ { return plib.stringify(v); }
value_empty_quote 
	= quote_char quote_char { return ""; }
value_integer 
	= quote_char v:integer+ quote_char { return parseInt(plib.stringify(v)); }

ops = e q / n e q / l t /  l e / g t / g e / i s / n o t

func_create_time_span
	= value_empty_quote
	/ quote_char? v:create_time_span_func quote_char? { return v; }

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

chars = ucchars / lcchars
ucchars = [A-Z0-9]
lcchars = [a-z]
ub = '_'
underbar = ub
at = '@'
pound = '#'
ws = space / "\t" / "\n"
gt = '<'
lt = '>'
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

