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
	/ tag_cfcomponent
	/ tag_cfcontent
	/ tag_cfcontinue
	/ tag_cfcookie

	/ tag_cfdbinfo
	/ tag_cfdefaultcase
	/ tag_cfdirectory
	/ tag_cfdump
	/ tag_cfelse
	/ tag_cfelseif
	/ tag_cferror
	/ tag_cfexecute
	/ tag_cfexit
	/ tag_cffeed
	/ tag_cffile
	/ tag_cffinally
	/ tag_cfflush
	/ tag_cffunction
	/ tag_cfftp
	/ tag_cfheader
	/ tag_cfhtmlhead
	/ tag_cfhttp
	/ tag_cfhttpparam
	/ tag_cfif
	/ tag_cfimap
	/ tag_cfimport
	/ tag_cfinclude
	/ tag_cfinsert
	/ tag_cfinterface
	/ tag_cfinvokeargument
	/ tag_cfinvoke
	/ tag_cfldap
	/ tag_cflocation
	/ tag_cflock
	/ tag_cflog
	/ tag_cflogin
	/ tag_cfloginuser
	/ tag_cflogout
	/ tag_cfloop
	/ tag_cfmail
	/ tag_cfmailparam
	/ tag_cfmailpart
	/ tag_cfobjectcache
	/ tag_cfoutput
	/ tag_cfparam
	/ tag_cfpop
	/ tag_cfprocessingdirective
	/ tag_cfprocparam
	/ tag_cfprocresult
	/ tag_cfproperty
	/ tag_cfquery
	/ tag_cfqueryparam
	/ tag_cfrethrow
	/ tag_cfreturn
	/ tag_cfsavecontent
	/ tag_cfschedule
	/ tag_cfscript
	/ tag_cfsetting
	/ tag_cfsilent
	/ tag_cfstoredproc
	/ tag_cfswitch
	/ tag_cfthrow
	/ tag_cftimer
	/ tag_cftrace
	/ tag_cftransaction
	/ tag_cftry
	/ tag_cfupdate
	/ tag_cfxml
	/ tag_cfzip
	/ tag_cfzipparam
//
//  These tags are low priority because either: 
//  1) they require platform specific tie-ins or additional library tie-ins;
//  2) because they're IMO just CF wrapping HTML which is only marginally useful. I figure dev's will need to be specializing the page layout anyway so they can be handled there.
//  ... granted I'll be more likely to implement these first, when I get to that stage since they'll be easier than the former cases but for now they can wait.
//
//	/ tag_cfchart              // data output tags
//	/ tag_cfchartdata          // data output tags
//	/ tag_cfchartseries        // data output tags

//	/ tag_cfobject
//	/ tag_cfpresenter
//	/ tag_cfspreadsheet
//	/ tag_cfsprydataset
//	/ tag_cfthread
//	/ tag_cfwddx

//	/ tag_cfapplet             // html wrapper
//	/ tag_cfcalendar           // html wrapper
//	/ tag_cfcol                // html wrapper
//	/ tag_cfdiv                // html wrapper
//	/ tag_cffileupload         // html wrapper
//	/ tag_cfform               // html wrapper
//	/ tag_cfformgroup          // html wrapper
//	/ tag_cfformitem           // html wrapper
//	/ tag_cfpresentation       // html wrapper
//	/ tag_cfpresentationslide  // html wrapper
//	/ tag_cfgrid               // html wrapper
//	/ tag_cfgridcolumn         // html wrapper
//	/ tag_cfgridrow            // html wrapper
//	/ tag_cfgridupdate         // html wrapper
//	/ tag_cfimage              // html wrapper
//	/ tag_cfinput              // html wrapper
//	/ tag_cflayout             // html wrapper
//	/ tag_cflayoutarea         // html wrapper
//	/ tag_cfmap                // html wrapper
//	/ tag_cfmapitem            // html wrapper
//	/ tag_cfmediaplayer        // html wrapper
//	/ tag_cfmenu               // html wrapper
//	/ tag_cfmenuitem           // html wrapper
//	/ tag_cfmessagebox         // html wrapper
//	/ tag_cfpod                // html wrapper
//	/ tag_cfprogressbar        // html wrapper
//	/ tag_cfselect             // html wrapper
//	/ tag_cfslider             // html wrapper
//	/ tag_cftable              // html wrapper
//	/ tag_cftextarea           // html wrapper
//	/ tag_cftooltip            // html wrapper
//	/ tag_cftree               // html wrapper
//	/ tag_cftreeitem           // html wrapper
//	/ tag_cfwindow             // html wrapper
//	/ tag_cfNTauthenticate     // m$ integration
//	/ tag_cfexchangecalendar   // m$ integration
//	/ tag_cfexchangeconnection // m$ integration
//	/ tag_cfexchangecontact    // m$ integration
//	/ tag_cfexchangefilter     // m$ integration
//	/ tag_cfexchangemail       // m$ integration
//	/ tag_cfexchangetask       // m$ integration
//	/ tag_cfregistry           // m$ integration
//	/ tag_cfsharepoint         // m$ integration
//	/ tag_cfdocument           // pdf
//	/ tag_cfdocumentitem       // pdf
//	/ tag_cfdocumentsection    // pdf
//	/ tag_cfpdf                // pdf
//	/ tag_cfpdfform            // pdf
//	/ tag_cfpdfformparam       // pdf
//	/ tag_cfpdfparam           // pdf
//	/ tag_cfpdfsubform         // pdf
//	/ tag_cfprint              // pdf
//	/ tag_cfcollection         // verity/solr integration
//	/ tag_cfindex              // verity/solr integration
//	/ tag_cfreport             // verity/solr integration
//	/ tag_cfreportparam        // verity/solr integration
//	/ tag_cfsearch             // verity/solr integration
	/ anychar

// Tag Definitions

//@TODO: Allow tag_cfcache to work without a closing tag. When operating on an object, we don't need a body
tag_cfabort           =  lt  t:str_cfabort           attr:attr_cfabort*            ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfajaximport      =  lt  t:str_cfajaximport      attr:attr_cfajaximport*       ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfajaxproxy       =  lt  t:str_cfajaxproxy       attr:attr_cfajaxproxy+        ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfapplication     =  lt  t:str_cfapplication     attr:attr_cfapplication+      ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfassociate       =  lt  t:str_cfassociate       attr:attr_cfassociate+        ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfcase            =  lt  t:str_cfcase            attr:attr_cfcase+             ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfcontent         =  lt  t:str_cfcontent         attr:attr_cfcontent*          ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfcookie          =  lt  t:str_cfcookie          attr:attr_cfcookie+           ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfdbinfo          =  lt  t:str_cfdbinfo          attr:attr_cfdbinfo+           ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfdirectory       =  lt  t:str_cfdirectory       attr:attr_cfdirectory+        ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfdump            =  lt  t:str_cfdump            attr:attr_cfdump+             ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cferror           =  lt  t:str_cferror           attr:attr_cferror+            ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfexit            =  lt  t:str_cfexit            attr:attr_cfexit*             ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cffile            =  lt  t:str_cffile            attr:attr_cffile_append+      ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfflush           =  lt  t:str_cfflush           attr:attr_cfflush*            ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
                      /  lt  t:str_cffile            attr:attr_cffile_copy+        ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
                      /  lt  t:str_cffile            attr:attr_cffile_delete+      ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
                      /  lt  t:str_cffile            attr:attr_cffile_move+        ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
                      /  lt  t:str_cffile            attr:attr_cffile_read+        ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
                      /  lt  t:str_cffile            attr:attr_cffile_read_binary+ ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
                      /  lt  t:str_cffile            attr:attr_cffile_rename+      ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
                      /  lt  t:str_cffile            attr:attr_cffile_upload_all+  ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
                      /  lt  t:str_cffile            attr:attr_cffile_upload+      ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
                      /  lt  t:str_cffile            attr:attr_cffile_write+       ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfheader          =  lt  t:str_cfheader          attr:attr_cfheader*           ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfhtmlhead        =  lt  t:str_cfhtmlhead        attr:attr_cfhtmlhead          ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfhttpparam       =  lt  t:str_cfhttpparam       attr:attr_cfhttpparam+        ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfimport          =  lt  t:str_cfimport          attr:attr_cfimport+           ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfinclude         =  lt  t:str_cfinclude         attr:attr_cfinclude           ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfinsert          =  lt  t:str_cfinsert          attr:attr_cfinsert+           ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfinvokeargument  =  lt  t:str_cfinvokeargument  attr:attr_cfinvokeargument+   ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cflocation        =  lt  t:str_cflocation        attr:attr_cflocation+         ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cflog             =  lt  t:str_cflog             attr:attr_cflog+              ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfloginuser       =  lt  t:str_cfloginuser       attr:attr_cfloginuser+        ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfmailparam       =  lt  t:str_cfmailparam       attr:attr_cfmailparam+        ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfobjectcache     =  lt  t:str_cfobjectcache     attr:attr_objectcache         ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfparam           =  lt  t:str_cfparam           attr:attr_cfparam+            ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfprocparam       =  lt  t:str_cfprocparam       attr:attr_cfprocparam+        ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfprocresult      =  lt  t:str_cfprocresult      attr:attr_cfprocresult+       ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfproperty        =  lt  t:str_cfproperty        attr:attr_cfproperty+         ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfqueryparam      =  lt  t:str_cfqueryparam      attr:attr_cfqueryparam+       ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfschedule        =  lt  t:str_cfschedule        attr:attr_cfschedule+         ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfsetting         =  lt  t:str_cfsetting         attr:attr_cfsetting*          ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfstoredproc      =  lt  t:str_cfstoredproc      attr:attr_cfstoredproc+       ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfupdate          =  lt  t:str_cfupdate          attr:attr_cfupdate+           ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfxml             =  lt  t:str_cfxml             attr:attr_cfxml+              ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfzip             =  lt  t:str_cfzip             attr:attr_cfzip+              ws*  wack?  gt  {  return  new  cftag(t,  attr);  }
tag_cfzipparam        =  lt  t:str_cfzipparam        attr:attr_cfzipparam*         ws*  wack?  gt  {  return  new  cftag(t,  attr);  }

tag_cfcache           =  lt  t:str_cfcache      attr:attr_cfcache*      ws*         gt  content:(!tag_cfcache_close      anychar)*  tag_cfcache_close      {  return  new  cftag(t,  attr,  content);  }
tag_cfcatch           =  lt  t:str_cfcatch      attr:attr_cfcatch*      ws*         gt  content:(!tag_cfcatch_close      anychar)*  tag_cfcatch_close      {  return  new  cftag(t,  attr,  content);  }
tag_cfcomponent       =  lt  t:str_cfcomponent  attr:attr_cfcomponent*  ws*         gt  content:(!tag_cfcomponent_close  anychar)*  tag_cfcomponent_close  {  return  new  cftag(t,  attr,  content);  }
tag_cfelse            =  lt  t:str_cfelse                               ws*  wack?  gt  content:(!tag_cfif_close         anychar)*  tag_cfif_close         {  return  new  cftag(t,  [],    content);  }
tag_cfexecute         =  lt  t:str_cfexecute    attr:attr_cfexecute+    ws*         gt  content:(!tag_cfexecute_close    anychar)*  tag_cfexecute_close    {  return  new  cftag(t,  attr,  content);  }
tag_cffinally         =  lt  t:str_cffinally                            ws*         gt  content:(!tag_cffinally_close    anychar)*  tag_cffinally_close    {  return  new  cftag(t,  [],    content);  }
tag_cffunction        =  lt  t:str_cffunction   attr:attr_cffunction+   ws*         gt  content:(!tag_cffunction_close   anychar)*  tag_cffunction_close   {  return  new  cftag(t,  attr,  content);  }
tag_cfhttp            =  lt  t:str_cfhttp       attr:attr_cfhttp+       ws*         gt  content:(!tag_cfhttp_close       anychar)*  tag_cfhttp_close       {  return  new  cftag(t,  attr,  content);  }
tag_cfinterface       =  lt  t:str_cfinterface  attr:attr_cfinterface*  ws*         gt  content:(!tag_cfinterface_close  anychar)*  tag_cfinterface_close  {  return  new  cftag(t,  attr,  content);  }
tag_cflock            =  lt  t:str_cflock       attr:attr_cflock+       ws*         gt  content:(!tag_cflock_close       anychar)*  tag_cflock_close       {  return  new  cftag(t,  attr,  content);  }
tag_cflogin           =  lt  t:str_cflogin      attr:attr_cflogin*      ws*         gt  content:(!tag_cflogin_close      anychar)*  tag_cflogin_close      {  return  new  cftag(t,  attr,  content);  }

tag_cfbreak           =  lt  t:str_cfbreak        ws*  wack?  gt  {  return  new  cftag(t);  }
tag_cfcontinue        =  lt  t:str_cfcontinue     ws*  wack?  gt  {  return  new  cftag(t);  }
tag_cfdefaultcase     =  lt  t:str_cfdefaultcase  ws*  wack?  gt  {  return  new  cftag(t);  }
tag_cflogout          =  lt  t:str_cflogout       ws*  wack?  gt  {  return  new  cftag(t);  }
tag_cfloop            =  lt  t:str_cflogout       ws*  wack?  gt  {  return  new  cftag(t);  }
tag_cfrethrow         =  lt  t:str_cfrethrow      ws*  wack?  gt  {  return  new  cftag(t);  }
tag_cfthrow           =  lt  t:str_cfthrow        ws*  wack?  gt  {  return  new  cftag(t);  }

tag_cfcache_close                =  lt  wack  str_cfcache                gt
tag_cfcatch_close                =  lt  wack  str_cfcatch                gt
tag_cfcomponent_close            =  lt  wack  str_cfcomponent            gt
tag_cfexecute_close              =  lt  wack  str_cfexecute              gt
tag_cffinally_close              =  lt  wack  str_cffinally              gt
tag_cffunction_close             =  lt  wack  str_cffunction             gt
tag_cfhttp_close                 =  lt  wack  str_cfhttp                 gt
tag_cfif_close                   =  lt  wack  str_cfif                   gt
tag_cfinterface_close            =  lt  wack  str_cfinterface            gt
tag_cflock_close                 =  lt  wack  str_cflock                 gt
tag_cflogin_close                =  lt  wack  str_cflogin                gt
tag_cfloop_close                 =  lt  wack  str_cfloop                 gt
tag_cfmail_close                 =  lt  wack  str_cfmail                 gt
tag_cfmailpart_close             =  lt  wack  str_cfmailpart             gt
tag_cfoutput_close               =  lt  wack  str_cfoutput               gt
tag_cfprocessingdirective_close  =  lt  wack  str_cfprocessingdirective  gt
tag_cfquery_close                =  lt  wack  str_cfquery                gt
tag_cfsavecontent_close          =  lt  wack  str_cfsavecontent          gt
tag_cfscript_close               =  lt  wack  str_cfscript               gt
tag_cfsilent_close               =  lt  wack  str_cfsilent               gt
tag_cfswitch_close               =  lt  wack  str_cfswitch               gt
tag_cftimer_close                =  lt  wack  str_cftimer                gt
tag_cftrace_close                =  lt  wack  str_cftrace                gt
tag_cftransaction_close          =  lt  wack  str_cftransaction          gt
tag_cftry_close                  =  lt  wack  str_cftry                  gt

tag_cfelseif
	= lt t:str_cfelseif v:(!gt anychar)+ gt
	content:(!( tag_cfelseif / tag_cfelse / tag_cfif_close ) anychar)*
	(tag_cfelseif / tag_cfelse / tag_cfif_close ) {
		var me = new cftag(t, [], content),
		    val = plib.stringify(v, 'trim');
		if ( val === '' ) {
			throw new Error("Missing required expression.");
		} else {
			me.expression = val
		}

		return me;
	}

tag_cffeed        = lt t:str_cffeed attr:attr_cffeed+         ws* wack? gt { return new cftag(t, attr); }

tag_cfftp         = lt t:str_cfftp           attr:attr_cfftp_conn+          ws* wack? gt { return new cftag(t, attr); }
                  / lt t:str_cfftp           attr:attr_cfftp_file_dir+      ws* wack? gt { return new cftag(t, attr); }

tag_cfif
	= lt t:str_cfif v:(!gt anychar)+ gt 
	content:(!( tag_cfif_close / tag_cfelseif / tag_cfelse ) anychar)*
	( tag_cfif_close / tag_cfelseif / tag_cfelse ) {
		var me = new cftag(t, [], content),
		    val = plib.stringify(v, 'trim');
		if ( val === '' ) {
			throw new Error("Missing required expression.");		
		} else {
			me.expression = val
		}

		return me;
	}

tag_cfimap    = lt t:str_cfimap attr:attr_cfimap+ ws* wack? gt { return new cftag(t, attr); }
tag_cfinvoke
	= tag_cfinvoke_syntax1
//	/ tag_cfinvoke_syntax2
//	/ tag_cfinvoke_syntax3
//	/ tag_cfinvoke_syntax4a
//	/ tag_cfinvoke_syntax4b

//This attribute is required,      For this cfinvoke tag syntax:
//optional, ignored, or invalid:
//                                 Syntax 1  Syntax 2  Syntax 3  Syntax 4A Syntax 4B
//argumentCollection               Optional  Optional  Optional  Optional  Optional
//component                        Required  Optional  Invalid   Required  Invalid
//input_params...                  Optional  Optional  Optional  Optional  Optional
//method                           Required  Required  Required  Required  Required
//password                         Ignored   Ignored   Optional  Ignored   Optional
//proxyPassword                    Invalid   Invalid   Optional  Invalid   Optional
//proxyPort                        Invalid   Invalid   Optional  Invalid   Optional
//proxyServer                      Invalid   Invalid   Optional  Invalid   Optional
//proxyUser                        Invalid   Invalid   Optional  Invalid   Optional
//returnVariable                   Optional  Optional  Optional  Optional  Optional
//servicePort                      Invalid   Invalid   Optional  Invalid   Optional
//timeout                          Invalid   Invalid   Optional  Invalid   Optional
//username                         Ignored   Ignored   Optional  Ignored   Optional
//webservice                       Invalid   Invalid   Required  Invalid   Required
//wsdl2javaArgs                    Invalid   Invalid   Optional  Invalid   Optional

tag_cfinvoke_syntax1 = lt t:str_cfinvoke attr:( 
		attr_cfinvoke_syntax1_optional* attr_cfinvoke_syntax1_required+ attr_cfinvoke_syntax1_optional* attr_cfinvoke_syntax1_required+ attr_cfinvoke_syntax1_optional*
		/ attr_cfinvoke_syntax1_required+ attr_cfinvoke_syntax1_optional+ attr_cfinvoke_syntax1_required+
		/ attr_cfinvoke_syntax1_required+ attr_cfinvoke_syntax1_optional+
		/ attr_cfinvoke_syntax1_required+
  ) ws* wack? gt {
		return new cftag(t, attr);
  }

tag_cfldap = lt t:str_cfldap attr:attr_cfldap+ ws* wack? gt { return new cftag(t, attr); }

tag_cfloop        = lt t:str_cfloop           attr:attr_cfloop_array+      gt content:(!tag_cfloop_close anychar)* tag_cfloop_close { return new cftag(t, attr, content, 'array'); }
	                / lt t:str_cfloop           attr:attr_cfloop_conditional gt content:(!tag_cfloop_close anychar)* tag_cfloop_close { return new cftag(t, attr, content, 'conditional'); }
	                / lt t:str_cfloop           attr:attr_cfloop_date_range+ gt content:(!tag_cfloop_close anychar)* tag_cfloop_close { return new cftag(t, attr, content, 'date_range'); }
	                / lt t:str_cfloop           attr:attr_cfloop_file+       gt content:(!tag_cfloop_close anychar)* tag_cfloop_close { return new cftag(t, attr, content, 'file'); }
	                / lt t:str_cfloop           attr:attr_cfloop_index+      gt content:(!tag_cfloop_close anychar)* tag_cfloop_close { return new cftag(t, attr, content, 'index'); }
	                / lt t:str_cfloop           attr:attr_cfloop_list+       gt content:(!tag_cfloop_close anychar)* tag_cfloop_close { return new cftag(t, attr, content, 'list'); }
	                / lt t:str_cfloop           attr:attr_cfloop_query+      gt content:(!tag_cfloop_close anychar)* tag_cfloop_close { return new cftag(t, attr, content, 'query'); }
	                / lt t:str_cfloop           attr:attr_cfloop_collection+ gt content:(!tag_cfloop_close anychar)* tag_cfloop_close { return new cftag(t, attr, content, 'collection'); }

tag_cfmail        = lt t:str_cfmail     attr:attr_cfmail+     ws* gt content:(!tag_cfmail_close anychar)*     tag_cfmail_close     { return new cftag(t, attr, content); }
tag_cfmailpart    = lt t:str_cfmailpart attr:attr_cfmailpart+ ws* gt content:(!tag_cfmailpart_close anychar)* tag_cfmailpart_close { return new cftag(t, attr, content); }
tag_cfoutput      = lt t:str_cfoutput   attr:attr_cfoutput*   ws* gt content:(!tag_cfoutput_close anychar)*   tag_cfoutput_close   { return new cftag(t, attr, content); }
tag_cfpop         = lt t:str_cfpop attr:attr_cfpop+ ws* wack? gt { return new cftag(t, attr); }

