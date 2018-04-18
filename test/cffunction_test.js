const should = require('should'),
	    test = require('./testlib');

var r;

describe('Parsing the cffunction tag', function() {
    it('should throw an exception when missing a required name attribute.', function () {
		(function () { r = test.cfparser.parse('<cffunction access="package"></cffunction>'); }).should.throw('Missing required "name" attribute.');
	});

    it('should work as expected', function () {
		r = test.cfparser.parse('<cffunction name="cffunction_test1" ></cffunction>');
		r.should.be.instanceof(Object);
		r.tag.should.eql('function');
		r.content.should.eql('');
		r.attributes.name.should.eql('cffunction_test1');
		r.attributes.access.should.eql('public');
		r.attributes.output.should.be.true;
		r.attributes.return_format.should.eql('xml');
		r.attributes.return_type.should.eql('any');
		r.attributes.roles.should.eql([]);
		r.attributes.secure_json.should.be.false;
		r.attributes.verify_client.should.be.false;

		r = test.cfparser.parse('<cffunction ' +
		'return_type="string" name="cffunction-test2" access="private" ' +
		'output="no" returnFormat="json" ' +
		'roles="admin,user" secure_json="true" verify_client="yes" ' +
		'description="Simple Test Function" displayname="function_test2" ' +
		'hint="Test function2">' +
		"\nHello World!" +
		'</cffunction>');
		r.should.be.instanceof(Object);
		r.tag.should.eql('function');
		r.content.should.eql("\nHello World!");
		r.attributes.name.should.eql('cffunction-test2');
		r.attributes.access.should.eql('private');
		r.attributes.output.should.be.false;
		r.attributes.return_format.should.eql('json');
		r.attributes.return_type.should.eql('string');
		r.attributes.roles.should.eql(['admin', 'user']);
		r.attributes.secure_json.should.be.true;
		r.attributes.verify_client.should.be.true;
		r.attributes.description.should.eql('Simple Test Function');
		r.attributes.display_name.should.eql('function_test2');
		r.attributes.hint.should.eql('Test function2');

		r = test.cfparser.parse('<CFFUNCTION ' +
		"\nreturnType='numeric' " +
		"\nname='cffunction-test3' " +
		"\naccess='package' " +
		"\noutput='no' " +
		"\nreturnFormat='plain' " +
		"\nroles='admin,user,web' " +
		"\nsecure_json='true' " +
		"\nverify_client='yes' " +
		"\ndescription='Simple Test Function' " +
		"\ndisplayname='function_test3' " +
		"\nhint='Test function3'>" +
		"\n<cfreturn 1 />" +
		'</CFFUNCTION>');
		r.should.be.instanceof(Object);
		r.tag.should.eql('function');
		r.content.should.eql("\n<cfreturn 1 />");
		r.attributes.name.should.eql('cffunction-test3');
		r.attributes.access.should.eql('package');
		r.attributes.output.should.be.false;
		r.attributes.return_format.should.eql('plain');
		r.attributes.return_type.should.eql('numeric');
		r.attributes.roles.should.eql(['admin', 'user', 'web']);
		r.attributes.secure_json.should.be.true;
		r.attributes.verify_client.should.be.true;
		r.attributes.description.should.eql('Simple Test Function');
		r.attributes.display_name.should.eql('function_test3');
		r.attributes.hint.should.eql('Test function3');
	});
});
