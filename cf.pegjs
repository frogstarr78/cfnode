start = tags / any

tags = open_tags / closing_tags

open_tags = cfset / cfqueryparam / cfdump

cfset = lt c f s e t ws* "var" attrib_eql quoted_value whack? gt
cfdump = lt c f d u m p ws* "var" attrib_eql quoted_value whack? gt
cfqueryparam = lt c f q u e r y p a r a m ws* cfqpattrib whack? gt
cfqpattrib = c f s q l t y p e attrib_eql query_types ws+ 
	/ a r r a y attrib_eql boolean_value ws+ 
	/ v a l u e attrib_eql quoted_value ws+

query_types = "CF_SQL_VARCHAR"
	/ "CF_SQL_CHAR"
	/ "CF_SQL_TEXT"
	/ "CF_SQL_INT"

closing_tags = cfapplication
	/ cfoutput
	/ cfscript
	/ cfloop 
	/ cfmail 
	/ cfquery
	/ cfif
	/ cfswitch
	/ cfcase

cfapplication = cfapplication_open (!cfapplication_close any)* cfapplication_close
cfapplication_open = lt c f a p p l i c a t i o n ws* cfappAttribs ws* gt 
cfappAttribs = n a m e attrib_eql quoted_value 
	/ o u t p u t attrib_eql quoted_value
cfapplication_close = lt whack c f a p p l i c a t i o n gt 

cfoutput = cfoutput_open (!cfoutput_close any)* cfoutput_close
cfoutput_open = lt c f o u t p u t gt 
cfoutput_close = lt whack c f o u t p u t gt 

cfscript = cfscript_open (!cfscript_close any)* cfscript_close
cfscript_open = lt c f s c r i p t gt 
cfscript_close = lt whack c f s c r i p t gt 

cfloop = cfloop_open (!cfloop_close any)* cfloop_close
cfloop_open = lt c f l o o p ws+ cfloopattrib ws* gt 
cfloopattrib = a r r a y attrib_eql quoted_value 
	/ l i s t attrib_eql quoted_value
	/ q u e r y attrib_eql quoted_value
	/ i n d e x attrib_eql quoted_value
cfloop_close = lt whack c f l o o p gt 

cfmail = cfmail_open (!cfmail_close any)* cfmail_close
cfmail_open = lt c f m a i l ws+ cfmailattrib ws* gt 
cfmailattrib = s e r v e r attrib_eql quoted_value
	/ u s e r n a m e attrib_eql quoted_value
	/ p a s s w o r d attrib_eql quoted_value
	/ p o r t attrib_eql quoted_value
	/ s s l attrib_eql boolean_value
cfmail_close = lt whack c f m a i l gt 

cfquery = cfquery_open (!cfquery_close any)* cfquery_close
cfquery_open = lt c f q u e r y ws+ cfqueryattrib ws* gt 
cfqueryattrib = d s n attrib_eql quoted_value 
	/ s e r v e r attrib_eql quoted_value
	/ u s e r n a m e attrib_eql quoted_value
	/ p a s s w o r d attrib_eql quoted_value
	/ p o r t attrib_eql quoted_value
	/ v a l u e attrib_eql quoted_value
cfquery_close = lt whack c f q u e r y gt 

// conditionals
cfif = cfif_open (!(cfif_close / cfelse / cfelseif) any)* cfif_close
cfelse = lt c f e l s e gt
cfelse = lt c f e l s e i f ws+ conditional_statement ws* gt
cfif_open = lt c f i f ws+ conditional_statement ws* gt 
cfif_close = lt whack c f i f gt 

cfswitch = cfswitch_open (!cfswitch_close any)* cfswitch_close
cfswitch_open = lt c f s w i t c h ws+ any+ ws* gt 
cfswitch_close = lt whack c f s w i t c h gt 

cfcase = cfcase_open (!cfcase_close any)* cfcase_close
cfcase_open = lt c f c a s e ws+ any+ ws* gt 
cfcase_close = lt whack c f c a s e gt 
// end conditionals

conditional_statement = any+
ops = e q / n e q / l t /  l e / g t / g e / i s / n o t

cfval = pound (!pound any)+ pound
boolean_value = '"' (!'"' yes_no)* '"' 
	/ "'" (!"'" yes_no)* "'" 

yes_no = y e s / n o
quoted_value = '"' (!'"' any)* '"' 
	/ "'" (!"'" any)* "'" 

attrib_eql = ws* eq ws*

pound = '#'
lt = '<'
gt = '>'
whack = '/'

ws = ' ' / '\t'
any = .*

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