tag_cfprocessingdirective
	= lt t:str_cfprocessingdirective attr:attr_cfprocessingdirective* gt content:(!tag_cfprocessingdirective_close anychar)* tag_cfprocessingdirective_close { return new cftag(t, attr, content); }
	/ lt t:str_cfprocessingdirective attr:attr_cfprocessingdirective*                                                        ws* wack? gt                    { return new cftag(t, attr); }

tag_cfquery = lt t:str_cfquery attr:attr_cfquery+ gt content:(!tag_cfquery_close anychar)* tag_cfquery_close { return new cftag(t, attr, content); }
tag_cfreturn = lt t:str_cfreturn v:(!gt anychar)+ gt {
		var me = new cftag(t),
		    val = plib.stringify(v, 'trim');
		if ( val === '' ) {
			throw new Error("Missing required expression.");		
		} else {
			me.expression = val
		}

		return me;
	}

tag_cfsavecontent = lt t:str_cfsavecontent attr:attr_cfsavecontent  gt  content:(!tag_cfsavecontent_close  anychar)*           tag_cfsavecontent_close  { return new cftag(t,  attr, content);  }
tag_cfscript      = lt t:str_cfscript                               gt  content:(!tag_cfscript_close       anychar)*           tag_cfscript_close       { return new cftag(t,  [], content);  }
tag_cfsilent      = lt t:str_cfsilent                               gt  content:(!tag_cfsilent_close       anychar)*           tag_cfsilent_close       { return new cftag(t,  [], content);  }
tag_cfswitch      = lt t:str_cfswitch      attr:attr_expression     gt  content:(!tag_cfswitch_close       anychar)*           tag_cfswitch_close       { return new cftag(t,  attr);                   }
tag_cftimer       = lt t:str_cftimer       attr:attr_cftimer*       gt  content:(!tag_cftimer_close        anychar)*           tag_cftimer_close        { return new cftag(t,  attr, content);  }
tag_cftrace       = lt t:str_cftrace       attr:attr_cftrace*       gt  content:(!tag_cftrace_close        anychar)*           tag_cftrace_close        { return new cftag(t,  attr, content);  }
tag_cftransaction = lt t:str_cftransaction attr:attr_cftransaction* gt  content:(!tag_cftransaction_close  anychar)*           tag_cftransaction_close  { return new cftag(t,  attr, content);  }
tag_cftry         = lt t:str_cftry                                  gt  content:(!tag_cftry_close          anychar)*           tag_cftry_close          { return new cftag(t,  [], content);  }

tag_cftry
	= lt t:str_cftry gt
	content:(!(lt wack str_cftry gt) anychar)*
	lt wack str_cftry gt {
		return new cftag(t, [], content);
	}

tag_cfxml      = lt t:str_cfxml      attr:( attr_variable attr_case_sensitive? / attr_case_sensitive? attr_variable ) ws* wack? gt { return new cftag(t, attr); }

//End Tags

// tag attributes

//attr_batch_size                 =         ws+  n:str_batch_size                 eql  v:value_      {  return  {  name:  n,              value:  v  };  }
//attr_cascade                    =         ws+  n:str_cascade                    eql  v:value_      {  return  {  name:  n,              value:  v  };  }
//attr_catalog                    =         ws+  n:str_catalog                    eql  v:value_      {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_batch_size                 eql  v:value_      {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_cascade                    eql  v:value_      {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_catalog                    eql  v:value_      {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_collection_type            eql  v:value_      {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_column                     eql  v:value_      {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_data_type                  eql  v:value_      {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_element_column             eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_element_type               eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_entity_name                eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_field_type                 eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_fkcolumn                   eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_formula                    eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_generator                  eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_index                      eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_inverse_join_column        eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_join_column                eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_link_catalog               eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_link_schema                eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_link_table                 eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_mapped_by                  eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_mapped_by                  eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_optimistic_lock_generated  eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_order_by                   eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_order_by_read_only         eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_params                     eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_row_id                     eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_schema                     eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_select_key                 eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_sequence                   eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_struct_key_column          eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_struct_key_data_type       eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_struct_key_type            eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_unique_key                 eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_cfproperty                 /         ws+  n:str_where                      eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_collection_type            =         ws+  n:str_collection_type            eql  v:value_      {  return  {  name:  n,              value:  v  };  }
//attr_column                     =         ws+  n:str_column                     eql  v:value_      {  return  {  name:  n,              value:  v  };  }
//attr_data_type                  =         ws+  n:str_data_type                  eql  v:value_      {  return  {  name:  n,              value:  v  };  }
//attr_element_column             =         ws+  n:str_element_column             eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_element_type               =         ws+  n:str_element_type               eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_entity_name                =         ws+  n:str_entity_name                eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_fetch_batch_size           =         ws+  n:str_fetch_batch_size           eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_field_type                 =         ws+  n:str_field_type                 eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_fkcolumn                   =         ws+  n:str_fkcolumn                   eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_form_fields                =         ws+  n:str_form_fields                eql  v:value_list  {  return  {  name:  'form_fields',  value:  v  };  }
//attr_formula                    =         ws+  n:str_formula                    eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_generator                  =         ws+  n:str_generator                  eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_input_params...            Optional  
//attr_inverse_join_column        =         ws+  n:str_inverse_join_column        eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_join_column                =         ws+  n:str_join_column                eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_link_catalog               =         ws+  n:str_link_catalog               eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_link_schema                =         ws+  n:str_link_schema                eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_link_table                 =         ws+  n:str_link_table                 eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_optimistic_lock_generated  =         ws+  n:str_optimistic_lock_generated  eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_order_by                   =         ws+  n:str_order_by                   eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_order_by_read_only         =         ws+  n:str_order_by_read_only         eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_params                     =         ws+  n:str_params                     eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_row_id                     =         ws+  n:str_row_id                     eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_schema                     =         ws+  n:str_schema                     eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_select_key                 =         ws+  n:str_select_key                 eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_sequence                   =         ws+  n:str_sequence                   eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_struct_key_column          =         ws+  n:str_struct_key_column          eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_struct_key_data_type       =         ws+  n:str_struct_key_data_type       eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_struct_key_type            =         ws+  n:str_struct_key_type            eql  v:value_any   {  return  {  name:  n,              value:  v  };  }
//attr_unique_key                 =         ws+  n:str_unique_key                 eql  v:value_any   {  return  {  name:  n,              value:  v  };  }  
//attr_where                      =         ws+  n:str_where                      eql  v:value_any   {  return  {  name:  n,              value:  v  };  }

