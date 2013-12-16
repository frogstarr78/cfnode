{

	var util = require('util'),
		plib = require('./lib/parselib'),
		inspect = console.dir,
//		human_date = require('date.js'),
	    tag_defaults = {
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
		]
	};

	function apply_attributes (who, arry) {
		arry.forEach(function (nv) {
			if ( Array.isArray(nv)) {
				apply_attributes(who, nv);
			} else {
//				console.log("nv %s, who.attributes %s, who.attributes[nv.name] %s", util.inspect(nv), util.inspect(who.attributes), util.inspect(who.attributes[nv.name]))
				if ( typeof who.attributes[nv.name] === 'undefined') {	
					who.attributes[nv.name] = nv.value;
				}
			}
		});
	}

	function set_default_attributes(obj) {
		if ( tag_defaults[obj.tag] ) {
			tag_defaults[obj.tag].forEach(function (def) {
				apply_attributes(obj, [def]);
			});
		}
	}

	function underbar_name(n) {
		return n.replace(/([A-Z])/g, function(v) {
			return '_' + v.toLowerCase();
		});
	};

	function mkDate(v) {
		return new Date(Date.parse(v == '' ? Date() : v));
	}
}

start 
	= ApplicationFrameworkTags
//	/ CommunicationsTag
//	/ DatabaseManipulationTag
	/ DataOutputTag
//	/ DebuggingTag
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
//	/ OtherTags
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
	= gt t:"cfapplication" attr:( attr_cfapp_optional* attr_cfapp_required attr_cfapp_optional* ) ws* lt anychar* {
		var me = {
			tag: plib.tag_name(t),
			attributes: { }
		};

		apply_attributes(me, attr);
		set_default_attributes(me);
		return me;
	}

tag_cfassociate
	= gt t:"cfassociate" attr:( attr_cfassoc_required attr_cfassoc_optional* / attr_cfassoc_optional* attr_cfassoc_required ) lt {
		var me = { 
			tag: plib.tag_name(t),
			attributes: { }
		};

		apply_attributes(me, attr);
		set_default_attributes(me);
		return me;
	}
tag_cferror
	= gt t:"cferror" attr:(
			attr_cferr_optional* attr_cferr_required_template attr_cferr_optional* attr_cferr_required_type attr_cferr_optional*
			/ attr_cferr_optional* attr_cferr_required_type attr_cferr_optional* attr_cferr_required_template attr_cferr_optional*
		) lt {
		var me = { 
			tag: plib.tag_name(t),
			attributes: { }
		};
		
		apply_attributes(me, attr);
		set_default_attributes(me);
		return me;
	}

tag_cfimport
	= gt t:"cfimport" attr:attr_cfimport_required lt {
		var me = { 
			tag: plib.tag_name(t),
			attributes: { }
		};

		apply_attributes(me, attr);
		set_default_attributes(me);
		return me;
	}


VariableManipulationTags
	= tag_cfdump
	/ tag_cfcookie
	/ tag_cfparam
//	/ tag_cfregistry
	/ tag_cfsavecontent
//	/ tag_cfschedule
	/ tag_cfsetting

tag_cfdump
	= gt t:"cfdump" attr:(
		attr_cfdump_optional* attr_cfdump_required attr_cfdump_optional*
	) lt {
		var me = { 
			tag: plib.tag_name(t),
			attributes: { }
		};

		apply_attributes(me, attr);
		set_default_attributes(me);
		return me;
	}

tag_cfcookie
	= gt t:"cfcookie" attr:(
		attr_cfcookie_optional* attr_cfcookie_required attr_cfcookie_optional*
	) lt {
		var me = { 
			tag: plib.tag_name(t),
			attributes: { }
		};

		apply_attributes(me, attr);
		set_default_attributes(me);
		if ( ( me.attributes.path && me.attributes.path !== "" ) && ( ! me.attributes.domain || me.attributes.domain === "" ) ) {
			throw new Error("Missing domain value, required with path attribute.");		
		}
		return me;
	}

tag_cfparam
	= gt t:"cfparam" attr:(
		attr_cfparam_optional* attr_cfparam_required attr_cfparam_optional*
	) lt {
		var me = { 
			tag: plib.tag_name(t),
			attributes: { }
		};

		apply_attributes(me, attr);
		set_default_attributes(me);
		return me;
	}

