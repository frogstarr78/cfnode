const is = require('assert'), test = require('./testlib');

var r;
is.throws(function () {
	r = test.cfparser.parse('<cfdirectory filter="*.exe" />');
}, Error, 'Missing required directory attribute.');

is.throws(function () {
	r = test.cfparser.parse('<cfdirectory directory="' + __filename + '" >');
}, Error, 'Invalid directory attribute. Value is not a directory.');

r = test.cfparser.parse('<cfdirectory directory="' + __dirname + '">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'directory');
is.equal(r.attributes.action, 'list');
is.equal(r.attributes.directory, __dirname);
is.equal(r.attributes.list_info, 'all');
is.equal(r.attributes.recurse, false);
is.equal(r.attributes.sort, 'ASC');
is.equal(r.attributes.store_location, 'US');
is.equal(r.attributes.type, 'all');

r = test.cfparser.parse('<cfdirectory ' + 
'action="rename" ' + 
'directory="' + __dirname + '" '+
'filter="*.js" ' + 
'list_info="name" ' + 
'mode="641" ' + 
'name="output_rec" ' +
'new_directory="/tmp/dir" ' +
'recurse="yes" ' +
'sort="DESC" ' +
'store_location="EU" ' +
'type="file" ' +
"store_acl='{group=\"all\", permission=\"read\"}' " +
'/>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'directory');
is.equal(r.attributes.action, 'rename');
is.equal(r.attributes.directory, __dirname);
is.equal(r.attributes.filter, '*.js');
is.equal(r.attributes.list_info, 'name');
is.equal(r.attributes.mode, '641');
is.equal(r.attributes.name, 'output_rec');
is.equal(r.attributes.new_directory, '/tmp/dir');
is.equal(r.attributes.recurse, true);
is.equal(r.attributes.sort, 'DESC');
is.deepEqual(r.attributes.store_acl, { "group":"all", "permission":"read" });
is.equal(r.attributes.store_location, 'EU');
is.equal(r.attributes.type, 'file');

r = test.cfparser.parse('<CFDIRECTORY ' + 
"\nACTION='delete' " + 
"\nDIRECTORY='" + __dirname + "' "+
"\nFILTER='*.js' " + 
"\nLISTINFO='name' " + 
"\nMODE='641' " + 
"\nNAME='output_rec' " +
"\nNEWDIRECTORY='/tmp/dir' " +
"\nRECURSE='yes' " +
"\nSORT='DESC' " +
"\nSTORELOCATION='EU' " +
"\nTYPE='file' " +
"\nSTOREACL='#strct#' " +
'/>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'directory');
is.equal(r.attributes.action, 'delete');
is.equal(r.attributes.directory, __dirname);
is.equal(r.attributes.filter, '*.js');
is.equal(r.attributes.list_info, 'name');
is.equal(r.attributes.mode, '641');
is.equal(r.attributes.name, 'output_rec');
is.equal(r.attributes.new_directory, '/tmp/dir');
is.equal(r.attributes.recurse, true);
is.equal(r.attributes.sort, 'DESC');
is.deepEqual(r.attributes.store_acl, 'strct');
is.equal(r.attributes.store_location, 'EU');
is.equal(r.attributes.type, 'file');