attr_abort                        =  ws+  n:str_abort                        eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_accept                       =  ws+  n:str_accept                       eql  v:value_mime                              {                     return             {                          name:          n,                              value:      v                         };              }
attr_access                       =  ws+  n:str_access                       eql  v:value_cffunction_access                 {                     return             {                          name:          n,                              value:      v                         };              }
attr_accessors                    =  ws+  n:str_accessors                    eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_action_cache                 =  ws+  n:str_action                       eql  v:value_cfcache_action                    {                     return             {                          name:          n,                              value:      v                         };              }
attr_action_directory             =  ws+  n:str_action                       eql  v:value_cfdirectory_action                {                     return             {                          name:          n,                              value:      v                         };              }
attr_action_file                  =  ws+  n:str_action                       eql  v:value_action_file                       {                     return             {                          name:          n,                              value:      v                         };              }
attr_action_ftp                   =  ws+  n:str_action                       eql  v:value_cfftp_action                      {                     return             {                          name:          n,                              value:      v                         };              }
attr_action_ftp_file_dir          =  ws+  n:str_action                       eql  v:value_cfftp_file_dir_action             {                     return             {                          name:          n,                              value:      v                         };              }
attr_action_imap                  =  ws+  n:str_action                       eql  v:value_cfimap_action                     {                     return             {                          name:          n,                              value:      v                         };              }
attr_action_ldap                  =  ws+  n:str_action                       eql  v:value_cfldap_action                     {                     return             {                          name:          n,                              value:      v                         };              }
attr_action_objectcache           =  ws+  n:str_action                       eql  quote_char                                v:str_clear           quote_char         {                          return         {                               name:       n,                        value:          v             };                 }
attr_action_param                 =  ws+  n:str_action_param                 eql  v:value_any_non_whitespace                {                     return             {                          name:          n,                              value:      v                         };              }
attr_action_pop                   =  ws+  n:str_action                       eql  v:value_cfpop_action                      {                     return             {                          name:          n,                              value:      v                         };              }
attr_action_schedule              =  ws+  n:str_action                       eql  v:value_cfschedule_action                 {                     return             {                          name:          n,                              value:      v                         };              }
attr_action_transaction           =  ws+  n:str_action                       eql  v:value_cftransaction_action              {                     return             {                          name:          n,                              value:      v                         };              }
attr_action_zip                   =  ws+  n:str_action                       eql  v:value_zip_action                        {                     return             {                          name:          n,                              value:      v                         };              }
attr_add_newline                  =  ws+  n:str_add_newline                  eql  v:value_boolean                           {                     return             {                          name:          'add_newline',                  value:      v                         };              }
attr_add_token                    =  ws+  n:str_add_token                    eql  v:value_boolean                           {                     return             {                          name:          'add_token',                    value:      v                         };              }
attr_ajax_params                  =  ws+  n:str_params                       eql  v:value_cfajaximport_params_googlemapkey  {                     return             {                          name:          n,                              value:      plib.stringify(v)         };              }
attr_alias                        =  ws+  n:str_alias                        eql  v:value_any_non_whitespace                {                     return             {                          name:          n,                              value:      v                         };              }
attr_application                  =  ws+  n:str_application                  eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_application_timeout          =  ws+  n:str_application_timeout          eql  v:value_time_span_func                    {                     return             {                          name:          'timeout',                      value:      v                         };              }
attr_application_token            =  ws+  n:str_application_token            eql  v:value_any_non_whitespace                {                     return             {                          name:          'application_token',            value:      v                         };              }
attr_argument_collection          =  ws+  n:str_argument_collection          eql  v:value_any_non_whitespace                {                     return             {                          name:          'argument_collection',          value:      v                         };              }
attr_arguments                    =  ws+  n:str_arguments                    eql  v:value_any_non_whitespace                {                     return             {                          name:          plib.stringify(n,               'lower'),   value:                    v               };            }
attr_array                        =  ws+  n:str_array                        eql  v:value_cfval                             {                     return             {                          name:          n,                              value:      v                         };              }
attr_ascii_extension_list         =  ws+  n:str_ascii_extension_list         eql  v:value_semicolin_sep_list                {                     return             {                          name:          n,                              value:      v                         };              }
attr_attachment_path              =  ws+  n:str_attachment_path              eql  v:value_file_path                         {                     return             {                          name:          'attachment_path',              value:      v                         };              }
attr_attributes                   =  ws+  n:str_attributes                   eql  v:(value_cffile_attributes                /                     value_any)         {                          return         {                               name:       n,                        value:          v             };                 }
attr_attributes_ldap              =  ws+  n:str_attributes                   eql  v:(                                       value_asterisk        /                  value_any                  /              value_comma_sep_list            /           value_semicolin_sep_list  )               {             return             {                  name:       n,                 value:    v   };     }
attr_base_tag                     =  ws+  n:str_base_tag                     eql  v:value_any_non_whitespace                {                     return             {                          name:          'base_tag',                     value:      v                         };              }
attr_bcc                          =  ws+  n:str_bcc                          eql  v:value_email_address                     {                     return             {                          name:          'bcc',                          value:      v                         };              }
attr_bind                         =  ws+  n:str_bind                         eql  v:value_any_non_whitespace                {                     return             {                          name:          'bind',                         value:      v                         };              }
attr_binding_name                 =  ws+  n:str_binding_name                 eql  v:value_any_non_whitespace                {                     return             {                          name:          'binding_name',                 value:      v                         };              }
attr_block_factor                 =  ws+  n:str_block_factor                 eql  v:value_integer                           {                     return             {                          name:          'block_factor',                 value:      v                         };              }
attr_boolean_output               =  ws+  n:str_output                       eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_buffer_size                  =  ws+  n:str_buffer_size                  eql  v:value_integer                           {                     return             {                          name:          'buffer_size',                  value:      v                         };              }
attr_cached_after                 =  ws+  n:str_cached_after                 eql  v:value_time_span_func                    {                     return             {                          name:          'cached_after',                 value:      v                         };              }
attr_cached_after_date            =  ws+  n:str_cached_after                 eql  quote_char                                v:date                quote_char         {                          return         {                               name:       'cached_after',           value:          v             };                 }
attr_cached_within                =  ws+  n:str_cached_within                eql  v:value_time_span_func                    {                     return             {                          name:          'cached_within',                value:      v                         };              }
attr_case_sensitive               =  ws+  n:str_case_sensitive               eql  v:value_boolean                           {                     return             {                          name:          'case_sensitive',               value:      v                         };              }
attr_category                     =  ws+  n:str_category                     eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_cc                           =  ws+  n:str_cc                           eql  v:value_email_address                     {                     return             {                          name:          'cc',                           value:      v                         };              }
attr_cfc                          =  ws+  n:str_cfc                          eql  v:value_any_non_whitespace                {                     return             {                          name:          n,                              value:      v                         };              }
attr_cfvar_var                    =  ws+  n:str_var                          eql  v:value_cfval                             {                     return             {                          name:          n,                              value:      v                         };              }             
attr_characters                   =  ws+  n:str_characters                   eql  v:value_integer                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_charset                      =  ws+  n:str_charset                      eql  v:value_charset                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_client_cert                  =  ws+  n:str_client_cert                  eql  v:value_file_path                         {                     return             {                          name:          'client_cert',                  value:      v                         };              }
attr_client_cert_password         =  ws+  n:str_client_cert_password         eql  v:value_any                               {                     return             {                          name:          'client_cert_password',         value:      v                         };              }
attr_client_management            =  ws+  n:str_client_management            eql  v:value_boolean                           {                     return             {                          name:          'client_variables',             value:      v                         };              }
attr_client_storage               =  ws+  n:str_client_storage               eql  v:value_cfapplication_client_storage      {                     return             {                          name:          'client_storage',               value:      v                         };              }
attr_collection                   =  ws+  n:str_collection                   eql  v:value_cfval                             {                     return             {                          name:          n,                              value:      v                         };              }
attr_column_map                   =  ws+  n:str_column_map                   eql  v:value_any                               {                     return             {                          name:          'column_map',                   value:      v                         };              }
attr_component                    =  ws+  n:str_component                    eql  v:value_any_non_whitespace                {                     return             {                          name:          n,                              value:      v                         };              }
attr_compression                  =  ws+  n:str_compression                  eql  quote_char                                v:str_none            quote_char         {                          return         {                               name:       n,                        value:          v             };                 }
attr_condition                    =  ws+  n:str_condition                    eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_connection                   =  ws+  n:str_connection                   eql  v:value_any_non_whitespace                {                     return             {                          name:          n,                              value:      v                         };              }
attr_constrained                  =  ws+  n:str_constrained                  eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_content                      =  ws+  n:str_content                      eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_content_id                   =  ws+  n:str_content_id                   eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_cookie_domain                =  ws+  n:str_cookie_domain                eql  v:value_domain                            {                     return             {                          name:          'cookie_domain',                value:      v                         };              }
attr_css_src                      =  ws+  n:str_css_src                      eql  v:value_file_path                         {                     return             {                          name:          'css_src',                      value:      v                         };              }
attr_data_collection              =  ws+  n:str_data_collection              eql  v:value_any_non_whitespace                {                     return             {                          name:          'data_collection',              value:      v                         ==              ""            ?                  "AssocAttribs"     :           v                  };        }
attr_datasource                   =  ws+  n:str_datasource                   eql  v:value_any_non_whitespace                {                     return             {                          name:          'datasource',                   value:      v                         };              }
attr_dbname                       =  ws+  n:str_dbname                       eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_dbtype                       =  ws+  n:str_dbtype                       eql  quote_char                                v:(h                  q                  l)                         quote_char     {                               return      {                         name:           n,            value:             plib.stringify(v,  'lower')    };                 }
attr_debug                        =  ws+  n:str_debug                        eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_default                      =  ws+  n:str_default                      eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_delete_file                  =  ws+  n:str_delete_file                  eql  v:value_boolean                           {                     return             {                          name:          'delete_file',                  value:      v                         };              }
attr_delimiter                    =  ws+  n:str_delimiter                    eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_depends_on                   =  ws+  n:str_depends_on                   eql  v:value_list                              {                     return             {                          name:          'depends_on',                   value:      v                         };              }
attr_description                  =  ws+  n:str_description                  eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_destination                  =  ws+  n:str_destination                  eql  v:value_file_path                         {                     return             {                          name:          n,                              value:      v                         };              }
attr_directory                    =  ws+  n:str_directory                    eql  v:(                                       value_file_path       /                  value_any_non_whitespace   )              {                               return      {                         name:           n,            value:             v                  };          }
attr_disk_persistent              =  ws+  n:str_disk_persistent              eql  v:value_boolean                           {                     return             {                          name:          'disk_persistent',              value:      v                         };              }
attr_display_name                 =  ws+  n:str_display_name                 eql  v:value_any                               {                     return             {                          name:          'display_name',                 value:      v                         };              }
attr_disposition                  =  ws+  n:str_disposition                  eql  v:value_disposition                       {                     return             {                          name:          'disposition',                  value:      v                         };              }
attr_dn                           =  ws+  n:str_dn                           eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_domain                       =  ws+  n:str_domain                       eql  v:value_domain                            {                     return             {                          name:          n,                              value:      v                         };              }
attr_dynamic_insert               =  ws+  n:str_dynamic_insert               eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_dynamic_update               =  ws+  n:str_dynamic_update               eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_enable_cfouput_only          =  ws+  n:str_enable_cfouput_only          eql  v:value_boolean                           {                     return             {                          name:          'enable_cfoutput_only',         value:      v                         };              }
attr_enclosure_dir                =  ws+  n:str_enclosure_dir                eql  v:value_file_path                         {                     return             {                          name:          'enclosure_dir',                value:      v                         };              }
attr_encoded                      =  ws+  n:str_encoded                      eql  v:value_boolean                           {                     return             {                          name:          'encoded',                      value:      v                         };              }
attr_end_date                     =  ws+  n:str_end_date                     eql  v:value_date                              {                     return             {                          name:          'end_date',                     value:      v                         };              }
attr_end_row                      =  ws+  n:str_end_row                      eql  v:value_integer                           {                     return             {                          name:          'end_row',                      value:      v                         };              }
attr_end_time                     =  ws+  n:str_end_time                     eql  v:(value_integer                          /                     value_time         )                          {              return                          {           name:                     'end_time',     value:        v                  };                 }
attr_entry_path                   =  ws+  n:str_entry_path                   eql  v:value_file_path                         {                     return             {                          name:          'entry_path',                   value:      v                         };              }
attr_escape_chars                 =  ws+  n:str_escape_chars                 eql  v:value_boolean                           {                     return             {                          name:          'escape_chars',                 value:      v                         };              }
attr_exception                    =  ws+  n:str_exception                    eql  v:value_cferror_exception                 {                     return             {                          name:          n,                              value:      v                         };              }
attr_existing                     =  ws+  n:str_existing                     eql  v:value_any_non_whitespace                {                     return             {                          name:          n,                              value:      v                         };              }
attr_expand                       =  ws+  n:str_expand                       eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_expire_url                   =  ws+  n:str_expire_url                   eql  v:value_url                               {                     return             {                          name:          'expire_url',                   value:      v                         };              }
attr_expires                      =  ws+  n:str_expires                      eql  v:value_cfcookie_expires                  {                     return             {                          name:          n,                              value:      v                         };              }
attr_expression                   =  ws+  n:str_expression                   eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_extends                      =  ws+  n:str_extends                      eql  v:(                                       str_component         /                  value_any                  )              {                               return      {                         name:           n,            value:             v                  };          }
attr_extends_list                 =  ws+  n:str_extends                      eql  v:(                                       value_comma_sep_list  /                  value_any                  )              {                               return      {                         name:           n,            value:             v                  };          }
attr_fail_if_exists               =  ws+  n:str_fail_if_exists               eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_fail_to                      =  ws+  n:str_fail_to                      eql  v:value_email_address                     {                     return             {                          name:          'fail_to',                      value:      v                         };              }
attr_feed_action                  =  ws+  n:str_action                       eql  v:value_cffeed_action                     {                     return             {                          name:          n,                              value:      v                         };              }
attr_feed_name                    =  ws+  n:str_name                         eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_feed_source                  =  ws+  n:str_source                       eql  v:(                                       value_file_path       /                  value_url                  )              {                               return      {                         name:           n,            value:             v                  };          }
attr_fetch                        =  ws+  n:str_fetch                        eql  quote_char                                v:(                   str_select         /                          str_join       )                               quote_char  {                         return          {             name:              n,                 value:      v                  };        }
attr_file                         =  ws+  n:str_file                         eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_file_action                  =  ws+  n:str_action                       eql  v:value_cffile_action                     {                     return             {                          name:          n,                              value:      v                         };              }
attr_file_field                   =  ws+  n:str_file_field                   eql  v:value_any_non_whitespace                {                     return             {                          name:          'file_field',                   value:      v                         };              }
attr_file_path                    =  ws+  n:str_file                         eql  v:value_file_path                         {                     return             {                          name:          n,                              value:      v                         };              }
attr_file_source                  =  ws+  n:str_source                       eql  v:value_file_path                         {                     return             {                          name:          n,                              value:      v                         };              }
attr_filter                       =  ws+  n:str_filter                       eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_fingerprint                  =  ws+  n:str_fingerprint                  eql  v:value_fingerprint                       {                     return             {                          name:          n,                              value:      v                         };              }
attr_fix_newline                  =  ws+  n:str_fix_newline                  eql  v:value_boolean                           {                     return             {                          name:          'fix_newline',                  value:      v                         };              }
attr_folder                       =  ws+  n:str_folder                       eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_form_fields                  =  ws+  n:str_form_fields                  eql  v:value_comma_sep_list                    {                     return             {                          name:          'form_fields',                  value:      v                         };              }
attr_format                       =  ws+  n:str_format                       eql  v:value_cfdump_format                     {                     return             {                          name:          n,                              value:      v                         };              }
attr_from                         =  ws+  n:str_from                         eql  v:value_integer                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_from_date_time               =  ws+  n:str_from                         eql  v:value_date_time                         {                     return             {                          name:          n,                              value:      v                         };              }
attr_from_email                   =  ws+  n:str_from                         eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_generate_unique_filenames    =  ws+  n:str_generate_unique_filenames    eql  v:value_boolean                           {                     return             {                          name:          'generate_unique_filenames',    value:      v                         };              }
attr_generated                    =  ws+  n:str_generated                    eql  v:value_cfproperty_generated              {                     return             {                          name:          n,                              value:      v                         };              }
attr_get_as_binary                =  ws+  n:str_get_as_binary                eql  v:value_boolean                           {                     return             {                          name:          'get_as_binary',                value:      v                         };              }
attr_getter                       =  ws+  n:str_getter                       eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_google_map_key               =  ws+  n:str_google_map_key               eql  v:value_any                               {                     return             {                          name:          'google_map_key',               value:      v                         };              }
attr_group                        =  ws+  n:str_group                        eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_group_case_sensitive         =  ws+  n:str_group_case_sensitive         eql  v:value_boolean                           {                     return             {                          name:          'group_case_sensitive',         value:      v                         };              }
attr_hide                         =  ws+  n:str_hide                         eql  v:(                                       value_comma_sep_list  /                  value_any_non_whitespace   )              {                               return      {                         name:           n,            value:             v                  };          }
attr_hint                         =  ws+  n:str_hint                         eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_http_only                    =  ws+  n:str_http_only                    eql  v:value_boolean                           {                     return             {                          name:          'http_only',                    value:      v                         };              }
attr_id                           =  ws+  n:str_id                           eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_idle_time                    =  ws+  n:str_idle_time                    eql  v:value_float                             {                     return             {                          name:          'idle_time',                    value:      v                         };              }
attr_idle_timeout                 =  ws+  n:str_idle_timeout                 eql  v:value_integer                           {                     return             {                          name:          'idle_timeout',                 value:      v                         };              }
attr_ignore_enclosure_error       =  ws+  n:str_ignore_enclosure_error       eql  v:value_boolean                           {                     return             {                          name:          'ignore_enclosure_error',       value:      v                         };              }
attr_implements                   =  ws+  n:str_implements                   eql  v:value_any_non_whitespace                {                     return             {                          name:          n,                              value:      v                         };              }
attr_index                        =  ws+  n:str_index                        eql  v:value_any_non_whitespace                {                     return             {                          name:          n,                              value:      v                         };              }
attr_inline                       =  ws+  n:str_inline                       eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_insert                       =  ws+  n:str_insert                       eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_interval                     =  ws+  n:str_interval                     eql  v:value_integer                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_inverse                      =  ws+  n:str_inverse                      eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_isolation                    =  ws+  n:str_isolation                    eql  v:value_cftransaction_isolation           {                     return             {                          name:          n,                              value:      v                         };              }
attr_item                         =  ws+  n:str_item                         eql  v:value_any_non_whitespace                {                     return             {                          name:          n,                              value:      v                         };              }
attr_js_class_name                =  ws+  n:str_js_class_name                eql  v:value_any_non_whitespace                {                     return             {                          name:          'js_class_name',                value:      v                         };              }
attr_key                          =  ws+  n:str_key                          eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_key_alias                    =  ws+  n:str_key_alias                    eql  v:value_any_non_whitespace                {                     return             {                          name:          'key_alias',                    value:      v                         };              }             
attr_key_password                 =  ws+  n:str_key_password                 eql  v:value_any_non_whitespace                {                     return             {                          name:          'key_password',                 value:      v                         };              }             
attr_key_store                    =  ws+  n:str_key_store                    eql  v:value_file_path                         {                     return             {                          name:          'key_store',                    value:      v                         };              }             
attr_key_store_password           =  ws+  n:str_key_store_password           eql  v:value_any_non_whitespace                {                     return             {                          name:          'key_store_password',           value:      v                         };              }             
attr_keys                         =  ws+  n:str_keys                         eql  v:value_integer                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_label                        =  ws+  n:str_label                        eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_lazy                         =  ws+  n:str_lazy                         eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_length                       =  ws+  n:str_length                       eql  v:value_integer                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_list                         =  ws+  n:str_list                         eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_list_info                    =  ws+  n:str_list_info                    eql  quote_char                                v:(                   str_all            /                          str_name       )                               quote_char  {                         return          {             name:              'list_info',       value:      v                  };        }
attr_list_list                    =  ws+  n:str_list                         eql  v:value_comma_sep_list                    {                     return             {                          name:          n,                              value:      v                         };              }
attr_local_file                   =  ws+  n:str_local_file                   eql  v:(                                       value_file_path       /                  value_any_non_whitespace   )              {                               return      {                         name:           n,            value:             v                  };          }
attr_log                          =  ws+  n:str_log                          eql  v:value_cflog_log                         {                     return             {                          name:          n,                              value:      v                         };              }
attr_login_storage                =  ws+  n:str_login_storage                eql  v:value_cfapplication_login_storage       {                     return             {                          name:          'login_storage',                value:      v                         };              }
attr_mail_to                      =  ws+  n:str_mail_to                      eql  v:value_email_address                     {                     return             {                          name:          n,                              value:      v                         };              }
attr_mailer_id                    =  ws+  n:str_mailer_id                    eql  v:value_any                               {                     return             {                          name:          'mailer_id',                    value:      v                         };              }
attr_mapped_super_class           =  ws+  n:str_mapped_super_class           eql  v:value_boolean                           {                     return             {                          name:          'mapped_super_class',           value:      v                         };              }
attr_max                          =  ws+  n:str_max                          eql  v:value_integer                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_max_length                   =  ws+  n:str_max_length                   eql  v:value_integer                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_max_rows                     =  ws+  n:str_max_rows                     eql  v:value_integer                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_message_number               =  ws+  n:str_message_number               eql  v:value_integer                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_meta_info                    =  ws+  n:str_meta_info                    eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_metadata                     =  ws+  n:str_metadata                     eql  v:value_cfval                             {                     return             {                          name:          n,                              value:      v                         };              }
attr_method_exit                  =  ws+  n:str_method                       eql  v:value_exit_method                       {                     return             {                          name:          n,                              value:      v                         };              }
attr_method_http                  =  ws+  n:str_method                       eql  v:value_http_method                       {                     return             {                          name:          n,                              value:      v                         };              }
attr_method_invoke                =  ws+  n:str_method                       eql  v:value_any_non_whitespace                {                     return             {                          name:          n,                              value:      v                         };              }
attr_mime_attach                  =  ws+  n:str_mime_attach                  eql  v:value_file_path                         {                     return             {                          name:          'mime_attach',                  value:      v                         };              }
attr_mime_type                    =  ws+  n:str_mime_type                    eql  v:value_mime                              {                     return             {                          name:          'mime_type',                    value:      v                         };              }
attr_min                          =  ws+  n:str_min                          eql  v:value_integer                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_missing_row_ignored          =  ws+  n:str_missing_row_ignored          eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_mode                         =  ws+  n:str_mode                         eql  v:value_permission_mode                   {                     return             {                          name:          n,                              value:      v                         };              }
attr_modify_type                  =  ws+  n:str_modify_type                  eql  v:value_modify_type                       {                     return             {                          name:          n,                              value:      v                         };              }
attr_multipart                    =  ws+  n:str_multipart                    eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_multipart_type               =  ws+  n:str_multipart_type               eql  v:value_multipart_type                    {                     return             {                          name:          n,                              value:      v                         };              }
attr_name                         =  ws+  n:str_name                         eql  v:value_any_non_whitespace                {                     return             {                          name:          n,                              value:      v                         };              }
attr_name_conflict                =  ws+  n:str_name_conflict                eql  v:value_name_conflict                     {                     return             {                          name:          n,                              value:      v                         };              }
attr_name_zip                     =  ws+  n:str_name                         eql  v:value_name_zip                          {                     return             {                          name:          n,                              value:      v                         };              }
attr_namespace                    =  ws+  n:str_namespace                    eql  v:value_any_non_whitespace                {                     return             {                          name:          n,                              value:      v                         };              }
attr_nested                       =  ws+  n:str_nested                       eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_new                          =  ws+  n:str_new                          eql  v:(                                       value_file_path       /                  value_any_non_whitespace   )              {                               return      {                         name:           'new',        value:             v                  };          }
attr_new_directory                =  ws+  n:str_new_directory                eql  v:value_file_path                         {                     return             {                          name:          'new_directory',                value:      v                         };              }
attr_new_folder                   =  ws+  n:str_new_folder                   eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_non_ws_label                 =  ws+  n:str_label                        eql  v:value_any_non_whitespace                {                     return             {                          name:          n,                              value:      v                         };              }
attr_non_ws_value                 =  ws+  n:str_value                        eql  v:value_any_non_whitespace                {                     return             {                          name:          n,                              value:      v                         };              }             
attr_not_null                     =  ws+  n:str_not_null                     eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_null                         =  ws+  n:str_null                         eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_omit                         =  ws+  n:str_omit                         eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_on_error                     =  ws+  n:str_on_error                     eql  v:value_any                               {                     return             {                          name:          'on_error',                     value:      v                         };              }
attr_on_success                   =  ws+  n:str_on_success                   eql  v:value_any                               {                     return             {                          name:          'on_success',                   value:      v                         };              }
attr_operation                    =  ws+  n:str_operation                    eql  quote_char                                v:(h                  t                  t                          p              r                               e           q                         u               e             s                  t)                 quote_char  {                  return    {   name:  n,  value:  plib.stringify(v)  };  }
attr_optimistic_lock              =  ws+  n:str_optimistic_lock              eql  v:value_boolean                           {                     return             {                          name:          'optimistic_lock',              value:      v                         };              }
attr_orm_options                  =  ws+  n:str_orm_options                  eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_orm_type                     =  ws+  n:str_orm_type                     eql  v:value_orm_type                          {                     return             {                          name:          'orm_type',                     value:      v                         };              }
attr_output                       =  ws+  n:str_output                       eql  v:value_cfdump_output                     {                     return             {                          name:          n,                              value:      v                         };              }
attr_output_boolean               =  ws+  n:str_output                       eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_output_file                  =  ws+  n:str_output                       eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_output_file_path             =  ws+  n:str_output_file                  eql  v:value_file_path                         {                     return             {                          name:          'output_file',                  value:      v                         };              }
attr_overflow_to_disk             =  ws+  n:str_overflow_to_disk             eql  v:value_boolean                           {                     return             {                          name:          'overflow_to_disk',             value:      v                         };              }
attr_overwrite                    =  ws+  n:str_overwrite                    eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_overwrite_enclosure          =  ws+  n:str_overwrite_enclosure          eql  v:value_boolean                           {                     return             {                          name:          'overwrite_enclosure',          value:      v                         };              }
attr_page_encoding                =  ws+  n:str_page_encoding                eql  v:value_encoding                          {                     return             {                          name:          'page_encoding',                value:      v                         };              }
attr_passive                      =  ws+  n:str_passive                      eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_passphrase                   =  ws+  n:str_passphrase                   eql  v:value_any_non_whitespace                {                     return             {                          name:          n,                              value:      v                         };              }
attr_password                     =  ws+  n:str_password                     eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_path                         =  ws+  n:str_path                         eql  v:value_file_path                         {                     return             {                          name:          n,                              value:      v                         };              }
attr_pattern                      =  ws+  n:str_pattern                      eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_persistent                   =  ws+  n:str_persistent                   eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_port                         =  ws+  n:str_port                         eql  v:value_integer                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_port_type_name               =  ws+  n:str_port_type_name               eql  v:value_any_non_whitespace                {                     return             {                          name:          'port_type_name',               value:      v                         };              }
attr_precision                    =  ws+  n:str_precision                    eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_prefix                       =  ws+  n:str_prefix                       eql  v:(value_any_non_whitespace               /                     value_empty_quote  )                          {              return                          {           name:                     n,              value:        v                  };                 }
attr_prefix_path                  =  ws+  n:str_prefix                       eql  v:value_file_path                         {                     return             {                          name:          n,                              value:      v                         };              }
attr_priority                     =  ws+  n:str_priority                     eql  v:value_priority                          {                     return             {                          name:          n,                              value:      v                         };              }
attr_procedure                    =  ws+  n:str_procedure                    eql  v:value_any_non_whitespace                {                     return             {                          name:          n,                              value:      plib.stringify(v)         };              }
attr_properties                   =  ws+  n:str_properties                   eql  v:value_any                               {                     return             {                          name:          n,                              value:      plib.stringify(v)         };              }
attr_protocol                     =  ws+  n:str_protocol                     eql  v:value_cfcache_protocol                  {                     return             {                          name:          n,                              value:      v                         };              }
attr_proxy_password               =  ws+  n:str_proxy_password               eql  v:value_any_non_whitespace                {                     return             {                          name:          'proxy_password',               value:      v                         };              }
attr_proxy_port                   =  ws+  n:str_proxy_port                   eql  v:value_integer                           {                     return             {                          name:          'proxy_port',                   value:      v                         };              }
attr_proxy_server                 =  ws+  n:str_proxy_server                 eql  v:value_fqdn_domain                       {                     return             {                          name:          'proxy_server',                 value:      v                         };              }
attr_proxy_user                   =  ws+  n:str_proxy_user                   eql  v:value_any_non_whitespace                {                     return             {                          name:          'proxy_user',                   value:      v                         };              }
attr_publish                      =  ws+  n:str_publish                      eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_query                        =  ws+  n:str_query                        eql  v:value_any                               {                     return             {                          name:          n.toLowerCase(),                value:      v                         };              }
attr_read_only                    =  ws+  n:str_read_only                    eql  v:value_boolean                           {                     return             {                          name:          'read_only',                    value:      v                         };              }
attr_rebind                       =  ws+  n:str_rebind                       eql  v:value_boolean                           {                     return             {                          name:          'rebind',                       value:      v                         };              }
attr_recurse                      =  ws+  n:str_recurse                      eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_redirect                     =  ws+  n:str_redirect                     eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_referral                     =  ws+  n:str_referral                     eql  v:value_integer                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_regex_pattern                =  ws+  n:str_pattern                      eql  v:value_regex                             {                     return             {                          name:          n,                              value:      v                         };              }
attr_remote_file                  =  ws+  n:str_remote_file                  eql  v:(                                       value_file_path       /                  value_any_non_whitespace   )              {                               return      {                         name:           n,            value:             v                  };          }
attr_remove                       =  ws+  n:str_remove                       eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_reply_to                     =  ws+  n:str_reply_to                     eql  v:value_email_address                     {                     return             {                          name:          'reply_to',                     value:      v                         };              }
attr_request_timeout              =  ws+  n:str_request_timeout              eql  v:value_integer                           {                     return             {                          name:          'request_timeout',              value:      v                         };              }
attr_required                     =  ws+  n:str_required                     eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_reset                        =  ws+  n:str_reset                        eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_resolve_url                  =  ws+  n:str_resolve_url                  eql  v:value_boolean                           {                     return             {                          name:          'resolve_url',                  value:      v                         };              }
attr_result                       =  ws+  n:str_result                       eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_result_set                   =  ws+  n:str_result_set                   eql  v:value_integer                           {                     return             {                          name:          'result_set',                   value:      v                         };              }
attr_retry_count                  =  ws+  n:str_retry_count                  eql  v:value_integer                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_return_as_binary             =  ws+  n:str_return_as_binary             eql  v:value_comma_sep_list                    {                     return             {                          name:          n,                              value:      v                         };              }
attr_return_code                  =  ws+  n:str_return_code                  eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_return_format                =  ws+  n:str_return_format                eql  v:value_cffunction_return_format          {                     return             {                          name:          'return_format',                value:      v                         };              }
attr_return_type                  =  ws+  n:str_return_type                  eql  v:value_cffunction_return_type            {                     return             {                          name:          'return_type',                  value:      v                         };              }
attr_return_variable              =  ws+  n:str_return_variable              eql  v:value_any_non_whitespace                {                     return             {                          name:          'return_variable',              value:      v                         };              }
attr_roles                        =  ws+  n:str_roles                        eql  v:value_comma_sep_list                    {                     return             {                          name:          n,                              value:      v                         };              }
attr_savepoint                    =  ws+  n:str_savepoint                    eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_scale                        =  ws+  n:str_scale                        eql  v:value_integer                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_schedule_interval            =  ws+  n:str_interval                     eql  v:(                                       value_integer         /                  value_cfschedule_interval  )              {                               return      {                         name:           n,            value:             v                  };          }
attr_scope                        =  ws+  n:str_scope                        eql  v:value_cflock_scope                      {                     return             {                          name:          n,                              value:      v                         };              }
attr_scope_ldap                   =  ws+  n:str_scope                        eql  v:value_scope_ldap                        {                     return             {                          name:          n,                              value:      v                         };              }
attr_scope_lock                   =  ws+  n:str_scope                        eql  v:value_scope_lock                        {                     return             {                          name:          n,                              value:      v                         };              }
attr_script_protect               =  ws+  n:str_script_protect               eql  v:value_cfapplication_script_protect      {                     return             {                          name:          'script_protection',            value:      v                         };              }
attr_script_src                   =  ws+  n:str_script_src                   eql  v:value_file_path                         {                     return             {                          name:          'script_src',                   value:      v                         };              }
attr_secure                       =  ws+  n:str_secure                       eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_secure_json                  =  ws+  n:str_secure_json                  eql  v:value_boolean                           {                     return             {                          name:          'secure_json',                  value:      v                         };              }
attr_secure_json_prefix           =  ws+  n:str_secure_json_prefix           eql  v:value_any                               {                     return             {                          name:          'secure_json_prefix',           value:      v                         ==              ""            ?                  "//"               :           v                  };        }
attr_secure_ldap                  =  ws+  n:str_secure                       eql  quote_char                                v:'CFSSL_BASIC'       quote_char         {                          return         {                               name:       n,                        value:          v             };                 }
attr_select_before_update         =  ws+  n:str_select_before_update         eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_separator                    =  ws+  n:str_separator                    eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_serializable                 =  ws+  n:str_serializable                 eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_server                       =  ws+  n:str_server                       eql  v:value_fqdn_domain                       {                     return             {                          name:          n,                              value:      v                         };              }
attr_server_side_form_validation  =  ws+  n:str_server_side_form_validation  eql  v:value_boolean                           {                     return             {                          name:          'server_side_form_validation',  value:      v                         };              }
attr_service_address              =  ws+  n:str_service_address              eql  v:value_url                               {                     return             {                          name:          'service_address',              value:      v                         };              }
attr_service_port_name            =  ws+  n:str_service_port_name            eql  v:value_any_non_whitespace                {                     return             {                          name:          'service_port_name',            value:      v                         };              }
attr_session_management           =  ws+  n:str_session_management           eql  v:value_boolean                           {                     return             {                          name:          'session_management',           value:      v                         };              }
attr_session_timeout              =  ws+  n:str_session_timeout              eql  v:value_time_span_func                    {                     return             {                          name:          'session_timeout',              value:      v                         };              }
attr_set_client_cookies           =  ws+  n:str_set_client_cookies           eql  v:value_boolean                           {                     return             {                          name:          'client_cookies',               value:      v                         };              }
attr_set_domain_cookies           =  ws+  n:str_set_domain_cookies           eql  v:value_boolean                           {                     return             {                          name:          'domain_cookies',               value:      v                         };              }
attr_setter                       =  ws+  n:str_setter                       eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_show                         =  ws+  n:str_show                         eql  v:(                                       value_comma_sep_list  /                  value_any_non_whitespace   )              {                               return      {                         name:           n,            value:             v                  };          }
attr_show_debug_output            =  ws+  n:str_show_debug_output            eql  v:value_boolean                           {                     return             {                          name:          'show_debug_output',            value:      v                         };              }
attr_show_directory               =  ws+  n:str_show_directory               eql  v:value_boolean                           {                     return             {                          name:          'show_directory',               value:      v                         };              }
attr_show_error                   =  ws+  n:str_show_error                   eql  v:value_any                               {                     return             {                          name:          'show_error',                   value:      v                         };              }
attr_show_udfs                    =  ws+  n:str_show_udfs                    eql  v:value_boolean                           {                     return             {                          name:          'show_udfs',                    value:      v                         };              }
attr_sign                         =  ws+  n:str_sign                         eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_sort                         =  ws+  n:str_sort                         eql  quote_char                                v:(                   str_desc           /                          str_asc        )                               quote_char  {                         return          {             name:              n,                 value:      v                  };        }
attr_sort_control                 =  ws+  n:str_sort_control                 eql  v:value_sort_control                      {                     return             {                          name:          n,                              value:      v                         };              }
attr_source                       =  ws+  n:str_source                       eql  quote_char                                v:(                   str_db             /                          str_vm         )                               quote_char  {                         return          {             name:              n,                 value:      plib.stringify(v,  'lower')  };  }
attr_source_path                  =  ws+  n:str_source                       eql  v:value_file_path                         {                     return             {                          name:          n,                              value:      plib.stringify(v,         'lower')        };            }
attr_spool_enable                 =  ws+  n:str_spool_enable                 eql  v:value_boolean                           {                     return             {                          name:          'spool_enable',                 value:      v                         };              }
attr_sql_type                     =  ws+  n:str_cfsql_type                   eql  v:value_sql_type                          {                     return             {                          name:          'cf_sql_type',                  value:      v                         };              }
attr_start                        =  ws+  n:str_start                        eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_start_date                   =  ws+  n:str_start_date                   eql  v:value_date                              {                     return             {                          name:          'start_date',                   value:      v                         };              }
attr_start_row                    =  ws+  n:str_start_row                    eql  v:value_integer                           {                     return             {                          name:          'start_row',                    value:      v                         };              }
attr_start_time                   =  ws+  n:str_start_time                   eql  v:(value_integer                          /                     value_time         )                          {              return                          {           name:                     'start_time',   value:        v                  };                 }
attr_status_code                  =  ws+  n:str_status_code                  eql  quote_char                                v:("30"               [0-7])             quote_char                 {              return                          {           name:                     'status_code',  value:        plib.stringify(v,  'int')             };          }
attr_status_text                  =  ws+  n:str_status_text                  eql  v:value_any                               {                     return             {                          name:          'status_text',                  value:      plib.stringify(v)         };              }
attr_step_date_time               =  ws+  n:str_step                         eql  v:value_time_span_func                    {                     return             {                          name:          n,                              value:      v                         };              }
attr_step_integer                 =  ws+  n:str_step                         eql  v:value_integer                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_stop_on_error                =  ws+  n:str_stop_on_error                eql  v:value_boolean                           {                     return             {                          name:          'stop_on_error',                value:      v                         };              }
attr_store_acl                    =  ws+  n:str_store_acl                    eql  v:(                                       value_struct          /                  value_cfval                )              {                               return      {                         name:           'store_acl',  value:             v                  };          }
attr_store_location               =  ws+  n:str_store_location               eql  v:value_amazon_s3_bucket_location         {                     return             {                          name:          'store_location',               value:      v                         };              }
attr_store_path                   =  ws+  n:str_store_path                   eql  v:value_boolean                           {                     return             {                          name:          'store_path',                   value:      v                         };              }
attr_strip_whitespace             =  ws+  n:str_strip_whitespace             eql  v:value_boolean                           {                     return             {                          name:          'strip_whitespace',             value:      v                         };              }
attr_style                        =  ws+  n:str_style                        eql  quote_char                                v:(                   str_rpc            /                          str_document   )                               quote_char  {                         return          {             name:              n,                 value:      v                  };        }
attr_subject                      =  ws+  n:str_subject                      eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_suppress_whitespace          =  ws+  n:str_suppress_whitespace          eql  v:value_boolean                           {                     return             {                          name:          'suppress_whitespace',          value:      v                         };              }
attr_table                        =  ws+  n:str_table                        eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_table_name                   =  ws+  n:str_table_name                   eql  v:value_any                               {                     return             {                          name:          'table_name',                   value:      v                         };              }
attr_table_owner                  =  ws+  n:str_table_owner                  eql  v:value_any                               {                     return             {                          name:          'table_owner',                  value:      v                         };              }
attr_table_qualifier              =  ws+  n:str_table_qualifier              eql  v:value_any                               {                     return             {                          name:          'table_qualifier',              value:      v                         };              }
attr_tag_lib                      =  ws+  n:str_tag_lib                      eql  v:value_file_path                         {                     return             {                          name:          n,                              value:      v                         };              }
attr_tags                         =  ws+  n:str_tags                         eql  v:value_comma_sep_list                    {                     return             {                          name:          n,                              value:      v                         };              }
attr_task                         =  ws+  n:str_task                         eql  v:value_any_non_whitespace                {                     return             {                          name:          n,                              value:      v                         };              }
attr_template                     =  ws+  n:str_template                     eql  v:value_file_path                         {                     return             {                          name:          n,                              value:      v                         };              }
attr_text                         =  ws+  n:str_text                         eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_throw_on_error               =  ws+  n:str_throw_on_error               eql  v:value_boolean                           {                     return             {                          name:          'throw_on_error',               value:      v                         };              }
attr_throw_on_timeout             =  ws+  n:str_throw_on_timeout             eql  v:value_boolean                           {                     return             {                          name:          'throw_on_timeout',             value:      v                         };              }
attr_timeout                      =  ws+  n:str_timeout                      eql  v:value_integer                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_timespan                     =  ws+  n:str_timespan                     eql  v:(                                       value_float           /                  value_time_span_func       )              {                               return      {                         name:           n,            value:             v                  };          }
attr_to                           =  ws+  n:str_to                           eql  v:value_integer                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_to_date_time                 =  ws+  n:str_to                           eql  v:value_date_time                         {                     return             {                          name:          n,                              value:      v                         };              }
attr_to_email                     =  ws+  n:str_to                           eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_top                          =  ws+  n:str_top                          eql  v:value_integer                           {                     return             {                          name:          n,                              value:      v                         };              }
attr_transfer_mode                =  ws+  n:str_transfer_mode                eql  v:value_transfer_mode                     {                     return             {                          name:          'transfer_mode',                value:      v                         };              }
attr_type_catch                   =  ws+  n:str_type                         eql  v:value_cferror_exception                 {                     return             {                          name:          n,                              value:      v                         };              }
attr_type_dbinfo                  =  ws+  n:str_type                         eql  v:value_cfdbinfo_type                     {                     return             {                          name:          n,                              value:      v                         };              }
attr_type_directory               =  ws+  n:str_type                         eql  v:value_cfdirectory_type                  {                     return             {                          name:          n,                              value:      v                         };              }
attr_type_encoding                =  ws+  n:str_type                         eql  v:value_encoding                          {                     return             {                          name:          n,                              value:      v                         };              }
attr_type_error                   =  ws+  n:str_type                         eql  v:value_cferr_type                        {                     return             {                          name:          n,                              value:      v                         };              }
attr_type_function                =  ws+  n:str_type                         eql  v:value_cffunction_return_type            {                     return             {                          name:          n,                              value:      v                         };              }
attr_type_httpparam               =  ws+  n:str_type                         eql  v:value_cfhttpparam_type                  {                     return             {                          name:          n,                              value:      v                         };              }
attr_type_lock                    =  ws+  n:str_type                         eql  quote_char                                v:(                   str_read_only      /                          str_exclusive  )                               quote_char  {                         return          {             name:              n,                 value:      v                  };        }
attr_type_log                     =  ws+  n:str_type                         eql  v:value_cflog_type                        {                     return             {                          name:          n,                              value:      v                         };              }
attr_type_mail                    =  ws+  n:str_type                         eql  v:value_cfmail_type                       {                     return             {                          name:          n,                              value:      v                         };              }
attr_type_mime                    =  ws+  n:str_type                         eql  v:value_mime                              {                     return             {                          name:          'type',                         value:      v                         };              }
attr_type_param                   =  ws+  n:str_type                         eql  v:value_cfparam_type                      {                     return             {                          name:          n,                              value:      v                         };              }             
attr_type_procparam               =  ws+  n:str_type                         eql  v:value_cfprocparam_type                  {                     return             {                          name:          n,                              value:      v                         };              }
attr_type_timer                   =  ws+  n:str_type                         eql  v:value_cftimer_type                      {                     return             {                          name:          n,                              value:      v                         };              }             
attr_type_trace                   =  ws+  n:str_type                         eql  v:value_cftrace_type                      {                     return             {                          name:          n,                              value:      v                         };              }
attr_uid                          =  ws+  n:str_uid                          eql  v:(                                       value_comma_sep_list  /                  value_integer              )              {                               return      {                         name:           n,            value:             v                  };          }                  
attr_unique                       =  ws+  n:str_unique                       eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }             
attr_update                       =  ws+  n:str_update                       eql  v:value_boolean                           {                     return             {                          name:          n,                              value:      v                         };              }             
attr_url                          =  ws+  n:str_url                          eql  v:value_url                               {                     return             {                          name:          n,                              value:      v                         };              }
attr_use_cache                    =  ws+  n:str_use_cache                    eql  v:value_boolean                           {                     return             {                          name:          'use_cache',                    value:      v                         };              }             
attr_use_query_string             =  ws+  n:str_use_query_string             eql  v:value_boolean                           {                     return             {                          name:          'use_query_string',             value:      v                         };              }             
attr_use_ssl                      =  ws+  n:str_use_ssl                      eql  v:value_boolean                           {                     return             {                          name:          'use_ssl',                      value:      v                         };              }             
attr_use_tsl                      =  ws+  n:str_use_tsl                      eql  v:value_boolean                           {                     return             {                          name:          'use_tsl',                      value:      v                         };              }             
attr_user_agent                   =  ws+  n:str_user_agent                   eql  v:value_any                               {                     return             {                          name:          'user_agent',                   value:      v                         };              }
attr_username                     =  ws+  n:str_username                     eql  v:value_any_non_whitespace                {                     return             {                          name:          n,                              value:      v                         };              }
attr_validate                     =  ws+  n:str_validate                     eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }             
attr_validate_param               =  ws+  n:str_validate_param               eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }             
attr_value                        =  ws+  n:str_value                        eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }             
attr_var                          =  ws+  n:str_var                          eql  v:value_any                               {                     return             {                          name:          n,                              value:      v                         };              }             
attr_variable                     =  ws+  n:str_variable                     eql  v:value_any_non_whitespace                {                     return             {                          name:          n,                              value:      v                         };              }
attr_verify_client                =  ws+  n:str_verify_client                eql  v:value_boolean                           {                     return             {                          name:          'verify_client',                value:      v                         };              }             
attr_wrap_text                    =  ws+  n:str_wrap_text                    eql  v:value_integer                           {                     return             {                          name:          'wrap_text',                    value:      v                         };              }
attr_wsdl_file                    =  ws+  n:str_wsdl_file                    eql  v:(                                       value_url             /                  value_file_path            )              {                               return      {                         name:           'wsdl_file',  value:             v                  };          }
attr_xml_var                      =  ws+  n:str_xml_var                      eql  v:value_any_non_whitespace                {                     return             {                          name:          'xml_var',                      value:      v                         };              }
attr_zip_action                   =  ws+  n:str_action                       eql  v:value_zip_action                        {                     return             {                          name:          n,                              value:      v                         };              }
attr_zip_source                   =  ws+  n:str_source                       eql  v:value_file_path                         {                     return             {                          name:          n,                              value:      v                         };              }