tag_cfsetting
	= gt t:"cfsetting" attr:( attr_cfsetting_optional*) lt {
		var me = { 
			tag: plib.tag_name(t),
			attributes: { }
		};

		apply_attributes(me, attr);
		set_default_attributes(me);
		return me;
	}

tag_cfsavecontent
	= gt t:"cfsavecontent" attr:attr_cfsavecontent_required lt
	content:(!(gt wack "cfsavecontent" lt) anychar)*
	gt wack "cfsavecontent" lt {
		var me = { 
			tag: plib.tag_name(t),
			attributes: { },
			content: plib.flatten(content)
		};

		apply_attributes(me, [attr]);
		set_default_attributes(me);
		return me;
	}

DataOutputTag
//	= cfchart
//	cfchartdata
//	cfchartseries
//	cfcol
//	cfcontent
//	cfdocument
//	cfdocumentitem
//	cfdocumentsection
	= tag_cfflush
//	cfheader
	/ tag_cflog
	/ tag_cfoutput
//	cfpresentation
//	cfpresentationslide
//	cfpresenter
//	cfprint
//	cfprocessingdirective
//	cfreport
//	cfreportparam
//	cfsilent
//	cftable

tag_cfflush
	= gt t:str_cfflush attr:attr_cfflush_optional* lt {
		var me = { 
			tag: plib.tag_name(t),
			attributes: { }
		};

		apply_attributes(me, attr);
		set_default_attributes(me);
		return me;
	}

tag_cflog
	= gt t:str_cflog attr:(
	attr_cflog_optional* attr_cflog_required attr_cflog_optional*
	) lt {
		var me = { 
			tag: plib.tag_name(t),
			attributes: { }
		};

		apply_attributes(me, attr);
		set_default_attributes(me);
		if ( me.attributes.file && me.attributes.file !== "" ) {
			tag_defaults['log'].forEach(function (def) {
				if ( def.name == 'log' ) {
					me.attributes[def.name] = def.value;
				}
			});
		}
		return me;
	}

tag_cfoutput
	= gt t:"cfoutput" attr:( attr_cfoutput_optional* ) lt
	content:(!(gt wack "cfoutput" lt) anychar)*
	gt wack "cfoutput" lt {
		var me = { 
			tag: plib.tag_name(t),
			attributes: { },
			content: plib.flatten(content)
		};

		apply_attributes(me, [attr]);
		set_default_attributes(me);
		return me;
	}

// Value Definitions
// Tag Specific Value Defs
attr_name_required
    = ws+ n:str_name eql v:value_any_non_whitespace { return { name: n, value: v }; }

attr_cfapp_required = attr_name_required
attr_cfapp_optional
	= ws+ n:"datasource"               eql v:value_any                  { return { name: n,                    value: v                  }; }
	/ ws+ n:"applicationTimeout"       eql v:func_create_time_span      { return { name: 'timeout',            value: mkDate(v)          }; }
	/ ws+ n:"clientManagement"         eql v:value_boolean              { return { name: 'client_variables',   value: v                  }; }
	/ ws+ n:"clientStorage"            eql v:value_cfapp_client_storage { return { name: underbar_name(n),     value: v                  }; }
	/ ws+ n:"loginStorage"             eql v:value_cfapp_login_storage  { return { name: underbar_name(n),     value: v                  }; }
	/ ws+ n:"googleMapKey"             eql v:value_any                  { return { name: underbar_name(n),     value: v                  }; }
	/ ws+ n:"scriptProtect"            eql v:value_cfapp_script_protect { return { name: 'script_protection',  value: v                  }; }
	/ ws+ n:"serverSideFormValidation" eql v:value_boolean              { return { name: underbar_name(n),     value: v                  }; }
	/ ws+ n:"sessionManagement"        eql v:value_boolean              { return { name: underbar_name(n),     value: v                  }; }
	/ ws+ n:"sessionTimeout"           eql v:func_create_time_span      { return { name: underbar_name(n),     value: mkDate(v)          }; }
	/ ws+ n:"setClientCookies"         eql v:value_boolean              { return { name: 'client_cookies',     value: v                  }; }
	/ ws+ n:"setDomainCookies"         eql v:value_boolean              { return { name: 'domain_cookies',     value: v                  }; }
	/ ws+ n:"secureJSON"               eql v:value_boolean              { return { name: 'secure_json',        value: v                  }; }
	/ ws+ n:"secureJSONPrefix"         eql v:value_any                  { return { name: 'secure_json_prefix', value: v == "" ? "//" : v }; }

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

