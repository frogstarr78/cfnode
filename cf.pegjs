{

	var util = require('util'),
		human_date = require('date.js'),
	    tag_defaults = {
		'application': [
			{ name: 'client_variables', value: false }, 
			{ name: 'client_storage', value: 'registry' }, 
			{ name: 'login_storage', value: 'cookie' }, 
			{ name: 'server_side_form_validation', value: true }, 
			{ name: 'session_management', value: false }, 
			{ name: 'client_cookies', value: true }, 
			{ name: 'domain_cookies', value: false }
		],
		'associate': [{ name: 'data_collection', value: "AssocAttribs"}],
		'error': [{ name: 'exception', value: 'any' }],
		'dump': [
			{ name: 'expand', value: true },
			{ name: 'format', value: 'text' },
			{ name: 'hide', value: 'all' },
			{ name: 'keys', value: Infinity },
			{ name: 'metainfo', value: true },
			{ name: 'output', value: 'browser' },
			{ name: 'show', value: 'all' },
			{ name: 'showUDFs', value: true },
			{ name: 'top', value: Infinity },
			{ name: 'abort', value: false },
		],
		'cookie': [
			{ name: 'expires', value: 'session' },
			{ name: 'secure', value: false }
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

	function tag_name(v){
		return v.replace(/^[cC][fF]/, '');
	}

	function flatten(v) {
		return v.map(function(x) { 
			return Array.isArray(x) ? flatten(x) : x;
		}).join('');
	}
}

start 
	= ApplicationFrameworkTags
//	/ CommunicationsTag
//	/ DatabaseManipulationTag
//	/ DataOutputTag
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
	/ any

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
	= gt t:"cfapplication" attr:( attr_optional_cfapp* attr_name_required attr_optional_cfapp* ) ws* lt any* {
		var me = {
			tag: tag_name(t),
			attributes: { }
		};

		apply_attributes(me, attr);
		set_default_attributes(me);
		return me;
	}

tag_cfassociate
	= gt t:"cfassociate" attr:( attr_required_cfassoc attr_optional_cfassoc* / attr_optional_cfassoc* attr_required_cfassoc ) lt {
		var me = { 
			tag: tag_name(t),
			attributes: { }
		};

		apply_attributes(me, attr);
		set_default_attributes(me);
		return me;
	}
tag_cferror
	= gt t:"cferror" attr:(
			attr_optional_cferr* attr_required_cferr_template attr_optional_cferr* attr_required_cferr_type attr_optional_cferr*
			/ attr_optional_cferr* attr_required_cferr_type attr_optional_cferr* attr_required_cferr_template attr_optional_cferr*
		) lt {
		var me = { 
			tag: tag_name(t),
			attributes: { }
		};
		
		apply_attributes(me, attr);
		set_default_attributes(me);
		return me;
	}

tag_cfimport
	= gt t:"cfimport" attr:(
			attr_required_cfimp_taglib attr_required_cfimp_prefix
			/ attr_required_cfimp_prefix attr_required_cfimp_taglib
	) lt {
		var me = { 
			tag: tag_name(t),
			attributes: { }
		};

		apply_attributes(me, attr);
		set_default_attributes(me);
		return me;
	}


VariableManipulationTags
	= tag_cfdump
	/ tag_cfcookie
//	/ tag_cfparam
//	/ tag_cfregistry
//	/ tag_cfsavecontent
//	/ tag_cfschedule
//	/ tag_cfset
//	/ tag_cfsetting

tag_cfdump
	= gt t:"cfdump" attr:(
		attr_optional_cfdump* attr_required_cfdump attr_optional_cfdump*
	) lt {
		var me = { 
			tag: tag_name(t),
			attributes: { }
		};

		apply_attributes(me, attr);
		set_default_attributes(me);
		return me;
	}

tag_cfcookie
	= gt t:"cfcookie" attr:(
		attr_optional_cfcookie* attr_name_required attr_optional_cfcookie*
	) lt {
		var me = { 
			tag: tag_name(t),
			attributes: { }
		};

		apply_attributes(me, attr);
		set_default_attributes(me);
		if ( ( me.attributes.path && me.attributes.path !== "" ) && ( ! me.attributes.domain || me.attributes.domain === "" ) ) {
			throw new Error("Missing domain value, required with path attribute.");		
		}
		return me;
	}

// Value Definitions
// Tag Specific Value Defs
attr_name_required
    = ws+ n:"name" eql v:any_non_whitespace_value { return { name: n, value: v }; }

attr_optional_cfapp
	= ws+ n:"datasource" eql v:any_value                     { return { name: n, value: v}; }
	/ ws+ n:"applicationTimeout" eql v:func_create_time_span { return { name: 'timeout', value: mkDate(v) }; }
	/ ws+ n:"clientManagement" eql v:q_boolean_value           { return { name: 'client_variables', value: v }; }
	/ ws+ n:"clientStorage" eql v:client_storage_value       { return { name: underbar_name(n), value: v }; }
	/ ws+ n:"loginStorage" eql v:login_storage_value         { return { name: underbar_name(n), value: v }; }
	/ ws+ n:"googleMapKey" eql v:any_value                   { return { name: underbar_name(n), value: v }; }
	/ ws+ n:"scriptProtect" eql v:script_protect_value       { return { name: 'script_protection', value: v }; }
	/ ws+ n:"serverSideFormValidation" eql v:q_boolean_value   { return { name: underbar_name(n), value: v }; }
	/ ws+ n:"sessionManagement" eql v:q_boolean_value          { return { name: underbar_name(n), value: v }; }
	/ ws+ n:"sessionTimeout" eql v:func_create_time_span     { return { name: underbar_name(n), value: mkDate(v) }; }
	/ ws+ n:"setClientCookies" eql v:q_boolean_value           { return { name: 'client_cookies', value: v }; }
	/ ws+ n:"setDomainCookies" eql v:q_boolean_value           { return { name: 'domain_cookies', value: v }; }
	/ ws+ n:"secureJSON" eql v:q_boolean_value                 { return { name: 'secure_json', value: v }; }
	/ ws+ n:"secureJSONPrefix" eql v:any_value               { return { name: 'secure_json_prefix', value: v == "" ? "//" : v }; }

attr_required_cfassoc
    = ws+ n:"baseTag" eql v:any_non_whitespace_value { return { name: underbar_name(n), value: v }; }

attr_optional_cfassoc
    = ws+ n:"dataCollection" eql v:any_non_whitespace_value { return { name: underbar_name(n), value: v == "" ? "AssocAttribs" : v }; }

attr_required_cferr_type
    = ws+ n:"type" eql v:attr_cferr_type_value { return { name: n, value: v }; }
attr_required_cferr_template
    = ws+ n:"template" eql v:file_path_value { return { name: n, value: v }; }

attr_optional_cferr
    = ws+ n:"mailTo" eql v:email_address_value { return { name: underbar_name(n), value: v }; }
	/ ws+ n:"exception" eql v:attr_cferr_exception_value { return { name: n, value: v }; }

attr_optional_cfcookie
	= ws+ n:"domain" eql quote_char v:( period domain ) quote_char { return { name: n, value: flatten(v) }; }
	/ ws+ n:"expires" eql v:attr_cfcookie_expires_value            { return { name: n, value: v }; }
	/ ws+ n:"httponly" eql v:q_boolean_value                       { return { name: n, value: v }; }
	/ ws+ n:"path" eql v:file_path_value                           { return { name: n, value: v }; }
	/ ws+ n:"secure" eql v:q_boolean_value                         { return { name: n, value: v }; }
	/ ws+ n:"value" eql v:any_value                                { return { name: n, value: v }; }

attr_required_cfdump
	= ws+ n:"var" eql v:cfval_value { return { name: 'variable', value: v }; }

attr_optional_cfdump
	= ws+ n:"output" eql v:attr_cfdump_output_value                { return { name: n, value: v }; }
	/ ws+ n:"format" eql v:attr_cfdump_output_value                { return { name: n, value: v }; }
	/ ws+ n:"abort" eql v:q_boolean_value                          { return { name: n, value: v }; }
	/ ws+ n:"label" eql v:any_non_whitespace_value                 { return { name: n, value: v }; }
	/ ws+ n:"metainfo" eql v:q_boolean_value                       { return { name: n, value: v }; }
	/ ws+ n:"top" eql quote_char v:integer+ quote_char             { return { name: n, value: v }; }
	/ ws+ n:"show" eql v:( list_value / any_non_whitespace_value ) { return { name: n, value: v }; }
	/ ws+ n:"hide" eql v:( list_value / any_non_whitespace_value ) { return { name: n, value: v }; }
	/ ws+ n:"keys" eql quote_char v:integer+ quote_char            { return { name: n, value: v }; }
	/ ws+ n:"expand" eql v:q_boolean_value                         { return { name: n, value: v }; }
	/ ws+ n:"showUDFs" eql v:q_boolean_value                       { return { name: n, value: v }; }

attr_required_cfimp_taglib
    = ws+ n:"taglib" eql v:file_path_value { return { name: n, value: v }; }

attr_required_cfimp_prefix
    = ws+ n:"prefix" eql v:(any_non_whitespace_value / empty_quote_value ) { return { name: n, value: v }; }

//attr_optional_cfimp
attr_cfcookie_expires_value
	= quote_char v:"never" quote_char   { return human_date('30 years'); }
	/ quote_char v:"now" quote_char     { return new Date(); }
	/ quote_char v:date_time quote_char { return Date.parse(v); }
	/ quote_char v:date quote_char      { return Date.parse(v); }
	/ quote_char v:integer quote_char   { return v; }

attr_cfdump_output_value
	= quote_char v:"browser" quote_char { return v; }
	/ quote_char v:"console" quote_char { return v; }
	/ quote_char v:"file" quote_char { return v; }
attr_cfdump_format_value
	= quote_char "text" quote_char { return v; }
	/ quote_char "html" quote_char { return v; }

attr_cferr_type_value
	= quote_char v:"exception" quote_char  { return v.toLowerCase(); }
	/ quote_char v:"validation" quote_char { return v.toLowerCase(); }
	/ quote_char v:"request" quote_char { return v.toLowerCase(); }
attr_cferr_exception_value
	= quote_char n:"application"    quote_char { return n.toLowerCase(); }
	/ quote_char n:"database"       quote_char { return n.toLowerCase(); }
	/ quote_char n:"template"       quote_char { return n.toLowerCase(); }
	/ quote_char n:"security"       quote_char { return n.toLowerCase(); }
	/ quote_char n:"object"         quote_char { return n.toLowerCase(); }
	/ quote_char n:"missingInclude" quote_char { return n.toLowerCase(); }
	/ quote_char n:"expression"     quote_char { return n.toLowerCase(); }
	/ quote_char n:"lock"           quote_char { return n.toLowerCase(); }
	/ quote_char n:"custom_type"    quote_char { return n.toLowerCase(); }
	/ quote_char n:"any"            quote_char { return n.toLowerCase(); }

login_storage_value 
	= quote_char v:cookie quote_char  { return v.toLowerCase(); }
	/ quote_char v:"session" quote_char { return v.toLowerCase(); }
script_protect_value 
	= quote_char v:"none" quote_char { return v.toLowerCase(); }
	/ quote_char v:"all" quote_char  { return v.toLowerCase(); }
	/ quote_char v:"list" quote_char { return v.toLowerCase(); }
client_storage_value 
	= any_value
	/ quote_char v:"Registry" quote_char { return v.toLowerCase(); }
	/ quote_char v:cookie  quote_char  { return v.toLowerCase(); }

cookie = v:(c o o k i e) { return flatten(v); }
// Common Generic Value Definitions
file_path_value
	= quote_char v:(wack (dir_value wack)* dir_value) quote_char { return flatten(v); }
dir_value
	= v:(!(wack / ws / quote_char) .)+ { return flatten(v); }
email_address_value
	= quote_char e:email quote_char { return e; }
email = n:(!(quote_char / ws / at) any)+ at:at d:domain { return flatten(n) + at + d; }

date_time = v:( date space time ) { return new Date(v); }
date = v:(integer integer integer integer '-' integer integer? '-' integer integer? ) { return new Date(v); }
time 
	= hr:([01] integer / '2' [0123] ) ':' 
	min:( [0-5] integer ) ':' 
	sec:( [0-5] integer )
	mill:( period integer integer integer integer )? { return new Date(hr + min + sec + mill); }

q_boolean_value 
	= quote_char v:boolean_value quote_char { return v; }
boolean_value 
	= y e s { return true; }
	/ n o  { return false; }
	/ t r u e  { return true; }
	/ f a l s e  { return false; }
	/ "1"  { return true; }
	/ "0"  { return false; }
cfval_value = quote_char v:cfval quote_char { return v; }
cfval = pound v:(!pound any)+ pound { return flatten(v); }

domain_value = quote_char v:domain quote_char { return v; }
domain = v:( ( dom_part+ period )+ dom_part+ ) { return flatten(v); }
dom_part = ( lcchars / '_' lcchars )+ ( '-' lcchars / lcchars )*
list_value = quote_char v:( ((!(comma / quote_char) any)+ comma )+ (!(comma / quote_char) any)+ ) quote_char { return flatten(v).split(','); }

// Generic Generic Value Defs
any_non_whitespace_value = quote_char v:( ( chars+ [\-_] )* chars )* quote_char { return flatten(v); }
any_non_quote_string = s:(!quote_char any)+ { return s.join(''); }
any_value = quote_char v:(!quote_char any)+ quote_char { return flatten(v); }
empty_quote_value = quote_char quote_char { return ""; }

ops = e q / n e q / l t /  l e / g t / g e / i s / n o t

func_create_time_span
	= empty_quote_value { return ""; }
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
any = .


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
//DataOutputTags
//	cfchart
//	cfchartdata
//	cfchartseries
//	cfcol
//	cfcontent
//	cfdocument
//	cfdocumentitem
//	cfdocumentsection
//	cfflush
//	cfheader
//	cflog
//	cfoutput
//	cfpresentation
//	cfpresentationslide
//	cfpresenter
//	cfprocessingdirective
//	cfprint
//	cfreport
//	cfreportparam
//	cfsilent
//	cftable
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
