const should = require('should'),
  	    test = require('./testlib');

describe("Parser should parse cfproperty tag", function () {
	it("should eror without a required name attribute", function () {
		(function () { test.cfparser.parse('<cfproperty constrained="yes" />'); }).should.throw('Missing required name attribute.');
	});

	it("works as expected", function () {
		r = test.cfparser.parse('<cfproperty name="cfproperty_test1" />');
		r.should.be.instanceof(Object);
		r.tag.should.eql('property');
		r.attributes.constrained.should.be.false;
		r.attributes.name.should.eql('cfproperty_test1');
		r.attributes.required.should.be.false;
		r.attributes.type.should.eql('any');
		r.attributes.lazy.should.be.true;
		r.attributes.fetch.should.eql('select');
		r.attributes.generated.should.eql('never');
		r.attributes.index.should.be.false;
		r.attributes.insert.should.be.true;
		r.attributes.inverse.should.be.false;
		r.attributes.missing_row_ignored.should.be.false;
		r.attributes.not_null.should.be.false;
		r.attributes.optimistic_lock.should.be.true;
		r.attributes.serializable.should.be.true;
		r.attributes.orm_type.should.eql('string');
		r.attributes.persistent.should.be.false;
		r.attributes.read_only.should.be.false;
		r.attributes.source.should.eql('vm');
		r.attributes.unique.should.be.false;
		r.attributes.update.should.be.true;

		r = test.cfparser.parse('<cfproperty ' +
		'name="cfproperty-test2" ' + 
		'displayname="property_test2" ' +
		'update="no" ' + 
		'hint="Test property2" ' + 
		'missing_row_ignored="yes" ' +
		'required="true" ' +
		'ormType="integer" ' +
		'type="boolean" ' +
		'lazy="yes" ' +
		'fetch="join" ' +
		'generated="always" ' +
		'optimisticLock="no" ' +
		'insert="false" ' +
		'inverse="yes" ' +
		'persistent="yes" ' +
		'unique="yes" ' +
		'not_null="yes" ' +
		'source="db" ' +
		'serializable="no" ' +
		'readOnly="yes" ' +
		'constrained="yes" ' +
		'/>');
		r.should.be.instanceof(Object);
		r.tag.should.eql('property');
		//r.attributes.secure_json.should.be.true;
		r.attributes.constrained.should.be.true;
		r.attributes.display_name.should.eql('property_test2');
		r.attributes.fetch.should.eql('join');
		r.attributes.generated.should.eql('always');
		r.attributes.hint.should.eql('Test property2');
		r.attributes.index.should.be.false;
		r.attributes.insert.should.be.false;
		r.attributes.inverse.should.be.true;
		r.attributes.lazy.should.be.true;
		r.attributes.name.should.eql('cfproperty-test2');
		r.attributes.missing_row_ignored.should.be.true;
		r.attributes.not_null.should.be.true;
		r.attributes.optimistic_lock.should.be.false;
		r.attributes.orm_type.should.eql('integer');
		r.attributes.required.should.be.true;
		r.attributes.serializable.should.be.false;
		r.attributes.type.should.eql('boolean');
		r.attributes.persistent.should.be.true;
		r.attributes.read_only.should.be.true;
		r.attributes.source.should.eql('db');
		r.attributes.unique.should.be.true;
		r.attributes.update.should.be.false;

		//"\nsecure_json='true' " +
		r = test.cfparser.parse('<CFPROPERTY ' +
		"\nNAME='cfproperty-test4' " +
		"\nUPDATE='no' " + 
		"\nDISPLAYNAME='property_test4' " +
		"\nREQUIRED='true' " +
		"\nORMTYPE='integer' " +
		"\nTYPE='boolean' " +
		"\nLAZY='yes' " +
		"\nMISSING_ROW_IGNORED='yes' " +
		"\nFETCH='join' " +
		"\nGENERATED='always' " +
		"\nINSERT='false' " +
		"\nINVERSE='yes' " +
		"\nOPTIMISTICLOCK='no' " +
		"\nNOT_NULL='yes' " +
		"\nREADONLY='yes' " +
		"\nPERSISTENT='yes' " +
		"\nSERIALIZABLE='no' " +
		"\nUNIQUE='yes' " +
		"\nCONSTRAINED='yes' " +
		"\nORMTYPE='char' " +
		"\nSOURCE='db' " +
		"\nHINT='Test property4'>");
		r.should.be.instanceof(Object);
		r.tag.should.eql('property');
		//r.attributes.secure_json.should.be.true;
		r.attributes.constrained.should.be.true;
		r.attributes.display_name.should.eql('property_test4');
		r.attributes.fetch.should.eql('join');
		r.attributes.generated.should.eql('always');
		r.attributes.hint.should.eql('Test property4');
		r.attributes.index.should.be.false;
		r.attributes.insert.should.be.true;
		r.attributes.inverse.should.be.false;
		r.attributes.lazy.should.be.true;
		r.attributes.name.should.eql('cfproperty-test4');
		r.attributes.not_null.should.be.false;
		r.attributes.required.should.be.true;
		r.attributes.serializable.should.be.false;
		r.attributes.optimistic_lock.should.be.false;
		r.attributes.type.should.eql('boolean');
		r.attributes.orm_type.should.eql('char');
		r.attributes.persistent.should.be.true;
		r.attributes.read_only.should.be.true;
		r.attributes.source.should.eql('db');
		r.attributes.unique.should.be.true;
		r.attributes.update.should.be.false;
	});
});