attr_cfassoc_required
    = ws+ n:"baseTag" eql v:value_any_non_whitespace { return { name: underbar_name(n), value: v }; }

attr_cfassoc_optional
    = ws+ n:"dataCollection" eql v:value_any_non_whitespace { return { name: underbar_name(n), value: v == "" ? "AssocAttribs" : v }; }

attr_cferr_required_type
    = ws+ n:"type" eql v:value_cferr_type { return { name: n, value: v }; }
attr_cferr_required_template
    = ws+ n:"template" eql v:value_file_path { return { name: n, value: v }; }

attr_cferr_optional
	=  ws+  n:"mailTo"     eql  v:value_email_address    {  return  {  name:  underbar_name(n),  value:  v  };  }
	/  ws+  n:"exception"  eql  v:value_cferr_exception  {  return  {  name:  n,                 value:  v  };  }

attr_cfimport_required
	= attr_cfimp_required_taglib attr_cfimp_required_prefix
	/ attr_cfimp_required_prefix attr_cfimp_required_taglib

attr_cfimp_required_taglib
    = ws+ n:"taglib" eql v:value_file_path { return { name: n, value: v }; }
attr_cfimp_required_prefix
    = ws+ n:"prefix" eql v:(value_any_non_whitespace / value_empty_quote ) { return { name: n, value: v }; }

//attr_cfimport_optional

attr_cfcookie_required = attr_name_required
attr_cfcookie_optional
	= ws+ n:"domain"   eql quote_char v:( period domain ) quote_char {  return { name: n,  value: plib.flatten(v) }; }
	/ ws+ n:"expires"  eql v:value_cfcookie_expires                  {  return { name: n,  value: v               }; }
	/ ws+ n:"httponly" eql v:value_boolean                           {  return { name: n,  value: v               }; }
	/ ws+ n:"path"     eql v:value_file_path                         {  return { name: n,  value: v               }; }
	/ ws+ n:"secure"   eql v:value_boolean                           {  return { name: n,  value: v               }; }
	/ ws+ n:"value"    eql v:value_any                               {  return { name: n,  value: v               }; }

attr_cfdump_required
	= ws+ n:"var" eql v:value_cfval { return { name: 'variable', value: v }; }
attr_cfdump_optional
	= ws+ n:"output"   eql v:value_cfdump_output                       { return { name: n, value: v }; }
	/ ws+ n:"format"   eql v:value_cfdump_format                       { return { name: n, value: v }; }
	/ ws+ n:"abort"    eql v:value_boolean                             { return { name: n, value: v }; }
	/ ws+ n:"label"    eql v:value_any_non_whitespace                  { return { name: n, value: v }; }
	/ ws+ n:"metainfo" eql v:value_boolean                             { return { name: n, value: v }; }
	/ ws+ n:"top"      eql v:value_integer                             { return { name: n, value: v }; }
	/ ws+ n:"show"     eql v:( value_list / value_any_non_whitespace ) { return { name: n, value: v }; }
	/ ws+ n:"hide"     eql v:( value_list / value_any_non_whitespace ) { return { name: n, value: v }; }
	/ ws+ n:"keys"     eql v:value_integer                             { return { name: n, value: v }; }
	/ ws+ n:"expand"   eql v:value_boolean                             { return { name: n, value: v }; }
	/ ws+ n:"showUDFs" eql v:value_boolean                             { return { name: n, value: v }; }

attr_cfparam_required = attr_name_required
attr_cfparam_optional
	= ws+ n:"default" eql v:value_any          { return { name: n, value: v }; }
	/ ws+ n:"max"     eql v:value_integer      { return { name: n, value: v }; }
	/ ws+ n:"min"     eql v:value_integer      { return { name: n, value: v }; }
	/ ws+ n:"pattern" eql v:value_regex        { return { name: n, value: v }; }
	/ ws+ n:"type"    eql v:value_cfparam_type { return { name: n, value: v }; }

//attr_cfsetting_required
attr_cfsetting_optional
	= ws+ n:"enableCFoutputOnly" eql v:value_boolean { return { name: 'enable_cfoutput_only', value: v }; }
	/ ws+ n:"requestTimeOut"     eql v:value_integer { return { name: underbar_name(n),       value: v }; }
	/ ws+ n:"showDebugOutput"    eql v:value_boolean { return { name: underbar_name(n),       value: v }; }

