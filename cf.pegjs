{

	var util = require('util'),
		plib = require('./lib/parselib'),
		cftaglib = require('./lib/cftag'),
		cftag = cftaglib.cftag,
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
//	/ ExceptionHandlingTag
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
	= gt t:str_cfapplication attr:( attr_cfapplication_optional* attr_cfapplication_required attr_cfapplication_optional* ) ws* lt anychar* {
		return new cftag(t, attr.flatten(), '');
	}

tag_cfassociate
	= gt t:str_cfassociate attr:( attr_cfassoc_required attr_cfassoc_optional* / attr_cfassoc_optional* attr_cfassoc_required ) lt {
		return new cftag(t, attr.flatten(), '');
	}

tag_cferror
	= gt t:str_cferror attr:(
			attr_cferr_optional* attr_cferr_required_template attr_cferr_optional* attr_cferr_required_type attr_cferr_optional*
			/ attr_cferr_optional* attr_cferr_required_type attr_cferr_optional* attr_cferr_required_template attr_cferr_optional*
		) lt {
		return new cftag(t, attr.flatten(), '');
	}

tag_cfimport
	= gt t:"cfimport" attr:attr_cfimport_required lt {
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
//	/ tag_cfinsert
//	/ tag_cfobjectcache
//	/ tag_cfprocparam
//	/ tag_cfprocresult
//	/ tag_cfquery
	/ tag_cfqueryparam
//	/ tag_cfstoredproc
	/ tag_cftransaction
//	/ tag_cfupdate

tag_cfdbinfo
	= gt t:str_cfdbinfo attr:( 
			attr_cfdbinfo_optional* attr_cfdbinfo_required_name attr_cfdbinfo_optional* attr_cfdbinfo_required_type attr_cfdbinfo_optional*
			/ attr_cfdbinfo_optional* attr_cfdbinfo_required_type attr_cfdbinfo_optional* attr_cfdbinfo_required_name attr_cfdbinfo_optional*
	) lt {
		var me = new cftag(t, attr.flatten(), '');
		types_requiring_table_value = ['columns', 'foreignkeys', 'index'];
		if ( ( me.attributes.type && types_requiring_table_value.indexOf(me.attributes.type) > -1 ) && ( ! me.attributes.table || me.attributes.table === "" ) ) {
			throw new Error(util.format("Missing table value, required with type attribute specified as one of %a.", types_requiring_table_value));		
		}
		return me;
	}


tag_cfqueryparam
	= gt t:str_cfqueryparam attr:(
		attr_cfqueryparam_optional* attr_cfqueryparam_required attr_cfqueryparam_optional* 
	) lt {
		return new cftag(t, attr.flatten(), '');
	}

tag_cftransaction
	= gt t:str_cftransaction attr:attr_cftransaction_optional* lt
	content:(!(gt wack str_cftransaction lt) anychar)*
	gt wack str_cftransaction lt {
		return new cftag(t, attr, plib.flatten(content));
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
		return new cftag(t, attr.flatten(), '');
	}

tag_cfoutput
	= gt t:"cfoutput" attr:attr_cfoutput_optional* lt
	content:(!(gt wack "cfoutput" lt) anychar)*
	gt wack "cfoutput" lt {
		return new cftag(t, attr, plib.flatten(content));
	}

DebuggingTag
	= tag_cfdump
	/ tag_cftimer
	/ tag_cftrace

tag_cftimer
	= gt t:str_cftimer attr:attr_cftimer_optional* lt
	content:(!(gt wack str_cftimer lt) anychar)*
	gt wack str_cftimer lt {
		return new cftag(t, attr, plib.flatten(content));
	}

tag_cftrace
	= gt t:str_cftrace attr:attr_cftrace_optional* lt
	content:(!(gt wack str_cftrace lt) anychar)*
	gt wack str_cftrace lt {
		return new cftag(t, attr, plib.flatten(content));
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

//ExceptionHandlingTag
//	= tag_cfcatch
//	/ tag_cferror
//	/ tag_cffinally
//	/ tag_cfrethrow
//	/ tag_cfthrow
//	/ tag_cftry

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
	= gt t:str_cfdump attr:(attr_cfdump_optional* attr_cfdump_required attr_cfdump_optional*) lt {
		return new cftag(t, attr.flatten(), '');
	}

tag_cfcookie
	= gt t:str_cfcookie attr:(
		attr_cfcookie_optional* attr_cfcookie_required attr_cfcookie_optional*
	) lt {
		var me = new cftag(t, attr.flatten(), '');
		if ( ( me.attributes.path && me.attributes.path !== "" ) && ( ! me.attributes.domain || me.attributes.domain === "" ) ) {
			throw new Error("Missing domain value, required with path attribute.");		
		}
		return me;
	}

tag_cfparam
	= gt t:str_cfparam attr:(
		attr_cfparam_optional* attr_cfparam_required attr_cfparam_optional*
	) lt {
		return new cftag(t, attr.flatten(), '');
	}

tag_cfsetting
	= gt t:"cfsetting" attr:attr_cfsetting_optional* lt {
		return new cftag(t, attr, '');
	}

tag_cfsavecontent
	= gt t:"cfsavecontent" attr:attr_cfsavecontent_required lt
	content:(!(gt wack "cfsavecontent" lt) anychar)*
	gt wack "cfsavecontent" lt {
		return new cftag(t, [attr], plib.flatten(content));
	}

//OtherTag
//	= tag_cfimage
//	/ tag_cflog
//	/ tag_cfregistry

// Tag Specific Value Defs
attr_name_required
    = ws+ n:str_name eql v:value_any_non_whitespace { return { name: n, value: v }; }

attr_cfapplication_required = attr_name_required
attr_cfapplication_optional
	= ws+ n:str_datasource               eql v:value_any                          { return { name: n,                             value: v                  }; }
	/ ws+ n:str_applicationtimeout       eql v:func_create_time_span              { return { name: 'timeout',                     value: plib.mkDate(v)     }; }
	/ ws+ n:str_clientmanagement         eql v:value_boolean                      { return { name: 'client_variables',            value: v                  }; }
	/ ws+ n:str_clientstorage            eql v:value_cfapplication_client_storage { return { name: 'client_storage',              value: v                  }; }
	/ ws+ n:str_setclientcookies         eql v:value_boolean                      { return { name: 'client_cookies',              value: v                  }; }
	/ ws+ n:str_setdomaincookies         eql v:value_boolean                      { return { name: 'domain_cookies',              value: v                  }; }
	/ ws+ n:str_loginstorage             eql v:value_cfapplication_login_storage  { return { name: 'login_storage',               value: v                  }; }
	/ ws+ n:str_googlemapkey             eql v:value_any                          { return { name: 'google_map_key',              value: v                  }; }
	/ ws+ n:str_scriptprotect            eql v:value_cfapplication_script_protect { return { name: 'script_protection',           value: v                  }; }
	/ ws+ n:str_serversideformvalidation eql v:value_boolean                      { return { name: 'server_side_form_validation', value: v                  }; }
	/ ws+ n:str_sessionmanagement        eql v:value_boolean                      { return { name: 'session_management',          value: v                  }; }
	/ ws+ n:str_sessiontimeout           eql v:func_create_time_span              { return { name: 'session_timeout',             value: plib.mkDate(v)     }; }
	/ ws+ n:str_securejson               eql v:value_boolean                      { return { name: 'secure_json',                 value: v                  }; }
	/ ws+ n:str_securejsonprefix         eql v:value_any                          { return { name: 'secure_json_prefix',          value: v == "" ? "//" : v }; }

value_cfapplication_login_storage
	=  quote_char  v:str_cookie   quote_char  {  return  v.toLowerCase();  }
	/  quote_char  v:str_session  quote_char  {  return  v.toLowerCase();  }
value_cfapplication_script_protect 
	=  quote_char  v:str_none  quote_char  {  return  v.toLowerCase();  }
	/  quote_char  v:str_all   quote_char  {  return  v.toLowerCase();  }
	/  quote_char  v:str_list  quote_char  {  return  v.toLowerCase();  }
value_cfapplication_client_storage 
	=  value_any
	/  quote_char  v:str_registry  quote_char  {  return  v.toLowerCase();  }
	/  quote_char  v:str_cookie    quote_char  {  return  v.toLowerCase();  }

attr_cfassoc_required
    = ws+ n:str_basetag eql v:value_any_non_whitespace { return { name: 'base_tag', value: v }; }

attr_cfassoc_optional
    = ws+ n:str_datacollection eql v:value_any_non_whitespace { return { name: 'data_collection', value: v == "" ? "AssocAttribs" : v }; }

attr_cferr_required_type
    = ws+ n:str_type eql v:value_cferr_type { return { name: n, value: v }; }
attr_cferr_required_template
    = ws+ n:str_template eql v:value_file_path { return { name: n, value: v }; }

attr_cferr_optional
	=  ws+  n:str_mail_to   eql v:value_email_address   { return { name:'mail_to',  value: v }; }
	/  ws+  n:str_exception eql v:value_cferr_exception { return { name: n,         value: v }; }

attr_cfimport_required
	= attr_cfimport_required_taglib attr_cfimport_required_prefix
	/ attr_cfimport_required_prefix attr_cfimport_required_taglib

attr_cfimport_required_taglib
    = ws+ n:"taglib" eql v:value_file_path { return { name: n, value: v }; }
attr_cfimport_required_prefix
    = ws+ n:"prefix" eql v:(value_any_non_whitespace / value_empty_quote ) { return { name: n, value: v }; }

//attr_cfimport_optional

attr_cfcookie_required = attr_name_required
attr_cfcookie_optional
	= ws+ n:str_domain   eql quote_char v:( period domain ) quote_char {  return { name: n,  value: plib.flatten(v) }; }
	/ ws+ n:str_expires  eql v:value_cfcookie_expires                  {  return { name: n,  value: v               }; }
	/ ws+ n:str_httponly eql v:value_boolean                           {  return { name: n,  value: v               }; }
	/ ws+ n:str_path     eql v:value_file_path                         {  return { name: n,  value: v               }; }
	/ ws+ n:str_secure   eql v:value_boolean                           {  return { name: n,  value: v               }; }
	/ ws+ n:str_value    eql v:value_any                               {  return { name: n,  value: v               }; }

attr_cfdump_required
	= ws+ n:str_var eql v:value_cfval { return { name: n, value: v }; }
attr_cfdump_optional
	= ws+ n:str_output   eql v:value_cfdump_output                       { return { name: n, value: v }; }
	/ ws+ n:str_format   eql v:value_cfdump_format                       { return { name: n, value: v }; }
	/ ws+ n:str_abort    eql v:value_boolean                             { return { name: n, value: v }; }
	/ ws+ n:str_label    eql v:value_any_non_whitespace                  { return { name: n, value: v }; }
	/ ws+ n:str_metainfo eql v:value_boolean                             { return { name: n, value: v }; }
	/ ws+ n:str_top      eql v:value_integer                             { return { name: n, value: v }; }
	/ ws+ n:str_show     eql v:( value_list / value_any_non_whitespace ) { return { name: n, value: v }; }
	/ ws+ n:str_hide     eql v:( value_list / value_any_non_whitespace ) { return { name: n, value: v }; }
	/ ws+ n:str_keys     eql v:value_integer                             { return { name: n, value: v }; }
	/ ws+ n:str_expand   eql v:value_boolean                             { return { name: n, value: v }; }
	/ ws+ n:str_showudfs eql v:value_boolean                             { return { name: n, value: v }; }

attr_cfparam_required = attr_name_required
attr_cfparam_optional
	= ws+ n:str_default eql v:value_any          { return { name: n, value: v }; }
	/ ws+ n:str_min     eql v:value_integer      { return { name: n, value: v }; }
	/ ws+ n:str_max     eql v:value_integer      { return { name: n, value: v }; }
	/ ws+ n:str_pattern eql v:value_regex        { return { name: n, value: v }; }
	/ ws+ n:str_type    eql v:value_cfparam_type { return { name: n, value: v }; }

//attr_cfsetting_required
attr_cfsetting_optional
	= ws+ n:"enableCFoutputOnly" eql v:value_boolean { return { name: 'enable_cfoutput_only', value: v }; }
	/ ws+ n:"requestTimeOut"     eql v:value_integer { return { name: plib.underbar_name(n),       value: v }; }
	/ ws+ n:"showDebugOutput"    eql v:value_boolean { return { name: plib.underbar_name(n),       value: v }; }

attr_cfsavecontent_required
	= ws+ n:str_variable eql v:value_any_non_whitespace { return { name: n, value: v }; }
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
	/ quote_char v:"scheduler"     quote_char { return v.toLowerCase(); }

value_cflog_type
	= quote_char v:"information" quote_char { return v.toLowerCase(); }
	/ quote_char v:"warning" quote_char     { return v.toLowerCase(); }
	/ quote_char v:"error" quote_char       { return v.toLowerCase(); }
	/ quote_char v:"fatal" quote_char       { return v.toLowerCase(); }

attr_cfflush_optional
	= ws+ n:str_interval eql v:value_integer { return { name: n, value: v }; }

attr_cfoutput_optional
	= ws+ n:"groupCaseSensitive" eql v:value_boolean { return { name: plib.underbar_name(n), value: v }; }
	/ ws+ n:"group"              eql v:value_any     { return { name: n,                value: v }; }
	/ ws+ n:"maxRows"            eql v:value_integer { return { name: plib.underbar_name(n), value: v }; }
	/ ws+ n:str_query            eql v:value_any     { return { name: n,                value: v }; }
	/ ws+ n:"startRow"           eql v:value_integer { return { name: plib.underbar_name(n), value: v }; }

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
attr_cfdbinfo_required_type
	= ws+ n:str_type     eql v:value_cfdbinfo_type { return { name: n, value: v }; }
value_cfdbinfo_type
	= quote_char v:"dbnames"     quote_char  { return v.toLowerCase(); }
	/ quote_char v:"tables"      quote_char  { return v.toLowerCase(); }
	/ quote_char v:"columns"     quote_char  { return v.toLowerCase(); }
	/ quote_char v:"procedures"  quote_char  { return v.toLowerCase(); }
	/ quote_char v:"foreignkeys" quote_char  { return v.toLowerCase(); }
	/ quote_char v:"index"       quote_char  { return v.toLowerCase(); }

attr_cfdbinfo_optional
	= ws+ n:str_datasource eql v:value_any { return { name: n, value: v }; }
	/ ws+ n:str_dbname     eql v:value_any { return { name: n, value: v }; }
	/ ws+ n:str_password   eql v:value_any { return { name: n, value: v }; }
	/ ws+ n:str_pattern    eql v:value_any { return { name: n, value: v }; }
	/ ws+ n:str_username   eql v:value_any { return { name: n, value: v }; }
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
	= quote_char v:str_any_non_quote+ quote_char { return new RegExp(plib.flatten(v)); }

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
	= quote_char v:'never' quote_char   { human_date('30 years'); }
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
str_abort                    = v:(a b o r t)                                         { return plib.flatten(v).toLowerCase(); }
str_action                   = v:(a c t i o n)                                       { return plib.flatten(v).toLowerCase(); }
str_all                      = v:(a l l)                                             { return plib.flatten(v); }
str_any                      = v:(a n y)                                             { return plib.flatten(v); }
str_application              = v:(a p p l i c a t i o n)                             { return plib.flatten(v); }
str_applicationtimeout       = v:(a p p l i c a t i o n t i m e o u t)               { return plib.flatten(v).toLowerCase(); }
str_array                    = v:(a r r a y)                                         { return plib.flatten(v); }
str_basetag                  = v:(b a s e t a g)                                     { return plib.flatten(v).toLowerCase(); }
str_binary                   = v:(b i n a r y)                                       { return plib.flatten(v); }
str_boolean                  = v:(b o o l e a n)                                     { return plib.flatten(v); }
str_category                 = v:(c a t e g o r y)                                   { return plib.flatten(v).toLowerCase(); }
str_cfapplication            = v:(c f a p p l i c a t i o n)                         { return plib.flatten(v); }
str_cfassociate              = v:(c f a s s o c i a t e)                             { return plib.flatten(v); }
str_cfcookie                 = v:(c f c o o k i e)                                   { return plib.flatten(v); }
str_cfdbinfo                 = v:(c f d b i n f o)                                   { return plib.flatten(v); }
str_cfdump                   = v:(c f d u m p)                                       { return plib.flatten(v).toLowerCase(); }
str_cferror                  = v:(c f e r r o r)                                     { return plib.flatten(v); }
str_cfflush                  = v:(c f f l u s h)                                     { return plib.flatten(v); }
str_cflog                    = v:(c f l o g)                                         { return plib.flatten(v).toLowerCase(); }
str_cfparam                  = v:(c f p a r a m)                                     { return plib.flatten(v).toLowerCase(); }
str_cfqueryparam             = v:(c f q u e r y p a r a m)                           { return plib.flatten(v).toLowerCase(); }
str_cftimer                  = v:(c f t i m e r)                                     { return plib.flatten(v).toLowerCase(); }
str_cftrace                  = v:(c f t r a c e)                                     { return plib.flatten(v).toLowerCase(); }
str_cftransaction            = v:(c f t r a n s a c t i o n)                         { return plib.flatten(v).toLowerCase(); }
str_cfsql_type               = v:(c f s q l t y p e)                                 { return plib.flatten(v).toLowerCase(); }
str_clientmanagement         = v:(c l i e n t m a n a g e m e n t)                   { return plib.flatten(v).toLowerCase(); }
str_clientstorage            = v:(c l i e n t s t o r a g e)                         { return plib.flatten(v).toLowerCase(); }
str_cookie                   = v:(c o o k i e)                                       { return plib.flatten(v); }
str_country_code             = v:(c o u n t r y '_'? c o d e)                        { return plib.flatten(v); }
str_creditcard               = v:(c r e d i t '_'? c a r d)                          { return plib.flatten(v); }
str_datasource               = v:(d a t a s o u r c e)                               { return plib.flatten(v).toLowerCase(); }
str_datacollection           = v:(d a t a c o l l e c t i o n)                       { return plib.flatten(v).toLowerCase(); }
str_date                     = v:(d a t e)                                           { return plib.flatten(v); }
str_default                  = v:(d e f a u l t)                                     { return plib.flatten(v).toLowerCase(); }
str_dbname                   = v:(d b n a m e)                                       { return plib.flatten(v).toLowerCase(); }
str_domain                   = v:(d o m a i n)                                       { return plib.flatten(v).toLowerCase(); }
str_email                    = v:(e m a i l)                                         { return plib.flatten(v); }
str_expand                   = v:(e x p a n d)                                       { return plib.flatten(v).toLowerCase(); }
str_expires                  = v:(e x p i r e s)                                     { return plib.flatten(v).toLowerCase(); }
str_exception                = v:(e x c e p t i o n)                                 { return plib.flatten(v).toLowerCase(); }
str_file                     = v:(f i l e)                                           { return plib.flatten(v).toLowerCase(); }
str_float                    = v:(f l o a t)                                         { return plib.flatten(v); }
str_format                   = v:(f o r m a t)                                       { return plib.flatten(v).toLowerCase(); }
str_googlemapkey             = v:(g o o g l e m a p k e y)                           { return plib.flatten(v).toLowerCase(); }
str_guid                     = v:(g u i d)                                           { return plib.flatten(v); }
str_hide                     = v:(h i d e)                                           { return plib.flatten(v).toLowerCase(); }
str_html                     = v:(h t m l)                                           { return plib.flatten(v); }
str_httponly                 = v:(h t t p o n l y)                                   { return plib.flatten(v); }
str_inline                   = v:(i n l i n e)                                       { return plib.flatten(v).toLowerCase(); }
str_integer                  = v:(i n t e g e r)                                     { return plib.flatten(v); }
str_interval                 = v:(i n t e r v a l)                                   { return plib.flatten(v).toLowerCase(); }
str_ip                       = v:(i p)                                               { return plib.flatten(v); }
str_isolation                = v:(i s o l a t i o n)                                 { return plib.flatten(v).toLowerCase(); }
str_json                     = v:(j s o n)                                           { return plib.flatten(v); }
str_keys                     = v:(k e y s)                                           { return plib.flatten(v).toLowerCase(); }
str_label                    = v:(l a b e l)                                         { return plib.flatten(v).toLowerCase(); }
str_list                     = v:(l i s t)                                           { return plib.flatten(v).toLowerCase(); }
str_log                      = v:(l o g)                                             { return plib.flatten(v).toLowerCase(); }
str_loginstorage             = v:(l o g i n s t o r a g e)                           { return plib.flatten(v).toLowerCase(); }
str_mail_to                  = v:(m a i l '_'? t o)                                  { return plib.flatten(v).toLowerCase(); }
str_maxlength                = v:(m a x l e n g t h)                                 { return plib.flatten(v).toLowerCase(); }
str_metainfo                 = v:(m e t a i n f o)                                   { return plib.flatten(v).toLowerCase(); }
str_min                      = v:(m i n)                                             { return plib.flatten(v).toLowerCase(); }
str_max                      = v:(m a x)                                             { return plib.flatten(v).toLowerCase(); }
str_name                     = v:(n a m e)                                           { return plib.flatten(v).toLowerCase(); }
str_nested                   = v:(n e s t e d)                                       { return plib.flatten(v).toLowerCase(); }
str_none                     = v:(n o n e)                                           { return plib.flatten(v); }
str_null                     = v:(n u l l)                                           { return plib.flatten(v).toLowerCase(); }
str_numeric                  = v:(n u m e r i c)                                     { return plib.flatten(v); }
str_output                   = v:(o u t p u t)                                       { return plib.flatten(v).toLowerCase(); }
str_password                 = v:(p a s s w o r d)                                   { return plib.flatten(v).toLowerCase(); }
str_pattern                  = v:(p a t t e r n)                                     { return plib.flatten(v).toLowerCase(); }
str_path                     = v:(p a t h)                                           { return plib.flatten(v).toLowerCase(); }
str_query                    = v:(q u e r y)                                         { return plib.flatten(v); }
str_range                    = v:(r a n g e s)                                       { return plib.flatten(v); }
str_regex                    = v:(r e g e x)                                         { return plib.flatten(v); }
str_registry                 = v:(r e g i s t r y)                                   { return plib.flatten(v); }
str_regular_expression       = v:(r e g u l a r '_'? e x p r e s s i o n)            { return plib.flatten(v); }
str_savepoint                = v:(s a v e p o i n t)                                 { return plib.flatten(v).toLowerCase(); }
str_secure                   = v:(s e c u r e)                                       { return plib.flatten(v).toLowerCase(); }
str_scale                    = v:(s c a l e)                                         { return plib.flatten(v).toLowerCase(); }
str_scriptprotect            = v:(s c r i p t p r o t e c t)                         { return plib.flatten(v).toLowerCase(); }
str_securejson               = v:(s e c u r e j s o n)                               { return plib.flatten(v).toLowerCase(); }
str_securejsonprefix         = v:(s e c u r e j s o n p r e f i x)                   { return plib.flatten(v).toLowerCase(); }
str_serversideformvalidation = v:(s e r v e r s i d e f o r m v a l i d a t i o n)   { return plib.flatten(v).toLowerCase(); }
str_separator                = v:(s e p a r a t o r)                                 { return plib.flatten(v).toLowerCase(); }
str_session                  = v:(s e s s i o n)                                     { return plib.flatten(v); }
str_sessionmanagement        = v:(s e s s i o n m a n a g e m e n t)                 { return plib.flatten(v).toLowerCase(); }
str_sessiontimeout           = v:(s e s s i o n t i m e o u t)                       { return plib.flatten(v).toLowerCase(); }
str_setclientcookies         = v:(s e t c l i e n t c o o k i e s)                   { return plib.flatten(v).toLowerCase(); }
str_setdomaincookies         = v:(s e t d o m a i n c o o k i e s)                   { return plib.flatten(v).toLowerCase(); }
str_show                     = v:(s h o w)                                           { return plib.flatten(v).toLowerCase(); }
str_showudfs                 = v:(s h o w u d f s)                                   { return plib.flatten(v).toLowerCase(); }
str_social_security_number   = v:(s o c i a l '_'? s e c u r i t y '_'? n u m b e r) { return plib.flatten(v); }
str_ssn                      = v:(s s n)                                             { return plib.flatten(v); }
str_string                   = v:(s t r i n g)                                       { return plib.flatten(v); }
str_struct                   = v:(s t r u c t)                                       { return plib.flatten(v); }
str_table                    = v:(t a b l e)                                         { return plib.flatten(v).toLowerCase(); }
str_telephone                = v:(t e l e p h o n e)                                 { return plib.flatten(v); }
str_template                 = v:(t e m p l a t e)                                   { return plib.flatten(v).toLowerCase(); }
str_text                     = v:(t e x t)                                           { return plib.flatten(v).toLowerCase(); }
str_time                     = v:(t i m e)                                           { return plib.flatten(v); }
str_top                      = v:(t o p)                                             { return plib.flatten(v).toLowerCase(); }
str_type                     = v:(t y p e)                                           { return plib.flatten(v).toLowerCase(); }
str_url                      = v:(u r l)                                             { return plib.flatten(v); }
str_username                 = v:(u s e r n a m e)                                   { return plib.flatten(v).toLowerCase(); }
str_uuid                     = v:(u u i d)                                           { return plib.flatten(v); }
str_value                    = v:(v a l u e)                                         { return plib.flatten(v).toLowerCase(); }
str_var                      = v:(v a r)                                             { return plib.flatten(v).toLowerCase(); }
str_variable                 = v:(v a r i a b l e)                                   { return plib.flatten(v); }
str_variable_name            = v:(v a r i a b l e '_'? n a m e)                      { return plib.flatten(v); }
str_xml                      = v:(x m l)                                             { return plib.flatten(v); }
str_zip                      = v:(z i p)                                             { return plib.flatten(v); }
str_zipcode                  = v:(z i p '_'? c o d e)                                { return plib.flatten(v); }
// end any case strings

// Common Generic Value Definitions
value_file_path
	= quote_char v:(wack (value_dir wack)* value_dir) quote_char { return plib.flatten(v); }
value_dir
	= v:(!(wack / ws / quote_char) .)+ { return plib.flatten(v); }
value_email_address
	= quote_char e:email quote_char { return e; }
email = n:(!(quote_char / ws / at) anychar)+ at:at d:domain { return plib.flatten(n) + at + d; }

date_time = v:( date space time ) { return new Date(v); }
date = v:(integer integer integer integer '-' integer integer? '-' integer integer? ) { return new Date(plib.flatten(v) + ' 00:00:00'); }
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
cfval = pound v:(!pound anychar)+ pound { return plib.flatten(v); }

value_list = quote_char v:( ((!(comma / quote_char) anychar)+ comma )+ (!(comma / quote_char) anychar)+ ) quote_char { return plib.flatten(v).split(','); }
value_domain = quote_char v:domain quote_char { return v; }
domain = v:( ( dom_part+ period )+ dom_part+ ) { return plib.flatten(v); }
dom_part = ( lcchars / '_' lcchars )+ ( '-' lcchars / lcchars )*

// Generic Generic Value Defs
value_any_non_whitespace 
	= quote_char v:( ( chars+ [\-_] )* chars )* quote_char { return plib.flatten(v); }
value_any 
	= quote_char v:(!quote_char anychar)+ quote_char { return plib.flatten(v); }
str_any_non_quote 
	= v:(!quote_char anychar)+ { return plib.flatten(v); }
value_empty_quote 
	= quote_char quote_char { return ""; }
value_integer 
	= quote_char v:integer+ quote_char { return parseInt(plib.flatten(v)); }

ops = e q / n e q / l t /  l e / g t / g e / i s / n o t

func_create_time_span
	= value_empty_quote { return ""; }
	/ v:create_time_span_func { return v; }

// Functions
create_time_span_func
	= pound "CreateTimeSpan(" space* days:integer space+ "," space* hours:integer space* "," space* minutes:integer space* "," space* seconds:integer space* ")" pound {
		calc = Date.now() +
			( parseInt(days) * 86400000 ) + // days
			( parseInt(hours) * 3600000 ) + // hours
			( parseInt(minutes) * 60000 ) + // minutes
			( parseInt(seconds) * 1000 );   // seconds
		return { name: "create_time_span", value: new Date(calc) };
	}

chars = ucchars / lcchars
ucchars = [A-Z]
lcchars = [a-z]
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