//@TODO:  change  attr_cfapplication  to    allow   usage      of       plain     timeout  attribute
//@TODO:  change  attr_cfinsert       to    allow   "table"    attribute
//@TODO:  change  attr_cfsetting      to    accept  "timeout"  attribute.
//@TODO:  change  attr_cfupdate       to    also    allow      "table"  attribute
//@todo:  change  to                  also  allow   "table"    attribute
//@TODO:  enable  attr_cfheader       to    allow   for        plain    "status"  attribute
attr_cfabort                    =  attr_show_error
attr_cfajaximport               =  attr_css_src               /  attr_ajax_params           /  attr_script_src            /  attr_tags
attr_cfajaxproxy                =  attr_bind                  /  attr_cfc                   /  attr_js_class_name         /  attr_on_error         /  attr_on_success
attr_cfapplication              =  attr_application_timeout   /  attr_client_management     /  attr_client_storage        /  attr_datasource       /  attr_google_map_key             /  attr_login_storage    /  attr_name                    /  attr_script_protect        /  attr_secure_json     /  attr_secure_json_prefix   /  attr_server_side_form_validation  /  attr_session_management  /  attr_session_timeout      /  attr_set_client_cookies  /  attr_set_domain_cookies  
attr_cfassociate                =  attr_base_tag              /  attr_data_collection
attr_cfcache                    =  attr_action_cache          /  attr_depends_on            /  attr_directory             /  attr_disk_persistent  /  attr_expire_url                 /  attr_id               /  attr_idle_time               /  attr_key                   /  attr_metadata        /  attr_name                 /  attr_overflow_to_disk             /  attr_password            /  attr_port                 /  attr_protocol            /  attr_strip_whitespace    /  attr_throw_on_error     /  attr_timespan    /  attr_use_cache       /  attr_use_query_string  /  attr_username    /  attr_value
attr_cfcase                     =  attr_delimiter             /  attr_value
attr_cfcatch                    =  attr_type_catch
attr_cfcomponent                =  attr_accessors             /  attr_alias                 /  attr_binding_name          /  attr_display_name     /  attr_extends                    /  attr_hint             /  attr_implements              /  attr_mapped_super_class    /  attr_namespace       /  attr_output_boolean       /  attr_port_type_name               /  attr_serializable        /  attr_service_address      /  attr_service_port_name   /  attr_style               /  attr_wsdl_file
attr_cfcontent                  =  attr_delete_file           /  attr_file_path             /  attr_reset                 /  attr_type_encoding    /  attr_variable
attr_cfcookie                   =  attr_domain                /  attr_expires               /  attr_http_only             /  attr_name             /  attr_path                       /  attr_secure           /  attr_value
attr_cfdbinfo                   =  attr_name                  /  attr_type_dbinfo           /  attr_datasource            /  attr_dbname           /  attr_password                   /  attr_pattern          /  attr_username                /  attr_table
attr_cfdirectory                =  attr_action_directory      /  attr_directory             /  attr_type_directory        /  attr_filter           /  attr_list_info                  /  attr_mode             /  attr_name                    /  attr_new_directory         /  attr_recurse         /  attr_sort                 /  attr_store_acl                    /  attr_store_location
attr_cfdump                     =  attr_abort                 /  attr_cfvar_var             /  attr_expand                /  attr_format           /  attr_hide                       /  attr_keys             /  attr_meta_info               /  attr_non_ws_label          /  attr_output          /  attr_show                 /  attr_show_udfs                    /  attr_top
attr_cferror                    =  attr_type_error            /  attr_template              /  attr_mail_to               /  attr_exception
attr_cfexecute                  =  attr_name                  /  attr_arguments             /  attr_output_file_path      /  attr_timeout          /  attr_variable
attr_cfexit                     =  attr_method_exit
attr_cffeed                     =  attr_column_map            /  attr_enclosure_dir         /  attr_escape_chars          /  attr_feed_action      /  attr_feed_name                  /  attr_feed_source      /  attr_ignore_enclosure_error  /  attr_output_file_path      /  attr_overwrite       /  attr_overwrite_enclosure  /  attr_properties                   /  attr_proxy_password      /  attr_proxy_port           /  attr_proxy_server        /  attr_proxy_user          /  attr_query              /  attr_timeout     /  attr_user_agent      /  attr_xml_var
attr_cffile_append              =  attr_action_file           /  attr_add_newline           /  attr_attributes            /  attr_charset          /  attr_file_path                  /  attr_fix_newline      /  attr_mode                    /  attr_output_file
attr_cffile_copy                =  attr_action_file           /  attr_attributes            /  attr_destination           /  attr_file_source      /  attr_mode
attr_cffile_delete              =  attr_action_file           /  attr_file_path
attr_cffile_move                =  attr_action_file           /  attr_attributes            /  attr_charset               /  attr_destination      /  attr_file_source                /  attr_mode
attr_cffile_read                =  attr_action_file           /  attr_charset               /  attr_file_path             /  attr_variable
attr_cffile_read_binary         =  attr_action_file           /  attr_file_path             /  attr_variable
attr_cffile_rename              =  attr_action_file           /  attr_attributes            /  attr_destination           /  attr_file_source      /  attr_mode
attr_cffile_upload              =  attr_accept                /  attr_action_file           /  attr_attributes            /  attr_destination      /  attr_file_field                 /  attr_mode             /  attr_name_conflict           /  attr_result
attr_cffile_upload_all          =  attr_accept                /  attr_action_file           /  attr_attributes            /  attr_destination      /  attr_mode                       /  attr_name_conflict    /  attr_result
attr_cffile_write               =  attr_action_file           /  attr_add_newline           /  attr_attributes            /  attr_charset          /  attr_file_path                  /  attr_fix_newline      /  attr_mode                    /  attr_output_file
attr_cfflush                    =  attr_interval
attr_cfftp_conn                 =  attr_action_ftp            /  attr_action_param          /  attr_buffer_size           /  attr_connection       /  attr_fingerprint                /  attr_key              /  attr_passive                 /  attr_password              /  attr_passphrase      /  attr_port                 /  attr_proxy_server                 /  attr_proxy_port          /  attr_proxy_user           /  attr_proxy_password      /  attr_retry_count         /  attr_secure             /  attr_server      /  attr_stop_on_error   /  attr_timeout           /  attr_username
attr_cfftp_file_dir             =  attr_action_ftp_file_dir   /  attr_ascii_extension_list  /  attr_connection            /  attr_directory        /  attr_existing                   /  attr_fail_if_exists   /  attr_item                    /  attr_local_file            /  attr_name            /  attr_new                  /  attr_passive                      /  attr_password            /  attr_proxy_user           /  attr_proxy_password      /  attr_proxy_port          /  attr_proxy_server       /  attr_port        /  attr_remote_file     /  attr_result            /  attr_server      /  attr_timeout               /  attr_transfer_mode  /  attr_username
attr_cffunction                 =  attr_name                  /  attr_access                /  attr_description           /  attr_display_name     /  attr_hint                       /  attr_boolean_output   /  attr_return_format           /  attr_return_type           /  attr_roles           /  attr_secure_json          /  attr_verify_client
attr_cffunction_optional        =  attr_access                /  attr_description           /  attr_display_name          /  attr_hint             /  attr_boolean_output             /  attr_return_format    /  attr_return_type             /  attr_roles                 /  attr_secure_json     /  attr_verify_client
attr_cffunction_required        =  attr_name
attr_cfheader                   =  attr_charset               /  attr_name                  /  attr_status_code           /  attr_status_text      /  attr_value
attr_cfhtmlhead                 =  attr_text
attr_cfhttp                     =  attr_charset               /  attr_client_cert           /  attr_client_cert_password  /  attr_compression      /  attr_get_as_binary              /  attr_method_http      /  attr_multipart               /  attr_multipart_type        /  attr_password        /  attr_port                 /  attr_proxy_server                 /  attr_proxy_port          /  attr_proxy_user           /  attr_proxy_password      /  attr_redirect            /  attr_resolve_url        /  attr_result      /  attr_throw_on_error  /  attr_timeout           /  attr_user_agent  /  attr_url                   /  attr_username
attr_cfhttpparam                =  attr_encoded               /  attr_file_path             /  attr_mime_type             /  attr_name             /  attr_type_httpparam             /  attr_value
attr_cfimap                     =  attr_action_imap           /  attr_attachment_path       /  attr_connection            /  attr_folder           /  attr_generate_unique_filenames  /  attr_max_rows         /  attr_message_number          /  attr_name                  /  attr_new_folder      /  attr_password             /  attr_port                         /  attr_recurse             /  attr_secure               /  attr_server              /  attr_start_row           /  attr_stop_on_error      /  attr_timeout     /  attr_uid             /  attr_username
attr_cfimport                   =  attr_tag_lib               /  attr_prefix
attr_cfimport_required_prefix   =  attr_prefix
attr_cfimport_required_taglib   =  attr_tag_lib
attr_cfinclude                  =  attr_template
attr_cfinsert                   =  attr_datasource            /  attr_table_name            /  attr_form_fields           /  attr_password         /  attr_table_owner                /  attr_table_qualifier  /  attr_username
attr_cfinterface                =  attr_display_name          /  attr_extends_list          /  attr_hint
attr_cfinvoke_syntax1_optional  =  attr_argument_collection   /  attr_return_variable
attr_cfinvoke_syntax1_required  =  attr_component             /  attr_method_invoke
attr_cfinvokeargument           =  attr_name                  /  attr_value                 /  attr_omit
attr_cfldap                     =  attr_action_ldap           /  attr_attributes_ldap       /  attr_delimiter             /  attr_dn               /  attr_filter                     /  attr_max_rows         /  attr_modify_type             /  attr_name                  /  attr_password        /  attr_port                 /  attr_rebind                       /  attr_referral            /  attr_return_as_binary     /  attr_scope_ldap          /  attr_secure_ldap         /  attr_separator          /  attr_server      /  attr_sort            /  attr_sort_control      /  attr_start       /  attr_start_row             /  attr_timeout        /  attr_username
attr_cflocation                 =  attr_add_token             /  attr_status_code           /  attr_url
attr_cflock                     =  attr_name                  /  attr_scope                 /  attr_throw_on_timeout      /  attr_timeout          /  attr_type_lock
attr_cflog                      =  attr_application           /  attr_file                  /  attr_log                   /  attr_text             /  attr_type_log
attr_cflogin                    =  attr_application_token     /  attr_cookie_domain         /  attr_idle_timeout
attr_cfloginuser                =  attr_name                  /  attr_password              /  attr_roles
attr_cfloop_array               =  attr_index                 /  attr_array
attr_cfloop_collection          =  attr_index                 /  attr_collection
attr_cfloop_conditional         =  attr_condition
attr_cfloop_date_range          =  attr_from_date_time        /  attr_index                 /  attr_step_date_time        /  attr_to_date_time
attr_cfloop_file                =  attr_characters            /  attr_delimiter             /  attr_file_path             /  attr_index            
attr_cfloop_index               =  attr_charset               /  attr_from                  /  attr_index                 /  attr_step_integer     /  attr_to                         
attr_cfloop_list                =  attr_delimiter             /  attr_index                 /  attr_list_list
attr_cfloop_query               =  attr_query                 /  attr_start_row             /  attr_end_row
attr_cfmail                     =  attr_bcc                   /  attr_cc                    /  attr_charset               /  attr_debug            /  attr_fail_to                    /  attr_from_email       /  attr_group                   /  attr_group_case_sensitive  /  attr_key_alias       /  attr_key_password         /  attr_key_store                    /  attr_key_store_password  /  attr_mailer_id            /  attr_max_rows            /  attr_mime_attach         /  attr_password           /  attr_port        /  attr_priority        /  attr_query             /  attr_remove      /  attr_reply_to              /  attr_server         /  attr_sign    /  attr_spool_enable  /  attr_start_row  /  attr_subject  /  attr_timeout         /  attr_to_email  /  attr_type_mime  /  attr_use_ssl      /  attr_use_tsl         /  attr_username        /  attr_wrap_text
attr_cfmailparam                =  attr_content               /  attr_content_id            /  attr_disposition           /  attr_file_path        /  attr_name                       /  attr_remove           /  attr_type_mail               /  attr_value
attr_cfmailpart                 =  attr_charset               /  attr_type_mail             /  attr_wrap_text
attr_cfoutput                   =  attr_group_case_sensitive  /  attr_group                 /  attr_max_rows              /  attr_query            /  attr_start_row
attr_cfparam                    =  attr_default               /  attr_max                   /  attr_min                   /  attr_name             /  attr_regex_pattern              /  attr_type_param       /  attr_value
attr_cfpop                      =  attr_server                /  attr_action_pop            /  attr_attachment_path       /  attr_debug            /  attr_generate_unique_filenames  /  attr_max_rows         /  attr_name                    /  attr_password              /  attr_port            /  attr_start_row            /  attr_timeout                      /  attr_uid                 /  attr_username
attr_cfprocessingdirective      =  attr_page_encoding         /  attr_suppress_whitespace
attr_cfprocparam                =  attr_max_length            /  attr_null                  /  attr_scale                 /  attr_sql_type         /  attr_type_procparam             /  attr_variable         /  attr_non_ws_value
attr_cfprocresult               =  attr_max_rows              /  attr_name                  /  attr_result_set
attr_cfproperty                 =  attr_name                  /  attr_cfc                   /  attr_constrained           /  attr_dynamic_insert   /  attr_dynamic_update             /  attr_fetch            /  attr_generated               /  attr_getter                /  attr_insert          /  attr_inverse              /  attr_lazy                         /  attr_length              /  attr_missing_row_ignored  /  attr_name                /  attr_not_null            /  attr_optimistic_lock    /  attr_orm_type    /  attr_persistent      /  attr_precision         /  attr_scale       /  attr_select_before_update  /  attr_setter         /  attr_source  /  attr_table         /  attr_unique     /  attr_update   /  attr_validate_param  /  attr_validate  /  attr_cfc        /  attr_constrained  /  attr_dynamic_insert  /  attr_dynamic_update  /  attr_fetch  /  attr_generated  /  attr_getter  /  attr_insert  /  attr_inverse  /  attr_lazy  /  attr_length  /  attr_missing_row_ignored  /  attr_name  /  attr_not_null  /  attr_optimistic_lock  /  attr_orm_type  /  attr_persistent  /  attr_precision  /  attr_scale  /  attr_select_before_update  /  attr_setter  /  attr_source  /  attr_table  /  attr_unique  /  attr_update  /  attr_validate_param  /  attr_validate  /  attr_default  /  attr_display_name  /  attr_hint  /  attr_read_only  /  attr_required  /  attr_serializable  /  attr_type_function
attr_cfquery                    =  attr_block_factor          /  attr_cached_after          /  attr_cached_within         /  attr_datasource       /  attr_dbtype                     /  attr_debug            /  attr_name                    /  attr_max_rows              /  attr_orm_options     /  attr_password             /  attr_result                       /  attr_timeout             /  attr_username
attr_cfqueryparam               =  attr_list                  /  attr_max_length            /  attr_null                  /  attr_scale            /  attr_separator                  /  attr_sql_type         /  attr_value
attr_cfsavecontent              =  attr_variable
attr_cfschedule                 =  attr_action_schedule       /  attr_end_date              /  attr_end_time              /  attr_file_path        /  attr_operation                  /  attr_password         /  attr_path                    /  attr_port                  /  attr_proxy_password  /  attr_proxy_port           /  attr_proxy_server                 /  attr_proxy_user          /  attr_publish              /  attr_request_timeout     /  attr_resolve_url         /  attr_schedule_interval  /  attr_start_date  /  attr_start_time      /  attr_task              /  attr_url         /  attr_username
attr_cfsetting                  =  attr_enable_cfouput_only   /  attr_request_timeout       /  attr_show_debug_output
attr_cfstoredproc               =  attr_block_factor          /  attr_cached_after_date     /  attr_cached_within         /  attr_datasource       /  attr_debug                      /  attr_password         /  attr_procedure               /  attr_result                /  attr_return_code     /  attr_username
attr_cftimer                    =  attr_label                 /  attr_type_timer
attr_cftrace                    =  attr_abort                 /  attr_category              /  attr_inline                /  attr_text             /  attr_var                        /  attr_type_trace
attr_cftransaction              =  attr_action_transaction    /  attr_isolation             /  attr_savepoint             /  attr_nested
attr_cfupdate                   =  attr_datasource            /  attr_form_fields           /  attr_password              /  attr_table_name       /  attr_table_owner                /  attr_table_qualifier  /  attr_username
attr_cfxml                      =  attr_variable              /  attr_case_sensitive
attr_cfzip                      =  attr_action_zip            /  attr_charset               /  attr_destination           /  attr_entry_path       /  attr_file_path                  /  attr_filter           /  attr_name_zip                /  attr_overwrite             /  attr_prefix          /  attr_recurse              /  attr_show_directory               /  attr_source_path         /  attr_store_path           /  attr_variable            
attr_cfzipparam                 =  attr_charset               /  attr_content               /  attr_entry_path            /  attr_filter           /  attr_prefix_path                /  attr_recurse          /  attr_file_source
attr_objectcache                =  attr_action_objectcache

