var is = require('assert'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;

is.throws(function () {
	r = cf.parse('<cfproperty>');
}, Error);

is.throws(function () {
	r = cf.parse('<cfproperty />');
}, Error, "Missing required name attribute.");

r = cf.parse('<cfproperty name="cfproperty_test1" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'property');
is.equal(r.attributes.constrained, false);
is.equal(r.attributes.name, 'cfproperty_test1');
is.equal(r.attributes.required, false);
is.equal(r.attributes.type, 'any');
is.equal(r.attributes.lazy, true);
is.equal(r.attributes.fetch, 'select');
is.equal(r.attributes.generated, 'never');
is.equal(r.attributes.index, false);
is.equal(r.attributes.insert, true);
is.equal(r.attributes.inverse, false);
is.equal(r.attributes.missing_row_ignored, false);
is.equal(r.attributes.not_null, false);
is.equal(r.attributes.optimistic_lock, true);
is.equal(r.attributes.serializable, true);
is.equal(r.attributes.orm_type, 'string');
is.equal(r.attributes.persistent, false);
is.equal(r.attributes.read_only, false);
is.equal(r.attributes.source, 'vm');
is.equal(r.attributes.unique, false);
is.equal(r.attributes.update, true);

r = cf.parse('<cfproperty ' +
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
is.equal(r instanceof Object, true);
is.equal(r.tag, 'property');
//is.equal(r.attributes.secure_json, true);
is.equal(r.attributes.constrained, true);
is.equal(r.attributes.display_name, 'property_test2');
is.equal(r.attributes.fetch, 'join');
is.equal(r.attributes.generated, 'always');
is.equal(r.attributes.hint, 'Test property2');
is.equal(r.attributes.index, false);
is.equal(r.attributes.insert, false);
is.equal(r.attributes.inverse, true);
is.equal(r.attributes.lazy, true);
is.equal(r.attributes.name, 'cfproperty-test2');
is.equal(r.attributes.missing_row_ignored, true);
is.equal(r.attributes.not_null, true);
is.equal(r.attributes.optimistic_lock, false);
is.equal(r.attributes.orm_type, 'integer');
is.equal(r.attributes.required, true);
is.equal(r.attributes.serializable, false);
is.equal(r.attributes.type, 'boolean');
is.equal(r.attributes.persistent, true);
is.equal(r.attributes.read_only, true);
is.equal(r.attributes.source, 'db');
is.equal(r.attributes.unique, true);
is.equal(r.attributes.update, false);

//"\nsecure_json='true' " +
r = cf.parse('<CFPROPERTY ' +
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
is.equal(r instanceof Object, true);
is.equal(r.tag, 'property');
//is.equal(r.attributes.secure_json, true);
is.equal(r.attributes.constrained, true);
is.equal(r.attributes.display_name, 'property_test4');
is.equal(r.attributes.fetch, 'join');
is.equal(r.attributes.generated, 'always');
is.equal(r.attributes.hint, 'Test property4');
is.equal(r.attributes.index, false);
is.equal(r.attributes.insert, true);
is.equal(r.attributes.inverse, false);
is.equal(r.attributes.lazy, true);
is.equal(r.attributes.name, 'cfproperty-test4');
is.equal(r.attributes.not_null, false);
is.equal(r.attributes.required, true);
is.equal(r.attributes.serializable, false);
is.equal(r.attributes.optimistic_lock, false);
is.equal(r.attributes.type, 'boolean');
is.equal(r.attributes.orm_type, 'char');
is.equal(r.attributes.persistent, true);
is.equal(r.attributes.read_only, true);
is.equal(r.attributes.source, 'db');
is.equal(r.attributes.unique, true);
is.equal(r.attributes.update, false);

test.ok();