attr_cfsavecontent_required
	= ws+ n:str_variable eql v:value_any_non_whitespace { return { name: n, value: v }; }
//attr_cfsavecontent_optional

attr_cflog_required
	= ws+ n:str_text eql v:value_any { return { name: n, value: v}; }

attr_cflog_optional
	= ws+ n:str_application eql v:value_boolean    { return { name: n, value: v }; }
	/ ws+ n:str_file          eql v:value_any        { return { name: n, value: v }; }
	/ ws+ n:"log"           eql v:value_cflog_log  { return { name: n, value: v }; }
	/ ws+ n:"type"          eql v:value_cflog_type { return { name: n, value: v }; }

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
	= ws+ n:"groupCaseSensitive" eql v:value_boolean { return { name: underbar_name(n), value: v }; }
	/ ws+ n:"group"              eql v:value_any     { return { name: n,                value: v }; }
	/ ws+ n:"maxRows"            eql v:value_integer { return { name: underbar_name(n), value: v }; }
	/ ws+ n:"query"              eql v:value_any     { return { name: n,                value: v }; }
	/ ws+ n:"startRow"           eql v:value_integer { return { name: underbar_name(n), value: v }; }

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
str_all                    = v:(a l l)                                             { return plib.flatten(v); }
str_any                    = v:(a n y)                                             { return plib.flatten(v); }
str_application            = v:(a p p l i c a t i o n)                             { return plib.flatten(v); }
str_array                  = v:(a r r a y)                                         { return plib.flatten(v); }
str_binary                 = v:(b i n a r y)                                       { return plib.flatten(v); }
str_boolean                = v:(b o o l e a n)                                     { return plib.flatten(v); }
str_cfflush                = v:(c f f l u s h)                                     { return plib.flatten(v); }
str_cflog                  = v:(c f l o g)                                         { return plib.flatten(v).toLowerCase(); }
str_cookie                 = v:(c o o k i e)                                       { return plib.flatten(v); }
str_country_code           = v:(c o u n t r y '_'? c o d e)                        { return plib.flatten(v); }
str_creditcard             = v:(c r e d i t '_'? c a r d)                          { return plib.flatten(v); }
str_date                   = v:(d a t e)                                           { return plib.flatten(v); }
str_email                  = v:(e m a i l)                                         { return plib.flatten(v); }
str_file                   = v:(f i l e)                                           { return plib.flatten(v).toLowerCase(); }
str_float                  = v:(f l o a t)                                         { return plib.flatten(v); }
str_guid                   = v:(g u i d)                                           { return plib.flatten(v); }
str_html                   = v:(h t m l)                                           { return plib.flatten(v); }
str_integer                = v:(i n t e g e r)                                     { return plib.flatten(v); }
str_interval               = v:(i n t e r v a l)                                   { return plib.flatten(v).toLowerCase(); }
str_ip                     = v:(i p)                                               { return plib.flatten(v); }
str_json                   = v:(j s o n)                                           { return plib.flatten(v); }
str_list                   = v:(l i s t)                                           { return plib.flatten(v); }
str_name                   = v:(n a m e)                                           { return plib.flatten(v); }
str_none                   = v:(n o n e)                                           { return plib.flatten(v); }
str_numeric                = v:(n u m e r i c)                                     { return plib.flatten(v); }
str_query                  = v:(q u e r y)                                         { return plib.flatten(v); }
str_range                  = v:(r a n g e s)                                       { return plib.flatten(v); }
str_regex                  = v:(r e g e x)                                         { return plib.flatten(v); }
str_registry               = v:(r e g i s t r y)                                   { return plib.flatten(v); }
str_regular_expression     = v:(r e g u l a r '_'? e x p r e s s i o n)            { return plib.flatten(v); }
str_session                = v:(s e s s i o n)                                     { return plib.flatten(v); }
str_social_security_number = v:(s o c i a l '_'? s e c u r i t y '_'? n u m b e r) { return plib.flatten(v); }
str_ssn                    = v:(s s n)                                             { return plib.flatten(v); }
str_string                 = v:(s t r i n g)                                       { return plib.flatten(v); }
str_struct                 = v:(s t r u c t)                                       { return plib.flatten(v); }
str_telephone              = v:(t e l e p h o n e)                                 { return plib.flatten(v); }
str_text                   = v:(t e x t)                                           { return plib.flatten(v).toLowerCase(); }
str_time                   = v:(t i m e)                                           { return plib.flatten(v); }
str_url                    = v:(u r l)                                             { return plib.flatten(v); }
str_uuid                   = v:(u u i d)                                           { return plib.flatten(v); }
str_variable               = v:(v a r i a b l e)                                   { return plib.flatten(v); }
str_variable_name          = v:(v a r i a b l e '_'? n a m e)                      { return plib.flatten(v); }
str_xml                    = v:(x m l)                                             { return plib.flatten(v); }
str_zip                    = v:(z i p)                                             { return plib.flatten(v); }
str_zipcode                = v:(z i p '_'? c o d e)                                { return plib.flatten(v); }
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
value_any_non_whitespace = quote_char v:( ( chars+ [\-_] )* chars )* quote_char { return plib.flatten(v); }
value_any = quote_char v:(!quote_char anychar)+ quote_char { return plib.flatten(v); }
str_any_non_quote = v:(!quote_char anychar)+ { return plib.flatten(v); }
value_empty_quote = quote_char quote_char { return ""; }
value_integer = quote_char v:integer+ quote_char { return parseInt(plib.flatten(v)); }

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