// any case strings
str_abort                       = v:(a b o r t)                                                    { return plib.stringify(v, 'lower'); }
str_accept                      = v:(a c c e p t)                                                  { return plib.stringify(v, 'lower'); }
str_access                      = v:(a c c e s s)                                                  { return plib.stringify(v, 'lower'); }
str_accessors                   = v:(a c c e s s o r s)                                            { return plib.stringify(v, 'lower'); }
str_acct                        = v:(a c c t)                                                      { return plib.stringify(v, 'lower'); }
str_action                      = v:(a c t i o n)                                                  { return plib.stringify(v, 'lower'); }
str_action_param                = v:(a c t i o n __ p a r a m)                                     { return plib.stringify(v, 'under', 'lower'); }
str_add                         = v:(a d d)                                                        { return plib.stringify(v); }
str_add_newline                 = v:(a d d __ n e w l i n e)                                       { return plib.stringify(v, 'under', 'lower'); }
str_add_token                   = v:(a d d __ t o k e n)                                           { return plib.stringify(v); }
str_alias                       = v:(a l i a s)                                                    { return plib.stringify(v, 'lower'); }
str_all                         = v:(a l l)                                                        { return plib.stringify(v); }
str_allo                        = v:(a l l o)                                                      { return plib.stringify(v, 'lower'); }
str_always                      = v:(a l w a y s)                                                  { return plib.stringify(v, 'lower'); }
str_any                         = v:(a n y)                                                        { return plib.stringify(v); }
str_append                      = v:(a p p e n d)                                                  { return plib.stringify(v, 'lower'); }
str_application                 = v:(a p p l i c a t i o n)                                        { return plib.stringify(v); }
str_application_timeout         = v:(a p p l i c a t i o n __ t i m e o u t)                       { return plib.stringify(v, 'lower'); }
str_application_token           = v:(a p p l i c a t i o n __ t o k e n)                           { return plib.stringify(v, 'lower'); }
str_argument_collection         = v:(a r g u m e n t __ c o l l e c t i o n)                       { return plib.stringify(v, 'under', 'lower'); }
str_arguments                   = v:(a r g u m e n t s)                                            { return plib.stringify(v); }
str_array                       = v:(a r r a y)                                                    { return plib.stringify(v, 'lower'); }
str_asc                         = v:(a s c)                                                        { return plib.stringify(v, 'upper'); }
str_ascii                       = v:(a s c i i)                                                    { return plib.stringify(v, 'lower'); }
str_ascii_extension_list        = v:(a s c i i __ e x t e n s i o n __ l i s t)                    { return plib.stringify(v, 'under', 'lower'); }
str_asterisk                    = v:asterisk                                                       { return v; }
str_attachment                  = v:(a t t a c h m e n t)                                          { return plib.stringify(v, 'lower'); }
str_attachment_path             = v:(a t t a c h m e n t __ p a t h)                               { return plib.stringify(v, 'under', 'lower'); }
str_attributes                  = v:(a t t r i b u t e s)                                          { return plib.stringify(v, 'lower'); }
str_auto                        = v:(a u t o)                                                      { return plib.stringify(v, 'lower'); }
str_base                        = v:(b a s e)                                                      { return plib.stringify(v, 'lower'); }
str_base_tag                    = v:(b a s e t a g)                                                { return plib.stringify(v, 'under'); }
str_batch_size                  = v:(b a t c h __ s i z e)                                         { return plib.stringify(v, 'under'); }
str_bcc                         = v:(b c c)                                                        { return plib.stringify(v, 'lower'); }
str_begin                       = v:(b e g i n)                                                    { return plib.stringify(v, 'under'); }
str_big_decimal                 = v:(b i g __ d e c i m a l)                                       { return plib.stringify(v); }
str_bigint                      = v:(b i g i n t)                                                  { return plib.stringify(v); }
str_binary                      = v:(b i n a r y)                                                  { return plib.stringify(v); }
str_bind                        = v:(b i n d)                                                      { return plib.stringify(v); }
str_binding_name                = v:(b i n d i n g __ n a m e)                                     { return plib.stringify(v, 'under', 'lower'); }
str_bit                         = v:(b i t)                                                        { return plib.stringify(v); }
str_blob                        = v:(b l o b)                                                      { return plib.stringify(v); }
str_block_factor                = v:(b l o c k __ f a c t o r)                                     { return plib.stringify(v); }
str_body                        = v:(b o d y)                                                      { return plib.stringify(v); }
str_boolean                     = v:(b o o l e a n)                                                { return plib.stringify(v); }
str_browser                     = v:(b r o w s e r)                                                { return plib.stringify(v); }
str_buffer_size                 = v:(b u f f e r __ s i z e)                                       { return plib.stringify(v, 'under', 'lower'); }
str_cache                       = v:(c a c h e)                                                    { return plib.stringify(v, 'lower'); }
str_cached_after                = v:(c a c h e d __ a f t e r)                                     { return plib.stringify(v, 'lower'); }
str_cached_within               = v:(c a c h e d __ w i t h i n)                                   { return plib.stringify(v, 'lower'); }
str_case_sensitive              = v:(c a s e __ s e n s i t i v e)                                 { return plib.stringify(v, 'lower'); }
str_category                    = v:(c a t e g o r y)                                              { return plib.stringify(v, 'lower'); }
str_cc                          = v:(c c)                                                          { return plib.stringify(v, 'lower'); }
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
str_cfcomponent                 = v:(c f c o m p o n e n t)                                        { return plib.stringify(v, 'lower'); }
str_cfcontent                   = v:(c f c o n t e n t)                                            { return plib.stringify(v, 'lower'); }
str_cfcontinue                  = v:(c f c o n t i n u e)                                          { return plib.stringify(v, 'lower'); }
str_cfcookie                    = v:(c f c o o k i e)                                              { return plib.stringify(v, 'lower'); }
str_cfdbinfo                    = v:(c f d b i n f o)                                              { return plib.stringify(v, 'lower'); }
str_cfdefaultcase               = v:(c f d e f a u l t c a s e)                                    { return plib.stringify(v, 'lower'); }
str_cfdirectory                 = v:(c f d i r e c t o r y)                                        { return plib.stringify(v, 'lower'); }
str_cfdump                      = v:(c f d u m p)                                                  { return plib.stringify(v, 'lower'); }
str_cfelse                      = v:(c f e l s e)                                                  { return plib.stringify(v, 'lower'); }
str_cfelseif                    = v:(c f e l s e i f)                                              { return plib.stringify(v, 'lower'); }
str_cferror                     = v:(c f e r r o r)                                                { return plib.stringify(v, 'lower'); }
str_cfexecute                   = v:(c f e x e c u t e)                                            { return plib.stringify(v, 'lower'); }
str_cfexit                      = v:(c f e x i t)                                                  { return plib.stringify(v, 'lower'); }
str_cffeed                      = v:(c f f e e d)                                                  { return plib.stringify(v, 'lower'); }
str_cffile                      = v:(c f f i l e)                                                  { return plib.stringify(v, 'lower'); }
str_cffinally                   = v:(c f f i n a l l y)                                            { return plib.stringify(v, 'lower'); }
str_cfflush                     = v:(c f f l u s h)                                                { return plib.stringify(v, 'lower'); }
str_cfftp                       = v:(c f f t p)                                                    { return plib.stringify(v, 'lower'); }
str_cffunction                  = v:(c f f u n c t i o n)                                          { return plib.stringify(v, 'lower'); }
str_cfheader                    = v:(c f h e a d e r)                                              { return plib.stringify(v, 'lower'); }
str_cfhtmlhead                  = v:(c f h t m l h e a d)                                          { return plib.stringify(v, 'lower'); }
str_cfhttp                      = v:(c f h t t p)                                                  { return plib.stringify(v, 'lower'); }
str_cfhttpparam                 = v:(c f h t t p p a r a m)                                        { return plib.stringify(v, 'lower'); }
str_cfif                        = v:(c f i f)                                                      { return plib.stringify(v, 'lower'); }
str_cfimap                      = v:(c f i m a p)                                                  { return plib.stringify(v, 'lower'); }
str_cfimport                    = v:(c f i m p o r t)                                              { return plib.stringify(v, 'lower'); }
str_cfinclude                   = v:(c f i n c l u d e)                                            { return plib.stringify(v, 'lower'); }
str_cfinsert                    = v:(c f i n s e r t)                                              { return plib.stringify(v, 'lower'); }
str_cfinterface                 = v:(c f i n t e r f a c e)                                        { return plib.stringify(v, 'lower'); }
str_cfinvoke                    = v:(c f i n v o k e)                                              { return plib.stringify(v, 'lower'); }
str_cfinvokeargument            = v:(c f i n v o k e a r g u m e n t)                              { return plib.stringify(v, 'lower'); }
str_cfldap                      = v:(c f l d a p)                                                  { return plib.stringify(v, 'lower'); }
str_cflocation                  = v:(c f l o c a t i o n)                                          { return plib.stringify(v, 'lower'); }
str_cflock                      = v:(c f l o c k)                                                  { return plib.stringify(v, 'lower'); }
str_cflog                       = v:(c f l o g)                                                    { return plib.stringify(v, 'lower'); }
str_cflogin                     = v:(c f l o g i n)                                                { return plib.stringify(v, 'lower'); }
str_cfloginuser                 = v:(c f l o g i n u s e r)                                        { return plib.stringify(v, 'lower'); }
str_cflogout                    = v:(c f l o g o u t)                                              { return plib.stringify(v, 'lower'); }
str_cfloop                      = v:(c f l o o p)                                                  { return plib.stringify(v, 'lower'); }
str_cfmail                      = v:(c f m a i l)                                                  { return plib.stringify(v, 'lower'); }
str_cfmailparam                 = v:(c f m a i l p a r a m)                                        { return plib.stringify(v, 'lower'); }
str_cfmailpart                  = v:(c f m a i l p a r t)                                          { return plib.stringify(v, 'lower'); }
str_cfobjectcache               = v:(c f o b j e c t c a c h e)                                    { return plib.stringify(v, 'lower'); }
str_cfoutput                    = v:(c f o u t p u t)                                              { return plib.stringify(v, 'lower'); }
str_cfparam                     = v:(c f p a r a m)                                                { return plib.stringify(v, 'lower'); }
str_cfpop                       = v:(c f p o p)                                                    { return plib.stringify(v, 'lower'); }
str_cfprocessingdirective       = v:(c f p r o c e s s i n g d i r e c t i v e)                    { return plib.stringify(v, 'lower'); }
str_cfprocparam                 = v:(c f p r o c p a r a m)                                        { return plib.stringify(v, 'lower'); }
str_cfprocresult                = v:(c f p r o c r e s u l t)                                      { return plib.stringify(v, 'lower'); }
str_cfproperty                  = v:(c f p r o p e r t y)                                          { return plib.stringify(v, 'lower'); }
str_cfquery                     = v:(c f q u e r y)                                                { return plib.stringify(v, 'lower'); }
str_cfqueryparam                = v:(c f q u e r y p a r a m)                                      { return plib.stringify(v, 'lower'); }
str_cfrethrow                   = v:(c f r e t h r o w)                                            { return plib.stringify(v, 'lower'); }
str_cfreturn                    = v:(c f r e t u r n)                                              { return plib.stringify(v, 'lower'); }
str_cfsavecontent               = v:(c f s a v e c o n t e n t)                                    { return plib.stringify(v, 'lower'); }
str_cfschedule                  = v:(c f s c h e d u l e)                                          { return plib.stringify(v, 'lower'); }
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
str_cfxml                       = v:(c f x m l)                                                    { return plib.stringify(v, 'lower'); }
str_cfzip                       = v:(c f z i p)                                                    { return plib.stringify(v, 'lower'); }
str_cfzipparam                  = v:(c f z i p p a r a m)                                          { return plib.stringify(v, 'lower'); }
str_cfzipparam                  = v:(c f z i p p a r a m)                                          { return plib.stringify(v, 'lower'); }
str_cgi                         = v:(c g i)                                                        { return plib.stringify(v, 'lower'); }
str_change_dir                  = v:(c h a n g e __ d i r)                                         { return plib.stringify(v, 'under', 'lower'); }
str_char                        = v:(c h a r)                                                      { return plib.stringify(v, 'lower'); }
str_character                   = v:(c h a r a c t e r)                                            { return plib.stringify(v, 'lower'); }
str_characters                  = v:(c h a r a c t e r s)                                          { return plib.stringify(v, 'lower'); }
str_charset                     = v:(c h a r s e t)                                                { return plib.stringify(v, 'lower'); }
str_clear                       = v:(c l e a r)                                                    { return plib.stringify(v, 'lower'); }
str_client_cache                = v:(c l i e n t __ c a c h e)                                     { return plib.stringify(v, 'lower'); }
str_client_cert                 = v:(c l i e n t __ c e r t)                                       { return plib.stringify(v, 'under', 'lower'); }
str_client_cert_password        = v:(c l i e n t __ c e r t __ p a s s w o r d)                    { return plib.stringify(v, 'under', 'lower'); }
str_client_management           = v:(c l i e n t __ m a n a g e m e n t)                           { return plib.stringify(v, 'lower'); }
str_client_storage              = v:(c l i e n t __ s t o r a g e)                                 { return plib.stringify(v, 'lower'); }
str_clob                        = v:(c l o b)                                                      { return plib.stringify(v); }
str_close                       = v:(c l o s e)                                                    { return plib.stringify(v, 'lower'); }
str_collection                  = v:(c o l l e c t i o n)                                          { return plib.stringify(v, 'lower'); }
str_column_map                  = v:(c o l u m n __ m a p)                                         { return plib.stringify(v, 'under', 'lower'); }
str_columns                     = v:(c o l u m n s)                                                { return plib.stringify(v, 'lower'); }
str_comment                     = v:(c o m m e n t)                                                { return plib.stringify(v, 'lower'); }
str_commit                      = v:(c o m m i t)                                                  { return plib.stringify(v, 'lower'); }
str_component                   = v:(c o m p o n e n t)                                            { return plib.stringify(v, 'lower'); }
str_compressed_size             = v:(c o m p r e s s e d __ s i z e)                               { return plib.stringify(v, 'under', 'lower'); }
str_compression                 = v:(c o m p r e s s i o n)                                        { return plib.stringify(v, 'lower'); }
str_condition                   = v:(c o n d i t i o n)                                            { return plib.stringify(v, 'lower'); }
str_connection                  = v:(c o n n e c t i o n)                                          { return plib.stringify(v, 'lower'); }
str_console                     = v:(c o n s o l e)                                                { return plib.stringify(v, 'lower'); }
str_constrained                 = v:(c o n s t r a i n e d)                                        { return plib.stringify(v, 'lower'); }
str_content                     = v:(c o n t e n t)                                                { return plib.stringify(v, 'lower'); }
str_content_id                  = v:(c o n t e n t __ i d)                                         { return plib.stringify(v, 'lower'); }
str_cookie                      = v:(c o o k i e)                                                  { return plib.stringify(v); }
str_cookie_domain               = v:(c o o k i e __ d o m a i n)                                   { return plib.stringify(v); }
str_copy                        = v:(c o p y)                                                      { return plib.stringify(v, 'lower'); }
str_country_code                = v:(c o u n t r y __ c o d e)                                     { return plib.stringify(v); }
str_crc                         = v:(c r c)                                                        { return plib.stringify(v, 'lower'); }
str_create                      = v:(c r e a t e)                                                  { return plib.stringify(v, 'lower'); }
str_create_dir                  = v:(c r e a t e __ d i r)                                         { return plib.stringify(v, 'under', 'lower'); }
str_create_folder               = v:(c r e a t e __ f o l d e r)                                   { return plib.stringify(v, 'under', 'lower'); }
str_credit_card                 = v:(c r e d i t __ c a r d)                                       { return plib.stringify(v); }
str_css_src                     = v:(c s s __ s r c)                                               { return plib.stringify(v); }
str_custom_type                 = v:(c u s t o m __ t y p e)                                       { return plib.stringify(v, 'lower'); }
str_daily                       = v:(d a i l y)                                                    { return plib.stringify(v, 'lower'); }
str_data_collection             = v:(d a t a __ c o l l e c t i o n)                               { return plib.stringify(v, 'lower'); }
str_database                    = v:(d a t a b a s e)                                              { return plib.stringify(v, 'lower'); }
str_datasource                  = v:(d a t a s o u r c e)                                          { return plib.stringify(v, 'lower'); }
str_date                        = v:(d a t e)                                                      { return plib.stringify(v); }
str_date_last_modified          = v:(d a t e __ l a s t __ m o d i f i e d)                        { return plib.stringify(v, 'under', 'lower'); }
str_db                          = v:(d b)                                                          { return plib.stringify(v, 'lower'); }
str_dbname                      = v:(d b n a m e)                                                  { return plib.stringify(v, 'lower'); }
str_dbnames                     = v:(d b n a m e s)                                                { return plib.stringify(v, 'lower'); }
str_dbtype                      = v:(d b t y p e)                                                  { return plib.stringify(v, 'lower'); }
str_debug                       = v:(d e b u g)                                                    { return plib.stringify(v, 'lower'); }
str_decimal                     = v:(d e c i m a l)                                                { return plib.stringify(v, 'lower'); }
str_default                     = v:(d e f a u l t)                                                { return plib.stringify(v, 'lower'); }
str_delete                      = v:(d e l e t e)                                                  { return plib.stringify(v, 'lower'); }
str_delete_file                 = v:(d e l e t e __ f i l e)                                       { return plib.stringify(v, 'lower'); }
str_delete_file                 = v:(d e l e t e __ f i l e)                                       { return plib.stringify(v, 'lower'); }
str_delete_folder               = v:(d e l e t e __ f o l d e r)                                   { return plib.stringify(v, 'under', 'lower'); }
str_delimiter                   = v:(d e l i m i t e r)                                            { return plib.stringify(v, 'lower'); }
str_depends_on                  = v:(d e p e n d s __ o n)                                         { return plib.stringify(v, 'lower'); }
str_desc                        = v:(d e s c)                                                      { return plib.stringify(v, 'upper'); }
str_description                 = v:(d e s c r i p t i o n)                                        { return plib.stringify(v, 'lower'); }
str_destination                 = v:(d e s t i n a t i o n)                                        { return plib.stringify(v, 'lower'); }
str_dir                         = v:(d i r)                                                        { return plib.stringify(v, 'lower'); }
str_directory                   = v:(d i r e c t o r y)                                            { return plib.stringify(v, 'lower'); }
str_disk_persistent             = v:(d i s k __ p e r s i s t e n t)                               { return plib.stringify(v, 'lower'); }
str_display_name                = v:(d i s p l a y __ n a m e)                                     { return plib.stringify(v, 'lower'); }
str_disposition                 = v:(d i s p o s i t i o n)                                        { return plib.stringify(v, 'lower'); }
str_dn                          = v:(d n)                                                          { return plib.stringify(v, 'lower'); }
str_document                    = v:(d o c u m e n t)                                              { return plib.stringify(v, 'lower'); }
str_domain                      = v:(d o m a i n)                                                  { return plib.stringify(v, 'lower'); }
str_double                      = v:(d o u b l e)                                                  { return plib.stringify(v, 'lower'); }
str_dynamic_insert              = v:(d y n a m i c __ i n s e r t)                                 { return plib.stringify(v, 'lower'); }
str_dynamic_update              = v:(d y n a m i c __ u p d a t e)                                 { return plib.stringify(v, 'lower'); }
str_element_column              = v:(e l e m e n t __ c o l u m n)                                 { return plib.stringify(v); }
str_element_type                = v:(e l e m e n t __ t y p e)                                     { return plib.stringify(v); }
str_email                       = v:(e m a i l)                                                    { return plib.stringify(v); }
str_enable_cfouput_only         = v:(e n a b l e __ c f o u t p u t __ o n l y)                    { return plib.stringify(v, 'lower'); }
str_enclosure_dir               = v:(e n c l o s u r e __ d i r)                                   { return plib.stringify(v, 'under', 'lower'); }
str_encoded                     = v:(e n c o d e d)                                                { return plib.stringify(v, 'lower'); }
str_end_date                    = v:(e n d __ d a t e)                                             { return plib.stringify(v, 'under', 'lower'); }
str_end_row                     = v:(e n d __ r o w)                                               { return plib.stringify(v, 'under', 'lower'); }
str_end_time                    = v:(e n d __ t i m e)                                             { return plib.stringify(v, 'under', 'lower'); }
str_entity_name                 = v:(e n t i t y __ n a m e)                                       { return plib.stringify(v, 'lower'); }
str_entry_path                  = v:(e n t r y __ p a t h)                                         { return plib.stringify(v, 'lower'); }
str_error                       = v:(e r r o r)                                                    { return plib.stringify(v, 'lower'); }
str_escape_chars                = v:(e s c a p e __ c h a r s)                                     { return plib.stringify(v, 'under', 'lower'); }
str_exception                   = v:(e x c e p t i o n)                                            { return plib.stringify(v, 'lower'); }
str_exclusive                   = v:(e x c l u s i v e)                                            { return plib.stringify(v, 'lower'); }
str_existing                    = v:(e x i s t i n g)                                              { return plib.stringify(v, 'lower'); }
str_exists                      = v:(e x i s t s)                                                  { return plib.stringify(v, 'lower'); }
str_exists_dir                  = v:(e x i s t s __ d i r)                                         { return plib.stringify(v, 'under', 'lower'); }
str_exists_file                 = v:(e x i s t s __ f i l e)                                       { return plib.stringify(v, 'under', 'lower'); }
str_exit_tag                    = v:(e x i t __ t a g)                                             { return plib.stringify(v); }
str_exit_template               = v:(e x i t __ t e m p l a t e)                                   { return plib.stringify(v); }
str_expand                      = v:(e x p a n d)                                                  { return plib.stringify(v, 'lower'); }
str_expire_url                  = v:(e x p i r e __ u r l)                                         { return plib.stringify(v, 'lower'); }
str_expires                     = v:(e x p i r e s)                                                { return plib.stringify(v, 'lower'); }
str_expression                  = v:(e x p r e s s i o n)                                          { return plib.stringify(v, 'lower'); }
str_extends                     = v:(e x t e n d s)                                                { return plib.stringify(v, 'lower'); }
str_fail_if_exists              = v:(f a i l __ i f __ e x i s t s)                                { return plib.stringify(v, 'under', 'lower'); }
str_fail_to                     = v:(f a i l __ t o)                                               { return plib.stringify(v, 'under', 'lower'); }
str_fatal                       = v:(f a t a l)                                                    { return plib.stringify(v, 'lower'); }
str_fatal_information           = v:(f a t a l __ i n f o r m a t i o n)                           { return plib.stringify(v, 'lower'); }
str_fetch                       = v:(f e t c h)                                                    { return plib.stringify(v, 'lower'); }
str_fetch_batch_size            = v:(f e t c h __ b a t c h __ s i z e)                            { return plib.stringify(v); }
str_field_type                  = v:(f i e l d __ t y p e)                                         { return plib.stringify(v); }
str_file                        = v:(f i l e)                                                      { return plib.stringify(v, 'lower'); }
str_file_field                  = v:(f i l e __ f i e l d)                                         { return plib.stringify(v, 'under', 'lower'); }
str_filter                      = v:(f i l t e r)                                                  { return plib.stringify(v, 'lower'); }
str_fingerprint                 = v:(f i n g e r p r i n t)                                        { return plib.stringify(v, 'lower'); }
str_fix_newline                 = v:(f i x __ n e w l i n e)                                       { return plib.stringify(v, 'under', 'lower'); }
str_fkcolumn                    = v:(f k c o l u m n)                                              { return plib.stringify(v); }
str_float                       = v:(f l o a t)                                                    { return plib.stringify(v); }
str_flush                       = v:(f l u s h)                                                    { return plib.stringify(v); }
str_folder                      = v:(f o l d e r)                                                  { return plib.stringify(v, 'lower'); }
str_foreign_keys                = v:(f o r e i g n __ k e y s)                                     { return plib.stringify(v); }
str_form_data                   = v:(f o r m __ d a t a)                                           { return plib.stringify(v, 'under', 'lower'); }
str_form_field                  = v:(f o r m __ f i e l d)                                         { return plib.stringify(v, 'under', 'lower'); }
str_form_fields                 = v:(f o r m __ f i e l d s)                                       { return plib.stringify(v); }
str_format                      = v:(f o r m a t)                                                  { return plib.stringify(v, 'lower'); }
str_formula                     = v:(f o r m u l a)                                                { return plib.stringify(v); }
str_from                        = v:(f r o m)                                                      { return plib.stringify(v, 'lower'); }
str_generate_unique_filenames   = v:(g e n e r a t e __ u n i q u e __ f i l e n a m e s)          { return plib.stringify(v, 'under', 'lower'); }
str_generated                   = v:(g e n e r a t e d)                                            { return plib.stringify(v, 'lower'); }
str_generator                   = v:(g e n e r a t o r)                                            { return plib.stringify(v); }
str_get                         = v:(g e t)                                                        { return plib.stringify(v); }
str_get_all                     = v:(g e t __ a l l)                                               { return plib.stringify(v, 'under', 'lower'); }
str_get_as_binary               = v:(g e t __ a s __ b i n a r y)                                  { return plib.stringify(v, 'under', 'lower'); }
str_get_current_dir             = v:(g e t __ c u r r e n t __ d i r)                              { return plib.stringify(v, 'under', 'lower'); }
str_get_current_url             = v:(g e t __ c u r r e n t __ u r l)                              { return plib.stringify(v, 'under', 'lower'); }
str_get_file                    = v:(g e t __ f i l e)                                             { return plib.stringify(v, 'under', 'lower'); }
str_get_header_only             = v:(g e t __ h e a d e r __ o n l y)                              { return plib.stringify(v, 'under', 'lower'); }
str_getter                      = v:(g e t t e r)                                                  { return plib.stringify(v); }
str_google_map_key              = v:(g o o g l e __ m a p __ k e y)                                { return plib.stringify(v, 'lower'); }
str_group                       = v:(g r o u p)                                                    { return plib.stringify(v, 'lower'); }
str_group_case_sensitive        = v:(g r o u p __ c a s e __ s e n s i t i v e)                    { return plib.stringify(v, 'lower'); }
str_guid                        = v:(g u i d)                                                      { return plib.stringify(v); }
str_head                        = v:(h e a d)                                                      { return plib.stringify(v, 'lower'); }
str_header                      = v:(h e a d e r)                                                  { return plib.stringify(v, 'lower'); }
str_hidden                      = v:(h i d d e n)                                                  { return plib.stringify(v, 'lower'); }
str_hide                        = v:(h i d e)                                                      { return plib.stringify(v, 'lower'); }
str_high                        = v:(h i g h)                                                      { return plib.stringify(v, 'lower'); }
str_highest                     = v:(h i g h e s t)                                                { return plib.stringify(v, 'lower'); }
str_hint                        = v:(h i n t)                                                      { return plib.stringify(v, 'lower'); }
str_html                        = v:(h t m l)                                                      { return plib.stringify(v); }
str_http                        = v:(h t t p)                                                      { return plib.stringify(v, 'lower'); }
str_http_only                   = v:(h t t p __ o n l y)                                           { return plib.stringify(v, 'lower'); }
str_https                       = v:(h t t p s)                                                    { return plib.stringify(v, 'lower'); }
str_id                          = v:(i d)                                                          { return plib.stringify(v, 'lower'); }
str_idle_time                   = v:(i d l e __ t i m e)                                           { return plib.stringify(v, 'lower'); }
str_idle_timeout                = v:(i d l e __ t i m e o u t)                                     { return plib.stringify(v, 'lower'); }
str_idstamp                     = v:(i d s t a m p)                                                { return plib.stringify(v, 'lower'); }
str_ignore_enclosure_error      = v:(i g n o r e __ e n c l o s u r e __ e r r o r)                { return plib.stringify(v, 'under', 'lower'); }
str_implements                  = v:(i m p l e m e n t s)                                          { return plib.stringify(v, 'lower'); }
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
str_item                        = v:(i t e m)                                                      { return plib.stringify(v, 'lower'); }
str_join                        = v:(j o i n)                                                      { return plib.stringify(v); }
str_join_column                 = v:(j o i n __ c o l u m n)                                       { return plib.stringify(v); }
str_js_class_name               = v:(j s __ c l a s s __ n a m e)                                  { return plib.stringify(v); }
str_json                        = v:(j s o n)                                                      { return plib.stringify(v); }
str_key                         = v:(k e y)                                                        { return plib.stringify(v, 'lower'); }
str_key_alias                   = v:(k e y __ a l i a s)                                           { return plib.stringify(v, 'under', 'lower'); }
str_key_password                = v:(k e y __ p a s s w o r d)                                     { return plib.stringify(v, 'under', 'lower'); }
str_key_store                   = v:(k e y __ s t o r e)                                           { return plib.stringify(v, 'under', 'lower'); }
str_key_store_password          = v:(k e y __ s t o r e __ p a s s w o r d)                        { return plib.stringify(v, 'under', 'lower'); }
str_keys                        = v:(k e y s)                                                      { return plib.stringify(v, 'lower'); }
str_label                       = v:(l a b e l)                                                    { return plib.stringify(v, 'lower'); }
str_lazy                        = v:(l a z y)                                                      { return plib.stringify(v); }
str_length                      = v:(l e n g t h)                                                  { return plib.stringify(v); }
str_link_catalog                = v:(l i n k __ c a t a l o g)                                     { return plib.stringify(v); }
str_link_schema                 = v:(l i n k __ s c h e m a)                                       { return plib.stringify(v); }
str_link_table                  = v:(l i n k __ t a b l e)                                         { return plib.stringify(v); }
str_list                        = v:(l i s t)                                                      { return plib.stringify(v, 'lower'); }
str_list_all_folders            = v:(l i s t __ a l l __ f o l d e r s)                            { return plib.stringify(v, 'under', 'lower'); }
str_list_dir                    = v:(l i s t __ d i r)                                             { return plib.stringify(v, 'under', 'lower'); }
str_list_info                   = v:(l i s t __ i n f o)                                           { return plib.stringify(v, 'under', 'lower'); }
str_local_file                  = v:(l o c a l __ f i l e)                                         { return plib.stringify(v, 'under', 'lower'); }
str_lock                        = v:(l o c k)                                                      { return plib.stringify(v, 'lower'); }
str_log                         = v:(l o g)                                                        { return plib.stringify(v, 'lower'); }
str_login_storage               = v:(l o g i n __ s t o r a g e)                                   { return plib.stringify(v, 'lower'); }
str_long                        = v:(l o n g)                                                      { return plib.stringify(v, 'lower'); }
str_longvarchar                 = v:(l o n g v a r c h a r)                                        { return plib.stringify(v, 'lower'); }
str_loop                        = v:(l o o p)                                                      { return plib.stringify(v, 'lower'); }
str_low                         = v:(l o w)                                                        { return plib.stringify(v, 'lower'); }
str_lowest                      = v:(l o w e s t)                                                  { return plib.stringify(v, 'lower'); }
str_mail_to                     = v:(m a i l __ t o)                                               { return 'mail_to'; }
str_mailer_id                   = v:(m a i l e r __ i d)                                           { return plib.stringify(v, 'under', 'lower'); }
str_make_unique                 = v:(m a k e __ u n i q u e)                                       { return plib.stringify(v, 'lower'); }
str_mapped_by                   = v:(m a p p e d __ b y)                                           { return plib.stringify(v); }
str_mapped_super_class          = v:(m a p p e d __ s u p e r __ c l a s s)                        { return plib.stringify(v, 'under', 'lower'); }
str_mark_read                   = v:(m a r k __ r e a d)                                           { return plib.stringify(v, 'under', 'lower'); }
str_max                         = v:(m a x)                                                        { return plib.stringify(v, 'lower'); }
str_max_length                  = v:(m a x __ l e n g t h)                                         { return 'max_length'; }
str_max_rows                    = v:(m a x __ r o w s)                                             { return 'max_rows'; }
str_message_number              = v:(m e s s a g e __ n u m b e r)                                 { return plib.stringify(v, 'under', 'lower'); }
str_meta_info                   = v:(m e t a __ i n f o)                                           { return plib.stringify(v, 'lower'); }
str_metadata                    = v:(m e t a d a t a)                                              { return plib.stringify(v, 'lower'); }
str_method                      = v:(m e t h o d)                                                  { return plib.stringify(v, 'lower'); }
str_mime_attach                 = v:(m i m e __ a t t a c h)                                       { return plib.stringify(v, 'under', 'lower'); }
str_mime_type                   = v:(m i m e __ t y p e)                                           { return plib.stringify(v, 'lower'); }
str_min                         = v:(m i n)                                                        { return plib.stringify(v, 'lower'); }
str_missing_include             = v:(m i s s i n g __ i n c l u d e)                               { return plib.stringify(v); }
str_missing_row_ignored         = v:(m i s s i n g __ r o w __ i g n o r e d)                      { return plib.stringify(v, 'under', 'lower'); }
str_mode                        = v:(m o d e)                                                      { return plib.stringify(v, 'lower'); }
str_modify                      = v:(m o d i f y)                                                  { return plib.stringify(v, 'under', 'lower'); }
str_modify_dn                   = v:(m o d i f y __ d n)                                           { return plib.stringify(v, 'under', 'lower'); }
str_modify_type                 = v:(m o d i f y __ t y p e)                                       { return plib.stringify(v, 'under', 'lower'); }
str_money                       = v:(m o n e y)                                                    { return plib.stringify(v, 'lower'); }
str_money4                      = v:(m o n e y '4')                                                { return plib.stringify(v, 'lower'); }
str_monthly                     = v:(m o n t h l y)                                                { return plib.stringify(v, 'lower'); }
str_move                        = v:(m o v e)                                                      { return plib.stringify(v, 'lower'); }
str_move_mail                   = v:(m o v e __ m a i l)                                           { return plib.stringify(v, 'under', 'lower'); }
str_multipart                   = v:(m u l t i p a r t)                                            { return plib.stringify(v, 'lower'); }
str_multipart_type              = v:(m u l t i p a r t __ t y p e)                                 { return plib.stringify(v, 'lower'); }
str_name                        = v:(n a m e)                                                      { return plib.stringify(v, 'lower'); }
str_name_conflict               = v:(n a m e __ c o n f l i c t)                                   { return plib.stringify(v, 'under', 'lower'); }
str_namespace                   = v:(n a m e s p a c e)                                            { return plib.stringify(v, 'lower'); }
str_nested                      = v:(n e s t e d)                                                  { return plib.stringify(v, 'lower'); }
str_never                       = v:(n e v e r)                                                    { return plib.stringify(v); }
str_new                         = v:(n e w)                                                        { return plib.stringify(v, 'lower'); }
str_new_directory               = v:(n e w __ d i r e c t o r y)                                   { return plib.stringify(v, 'under', 'lower'); }
str_new_folder                  = v:(n e w __ f o l d e r)                                         { return plib.stringify(v, 'under', 'lower'); }
str_nocase                      = v:(n o c a s e)                                                  { return plib.stringify(v); }
str_non_urgent                  = v:(n o n __ u r g e n t)                                         { return plib.stringify(v, 'under', 'lower'); }
str_none                        = v:(n o n e)                                                      { return plib.stringify(v); }
str_normal                      = v:(n o r m a l)                                                  { return plib.stringify(v, 'lower'); }
str_not_null                    = v:(n o t __ n u l l)                                             { return plib.stringify(v); }
str_now                         = v:(n o w)                                                        { return plib.stringify(v); }
str_null                        = v:(n u l l)                                                      { return plib.stringify(v, 'lower'); }
str_numeric                     = v:(n u m e r i c)                                                { return plib.stringify(v); }
str_object                      = v:(o b j e c t)                                                  { return plib.stringify(v, 'lower'); }
str_omit                        = v:(o m i t)                                                      { return plib.stringify(v, 'lower'); }
str_on_error                    = v:(o n __ e r r o r)                                             { return plib.stringify(v, 'lower'); }
str_on_success                  = v:(o n __ s u c c e s s)                                         { return plib.stringify(v, 'lower'); }
str_once                        = v:(o n c e)                                                      { return plib.stringify(v, 'lower'); }
str_one_level                   = v:(o n e __ l e v e l)                                           { return plib.stringify(v, 'under', 'lower'); }
str_open                        = v:(o p e n)                                                      { return plib.stringify(v, 'lower'); }
str_operation                   = v:(o p e r a t i o n)                                            { return plib.stringify(v, 'lower'); }
str_optimal                     = v:(o p t i m a l)                                                { return plib.stringify(v, 'lower'); }
str_optimistic_lock             = v:(o p t i m i s t i c __ l o c k)                               { return plib.stringify(v, 'lower'); }
str_optimistic_lock_generated   = v:(o p t i m i s t i c __ l o c k __ g e n e r a t e d)          { return plib.stringify(v); }
str_options                     = v:(o p t i o n s)                                                { return plib.stringify(v, 'lower'); }
str_order_by                    = v:(o r d e r __ b y)                                             { return plib.stringify(v); }
str_order_by_read_only          = v:(o r d e r __ b y __ r e a d __ o n l y)                       { return plib.stringify(v); }
str_orm_options                 = v:(o r m __ o p t i o n s)                                       { return plib.stringify(v, 'lower'); }
str_orm_type                    = v:(o r m __ t y p e)                                             { return plib.stringify(v); }
str_out                         = v:(o u t)                                                        { return plib.stringify(v); }
str_outline                     = v:(o u t l i n e)                                                { return plib.stringify(v, 'lower'); }
str_output                      = v:(o u t p u t)                                                  { return plib.stringify(v, 'lower'); }
str_output_file                 = v:(o u t p u t __ f i l e)                                       { return plib.stringify(v, 'lower'); }
str_overflow_to_disk            = v:(o v e r f l o w __ t o __ d i s k)                            { return plib.stringify(v, 'lower'); }
str_overwrite                   = v:(o v e r w r i t e)                                            { return plib.stringify(v, 'lower'); }
str_overwrite_enclosure         = v:(o v e r w r i t e __ e n c l o s u r e)                       { return plib.stringify(v, 'under', 'lower'); }
str_package                     = v:(p a c k a g e)                                                { return plib.stringify(v, 'lower'); }
str_page_encoding               = v:(p a g e __ e n c o d i n g)                                   { return plib.stringify(v, 'lower'); }
str_params                      = v:(p a r a m s)                                                  { return plib.stringify(v, 'lower'); }
str_passive                     = v:(p a s s i v e)                                                { return plib.stringify(v, 'lower'); }
str_passphrase                  = v:(p a s s p h r a s e)                                          { return plib.stringify(v, 'lower'); }
str_password                    = v:(p a s s w o r d)                                              { return plib.stringify(v, 'lower'); }
str_path                        = v:(p a t h)                                                      { return plib.stringify(v, 'lower'); }
str_pattern                     = v:(p a t t e r n)                                                { return plib.stringify(v, 'lower'); }
str_pause                       = v:(p a u s e)                                                    { return plib.stringify(v, 'lower'); }
str_persistent                  = v:(p e r s i s t e n t)                                          { return plib.stringify(v, 'lower'); }
str_plain                       = v:(p l a i n)                                                    { return plib.stringify(v, 'lower'); }
str_port                        = v:(p o r t)                                                      { return plib.stringify(v, 'lower'); }
str_port_type_name              = v:(p o r t __ t y p e __ n a m e)                                { return plib.stringify(v, 'under', 'lower'); }
str_post                        = v:(p o s t)                                                      { return plib.stringify(v, 'lower'); }
str_precision                   = v:(p r e c i s i o n)                                            { return plib.stringify(v); }
str_prefix                      = v:(p r e f i x)                                                  { return plib.stringify(v, 'lower'); }
str_priority                    = v:(p r i o r i t y)                                              { return plib.stringify(v, 'lower'); }
str_private                     = v:(p r i v a t e)                                                { return plib.stringify(v, 'lower'); }
str_procedure                   = v:(p r o c e d u r e)                                            { return plib.stringify(v, 'lower'); }
str_procedures                  = v:(p r o c e d u r e s)                                          { return plib.stringify(v, 'lower'); }
str_properties                  = v:(p r o p e r t i e s)                                          { return plib.stringify(v, 'lower'); }
str_protocol                    = v:(p r o t o c o l)                                              { return plib.stringify(v, 'lower'); }
str_proxy_password              = v:(p r o x y __ p a s s w o r d)                                 { return plib.stringify(v, 'under', 'lower'); }
str_proxy_port                  = v:(p r o x y __ p o r t)                                         { return plib.stringify(v, 'under', 'lower'); }
str_proxy_server                = v:(p r o x y __ s e r v e r)                                     { return plib.stringify(v, 'under', 'lower'); }
str_proxy_user                  = v:(p r o x y __ u s e r)                                         { return plib.stringify(v, 'under', 'lower'); }
str_public                      = v:(p u b l i c)                                                  { return plib.stringify(v, 'lower'); }
str_publish                     = v:(p u b l i s h)                                                { return plib.stringify(v, 'lower'); }
str_put                         = v:(p u t)                                                        { return plib.stringify(v, 'lower'); }
str_put_file                    = v:(p u t __ f i l e)                                             { return plib.stringify(v, 'under', 'lower'); }
str_query                       = v:(q u e r y)                                                    { return plib.stringify(v); }
str_quote                       = v:(q u o t e)                                                    { return plib.stringify(v, 'lower'); }
str_range                       = v:(r a n g e s)                                                  { return plib.stringify(v); }
str_read                        = v:(r e a d)                                                      { return plib.stringify(v, 'lower'); }
str_read_binary                 = v:(r e a d __ b i n a r y)                                       { return plib.stringify(v, 'under', 'lower'); }
str_read_commited               = v:(r e a d __ c o m m i t e d)                                   { return plib.stringify(v, 'lower'); }
str_read_only                   = v:(r e a d __ o n l y)                                           { return plib.stringify(v); }
str_read_uncommited             = v:(r e a d __ u n c o m m i t e d)                               { return plib.stringify(v, 'lower'); }
str_real                        = v:(r e a l)                                                      { return plib.stringify(v, 'lower'); }
str_rebind                      = v:(r e b i n d)                                                  { return plib.stringify(v, 'lower'); }
str_recurse                     = v:(r e c u r s e)                                                { return plib.stringify(v, 'lower'); }
str_redirect                    = v:(r e d i r e c t)                                              { return plib.stringify(v, 'lower'); }
str_refcursor                   = v:(r e f c u r s o r)                                            { return plib.stringify(v); }
str_referral                    = v:(r e f e r r a l)                                              { return plib.stringify(v, 'lower'); }
str_regex                       = v:(r e g e x)                                                    { return plib.stringify(v); }
str_registry                    = v:(r e g i s t r y)                                              { return plib.stringify(v); }
str_regular_expression          = v:(r e g u l a r __ e x p r e s s i o n)                         { return plib.stringify(v); }
str_related                     = v:(r e l a t e d)                                                { return plib.stringify(v, 'lower'); }
str_remote                      = v:(r e m o t e)                                                  { return plib.stringify(v, 'lower'); }
str_remote_file                 = v:(r e m o t e __ f i l e)                                       { return plib.stringify(v, 'under', 'lower'); }
str_remove                      = v:(r e m o v e)                                                  { return plib.stringify(v, 'lower'); }
str_remove_dir                  = v:(r e m o v e __ d i r)                                         { return plib.stringify(v, 'under', 'lower'); }
str_rename                      = v:(r e n a m e)                                                  { return plib.stringify(v, 'lower'); }
str_rename_folder               = v:(r e n a m e __ f o l d e r)                                   { return plib.stringify(v, 'under', 'lower'); }
str_repeatable_read             = v:(r e p e a t a b l e __ r e a d)                               { return plib.stringify(v, 'lower'); }
str_replace                     = v:(r e p l a c e)                                                { return plib.stringify(v); }
str_reply_to                    = v:(r e p l y __ t o)                                             { return plib.stringify(v, 'under', 'lower'); }
str_request                     = v:(r e q u e s t)                                                { return plib.stringify(v, 'lower'); }
str_request_timeout             = v:(r e q u e s t __ t i m e o u t)                               { return plib.stringify(v, 'lower'); }
str_required                    = v:(r e q u i r e d)                                              { return plib.stringify(v, 'lower'); }
str_reset                       = v:(r e s e t)                                                    { return plib.stringify(v, 'lower'); }
str_resolve_url                 = v:(r e s o l v e __ u r l)                                       { return plib.stringify(v, 'lower'); }
str_result                      = v:(r e s u l t)                                                  { return plib.stringify(v, 'lower'); }
str_result_set                  = v:(r e s u l t __ s e t)                                         { return plib.stringify(v, 'lower'); }
str_resume                      = v:(r e s u m e)                                                  { return plib.stringify(v, 'lower'); }
str_retry_count                 = v:(r e t r y __ c o u n t)                                       { return plib.stringify(v, 'under', 'lower'); }
str_return_as_binary            = v:(r e t u r n __ a s __ b i n a r y)                            { return plib.stringify(v, 'under', 'lower'); }
str_return_code                 = v:(r e t u r n __ c o d e)                                       { return plib.stringify(v, 'lower'); }
str_return_format               = v:(r e t u r n __ f o r m a t)                                   { return plib.stringify(v, 'lower'); }
str_return_type                 = v:(r e t u r n __ t y p e)                                       { return plib.stringify(v, 'lower'); }
str_return_variable             = v:(r e t u r n __ v a r i a b l e)                               { return plib.stringify(v, 'under', 'lower'); }
str_roles                       = v:(r o l e s)                                                    { return plib.stringify(v, 'lower'); }
str_rollback                    = v:(r o l l __ b a c k)                                           { return plib.stringify(v, 'lower'); }
str_row_id                      = v:(r o w __ i d)                                                 { return plib.stringify(v); }
str_rpc                         = v:(r p c)                                                        { return plib.stringify(v, 'lower'); }
str_run                         = v:(r u n)                                                        { return plib.stringify(v, 'lower'); }
str_savepoint                   = v:(s a v e p o i n t)                                            { return plib.stringify(v, 'lower'); }
str_scale                       = v:(s c a l e)                                                    { return plib.stringify(v, 'lower'); }
str_scheduler                   = v:(s c h e d u l e r)                                            { return plib.stringify(v, 'lower'); }
str_schema                      = v:(s c h e m a)                                                  { return plib.stringify(v); }
str_scope                       = v:(s c o p e)                                                    { return plib.stringify(v, 'lower'); }
str_script_protect              = v:(s c r i p t __ p r o t e c t)                                 { return plib.stringify(v, 'lower'); }
str_script_src                  = v:(s c r i p t __ s r c)                                         { return plib.stringify(v); }
str_secure                      = v:(s e c u r e)                                                  { return plib.stringify(v, 'lower'); }
str_secure_json                 = v:(s e c u r e __ j s o n)                                       { return plib.stringify(v, 'lower'); }
str_secure_json_prefix          = v:(s e c u r e __ j s o n __ p r e f i x)                        { return plib.stringify(v, 'lower'); }
str_security                    = v:(s e c u r i t y)                                              { return plib.stringify(v, 'lower'); }
str_select                      = v:(s e l e c t)                                                  { return plib.stringify(v, 'lower'); }
str_select_before_update        = v:(s e l e c t __ b e f o r e __ u p d a t e)                    { return plib.stringify(v); }
str_select_key                  = v:(s e l e c t __ k e y)                                         { return plib.stringify(v); }
str_separator                   = v:(s e p a r a t o r)                                            { return plib.stringify(v, 'lower'); }
str_sequence                    = v:(s e q u e n c e)                                              { return plib.stringify(v); }
str_serializable                = v:(s e r i a l i z a b l e)                                      { return plib.stringify(v, 'lower'); }
str_server                      = v:(s e r v e r)                                                  { return plib.stringify(v, 'lower'); }
str_server_cache                = v:(s e r v e r __ c a c h e)                                     { return plib.stringify(v, 'lower'); }
str_server_side_form_validation = v:(s e r v e r __ s i d e __ f o r m __ v a l i d a t i o n)     { return plib.stringify(v, 'lower'); }
str_service_address             = v:(s e r v i c e __ a d d r e s s)                               { return plib.stringify(v, 'under', 'lower'); }
str_service_port_name           = v:(s e r v i c e __ p o r t __ n a m e)                          { return plib.stringify(v, 'under', 'lower'); }
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
str_show_directory              = v:(s h o w __ d i r e c t o r y)                                 { return plib.stringify(v, 'under', 'lower'); }
str_show_error                  = v:(s h o w __ e r r o r)                                         { return plib.stringify(v, 'lower'); }
str_show_udfs                   = v:(s h o w __ u d f s)                                           { return plib.stringify(v, 'lower'); }
str_sign                        = v:(s i g n)                                                      { return plib.stringify(v, 'lower'); }
str_site                        = v:(s i t e)                                                      { return plib.stringify(v, 'lower'); }
str_size                        = v:(s i z e)                                                      { return plib.stringify(v, 'lower'); }
str_skip                        = v:(s k i p)                                                      { return plib.stringify(v, 'lower'); }
str_smallint                    = v:(s m a l l i n t)                                              { return plib.stringify(v); }
str_social_security_number      = v:(s o c i a l __ s e c u r i t y __ n u m b e r)                { return plib.stringify(v); }
str_sort                        = v:(s o r t)                                                      { return plib.stringify(v, 'lower'); }
str_sort_control                = v:(s o r t __ c o n t r o l)                                     { return plib.stringify(v, 'under', 'lower'); }
str_source                      = v:(s o u r c e)                                                  { return plib.stringify(v, 'lower'); }
str_spool_enable                = v:(s p o o l __ e n a b l e)                                     { return plib.stringify(v, 'under', 'lower'); }
str_ssn                         = v:(s s n)                                                        { return plib.stringify(v); }
str_start                       = v:(s t a r t)                                                    { return plib.stringify(v, 'under', 'lower'); }
str_start_date                  = v:(s t a r t __ d a t e)                                         { return plib.stringify(v, 'under'); }
str_start_row                   = v:(s t a r t __ r o w)                                           { return plib.stringify(v, 'under'); }
str_start_time                  = v:(s t a r t __ t i m e)                                         { return plib.stringify(v, 'under'); }
str_status_code                 = v:(s t a t u s __ c o d e)                                       { return plib.stringify(v, 'under'); }
str_status_text                 = v:(s t a t u s __ t e x t)                                       { return plib.stringify(v, 'under'); }
str_step                        = v:(s t e p)                                                      { return plib.stringify(v, 'lower'); }
str_stop_on_error               = v:(s t o p __ o n __ e r r o r)                                  { return plib.stringify(v, 'under', 'lower'); }
str_store_acl                   = v:(s t o r e __ a c l)                                           { return plib.stringify(v, 'under', 'lower'); }
str_store_location              = v:(s t o r e __ l o c a t i o n)                                 { return plib.stringify(v, 'under', 'lower'); }
str_store_path                  = v:(s t o r e __ p a t h)                                         { return plib.stringify(v, 'under', 'lower'); }
str_string                      = v:(s t r i n g)                                                  { return plib.stringify(v); }
str_strip_whitespace            = v:(s t r i p __ w h i t e s p a c e)                             { return plib.stringify(v); }
str_struct                      = v:(s t r u c t)                                                  { return plib.stringify(v); }
str_struct_key_column           = v:(s t r u c t __ k e y __ c o l u m n)                          { return plib.stringify(v); }
str_struct_key_data_type        = v:(s t r u c t __ k e y __ d a t a __ t y p e)                   { return plib.stringify(v); }
str_struct_key_type             = v:(s t r u c t __ k e y __ t y p e)                              { return plib.stringify(v); }
str_style                       = v:(s t y l e)                                                    { return plib.stringify(v, 'lower'); }
str_subject                     = v:(s u b j e c t)                                                { return plib.stringify(v, 'lower'); }
str_subtree                     = v:(s u b t r e e)                                                { return plib.stringify(v, 'lower'); }
str_suppress_whitespace         = v:(s u p p r e s s __ w h i t e s p a c e)                       { return plib.stringify(v, 'lower'); }
str_table                       = v:(t a b l e)                                                    { return plib.stringify(v, 'lower'); }
str_table_name                  = v:(t a b l e __ n a m e)                                         { return plib.stringify(v, 'lower'); }
str_table_owner                 = v:(t a b l e __ o w n e r)                                       { return plib.stringify(v, 'under'); }
str_table_qualifier             = v:(t a b l e __ q u a l i f i e r)                               { return plib.stringify(v, 'under'); }
str_tables                      = v:(t a b l e s)                                                  { return plib.stringify(v, 'lower'); }
str_tag_lib                     = v:(t a g __ l i b)                                               { return plib.stringify(v, 'lower'); }
str_tags                        = v:(t a g s)                                                      { return plib.stringify(v, 'lower'); }
str_task                        = v:(t a s k)                                                      { return plib.stringify(v, 'lower'); }
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
str_trace                       = v:(t r a c e)                                                    { return plib.stringify(v, 'lower'); }
str_transfer_mode               = v:(t r a n s f e r __ m o d e)                                   { return plib.stringify(v, 'under', 'lower'); }
str_true_false                  = v:(t r u e __ f a l s e)                                         { return plib.stringify(v, 'lower'); }
str_type                        = v:(t y p e)                                                      { return plib.stringify(v, 'lower'); }
str_uid                         = v:(u i d)                                                        { return plib.stringify(v, 'lower'); }
str_unique                      = v:(u n i q u e)                                                  { return plib.stringify(v, 'lower'); }
str_unique_key                  = v:(u n i q u e __ k e y)                                         { return plib.stringify(v); }
str_unzip                       = v:(u n z i p)                                                    { return plib.stringify(v, 'lower'); }
str_update                      = v:(u p d a t e)                                                  { return plib.stringify(v, 'lower'); }
str_upload                      = v:(u p l o a d)                                                  { return plib.stringify(v, 'lower'); }
str_upload_all                  = v:(u p l o a d __ a l l)                                         { return plib.stringify(v, 'under', 'lower'); }
str_urgent                      = v:(u r g e n t)                                                  { return plib.stringify(v, 'lower'); }
str_url                         = v:(u r l)                                                        { return plib.stringify(v, 'lower'); }
str_use_cache                   = v:(u s e __ c a c h e)                                           { return plib.stringify(v, 'lower'); }
str_use_query_string            = v:(u s e __ q u e r y __ s t r i n g)                            { return plib.stringify(v, 'lower'); }
str_use_ssl                     = v:(u s e __ s s l)                                               { return plib.stringify(v, 'under', 'lower'); }
str_use_tsl                     = v:(u s e __ t s l)                                               { return plib.stringify(v, 'under', 'lower'); }
str_user_agent                  = v:(u s e r __ a g e n t)                                         { return plib.stringify(v, 'lower'); }
str_username                    = v:(u s e r n a m e)                                              { return plib.stringify(v, 'lower'); }
str_uuid                        = v:(u u i d)                                                      { return plib.stringify(v); }
str_validate                    = v:(v a l i d a t e)                                              { return plib.stringify(v, 'lower'); }
str_validate_param              = v:(v a l i d a t e __ p a r a m)                                 { return plib.stringify(v, 'lower'); }
str_validation                  = v:(v a l i d a t i o n)                                          { return plib.stringify(v, 'lower'); }
str_value                       = v:(v a l u e)                                                    { return plib.stringify(v, 'lower'); }
str_var                         = v:(v a r)                                                        { return plib.stringify(v, 'lower'); }
str_varchar                     = v:(v a r c h a r)                                                { return plib.stringify(v, 'lower'); }
str_variable                    = v:(v a r i a b l e)                                              { return plib.stringify(v, 'lower'); }
str_variable_name               = v:(v a r i a b l e __ n a m e)                                   { return plib.stringify(v); }
str_verify_client               = v:(v e r i f y __ c l i e n t)                                   { return plib.stringify(v, 'lower'); }
str_vm                          = v:(v m)                                                          { return plib.stringify(v, 'lower'); }
str_void                        = v:(v o i d)                                                      { return plib.stringify(v, 'lower'); }
str_warning                     = v:(w a r n i n g)                                                { return plib.stringify(v); }
str_wddx                        = v:(w d d x)                                                      { return plib.stringify(v); }
str_weekly                      = v:(w e e k l y)                                                  { return plib.stringify(v, 'lower'); }
str_where                       = v:(w h e r e)                                                    { return plib.stringify(v); }
str_wrap_text                   = v:(w r a p __ t e x t)                                           { return plib.stringify(v, 'under', 'lower'); }
str_write                       = v:(w r i t e)                                                    { return plib.stringify(v, 'lower'); }
str_wsdl_file                   = v:(w s d l __ f i l e)                                           { return plib.stringify(v, 'under', 'lower'); }
str_xml                         = v:(x m l)                                                        { return plib.stringify(v); }
str_xml_var                     = v:(x m l __ v a r)                                               { return plib.stringify(v, 'under', 'lower'); }
str_yes_no                      = v:(y e s n o)                                                    { return plib.stringify(v); }
str_zip                         = v:(z i p)                                                        { return plib.stringify(v); }
str_zipcode                     = v:(z i p __ c o d e)                                             { return plib.stringify(v); }
// end any case strings

