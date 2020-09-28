const should = require('should'),
        test = require('./testlib');

describe('Parsing the cfdirectory tag', function () {
  it("should thow an error when missing a required directory attribute", function () {
    (function () { test.cfparser.parse('<cfdirectory filter="*.exe" />'); }).should.throw('Missing required directory attribute.');
  });

  it("should thow an error when receiving an invalid directory attribute", function () {
    (function () { test.cfparser.parse('<cfdirectory directory="' + __filename + '" >'); })
      .should.throw('Invalid directory attribute. Value is not a directory.');
  });

  it("should behave as expected with only the equired attribute", function () {
    r = test.cfparser.parse('<cfdirectory directory="' + __dirname + '">');
    r.should.be.instanceof(Object);
    r.tag.should.eql('directory');
    r.attributes.action.should.eql('list');
    r.attributes.directory.should.eql(__dirname);
    r.attributes.list_info.should.eql('all');
    r.attributes.recurse.should.eql(false);
    r.attributes.sort.should.eql('ASC');
    r.attributes.store_location.should.eql('US');
    r.attributes.type.should.eql('all');
  });

  it("should behave as expected with many attibutes", function () {
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
    r.should.be.instanceof(Object);
    r.tag.should.eql('directory');
    r.attributes.action.should.eql('rename');
    r.attributes.directory.should.eql(__dirname);
    r.attributes.filter.should.eql('*.js');
    r.attributes.list_info.should.eql('name');
    r.attributes.mode.should.eql('641');
    r.attributes.name.should.eql('output_rec');
    r.attributes.new_directory.should.eql('/tmp/dir');
    r.attributes.recurse.should.eql(true);
    r.attributes.sort.should.eql('DESC');
	r.attributes.store_acl.should.eql({ "group":"all", "permission":"read" });
    r.attributes.store_location.should.eql('EU');
    r.attributes.type.should.eql('file');
  });

  it("should behave as expected with many attibutes defined in uppercase", function () {
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
    r.should.be.instanceof(Object);
    r.tag.should.eql('directory');
    r.attributes.action.should.eql('delete');
    r.attributes.directory.should.eql(__dirname);
    r.attributes.filter.should.eql('*.js');
    r.attributes.list_info.should.eql('name');
    r.attributes.mode.should.eql('641');
    r.attributes.name.should.eql('output_rec');
    r.attributes.new_directory.should.eql('/tmp/dir');
    r.attributes.recurse.should.eql(true);
    r.attributes.sort.should.eql('DESC');
    r.attributes.store_acl.should.eql('strct');
    r.attributes.store_location.should.eql('EU');
    r.attributes.type.should.eql('file');
  });
});