//CommunicationsTags
//	cfexchangecalendar
//	cfexchangeconnection
//	cfexchangecontact
//	cfexchangefilter
//	cfexchangemail
//	cfexchangetask
//	cffeed
//	cfmail
//	cfmailparam
//	cfmailpart
//	cfpop
//	cfimap
//DatabaseManipulationTags
//	cfdbinfo
//	cfinsert
//	cfobjectcache
//	cfprocparam
//	cfprocresult
//	cfquery
//	cfqueryparam
//	cfstoredproc
//	cftransaction
//	cfupdate
//DebuggingTags
//	cfdump
//	cftimer
//	cftrace
//DisplayManagementTags
//	cfdiv
//	cflayout
//	cflayoutarea
//	cfmap
//	cfmapitem
//	cfmediaplayer
//	cfmenu
//	cfmenuitem
//	cfmessagebox
//	cfpod
//	cfprogressbar
//	cftooltip
//	cfwindow
//ExceptionHandlingTags
//	cfcatch
//	cferror
//	cffinally
//	cfrethrow
//	cfthrow
//	cftry
//ExtensibilityTags
//	cfchart
//	cfchartdata
//	cfchartseries
//	cfcollection
//	cfcomponent
//	cfexecute
//	cfftp
//	cffunction
//	cfindex
//	cfinterface
//	cfinvoke
//	cfinvokeargument
//	cfobject
//	cfproperty
//	cfreport
//	cfreportparam
//	cfreturn
//	cfsearch
//	cfsharepoint
//	cfspreadsheet
//	cfwddx
//	cfxml
//FileManagementTags
//	cfdirectory
//	cffile
//	cffileupload
//	cfftp
//	cfzip
//	cfzipparam
//FlowControlTags
//	cfabort
//	cfbreak
//	cfcase
//	cfcontinue
//	cfdefaultcase
//	cfelse
//	cfelseif
//	cfexecute
//	cfexit
//	cfif
//	cfinclude
//	cflocation
//	cfloop
//	cfrethrow
//	cfswitch
//	cfthrow
//	cftry
//FormTags
//	cfapplet
//	cfcalendar
//	cffileupload
//	cfform
//	cfformgroup
//	cfformitem
//	cfgrid
//	cfgridcolumn
//	cfgridrow
//	cfgridupdate
//	cfinput
//	cfpdf
//	cfpdfform
//	cfpdfformparam
//	cfpdfparam
//	cfpdfsubform
//	cfselect
//	cfslider
//	cftextarea
//	cftree
//	cftreeitem
//InternetProtocolTags
//	cfajaximport
//	cfajaxproxy
//	cfftp
//	cffeed
//	cfimap
//	cfhttp
//	cfhttpparam
//	cfldap
//	cfmail
//	cfmailparam
//	cfmailpart
//	cfpop
//	cfsprydataset
//PageProcessingTags
//	cfcache
//	cfcontent
//	cfflush
//	cfheader
//	cfhtmlhead
//	cfinclude
//	cfprocessingdirective
//	cfsetting
//	cfsilent
//SecurityTags
//	cflogin
//	cfloginuser
//	cflogout
//	cfNTauthenticate
//OtherTags
//	cfimage
//	cflog
//	cfregistry