// value definitions
//@TODO Implement ALL the actions that are supported by the FTP protocol https://en.wikipedia.org/wiki/List_of_FTP_commands not just the ones Adobe documented as supporting
//@TODO Make the arguments more standard. In the CF9 documentation, at least, they list specific actions as allowed, but in their examples, include the commands that you would send to the ftp server as values to the action attribute including attributes to these actions that aren't documented at all
//@TODO: get str_never to use human_date('30 years');
value_action_file                       =                quote_char                      v:(                str_append           /                str_copy           /                str_delete         /             str_move                    /                  str_read            /                    str_read_binary  /           str_rename            /             str_upload_all  /             str_upload           /                   str_write            )                  quote_char           {       return            v;  }
value_amazon_s3_bucket_location         =                quote_char                      v:(                u                    s                hyphen             w                e                  s             t                           /                  u                   s                    /                e           u                     )             quote_char      {             return               plib.stringify(v);  }
value_amazon_s3_bucket_location         =                quote_char                      v:(                u                    s                hyphen             w                e                  s             t                           /                  u                   s                    /                e           u                     )             quote_char      {             return               plib.stringify(v);  }
value_asterisk                          =                quote_char                      v:str_asterisk     quote_char           {                return             v;               }
value_cfajaximport_params_googlemapkey  =                quote_char                      v:(pound           '{googlemapkey="'    (!quote_char     anychar)+          '"}'             pound)             quote_char    {                           return             plib.stringify(v);  }
value_cfapplication_client_storage      =                value_any                       /                  quote_char           v:(              str_registry       /                str_cookie         )             quote_char                  {                  return              v.toLowerCase();     }
value_cfapplication_login_storage       =                quote_char                      v:(                str_cookie           /                str_session        )                quote_char         {             return                      v.toLowerCase();   }
value_cfapplication_script_protect      =                quote_char                      v:(                str_none             /                str_all            /                str_list           )             quote_char                  {                  return              v.toLowerCase();     }
value_cfcache_action                    =                quote_char                      v:(                str_client_cache     /                str_server_cache   /                str_cache          /             str_flush                   /                  str_get             /                    str_optimal      /           str_put               )             quote_char      {             return               plib.stringify(v,   'lower');            }
value_cfcache_protocol                  =                quote_char                      v:(                (                    str_https        /                  str_http         )                  ':'           wack                        wack               )                   quote_char           {                return      plib.stringify(v,     'lower');     }
value_cfcookie_expires                  =                quote_char                      v:str_never        quote_char           {                return             new              Date();            }
                                        /                quote_char                      v:str_now          quote_char           {                return             new                Date();          }
                                        /                quote_char                      v:date_time        quote_char           {                return             v;                 }
                                        /                quote_char                      v:date             quote_char           {                return             v;                 }
                                        /                v:value_integer                 {                  return               v;               }
