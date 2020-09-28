const should = require('should'),
        test = require('./testlib');

describe('Parsing the cfdefaultcase tag', function () {
  it('should eror without a closing tag and name attribute', function () {
    (function () { test.cfparser.parse('<cfexecute >'); }).should.throw('Expected " ", "\\n", "\\t", [aA], [nN], [oO], [tT], or [vV] but ">" found.');
  });

  it('should eror with a closing tag but missing a required name attribute', function () {
    (function () { test.cfparser.parse('<cfexecute arguments="-v"></cfexecute>'); }).should.throw('Missing required "name" attribute.');
  });

  it('should eror without a closing tag and an empty name attribute', function () {
    (function () { test.cfparser.parse('<cfexecute name="" >'); }).should.throw('Expected "<" or any character but end of input found.');
  });

  it('should eror with a closing tag but an empty name attribute', function () {
    (function () { test.cfparser.parse('<cfexecute name="" ></cfexecute>'); }).should.throw('Invalid value "" specified for "name" attribute.');
  });

  it('should work as expected with minimal attributes', function () {
    r = test.cfparser.parse("<cfexecute name='execute'></cfexecute>");
    r.should.be.instanceof(Object);
    r.tag.should.eql('execute');
    r.content.should.eql('');
    r.attributes.name.should.eql('execute');
    r.attributes.timeout.should.eql(0);
  });

  it('should work as expected with many attributes', function () {
    r = test.cfparser.parse("<cfexecute name='execute2' arguments='-v' outputFile='/tmp/outfile' timeout='10' variable='execute_out'>" +
    "</cfexecute>");
    r.should.be.instanceof(Object);
    r.tag.should.eql('execute');
    r.content.should.eql('');
    r.attributes.name.should.eql('execute2');
    r.attributes.arguments.should.eql('-v');
    r.attributes.output_file.should.eql('/tmp/outfile');
    r.attributes.timeout.should.eql(10);
    r.attributes.variable.should.eql('execute_out');
  });

  it('should work as expected with many attributes all in caps', function () {
    r = test.cfparser.parse("<CFEXECUTE NAME='execute3' ARGUMENTS='-v' OUTPUTFILE='/tmp/outfile' TIMEOUT='11' VARIABLE='execute_out' >" +
    "\nSomething, althought I don't know why this is not an empty tag." +
    "\nWhat could you possibly add here that would be useful." +
    "</CFEXECUTE>");
    r.should.be.instanceof(Object);
    r.tag.should.eql('execute');
    r.content.should.eql("\nSomething, althought I don't know why this is not an empty tag." +
    "\nWhat could you possibly add here that would be useful.")
    r.attributes.name.should.eql('execute3');
    r.attributes.arguments.should.eql('-v');
    r.attributes.output_file.should.eql('/tmp/outfile');
    r.attributes.timeout.should.eql(11);
    r.attributes.variable.should.eql('execute_out');
  });
});

