const is = require('assert'), test = require('./testlib');

var r;

r = test.cfparser.parse('<cfoutput ></cfoutput>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'output');
is.equal(r.content, '');

r = test.cfparser.parse('<cfoutput query="output">' +
"\n</cfoutput>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'output');
is.equal(r.attributes.query, "output");
is.equal(r.attributes.start_row, 1);
is.equal(r.attributes.max_rows, -1);
is.equal(r.attributes.group_case_sensitive, true);
is.equal(r.content, "\n");

r = test.cfparser.parse('<cfoutput query="output">' +
"\nThis is the content that is saved #NOW()#" +
"\n</cfoutput>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'output');
is.equal(r.attributes.query, 'output');
is.equal(r.attributes.start_row, 1);
is.equal(r.attributes.max_rows, -1);
is.equal(r.attributes.group_case_sensitive, true);
is.equal(r.content, "\nThis is the content that is saved #NOW()#\n");

r = test.cfparser.parse('<cfoutput query="output" startRow="2" maxRows="10" group="id" groupCaseSensitive="no">' +
"\nThis is the content that is saved #NOW()#" +
"\n</cfoutput>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'output');
is.equal(r.attributes.query, 'output');
is.equal(r.attributes.start_row, 2);
is.equal(r.attributes.max_rows, 10);
is.equal(r.attributes.group, 'id');
is.equal(r.attributes.group_case_sensitive, false);
is.equal(r.content, "\nThis is the content that is saved #NOW()#\n");

r = test.cfparser.parse('<CFOUTPUT QUERY="output2" STARTROW="2" MAXROWS="10" GROUP="id" GROUPCASESENSITIVE="no">' +
"\nThis is the content that is saved #NOW()#" +
"\n</CFOUTPUT>");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'output');
is.equal(r.attributes.query, 'output2');
is.equal(r.attributes.start_row, 2);
is.equal(r.attributes.max_rows, 10);
is.equal(r.attributes.group, 'id');
is.equal(r.attributes.group_case_sensitive, false);
is.equal(r.content, "\nThis is the content that is saved #NOW()#\n");