value_cfdbinfo_type                     =                quote_char                      v:(                str_dbnames          /                str_tables         /                str_columns        /             str_procedures              /                  str_foreign_keys    /                    str_index        )           quote_char            {             return          v;            }
value_cfdirectory_action                =                quote_char                      v:(                str_list             /                str_create         /                str_delete         /             str_rename                  )                  quote_char          {                    return           v;          }
value_cfdirectory_type                  =                quote_char                      v:(                str_all              /                str_file           /                str_dir            )             quote_char                  {                  return              v;                   }
value_cfdump_format                     =                quote_char                      v:(                str_text             /                str_html           )                quote_char         {             return                      v;                 }
value_cfdump_output                     =                quote_char                      v:(                str_browser          /                str_console        /                str_file           )             quote_char                  {                  return              v;                   }
value_cferr_type                        =                quote_char                      v:(                str_exception        /                str_validation     /                str_request        )             quote_char                  {                  return              v.toLowerCase();     }
value_cferror_exception                 =                quote_char                      n:(                str_any              str_application  /                  str_custom_type  /                  str_database  /                           str_lock           /                   str_missing_include  /                str_object  /                     str_security  /               str_template  /                    str_expression      )                    quote_char         {                    return  n.toLowerCase();  }
value_cffeed_action                     =                quote_char                      v:(                str_create           /                str_read           )                quote_char         {             return                      v;                 }
value_cffile_action                     =                quote_char                      v:(                str_append           /                str_copy           /                str_delete         /             str_move                    /                  str_read_binary     /                    str_read         /           str_rename            /             str_upload_all  /             str_upload           /                   str_write            )                  quote_char           {       return            v;  }
value_cfftp_action                      =                quote_char                      v:(                str_open             /                str_close          /                str_quote          /             str_site                    /                  str_allo            /                    str_acct         )           quote_char            {             return          v;            }
value_cfftp_file_dir_action             =                quote_char                      v:(                str_change_dir       /                str_create_dir     /                str_list_dir       /             str_remove_dir              /                  str_get_file        /                    str_put_file     /           str_rename            /             str_remove      /             str_get_current_dir  /                   str_get_current_url  /                  str_exists_dir       /       str_exists_file   /   str_exists  )   quote_char   {  return       v;  }
value_cfhttpparam_type                  =                quote_char                      v:(                str_body             /                str_cgi            /                str_cookie         /             str_file                    /                  str_form_field      /                    str_header       /           str_url               /             str_xml         )             quote_char           {                   return               v;                 }
value_cfimap_action                     =                quote_char                      v:(                str_create_folder    /                str_delete_folder  /                str_rename_folder  /             str_delete                  /                  str_open            /                    str_close        /           str_list_all_folders  /             str_mark_read   /             str_move_mail        /                   str_get_all          /                  str_get_header_only  )       quote_char        {   return      v;  }
value_cfparam_type                      =                quote_char                      v:(                str_any              /                str_array          /                str_binary         /             str_boolean                 /                  str_country_code    /                    str_credit_card  /           str_date              /             str_email       /             str_float            /                   str_guid             /                  str_integer          /       str_ip            /   str_json    /   str_numeric  /  str_range    /   str_regex        /  str_regular_expression  /  str_social_security_number  /  str_ssn      /  str_string  /  str_struct     /  str_telephone  /  str_time       /  str_url   /  str_uuid     /  str_variable_name  /  str_xml  /           str_zip  /       str_zipcode)       quote_char  {  return  v;  }
value_cfpop_action                      =                quote_char                      v:(                str_get_header_only  /                str_get_all        /                str_delete         )             quote_char                  {                  return              v;                   }
value_cfprocparam_type                  =                quote_char                      v:(                str_inout            /                str_out            /                str_in             )             quote_char                  {                  return              plib.stringify(v,    'lower');        }
value_cfproperty_generated              =                quote_char                      v:(                str_always           /                str_never          )                quote_char         {             return                      plib.stringify(v,  'lower');           }
value_charset                           =                value_any_non_whitespace
value_http_method                       =                quote_char                      v:(                str_get              /                str_post           /                str_put            /             str_delete                  /                  str_head            /                    str_trace        /           str_options           )             quote_char      {             return               v;                  }
value_modify_type                       =                quote_char                      v:(                str_replace          /                str_add            /                str_delete         )             quote_char                  {                  return              v;                   }
value_multipart_type                    =                quote_char                      v:(                str_related          /                str_form_data      )                quote_char         {             return                      v;                 }
value_multipart_type                    =                quote_char                      v:(                str_related          /                str_form_data      )                quote_char         {             return                      v;                 }
value_permission_mode                   =                quote_char                      v:(                [0-7]                [0-7]            [0-7])             quote_char       {                  return        plib.stringify(v);          }
value_regex                             =                quote_char                      v:(                !quote_char          anychar)+        quote_char         {                return             new           RegExp(plib.stringify(v));  }
value_sort_control                      =                quote_char                      v:(                str_nocase           space?           comma              space?           str_asc            /             str_nocase                  space?             comma               space?               str_desc         /           str_asc               /             str_desc        )             quote_char           {                   return               plib.stringify(v,  'lower');            }
value_sql_type                          =                quote_char                      v:(                c                    f                __                 s                q                  l             __                          (                  str_char            /                    str_bigint       /           str_bit               /             str_blob        /             str_clob             /                   str_date             /                  str_decimal          /       str_double        /   str_float   /   str_idstamp  /  str_integer  /   str_longvarchar  /  str_money               /  str_money4                  /  str_numeric  /  str_real    /  str_refcursor  /  str_smallint   /  str_timestamp  /  str_time  /  str_tinyint  /  str_varchar        )  )        quote_char  {        return  plib.stringify(v,  'upper')    }
value_struct                            =                quote_char                      lcurl              v:(!rcurl            anychar)+        rcurl              quote_char       {                  return        plib.stringify(v,           'object');         }
value_zip_action                        =                quote_char                      v:(                str_delete           /                str_list           /                str_read_binary    /             str_read                    /                  str_unzip           /                    str_zip          )           quote_char            {             return          v;            }
value_zip_action_delete                 =                quote_char                      v:str_delete       quote_char           {                return             v;               }
value_zip_action_read                   =                quote_char                      v:str_read         quote_char           {                return             v;               }
value_zip_action_read_binary            =                quote_char                      v:str_read_binary  quote_char           {                return             v;               }

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

// Common Generic Value Definitions
// @TODO: allow escaped quotes inside quoted strings
value_any 
	= '"' v:(!'"' ( '\"' / anychar ) )+ '"' { return plib.stringify(v); }
	/ "'" v:(!"'" anychar)+ "'" { return plib.stringify(v); }
value_any_non_whitespace = quote_char v:( chars / [-_] )+ quote_char { return plib.stringify(v); }
value_boolean
	= quote_char y e s     quote_char { return true; }
	/ quote_char t r u e   quote_char { return true; }
	/ quote_char "1"       quote_char { return true; }
	/ quote_char n o       quote_char { return false; }
	/ quote_char f a l s e quote_char { return false; }
	/ quote_char "0"       quote_char { return false; }
value_cfldap_action = quote_char v:( str_add / str_delete / str_modify_dn / str_modify / str_query ) quote_char { return v; }
value_cftimer_type = quote_char v:( str_inline / str_outline / str_comment / str_debug ) quote_char { return v; }
value_cftrace_type = quote_char v:( str_information / str_warning / str_error / str_fatal_information ) quote_char { return v; }
value_cftransaction_action = quote_char v:( str_begin / str_commit / str_rollback / str_set_save_point ) quote_char { return v; }
value_cftransaction_isolation = quote_char v:( str_read_uncommited / str_read_commited / str_repeatable_read / str_serializable ) quote_char { return v; }
value_cfval         = quote_char pound v:(!pound anychar)+ pound quote_char { return plib.stringify(v); }
value_time_span_func
	                = value_empty_quote { return new Date(); }
	                / quote_char? v:create_time_span_func quote_char? { return plib.mkDate(v); }
value_date          = quote_char v:( now_func / create_time_span_func / date ) quote_char { return v; }
value_date_time     = quote_char v:( now_func / create_time_span_func / date_time ) quote_char { return v; }
value_transfer_mode = quote_char v:( str_ascii / str_binary / str_auto ) quote_char { return plib.stringify(v); }
value_dir           = v:(!(wack / ws / quote_char) .)*                           { return plib.stringify(v); }
value_domain        = quote_char v:( period domain ) quote_char { return plib.stringify(v); }
value_email_address = quote_char e:email quote_char                              { return e; }
value_unix_path     = ( ( wack (value_dir wack)* )* value_dir )
value_windows_path  = ( ucchars colon backwack (value_dir backwack)* value_dir )
value_file_path     = quote_char v:( value_unix_path / value_windows_path ) quote_char { return plib.stringify(v); }
value_fingerprint   = quote_char v:(hexadecimal hexadecimal colon hexadecimal hexadecimal colon hexadecimal hexadecimal colon hexadecimal hexadecimal colon colon hexadecimal hexadecimal colon hexadecimal hexadecimal colon hexadecimal hexadecimal colon hexadecimal hexadecimal) quote_char { return plib.stringify(v); }
value_fqdn_domain   = quote_char v:domain quote_char { return v; }
value_comma_sep_list     = quote_char v:( ((!(comma / quote_char) anychar)+ comma )+ (!(comma / quote_char) anychar)+ ) quote_char { return plib.stringify(v).split(','); }
value_semicolin_sep_list = quote_char v:( ((!(semi  / quote_char) anychar)+ semi )+  (!(semi  / quote_char) anychar)+ ) quote_char { return plib.stringify(v).split(';'); }
value_list          = quote_char v:( ((!(comma / quote_char) anychar)+ comma )+ (!(comma / quote_char) anychar)+ ) quote_char { return plib.stringify(v).split(','); }
value_cftimer_type = quote_char v:( str_inline / str_outline / str_comment / str_debug ) quote_char { return v; }
value_cftrace_type = quote_char v:( str_information / str_warning / str_error / str_fatal_information ) quote_char { return v; }
value_cftransaction_action = quote_char v:( str_begin / str_commit / str_rollback / str_set_save_point ) quote_char { return v; }
value_cftransaction_isolation = quote_char v:( str_read_uncommited / str_read_commited / str_repeatable_read / str_serializable ) quote_char { return v; }
value_disposition = quote_char v:( str_attachment / str_inline ) quote_char { return v; }
value_cfmail_type = quote_char v:( str_text / str_plain / str_html ) quote_char { return v; }
value_priority = quote_char v:( [1-5] / str_highest / str_urgent / str_high / str_normal / str_lowest / str_low / str_non_urgent ) quote_char {
	var priorities = {
		'1': 'highest',
		'2': 'high',
		'3': 'normal',
		'4': 'low',
		'5': 'lowest',
		'urgent': 'highest',
		'non_urgent': 'lowest'
	}
	var kv = plib.stringify(v, 'under', 'lower');
	return Object.keys(priorities).indexOf(kv) > -1 ? priorities[kv] : kv;
}

value_cffunction_access        = quote_char v:( str_package / str_private / str_public / str_remote ) quote_char { return v; }
value_cffunction_return_format = quote_char v:( str_json    / str_wddx    / str_plain  / str_xml    ) quote_char { return v; }
value_cffunction_return_type   = quote_char v:( str_any           / str_array     / str_binary / str_boolean       / str_component / str_date   / str_guid          / str_numeric   / str_query  / str_string        / str_struct    / str_uuid   / str_variable_name / str_void      / str_xml    / anychar+ ) quote_char { return v; }
value_name_conflict         = quote_char v:( str_error / str_make_unique / str_overwrite / str_skip ) quote_char { return v; }
value_name_zip              = quote_char v:( str_name / str_directory / str_size / str_compressed_size / str_type / str_date_last_modified / str_comment / str_crc ) quote_char { return v; }
value_mime                  = quote_char v:( ( 'application' / 'audio' / 'chemical' / 'image' / 'inode' / 'message' / 'model' / 'multipart' / 'text' / 'video' / 'x-conference' / 'x-epoc' / 'x-world' ) wack ( chars / ub / hyphen / '+' / period )+ ) quote_char { return plib.stringify(v); }
value_cffile_attributes       = quote_char v:( ( file_attribute_values comma space? )* file_attribute_values ) quote_char { return plib.stringify(v, 'array'); }
file_attribute_values         = str_read_only / str_hidden / str_normal
value_exit_method = quote_char v:( str_exit_tag / str_exit_template / str_loop ) quote_char { return v; }
value_cflog_log  = quote_char v:( str_application / str_scheduler ) quote_char { return v.toLowerCase(); }
value_cflog_type = quote_char v:( str_information / str_warning / str_error / str_fatal) quote_char { return v.toLowerCase(); }

value_scope_ldap = quote_char v:( str_one_level / str_base / str_subtree ) quote_char { return plib.stringify(v); }
value_cflock_scope = quote_char v:( str_application ) quote_char { return plib.stringify(v, 'lower'); }
//value_cflock_scope = quote_char v:( str_application / str_request / str_server / str_session ) quote_char { return plib.stringify(v, 'lower'); }
value_scope_lock   = quote_char v:( str_application ) quote_char { return plib.stringify(v, 'lower'); }
//value_scope_lock = quote_char v:( str_application / str_request / str_server / str_session ) quote_char { return plib.stringify(v, 'lower'); }
value_url = quote_char v:(!quote_char anychar)+ quote_char { return plib.stringify(v, 'uri'); }
value_cfschedule_action   = quote_char v:( str_run / str_update / str_pause / str_resume / str_delete ) quote_char { return v; }
value_cfschedule_interval = quote_char v:( str_once / str_daily / str_weekly / str_monthly ) quote_char { return v; }
value_orm_type = quote_char v:( str_string     / str_character    / str_char    / str_short       / str_integer    / str_int          / str_long    / str_big_decimal / str_float      / str_double       / str_boolean / str_yes_no      / str_true_false / str_text         / str_date    / str_timestamp   / str_binary     / str_serializable / str_blob    / str_clob ) quote_char { return plib.stringify(v); }

date              = now_func / v:(integer integer integer integer '-' integer integer? '-' integer integer? ) { return new Date(plib.stringify(v) + ' 00:00:00'); }
date_time         = now_func / v:(date space time ) { return new Date(v); }
domain            = v:( 'localhost' / ( dom_part+ period )+ dom_part+ ) { return plib.stringify(v); }
dom_part          = ( lcchars / ub lcchars )+ ( '-' lcchars / lcchars )*
email             = n:(!(quote_char / ws / at) anychar)+ at:at d:domain        { return plib.stringify(n) + at + d; }
now_func          = str_now lparen rparen { return new Date(); }

// Generic Generic Value Defs

value_empty_quote = quote_char quote_char { return ""; }
// @TODO: Fix value_encoding from: http://www.iana.org/assignments/character-sets/character-sets.xhtml
value_encoding    = value_any_non_whitespace
value_float       = quote_char v:( integer+ period integer+ ) quote_char { return plib.stringify(v, 'float'); }
value_integer     = quote_char v:integer+ quote_char { return plib.stringify(v, 'int'); }
value_zip_action  = quote_char v:( str_delete / str_list / str_read / str_read_binary / str_unzip / str_zip ) quote_char { return v; }

// Functions
create_time_span_func
	= pound "CreateTimeSpan(" space* days:integer space* "," space* hours:integer space* "," space* minutes:integer space* "," space* seconds:integer space* ")" pound {
		var calc = Date.now() +
			( parseInt(days) * 86400000 ) + // days
			( parseInt(hours) * 3600000 ) + // hours
			( parseInt(minutes) * 60000 ) + // minutes
			( parseInt(seconds) * 1000 );   // seconds
		return new Date(calc);
	}
value_time = quote_char v:time quote_char { return v; }
time 
	= hr:([01] integer / '2' [0123] ) ':' 
	min:( [0-5] integer ) ':' 
	sec:( [0-5] integer )
	mill:( period integer integer integer integer )? { return new Date(hr + min + sec + mill); }

operations = e q / n e q / l t / l e / g t / g e / i s / n o t

__ = ub?
anychar = .
asterisk = '*'
at = '@'
backwack = "\\"
chars = ucchars / lcchars / integer
colon = ':'
comma = ','
eql = '='
escaped_quote_chars = '\"' / "\\'"
gt = '>'
hexadecimal = [0-9a-f]
hyphen = '-'
integer = [0-9]
lbrack = '['
lcchars = [a-z]
lcurl = '{'
lparen = '('
lt = '<'
period = '.'
pound = '#'
quote_char = '"' / "'"
rbrack = ']'
rcurl = '}'
rparen = ')'
semi = ';'
space = ' '
ub = '_'
ucchars = [A-Z]
wack = '/'
ws = space / "\t" / "\n"

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
